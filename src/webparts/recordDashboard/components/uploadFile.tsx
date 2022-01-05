import * as React from "react";
import { toast } from "react-toastify";
import { handleSubmit } from "./actions";
import Loader from "./Loader";

const UploadFile = ({ words, caller, context, hideModal, setIncommingRecords, setOutgoingRecords, showDetailRecord, setRecordDetail }) => {
    const [file, setFile] = React.useState(null)
    const [showLoader, setLoader] = React.useState(false)
    let record: any;
    // let showLoader = false;
    function handleFileSubmit(event) {

        // showLoader = true;
        setLoader(true);
        event.preventDefault();
        try {
            {
                caller === "Incomming" ? (
                    handleSubmit(file, context, "Incomming")
                        .then((response) => {

                            console.log("under upload records");
                            console.log(response);
                            // showLoader= false;
                            setLoader(false);
                            toast("Uploaded successfull")
                            setFile(null)
                            setIncommingRecords(response);
                            console.log("after setting file null");
                            setRecordDetail(response);
                            console.log("after caaling record detail")
                            hideModal()
                            
                            showDetailRecord();
   
                            
                        },
                            (err) => {
                                setLoader(false);
                                toast.error("Something went wrong");

                            }
                        )
                ) : (
                    handleSubmit(file, context, "Outgoing")
                        .then((response) => {
                            // showLoader=false;
                            setLoader(false);
                            toast("Uploaded successfully")
                            setFile(null)
                            setOutgoingRecords(response)
                            hideModal()
                            console.log("under handle submit submit");
                            console.log(response);
                            setRecordDetail(response);
                            showDetailRecord();
                        },
                            (err) => {
                                setLoader(false);
                                toast.error("Something went wrong");

                            })
                )

            }
        }
        catch (err) {
            // showLoader= false;
            setLoader(false);
            toast.error("Something went wrong");
            // console.log(err)
        }
    }
    return (
        <>
            {showLoader == false ?

                <div className="container-fluid p-3">
                    <div className="row justify-content-center text-center pt-4">
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
                </div> : <Loader />

            }
            {/* <Loader /> */}
        </>

    )
}

export default UploadFile;