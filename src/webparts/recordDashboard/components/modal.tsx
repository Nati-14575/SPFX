import * as React from "react";
import "./modal.css";

const Modal = ({ handleClose, additionalStyles, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} style={additionalStyles}>
      <section className="modal-main" style={{"borderRadius":"40px"}}>
        {children}
        {/* <button type="button" onClick={handleClose}>
          Close
        </button> */}
      </section>
    </div>
  );
};

export default Modal;
