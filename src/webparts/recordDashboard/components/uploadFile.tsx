import * as React from "react";
import { toast } from "react-toastify";
import { handleSubmit } from "./actions"
const UploadFile = ({ words, caller, context, hideModal, setIncommingRecords, setOutgoingRecords }) => {
    const [file, setFile] = React.useState(null)
    let record: any;
    function handleFileSubmit(event) {
        event.preventDefault();
        try {
            {
                caller === "Incomming" ? (
                    handleSubmit(file, context, "Incomming")
                        .then((response) => {
                            toast("Uploaded successfully")
                            setFile(null)
                            hideModal()
                            setIncommingRecords(response)
                        }
                        )
                ) : (
                    handleSubmit(file, context, "Outgoing")
                        .then((response) => {
                            toast("Uploaded successfully")
                            setFile(null)
                            hideModal()
                            setOutgoingRecords(response)
                        })
                )

            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="container-fluid ">
            <div className="row justify-content-center text-center ">
                <h4>
                    <b>{words.uploadRecord}</b>
                </h4>
            </div>
            <hr />
            <div className="row justify-content-center text-center h-100">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <form
                        onSubmit={(event) => handleFileSubmit(event)}
                    >
                        <div className="form-group">
                            <input
                                type="file"
                                className="form-control"
                                id="fileInput"
                                onChange={(event) => setFile(event.target.files[0])}
                            />
                        </div>
                        <hr />
                        <div className="form-group">
                            {/* <div className="container"> */}
                            <div className="row">
                                <div className="col-md-12">
                                    <button
                                        className="btn btn-secondary btn-sm float-left"
                                        onClick={hideModal}
                                        type="reset"
                                    >
                                        {words.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        className=" btn btn-primary btn-sm float-right"
                                    >
                                        {words.submit}
                                    </button>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadFile;