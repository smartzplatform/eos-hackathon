import React, { PureComponent } from "react";

import "./Views.less";
import TabBar from "./tab-bar/TabBar";
import GridTable from "./grid-table/GridTable";

export const tabs = {
  RATES: "Rates",
  CONSUMERS: "Consumers",
  COUNTERS: "Devices",
  STATISTICS: "Statistics"
};

export default class Views extends PureComponent {
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
      <div className="views">
        <TabBar
          gridTable={this.state.gridTable}
          onClick={this.onSetGridTable}
        />
        <GridTable gridTable={this.state.gridTable} />
      </div>
    );
  }
}
