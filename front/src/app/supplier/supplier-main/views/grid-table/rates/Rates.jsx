import React, { PureComponent } from "react";

import "./Rates.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import Modal from "./../../../../../common/modal/Modal";
import RateForm from "./rate-form/RateForm";

export default class Rates extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    // SupplierStore.setsupplierScreen(supplierScreens.RATE_FORM);
    const { isOpenModal } = this.state;
    this.setState({ isOpenModal: !isOpenModal });
  }

  render() {
    const { isOpenModal } = this.state;

    return (
      <div className="rates">
        <Modal isOpen={isOpenModal} onClose={this.toggleModal}>
          <RateForm />
        </Modal>
        Rates
        <ButtonAdd text={"Add rates +"} onClick={this.toggleModal} />
      </div>
    );
  }
}
