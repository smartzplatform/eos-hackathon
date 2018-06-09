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
    Eos.readTable({ code: "supplier", table: "device" }) // name of contract // table, (function name)
      .then(result => {
        console.log(result);
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

    return (
      <div className="rates">
        <Modal isOpen={isOpenModal} onClose={this.toggleModal}>
          <RateForm onCloseModal={this.toggleModal} />
        </Modal>
        <MiddleBar>
          <ButtonAdd text={"Add rate +"} onClick={this.toggleModal} />
        </MiddleBar>
        <Table data={AppStore.rates} />
      </div>
    );
  }
}
