import Eos from "eosjs";
import axios from "axios";
import { eosConstants } from "../constants/constants";
import * as binaryen from "binaryen";

class Eoss {
  constructor() {
    document.addEventListener("scatterLoaded", scatterExtension => {
      this.scatter = window.scatter;
      window.scatter = null;
    });
    this.network = {
      port: eosConstants.PORT,
      host: eosConstants.HOST,
      blockchain: eosConstants.BLOCKCHAIN,
      chainId: eosConstants.CHAIN_ID
    };

    this.configEosInstance = {
      binaryen,
      chainId: eosConstants.CHAIN_ID
      // mockTransactions: () => null,
    };
    this.eos = null;
    this.identity = null;

    this.sendTransaction = this.sendTransaction.bind(this);
    this.readTable = this.readTable.bind(this);
    this.getAccountName = this.getAccountName.bind(this);
  }

  getAccountName(identity) {
    if (
      identity.accounts &&
      Array.isArray(identity.accounts) &&
      identity.accounts.length > 0
    ) {
      return identity.accounts[0].name;
    } else {
      throw Error("Account not found!");
    }
  }

  // work well!
  sendTransaction(funcName, formData) {
    return this.scatter
      .suggestNetwork(this.network)
      .then(param => this.scatter.getIdentity({ accounts: [this.network] }))
      .then(identity => {
        const accountName = this.getAccountName(identity);

        return this.scatter
          .eos(this.network, Eos, this.configEosInstance, eosConstants.PROTOCOL)
          .transaction(accountName, contract => {
            if (Array.isArray(funcName)) {
              funcName.forEach((item, i) => {
                contract[item](formData[i], {
                  authorization: accountName
                });
              });
            } else {
              contract[funcName](formData, {
                authorization: accountName
              });
            }
          });
      });
  }

  readTable(formData) {
    return this.scatter
      .suggestNetwork(this.network)
      .then(param => this.scatter.getIdentity({ accounts: [this.network] }))
      .then(identity => {
        const accountName = this.getAccountName(identity);

        return this.scatter
          .eos(this.network, Eos, this.configEosInstance, eosConstants.PROTOCOL)
          .getTableRows({
            json: true,
            code: formData.code,
            scope: formData.code,
            table: formData.table,
            limit: 1000
          });
      });
  }
}

export default new Eoss();
