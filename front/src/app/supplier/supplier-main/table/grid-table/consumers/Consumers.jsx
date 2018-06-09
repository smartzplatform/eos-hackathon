import React, { PureComponent } from "react";

import "./Consumers.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";

export default class Consumers extends PureComponent {
  render() {
    return (
      <div className="consumers">
        Consumers
        <ButtonAdd
          text={"Add consumer +"}
          onClick={() => console.log("click add consumer")}
        />
      </div>
    );
  }
}
