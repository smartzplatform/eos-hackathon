import React, { PureComponent } from "react";

import "./Statistics.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import Table from "./../../../../../common/table/Table";

export default class Statistics extends PureComponent {
  render() {
    return (
      <div className="statistics">
        <Table />
      </div>
    );
  }
}
