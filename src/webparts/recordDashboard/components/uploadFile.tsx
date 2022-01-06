import * as React from "react";
import { toast } from "react-toastify";
import { handleSubmit, GetFiles } from "./actions"
const UploadFile = ({ words, caller, context, hideModal, setIncommingRecords, setOutgoingRecords }) => {
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
    let handleFileChange = (e) => {
        setFileId(e.target.value);
    }
    let element1 = (<div className="container-fluid ">
        <div className="row justify-content-center text-center h-100">
            <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <br />
                <br />
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
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
                <br />

                <br />
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
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
                <br />
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
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

                <br />
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
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
                <br />

                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                        {words.location}
                    </label>
                    <div className="col-sm-7">
                        <select className="form-control" onChange={handleFileChange} >
                            {files && files.map((file) => <option value={file.Id}>{file.FileName}</option>)}
                        </select>
                    </div>
                </div>
                <br />

                <br />

            </div>
        </div>
    </div>)

    function Files() {
        GetFiles(context).then((response) => {
            const data: any = [];
            data.push({
                Id: 0,
                Title: null,
                FileName: "--- select the location ---"
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
    }, [])
    let element2 = (
        <div className="container-fluid ">
            <div className="row justify-content-center text-center h-100">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <br />
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
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
                    <br />
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
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
                    <br />
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
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
                    <br />
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
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
                    <br />
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">
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
                    <br />
                    <br />
                </div>
            </div>
        </div>
    )
    function handleFileSubmit(event) {
        event.preventDefault();
        let inputs: any;
        if (caller === "Incomming") {
            inputs = {
                SendingOrganizationName: sendingOrg,
                ReferenceNumber: ReferenceNumber,
                IncomingRecordDate: IncomingRecordDate,
                Subject: Subject,
                FileIDId: FileIDId
            }
            console.log(inputs)
            handleSubmit(file, context, "Incomming", inputs)
                .then((response) => {
                    toast("Uploaded successfully")
                    setFile("")
                    setSendingOrg("")
                    setIncomingRecordDate("")
                    setDeliveryPerson("")
                    setReferenceNumber("")
                    setFileId(0)
                    setSubject("")
                    hideModal()
                    setIncommingRecords(response)
                }
                )
        }
        else {
            inputs = {
                RecipientOrganizationName: recipientOrg,
                ReferenceNumber: ReferenceNumber,
                DateofDispatch: DateofDispatch,
                DeliveryPersonnelName: DeliveryPerson,
                Subject: Subject,
            }
            handleSubmit(file, context, "Outgoing", inputs)
                .then((response) => {
                    toast("Uploaded successfully")
                    setFile(null)
                    hideModal()
                    setRecipientOrg("")
                    setDateofDispatch("")
                    setSubject("")
                    setReferenceNumber("")
                    setDeliveryPerson("")
                    setOutgoingRecords(response)
                })
        }
    }
    return (
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
                        {caller === "Incomming" ? (<div>{element1}</div>) : (<div>{element2}</div>)}
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UploadFile;