import { createPortal } from "react-dom";
import Card from "./Card";
import classes from "./Modal.module.css";

function Backdrop({ className, onClose }) {
  const style = `${classes.backdrop} ${className}`;
  return <div className={style} onClick={onClose} />;
}

function Overlay({ children, className }) {
  const style = `${classes.modal} ${className}`;
  return (
    <Card className={style}>
      <div className={classes.content}>{children}</div>
    </Card>
  );
}

const portal = document.getElementById("modal-root");

export default function Modal({
  children,
  backdropClassName,
  modalClassName,
  onClose
}) {
  return (
    <>
      {createPortal(
        <Backdrop className={backdropClassName} onClose={onClose} />,
        portal
      )}
      {createPortal(
        <Overlay className={modalClassName}>{children}</Overlay>,
        portal
      )}
    </>
  );
}
