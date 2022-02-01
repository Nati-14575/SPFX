import * as React from "react";
import './toaster.css';


const ErrorToast = ({ word, setToastLoader, message, messageHeader }) => {

    return (
        <div id="myModal" >
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="icon-box" style={{ "background": "red" }}>
                            <i className="fa fa-check"></i>
                        </div>
                        <h4 className="modal-title w-100">{messageHeader}</h4>
                    </div>
                    <div className="modal-body">
                        <p className="text-center" style={{ "fontSize": "20px" }}>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-info btn-block" style={{ "background": "red" }} onClick={(e) => setToastLoader(false)}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorToast;
