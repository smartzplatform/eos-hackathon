import React, { Component } from "react";

import "./Consumers.less";
import ButtonAdd from "../../../../../common/button/ButtonAdd";
import ConsumerForm from "./consumer-form/ConsumerForm";
import Modal from "../../../../../common/modal/Modal";
import { observer } from "mobx-react";
import AppStore from "../../../../../../store/AppStore";
import Table from "./../../../../../common/table/Table";

@observer
export default class Consumers extends Component {
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
          <ConsumerForm onCloseModal={this.toggleModal} />
        </Modal>
        <Table data={AppStore.consumers} />
        <ButtonAdd text={"Add consumer +"} onClick={this.toggleModal} />
      </div>
    );
  }
}
