import Modal from "../../UI/Modal";
import InputForm from "./InputForm";

import classes from "./Order.module.css";

export default function Order({ onToggleModal, onCloseCart }) {
  return (
    <Modal
      modalClassName={classes.order}
      backdropClassName={classes.backdrop}
      onClose={onToggleModal}
    >
      <InputForm onClose={onToggleModal} onCloseCart={onCloseCart} />
    </Modal>
  );
}
