import React, { Component } from "react";

import "./Rates.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import Modal from "./../../../../../common/modal/Modal";
import RateForm from "./rate-form/RateForm";
import Table from "./../../../../../common/table/Table";
import { observer } from "mobx-react";
import AppStore from "../../../../../../store/AppStore";
import MiddleBar from "./../../../../../common/middle-bar/MiddleBar";
import Eos from "../../../../../../helpers/eos";

@observer
export default class Rates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    // this.timerId = setInterval(() => {
    Eos.readTable({ code: "supplier", table: "rate" })
      .then(result => {
        if (
          result.rows &&
          Array.isArray(result.rows) &&
          result.rows.length > 0
        ) {
          let rateList = [];

          result.rows.map(item => {
            const { rate_id, billing_account, meta, description } = item;
            const dict = {
              electricity: "electricity",
              billelectro: "RFID"
            };
            const rate = {
              id: rate_id,
              type: dict[billing_account],
              price: meta,
              description
            };
            rateList.push(rate);
          });

          AppStore.addRate(rateList);
        }
      })
      .catch(error => {
        console.error(error);
      });
    // }, 2000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.timerId);
  // }

  toggleModal() {
    const { isOpenModal } = this.state;

    this.setState({ isOpenModal: !isOpenModal });
  }

  render() {
    const { isOpenModal } = this.state;

    const data = {
      headers: ["Id", "Type", "Price", "Description"],
      order: ["id", "type", "price", "description"],
      fields: [...AppStore.rates]
    };

    return (
      <div className="rates">
        <Modal isOpen={isOpenModal} onClose={this.toggleModal}>
          <RateForm onCloseModal={this.toggleModal} />
        </Modal>
        <MiddleBar>
          <ButtonAdd text={"Add rate +"} onClick={this.toggleModal} />
        </MiddleBar>
        <Table data={data} />
      </div>
    );
  }
}
