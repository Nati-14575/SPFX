import * as React from "react";
import "./modal-edit-record.css";

const ModalEditRecord = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? "modal-record display-block"
    : "modal-record display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-record-main"  style={{"borderRadius":"40px"}}>
        {children}
        {/* <button type="button" onClick={handleClose}>
          Close
        </button> */}
      </section>
    </div>
  );
};

export default ModalEditRecord;
