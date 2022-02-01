import * as React from "react";
import './toaster.css';


const SuccessToast = ({ word, setToastLoader, message, messageHeader }) => {

    return (

        <div id="myModal" >
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="icon-box" style={{"backgroundColor":"#17a2b8"}}>
                            <i className="fa fa-check"></i>
                        </div>
                        <h4 className="modal-title w-100">{messageHeader}</h4>
                    </div>
                    <div className="modal-body">
                        <p className="text-center" style={{"fontSize":"20px"}}>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn  btn-block" style={{"background":"#17a2b8"}} onClick={(e) => setToastLoader(false)}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessToast;
