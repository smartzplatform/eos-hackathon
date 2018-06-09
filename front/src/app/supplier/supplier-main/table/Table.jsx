import React, { PureComponent } from "react";

import "./Table.less";
import TabBar from "./tab-bar/TabBar";
import GridTable from "./grid-table/GridTable";

export const tabs = {
  RATES: "Rates",
  CONSUMERS: "Consumers",
  COUNTERS: "Counters",
  STATISTICS: "Statistics"
};

export default class Table extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { gridTable: tabs.RATES };

    this.onSetGridTable = this.onSetGridTable.bind(this);
  }

  onSetGridTable(gridTable) {
    return () => this.setState({ gridTable });
  }

  render() {
    return (
      <div className="table">
        <TabBar
          gridTable={this.state.gridTable}
          onClick={this.onSetGridTable}
        />
        <GridTable gridTable={this.state.gridTable} />
      </div>
    );
  }
}
