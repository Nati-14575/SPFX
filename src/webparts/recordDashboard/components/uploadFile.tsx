import * as React from "react";
import { toast } from "react-toastify";
import { handleSubmit, GetFiles } from "./actions"
import Loader from "./Loader";

const UploadFile = ({ words, caller, context, hideModal, setIncommingRecords, setOutgoingRecords, showDetailRecord, setRecordDetail }) => {
    const [file, setFile] = React.useState(null)
    const [sendingOrg, setSendingOrg] = React.useState(null)
    const [ReferenceNumber, setReferenceNumber] = React.useState(null)
    const [IncomingRecordDate, setIncomingRecordDate] = React.useState(null)
    const [Subject, setSubject] = React.useState(null)
    const [FileIDId, setFileId] = React.useState(null)
    const [files, setFiles] = React.useState(null)
    const [recipientOrg, setRecipientOrg] = React.useState(null)
    const [DateofDispatch, setDateofDispatch] = React.useState(null)
    const [DeliveryPerson, setDeliveryPerson] = React.useState(null)
    const [showLoader, setLoader] = React.useState(false)
    let record: any;
    // let showLoader = false;
    let handleFileChange = (e) => {
        setFileId(e.target.value);
    }
    let element1 = (
        <>
            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.senderOrg}
                </label>
                <div className="col-sm-7">
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
            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.referenceNumber}
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
            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.IncomingRecordDate}
                </label>
                <div className="col-sm-7">
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

            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.subject}
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

            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.location}
                </label>
                <div className="col-sm-7">
                    <select className="form-control" onChange={handleFileChange} >
                        {files && files.map((file) => <option value={file.Id}>{file.FileName}</option>)}
                    </select>
                </div>
            </div>


        </>
    )
    let element2 = (
        <>

            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.recipientOrg}
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

            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.referenceNumber}
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

            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.dateOfDispatch}
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

            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.deliveryPersonnel}
                </label>
                <div className="col-sm-7">
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={DeliveryPerson}
                        onChange={(event) =>
                            setDeliveryPerson(event.target.value)
                        }
                    />
                </div>
            </div>

            <div className="form-group row pb-3">
                <label className="col-sm-4 col-form-label text-left">
                    {words.subject}
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

    function handleFileSubmit(event) {
        setLoader(true);
        event.preventDefault();
        let inputs: any;
        if (caller === "Incomming") {
            inputs = {
                SendingOrganizationName: sendingOrg,
                ReferenceNumber: ReferenceNumber,
                IncomingRecordDate: IncomingRecordDate ? new Date(IncomingRecordDate) : null,
                Subject: Subject,
                FileIDId: FileIDId
            }
            handleSubmit(file, context, "Incomming", inputs)
                .then((response) => {
                    setLoader(false)
                    setFile(null)
                    setSendingOrg(null)
                    setIncomingRecordDate(null)
                    setDeliveryPerson(null)
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
                DeliveryPersonnelName: DeliveryPerson,
                Subject: Subject,
            }
            handleSubmit(file, context, "Outgoing", inputs)
                .then((response) => {
                    setFile(null)
                    hideModal()
                    setRecipientOrg(null)
                    setDateofDispatch(null)
                    setSubject(null)
                    setReferenceNumber(null)
                    setDeliveryPerson(null)
                    setOutgoingRecords(response)
                    setLoader(false)
                    toast(words.uploadSuccess)
                })
        }

    }
    return (
        <>
            {showLoader == false ?

                <div className="container-fluid p-5">
                    <div className="row justify-content-center text-center pt-4 bg-info" style={{ "color": "white" }}>
                        <h4 style={{ "marginBottom": "15px" }}>
                            <b>{words.uploadRecord}</b>
                        </h4>
                    </div>
                    <hr />
                    <div className="row justify-content-center text-center h-100">
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <form
                                onSubmit={(event) => handleFileSubmit(event)}
                            >
                                <div className="form-group row pb-3">

                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.file}
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="fileInput"
                                            onChange={(event) => setFile(event.target.files[0])}
                                            required
                                        />
                                    </div>

                                </div>
                                {caller === "Incomming" ? (<div>{element1}</div>) : (<div>{element2}</div>)}
                                <hr />
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <button
                                                className="btn btn-secondary btn-sm text-center"
                                                onClick={(event) => hideModal(event)}
                                                type="reset"
                                            >
                                                {words.cancel}
                                            </button>
                                            <button
                                                type="submit"
                                                className=" btn bg-info btn-sm text-center ml-4" style={{ "color": "white" }}
                                            >
                                                {words.submit}
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