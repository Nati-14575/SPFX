import * as React from "react";
import { moveFile, postFile, updateItem } from "./actions"
import { toast } from "react-toastify";
import Loader from "./Loader";

const EditIncomingRecord = ({ words, context, hideRecordModal, recordDetails, setIncommingRecords, index, updateRecordInfo, files, setNum, num }) => {

    const [file, setFile] = React.useState(null)
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [sendingOrg, setSendingOrg] = React.useState(recordDetails.SendingOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [IncomingRecordDate, setIncomingRecordDate] = React.useState(recordDetails.IncomingRecordDate ? recordDetails.IncomingRecordDate : new Date().toISOString().slice(0, 10))
    const [Subject, setSubject] = React.useState(recordDetails.Subject)
    const [FileIDId, setFileId] = React.useState(recordDetails.FileIDId ? recordDetails.FileIDId : null)
    const [showLoader, setLoader] = React.useState(false);
    const [fileError, setFileError] = React.useState(null)
    const [organizationNameError, setOrganizationNameError] = React.useState(null)
    const [refNumberError, setRefNumberError] = React.useState(null)
    const [recordDateError, setRecordDateError] = React.useState(null)
    const [subjectError, setSubjectError] = React.useState(null)

    let handleFileChange = (e) => {
        setFileId(e.target.value);
    }

    let submited

    function validateIncomingInputs() {
        if (!ReferenceNumber) {
            submited = false
            setRefNumberError(words.refNumberError)
        }
        if (!Subject) {
            submited = false
            setSubjectError(words.subjectError)
        }
        if (!sendingOrg) {
            submited = false
            setOrganizationNameError(words.sendingOrgNameError)
        }
        if (!IncomingRecordDate) {
            submited = false
            setRecordDateError(words.incomingDateError)
        }
        if (setRefNumberError && Subject && sendingOrg && IncomingRecordDate) {
            setRefNumberError(null)
            setSubjectError(null)
            setOrganizationNameError(null)
            setRecordDateError(null)
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
                SendingOrganizationName: sendingOrg,
                ReferenceNumber: ReferenceNumber,
                IncomingRecordDate: IncomingRecordDate ? IncomingRecordDate : null,
                Subject: Subject,
                FileIDId: parseInt(FileIDId),
            };
            moveFile(context, "OutgoingLibrary", recordDetails.Title, file.name).then(() => {
                postFile(context, "OutgoingLibrary", file).then(() => {
                    updateItem(context, "OutgoingLibrary", data, recordDetails.Id).then((response) => {
                        setLoader(false);
                        toast(words.updateSuccess)
                        updateRecordInfo(response, index)
                        setFile(null)
                        setReferenceNumber(null)
                        setSendingOrg(null)
                        setIncomingRecordDate(null)
                        setSubject(null)
                        setNum(num + 1)
                        hideRecordModal()
                        // window.location.reload()
                    })
                })
            })
        }
        else {
            const data = {
                SendingOrganizationName: sendingOrg,
                ReferenceNumber: ReferenceNumber,
                IncomingRecordDate: IncomingRecordDate ? IncomingRecordDate : null,
                Subject: Subject,
                FileIDId: parseInt(FileIDId),
            }
            updateItem(context, "OutgoingLibrary", data, recordDetails.Id).then((result) => {
                console.log(result)
                setLoader(false);
                toast(words.updateSuccess)
                updateRecordInfo(result, index)
                setFile(null)
                setReferenceNumber(null)
                setSendingOrg(null)
                setIncomingRecordDate(null)
                setSubject(null)
                setNum(num + 1)
                hideRecordModal()
                window.location.reload()
            })
        }


    }

    const fileChangeHandler = (event) => {
        event.preventDefault()
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
                showLoader == false ? <div className="container-fluid pt-5 pl-4 pr-4">
                    <div className="row justify-content-center text-center p-1 bg-info">
                        <h4 style={{ "color": "white" }}>
                            <b>{words.editIncomingRecord}</b>
                        </h4>
                    </div>
                    <hr />
                    <div className="row justify-content-center text-center h-100">
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <form onSubmit={(event) => {
                                validateIncomingInputs()
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
                                        {words.senderOrg} <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={sendingOrg}
                                            onChange={(e) => setSendingOrg(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={organizationNameError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{organizationNameError}</div>
                                <div className="form-group row p-2">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.referenceNumber} <span style={{ color: "red" }}>*</span>
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
                                        {words.IncomingRecordDate} <span style={{ color: "red" }} className="py-auto">*</span>
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={IncomingRecordDate}
                                            onChange={(event) =>
                                                setIncomingRecordDate(event.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={recordDateError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{recordDateError}</div>
                                <div className="form-group row p-2">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.subject} <span style={{ color: "red" }}>*</span>
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
                                <div className={subjectError ? "container  text-danger p-2 text-left" : "container text-danger"} >{subjectError}</div>
                                <div className="form-group row pb-3 p-2">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.location}
                                    </label>
                                    <div className="col-sm-7">
                                        <select className="form-control" onChange={handleFileChange} value={FileIDId} >
                                            {files && files.map((file) => <option value={file.Id}>{file.FileName}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group pl-3 py-1">
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
                                                    setOrganizationNameError(null)
                                                    setRecordDateError(null)
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

export default EditIncomingRecord;