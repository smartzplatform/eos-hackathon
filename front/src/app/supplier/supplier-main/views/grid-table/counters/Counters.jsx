import React, { Component } from "react";

import "./Counters.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import CounterForm from "./counter-form/CounterForm";
import Modal from "./../../../../../common/modal/Modal";
import { observer } from "mobx-react";
import AppStore from "../../../../../../store/AppStore";
import Table from "./../../../../../common/table/Table";
import MiddleBar from "../../../../../common/middle-bar/MiddleBar";
import Eos from "../../../../../../helpers/eos";

@observer
export default class Counters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    Eos.readTable({ code: "supplier", table: "device" })
      .then(result => {
        if (
          result.rows &&
          Array.isArray(result.rows) &&
          result.rows.length > 0
        ) {
          let deviceList = [];

          result.rows.map(item => {
            const { account, rate_id, user_account, description } = item;

            const device = {
              model: account,
              consumer: user_account,
              rate: rate_id,
              description
            };

            deviceList.push(device);
          });

          AppStore.addDevice(deviceList);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  toggleModal() {
    const { isOpenModal } = this.state;

    this.setState({ isOpenModal: !isOpenModal });
  }

  render() {
    const { isOpenModal } = this.state;

    const data = {
      headers: ["Model/Type", "Consumer", "Rate", "Description"],
      order: ["model", "consumer", "rate", "description"],
      fields: [...AppStore.devices]
    };

    return (
      <div className="counters">
        <Modal isOpen={isOpenModal} onClose={this.toggleModal}>
          <CounterForm onCloseModal={this.toggleModal} />
        </Modal>
        <MiddleBar>
          <ButtonAdd text={"Add device"} onClick={this.toggleModal} />
        </MiddleBar>
        <Table data={data} />
      </div>
    );
  }
}
