import React, { PureComponent } from "react";

import "./Consumers.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import ConsumerForm from "./consumer-form/ConsumerForm";
import Modal from "../../../../../common/modal/Modal";

export default class Consumers extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { isOpenModal: false };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { isOpenModal } = this.state;

    this.setState({ isOpenModal: !isOpenModal });
  }

  render() {
    const { isOpenModal } = this.state;

    return (
      <div className="consumers">
        <Modal isOpen={isOpenModal} onClose={this.toggleModal}>
          <ConsumerForm />
        </Modal>
        Consumers
        <ButtonAdd text={"Add consumer +"} onClick={this.toggleModal} />
      </div>
    );
  }
}
