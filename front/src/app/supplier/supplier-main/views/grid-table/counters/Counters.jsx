import React, { Component } from "react";

import "./Counters.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import CounterForm from "./counter-form/CounterForm";
import Modal from "./../../../../../common/modal/Modal";
import { observer } from "mobx-react";
import AppStore from "../../../../../../store/AppStore";
import Table from "./../../../../../common/table/Table";
import MiddleBar from "../../../../../common/middle-bar/MiddleBar";

@observer
export default class Counters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { isOpenModal } = this.state;

    this.setState({ isOpenModal: !isOpenModal });
  }

  render() {
    const { isOpenModal } = this.state;

    return (
      <div className="counters">
        <Modal isOpen={isOpenModal} onClose={this.toggleModal}>
          <CounterForm onCloseModal={this.toggleModal} />
        </Modal>
        <MiddleBar>
          <ButtonAdd text={"Add device"} onClick={this.toggleModal} />
        </MiddleBar>
        <Table data={AppStore.devices} />
      </div>
    );
  }
}
