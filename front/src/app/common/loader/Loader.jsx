import React, { PureComponent } from "react";

import "./Loader.less";

export default class Loader extends PureComponent {
  render() {
    return (
      <div className="loader flex">
        <div className="cssload-container">
          <div className="cssload-tube-tunnel" />
        </div>
        <span>Loading, please...</span>
      </div>
    );
  }
}
