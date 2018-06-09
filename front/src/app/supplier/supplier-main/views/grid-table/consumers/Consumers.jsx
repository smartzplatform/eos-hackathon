import React, { Component } from "react";

import "./Consumers.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import ConsumerForm from "./consumer-form/ConsumerForm";
import Modal from "../../../../../common/modal/Modal";
import { observer } from "mobx-react";
import AppStore from "../../../../../../store/AppStore";
import Table from "./../../../../../common/table/Table";
import MiddleBar from "../../../../../common/middle-bar/MiddleBar";
import Eos from "../../../../../../helpers/eos";

@observer
export default class Consumers extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpenModal: false };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    Eos.readTable({ code: "supplier", table: "user" })
      .then(result => {
        if (
          result.rows &&
          Array.isArray(result.rows) &&
          result.rows.length > 0
        ) {
          let consumerList = [];

          result.rows.map(item => {
            const { account, balance, meta, description } = item;

            const consumer = {
              name: account,
              meta,
              balance,
              description
            };

            consumerList.push(consumer);
          });

          AppStore.addConsumer(consumerList);
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
      headers: ["Name", "Balance", "Meta", "Description"],
      order: ["name", "balance", "meta", "description"],
      fields: [...AppStore.consumers]
    };

    return (
      <div className="consumers">
        <Modal isOpen={isOpenModal} onClose={this.toggleModal}>
          <ConsumerForm onCloseModal={this.toggleModal} />
        </Modal>
        <MiddleBar>
          <ButtonAdd text={"Add consumer"} onClick={this.toggleModal} />
        </MiddleBar>
        <Table data={data} />
      </div>
    );
  }
}
