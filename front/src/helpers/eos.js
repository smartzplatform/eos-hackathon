import * as eosInstance from "eosjs";
import axios from "axios";
import { eosConstants } from "../constants/constants";
import * as binaryen from "binaryen";

class Eos {
  scatter;
  identity;
  eos;
  network;
  configEosInstance;

  constructor() {
    document.addEventListener("scatterLoaded", scatterExtension => {
      this.scatter = window.scatter;
      window.scatter = null;
    });
    this.network = {
      port: eosConstants.PORT,
      host: eosConstants.HOST,
      blockchain: eosConstants.BLOCKCHAIN,
      protocol: eosConstants.PROTOCOL
    };

    this.configEosInstance = {
      binaryen,
      chainId: eosConstants.CHAIN_ID
      // mockTransactions: () => null,
    };
    this.eos = null;
    this.identity = null;

    this.sendTransaction = this.sendTransaction.bind(this);
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

  getIdentity(cb) {
    console.log("---------------");
    console.log(this.scatter);
    return this.scatter
      .suggestNetwork(this.network)
      .then(ok => {
        console.log(ok);
        console.log(this.scatter);
        this.scatter.getIdentity({ accounts: [this.network] });
      })
      .then(identity => {
        console.log(identity);
        this.identity = identity;
        cb();
      })
      .catch(error => {
        console.error(error);
      });
  }

  deployContract = (bin, abi) => {
    this.scatter.requireVersion(5.0);

    // accept current network
    return this.scatter
      .suggestNetwork(this.network)
      .then(ok => this.scatter.getIdentity({ accounts: [this.network] }))
      .then(identity => {
        this.currentIdentity = identity;

        let accountName;
        if (Array.isArray(identity.accounts) && identity.accounts.length > 0) {
          accountName = identity.accounts[0].name;
        } else {
          throw Error("Account not found!");
        }

        this.eos = this.scatter.eos(
          this.network,
          eosInstance,
          this.configEosInstance
        );
        // send smart-contract
        return this.eos.setcode(accountName, 0, 0, bin);
      })
      .then(param => {
        return this.eos.setabi(
          this.currentIdentity.accounts[0].name,
          JSON.parse(abi)
        );
      });
  };

  sendTransaction(funcName, formData) {
    this.scatter
      .suggestNetwork(this.network)
      .then(ok => this.scatter.getIdentity({ accounts: [this.network] }))
      .then(identity => {
        this.currentIdentity = identity;

        let accountName;
        if (Array.isArray(identity.accounts) && identity.accounts.length > 0) {
          accountName = identity.accounts[0].name;
        } else {
          throw Error("Account not found!");
        }

        this.eos = this.scatter.eos(
          this.network,
          eosInstance,
          this.configEosInstance
        );

        // very bad hardcode //TODO:remove after
        if (funcName === "transfer" || funcName === "issue") {
          return this.eos.transaction(accountName, contract => {
            let data = {};
            if (formData.length === 3) {
              data = {
                from: formData[0],
                to: formData[1],
                quantity: formData[2]
              };
            }
            if (formData.length === 2) {
              data = { to: formData[0], quantity: formData[1] };
            }
            contract[funcName](data, { authorization: accountName });
          });
        } else if (funcName === "account") {
          return this.eos.getTableRows({
            json: true,
            code: formData[0],
            scope: formData[0],
            table: "account"
          });
        }
      });
  }
}

export default new Eos();
