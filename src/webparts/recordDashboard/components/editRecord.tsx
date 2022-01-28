import * as React from "react";
import { moveFile, postFile, updateItem } from "./actions"
import { toast } from "react-toastify";
import Loader from "./Loader";

const EditRecord = ({ words, context, hideRecordModal, recordDetails, setOutgoingRecords }) => {
    const [file, setFile] = React.useState(null)
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [recipientOrg, setRecipientOrg] = React.useState(recordDetails.RecipientOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [DateofDispatch, setDateofDispatch] = React.useState(recordDetails.DateofDispatch ? recordDetails.DateofDispatch : new Date().toISOString().slice(0, 10))
    const [Subject, setSubject] = React.useState(recordDetails.Subject)
    const [showLoader, setLoader] = React.useState(false);
    const [fileError, setFileError] = React.useState(null)
    const [refNumberError, setRefNumberError] = React.useState(null)
    const [subjectError, setSubjectError] = React.useState(null)
    const [recipientOrgError, setRecipientOrgError] = React.useState(null)
    const [dispatchDateError, setDispatchDateError] = React.useState(null)

    let submited

    function validateOutgoingInputs() {
        if (!ReferenceNumber) {
            setRefNumberError(words.refNumberError)
            submited = false
        }
        if (!Subject) {
            setSubjectError(words.subjectError)
            submited = false
        }
        if (!recipientOrg) {
            setRecipientOrgError(words.reciepientOrgNameError)
            submited = false
        }
        if (!DateofDispatch) {
            setDispatchDateError(words.dispatchDateError)
            submited = false
        }
        if (ReferenceNumber && Subject && recipientOrg && DateofDispatch) {
            setRefNumberError(null)
            setSubjectError(null)
            setRecipientOrgError(null)
            setDispatchDateError(null)
            submited = true
        }
    }
    function handleSubmit(event) {
        event.preventDefault()
        { submited && onSubmit(event) }
    }
    const onSubmit = (event) => {
        setLoader(true);
        event.preventDefault()
        if (file) {
            const data = {
                RecipientOrganizationName: recipientOrg,
                ReferenceNumber: ReferenceNumber,
                DateofDispatch: DateofDispatch ? new Date(DateofDispatch) : null,
                Subject: Subject,
                originalFilename: recordDetails.Title,
                newFilename: fileName
            };
            moveFile(context, "OutgoingLibrary", recordDetails.Title, file.name).then(() => {
                postFile(context, "OutgoingLibrary", file).then(() => {
                    updateItem(context, "OutgoingLibrary", data, recordDetails.Id).then((result) => {
                        setLoader(false);
                        toast(words.updateSuccess)
                        setFile(null)
                        setReferenceNumber(null)
                        setRecipientOrg(null)
                        setDateofDispatch(null)
                        setSubject(null)
                        hideRecordModal()
                        setOutgoingRecords(result[0]);
                    })
                })
            })
        } else {
            const data = {
                RecipientOrganizationName: recipientOrg,
                ReferenceNumber: ReferenceNumber,
                DateofDispatch: DateofDispatch ? new Date(DateofDispatch) : null,
                Subject: Subject,
            }
            updateItem(context, "OutgoingLibrary", data, recordDetails.Id).then((result) => {
                setLoader(false);
                toast(words.updateSuccess)
                setFile(null)
                setReferenceNumber(null)
                setRecipientOrg(null)
                setDateofDispatch(null)
                setSubject(null)
                hideRecordModal()
                setOutgoingRecords(result);
                window.location.reload();
            })
        }
    }
    const fileChangeHandler = (event) => {

        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
        setFileError(null)
        submited = true

    }
    const handleIconClick = () => {
        const input = document.getElementById("fileInput")
        input.click()
    }
    return (
        <>
            {
                showLoader == false ? <div className="container-fluid pt-3 pl-4 pr-4">
                    <div className="row justify-content-center text-center p-3 bg-info">
                        <h4 style={{ "color": "white" }}>
                            <b>{words.editRecord}</b>
                        </h4>
                    </div>
                    <hr />
                    <div className="row justify-content-center text-center h-100">
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <form onSubmit={(event) => {
                                validateOutgoingInputs()
                                handleSubmit(event)

                            }}
                            >
                                <div className="form-group row p-2">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.file}
                                    </label>
                                    <div className="col-sm-8 d-flex">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="fileInput"
                                            hidden
                                            onChange={(e) => fileChangeHandler(e)}
                                        />
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={fileName}
                                        />
                                        <button type="button" className="btn btn-warning ml-2" onClick={handleIconClick} style={{ cursor: "pointer" }}><i className="fa fa-file"></i></button>
                                    </div>
                                </div>
                                <div className={fileError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{fileError}</div>
                                <div className="form-group row p-2">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.recipientOrg} <span style={{ color: "red" }} className="py-auto">*</span>
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={recipientOrg}
                                            onChange={(event) => setRecipientOrg(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={recipientOrgError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{recipientOrgError}</div>
                                <div className="form-group row p-2">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.referenceNumber} <span style={{ color: "red" }} className="py-auto">*</span>
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value={ReferenceNumber}
                                            onChange={(event) =>
                                                setReferenceNumber(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={refNumberError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{refNumberError}</div>
                                <div className="form-group row p-2">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.dateOfDispatch} <span style={{ color: "red" }} className="py-auto">*</span>
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value={DateofDispatch}
                                            onChange={(event) =>
                                                setDateofDispatch(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={dispatchDateError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{dispatchDateError}</div>
                                <div className="form-group row pb-3 p-2">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.subject} <span style={{ color: "red" }} className="py-auto">*</span>
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value={Subject}
                                            onChange={(event) => setSubject(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={subjectError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{subjectError}</div>
                                <hr />
                                <div className="form-group pt-3 pb-2">
                                    <div className="row">
                                        <div className="col-md-12 text-center d-flex justify-content-between">

                                            <button
                                                className=" btn bg-primary btn-sm text-center " style={{ "color": "white" }}
                                                type="submit"
                                            >
                                                {words.submit}
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm "
                                                onClick={() => {
                                                    hideRecordModal()
                                                    setRefNumberError(null)
                                                    setSubjectError(null)
                                                    setRecipientOrgError(null)
                                                    setDispatchDateError(null)
                                                }}
                                                type="button"
                                            >
                                                {words.cancel}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> : <Loader />
            }
        </>
    )
}

export default EditRecord;