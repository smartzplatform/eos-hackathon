import React, { PureComponent } from "react";

import "./Counters.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";

export default class Counters extends PureComponent {
  render() {
    return (
      <div className="counters">
        Counters
        <ButtonAdd
          text={"Add counters +"}
          onClick={() => console.log("click add counters")}
        />
      </div>
    );
  }
}
