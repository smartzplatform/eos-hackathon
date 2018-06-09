import React, { PureComponent } from "react";

import "./Statistics.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import Table from "./../../../../../common/table/Table";
import Eos from "../../../../../../helpers/eos";
import AppStore from "../../../../../../store/AppStore";

export default class Statistics extends PureComponent {
  componentDidMount() {
    this.timerId = setInterval(() => {
      Eos.readTable({ code: "supplier", table: "log" })
        .then(result => {
          if (
            result.rows &&
            Array.isArray(result.rows) &&
            result.rows.length > 0
          ) {
            let statList = [];

            result.rows.map(item => {
              const {
                log_id,
                user_account,
                device_account,
                balance_diff,
                final_balance,
                rate_id
              } = item;

              const stat = {
                logId: log_id,
                consumer: user_account,
                device: device_account,
                balance_diff: balance_diff,
                balance: final_balance,
                rate: rate_id
              };
              statList.push(stat);
            });

            AppStore.addStat(statList);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const data = {
      headers: [
        "LogId",
        "Consumer",
        "Device",
        "Balance diff",
        "Balance",
        "Rate"
      ],
      order: ["logId", "consumer", "device", "balance_diff", "balance", "rate"],
      fields: [...AppStore.statistics]
    };

    return (
      <div className="statistics">
        <Table data={data} />
      </div>
    );
  }
}
