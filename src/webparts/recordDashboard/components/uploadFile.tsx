import * as React from "react";
import { toast } from "react-toastify";
import { handleSubmit, GetFiles, getLoggedUser, handleSubmitWithOufFile } from "./actions"
import Loader from "./Loader";

const UploadFile = ({ words, caller, context, hideModal, setIncommingRecords, setOutgoingRecords }) => {
    const [file, setFile] = React.useState(null)
    const [inputedFileName, setInputedFileName] = React.useState(null)
    const [sendingOrg, setSendingOrg] = React.useState(null)
    const [ReferenceNumber, setReferenceNumber] = React.useState(null)
    const [IncomingRecordDate, setIncomingRecordDate] = React.useState(new Date().toISOString().slice(0, 10))
    const [Subject, setSubject] = React.useState(null)
    const [FileIDId, setFileId] = React.useState(null)
    const [files, setFiles] = React.useState(null)
    const [recipientOrg, setRecipientOrg] = React.useState(null)
    const [DateofDispatch, setDateofDispatch] = React.useState(new Date().toISOString().slice(0, 10))
    const [receivingPersonnel, setReceivingPersonnel] = React.useState(null)
    const [showLoader, setLoader] = React.useState(false)
    const [haveFile, setHaveFile] = React.useState(false)
    const [fileError, setFileError] = React.useState(null)
    const [organizationNameError, setOrganizationNameError] = React.useState(null)
    const [refNumberError, setRefNumberError] = React.useState(null)
    const [recordDateError, setRecordDateError] = React.useState(null)
    const [subjectError, setSubjectError] = React.useState(null)
    const [recipientOrgError, setRecipientOrgError] = React.useState(null)
    const [dispatchDateError, setDispatchDateError] = React.useState(null)

    React.useEffect(() => {
        getLoggedUser(context).then((json) => {
            setReceivingPersonnel(json.DisplayName)
        })
    }, [])

    let handleFileChange = (e) => {
        setFileId(e.target.value);
    }
    let element1 = (
        <>
            <div className="form-group row p-2">
                <label className="col-sm-5 col-form-label text-left">
                    {words.senderOrg}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={sendingOrg}
                        onChange={(e) => setSendingOrg(e.target.value)}
                    />
                </div>
            </div>
            <div className={organizationNameError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{organizationNameError}</div>
            <div className="form-group row p-2">
                <label className="col-sm-5 col-form-label text-left">
                    {words.referenceNumber}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
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
                <label className="col-sm-5 col-form-label text-left">
                    {words.receievingPersonnel}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={receivingPersonnel}
                    />
                </div>
            </div>
            <div className="form-group row p-2">
                <label className="col-sm-5 col-form-label text-left">
                    {words.IncomingRecordDate}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
                    <input
                        type="date"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={IncomingRecordDate}
                        onChange={(event) =>
                            setIncomingRecordDate(event.target.value)
                        }
                    />
                </div>
            </div>
            <div className={recordDateError ? "container  text-danger pl-3 py-1 text-left" : "container text-danger"} >{recordDateError}</div>
            <div className="form-group row p-2">
                <label className="col-sm-5 col-form-label text-left">
                    {words.subject}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
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
            <div className="form-group row p-2">
                <label className="col-sm-5 col-form-label text-left">
                    {words.location}
                </label>
                <div className="col-sm-6">
                    <select className="form-control" onChange={handleFileChange} >
                        {files && files.map((file) => <option value={file.Id}>{file.FileName}</option>)}
                    </select>
                </div>
            </div>


        </>
    )
    let element2 = (
        <>

            <div className="form-group row p-2">
                <label className="col-sm-5 col-form-label text-left">
                    {words.recipientOrg}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
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
                <label className="col-sm-5 col-form-label text-left">
                    {words.referenceNumber}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
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
                <label className="col-sm-5 col-form-label text-left">
                    {words.dateOfDispatch}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
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
            <div className="form-group row p-2">
                <label className="col-sm-5 col-form-label text-left">
                    {words.subject}  <span style={{ color: "red" }}>*</span>
                </label>
                <div className="col-sm-6">
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
        </>
    )
    function Files() {
        GetFiles(context).then((response) => {
            const data: any = [];
            data.push({
                Id: 0,
                Title: null,
                FileName: words.selectLocation
            })

            response.map((item) => {
                data.push({
                    Id: item.Id,
                    Title: item.Title,
                    FileName: item.FileName
                });
            })
            setFiles(data)
        })
    }
    React.useEffect(() => {
        Files()
    }, [words])

    let submited

    function validateIncomingInputs() {
        console.log("Validate Incoming Input here")
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

    function validateOutgoingInputs() {
        console.log("Validate Outgoing Input here")
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

    function onSubmit(event) {
        event.preventDefault()
        { submited && handleFileSubmit(event) }
    }

    function handleFileSubmit(event) {
        setLoader(true);
        event.preventDefault();
        let inputs: any;

        if (haveFile) {

            if (caller === "Incomming") {
                inputs = {
                    SendingOrganizationName: sendingOrg,
                    ReferenceNumber: ReferenceNumber,
                    IncomingRecordDate: IncomingRecordDate ? new Date(IncomingRecordDate) : null,
                    DeliveryPersonnelName: receivingPersonnel,
                    Subject: Subject,
                    FileIDId: FileIDId,
                    inputedFileName: inputedFileName
                }
                handleSubmit(file, context, "Incomming", inputs)
                    .then((response) => {
                        setLoader(false)
                        setFile(null)
                        setSendingOrg(null)
                        setIncomingRecordDate(null)
                        setReceivingPersonnel(null)
                        setReferenceNumber(null)
                        setFileId(0)
                        setSubject(null)
                        hideModal(event)
                        setIncommingRecords(response)
                        toast(words.uploadSuccess)
                    }
                    )
            }
            else {
                inputs = {
                    RecipientOrganizationName: recipientOrg,
                    ReferenceNumber: ReferenceNumber,
                    DateofDispatch: DateofDispatch ? new Date(DateofDispatch) : null,
                    Subject: Subject,
                    inputedFileName: inputedFileName
                }
                handleSubmit(file, context, "Outgoing", inputs)
                    .then((response) => {
                        setFile(null)
                        hideModal()
                        setRecipientOrg(null)
                        setDateofDispatch(null)
                        setSubject(null)
                        setReferenceNumber(null)
                        setReceivingPersonnel(null)
                        setOutgoingRecords(response)
                        setLoader(false)
                        toast(words.uploadSuccess)
                    })
            }
        }
        else {
            if (caller === "Incomming") {
                inputs = {
                    SendingOrganizationName: sendingOrg,
                    ReferenceNumber: ReferenceNumber,
                    IncomingRecordDate: IncomingRecordDate ? new Date(IncomingRecordDate) : null,
                    DeliveryPersonnelName: receivingPersonnel,
                    Subject: Subject,
                    FileIDId: FileIDId,
                    inputedFileName: inputedFileName
                }
                handleSubmitWithOufFile(context, "Incomming", inputs)
                    .then((response) => {
                        setLoader(false)
                        setFile(null)
                        setSendingOrg(null)
                        setIncomingRecordDate(null)
                        setReceivingPersonnel(null)
                        setReferenceNumber(null)
                        setFileId(0)
                        setSubject(null)
                        hideModal(event)
                        setIncommingRecords(response)
                        toast(words.uploadSuccess)
                    }
                    )
            }
            else {
                inputs = {
                    RecipientOrganizationName: recipientOrg,
                    ReferenceNumber: ReferenceNumber,
                    DateofDispatch: DateofDispatch ? new Date(DateofDispatch) : null,
                    Subject: Subject,
                    inputedFileName: inputedFileName
                }
                handleSubmitWithOufFile(context, "Outgoing", inputs)
                    .then((response) => {
                        setFile(null)
                        hideModal()
                        setRecipientOrg(null)
                        setDateofDispatch(null)
                        setSubject(null)
                        setReferenceNumber(null)
                        setReceivingPersonnel(null)
                        setOutgoingRecords(response)
                        setLoader(false)
                        toast(words.uploadSuccess)
                    })
            }
        }


    }
    return (
        <>
            {showLoader == false ?

                <div className="container-fluid pt-5 pl-4 pr-4">
                    <div className="row justify-content-center text-center pt-4 bg-info" style={{ "color": "white" }}>
                        <h4 style={{ "marginBottom": "15px", "color": "white" }} >
                            {caller === "Incomming" ? (<b>{words.uploadIncomingRecord}</b>) : (<b>{words.uploadRecord}</b>)}
                        </h4>
                    </div>
                    <hr />
                    <div className="row justify-content-center text-center h-100">
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <form
                                onSubmit={(event) => {
                                    { caller === "Incomming" ? validateIncomingInputs() : validateOutgoingInputs() }
                                    onSubmit(event)
                                }
                                }
                            >
                                {caller === "Incomming" ? (<div>{element1}</div>) : (<div>{element2}</div>)}
                                <div className="form-group row p-2">
                                    <label className="col-sm-5 col-form-label text-left">
                                        {words.haveAccessToFile}
                                    </label>
                                    <div className="col-sm-6">
                                        <input type="checkbox" className="form-control" onChange={() => setHaveFile(!haveFile)} value="yes" />
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label className="col-sm-5 col-form-label text-left">
                                        {words.inputfileName}
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fileInput"
                                            onChange={(event) => setInputedFileName(event.target.value)}
                                            disabled={haveFile}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row p-2">
                                    <label className="col-sm-5 col-form-label text-left">
                                        {words.file}
                                    </label>
                                    <div className="col-sm-6">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="fileInput"
                                            onChange={(event) => setFile(event.target.files[0])}
                                            disabled={!haveFile}
                                        />
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group p-3">
                                    <div className="row">
                                        <div className="col-md-12 text-center d-flex justify-content-between">

                                            <button
                                                type="submit"
                                                className=" btn bg-primary btn-sm text-center " style={{ "color": "white" }}
                                            >
                                                {words.submit}
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm text-center"
                                                onClick={(event) => {
                                                    hideModal(event)
                                                    setRefNumberError(null)
                                                    setSubjectError(null)
                                                    setOrganizationNameError(null)
                                                    setRecordDateError(null)
                                                    setRecipientOrgError(null)
                                                    setDispatchDateError(null)
                                                }}
                                                type="reset"
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

export default UploadFile;