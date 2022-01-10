import * as React from "react";
import { editAndGetRecord } from "./actions"
import { toast } from "react-toastify";
import Loader from "./Loader";

const EditIncomingRecord = ({ words, context, hideRecordModal, recordDetails, setIncommingRecords, index, updateRecordInfo, files, setNum, num }) => {
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [sendingOrg, setSendingOrg] = React.useState(recordDetails.SendingOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [IncomingRecordDate, setIncomingRecordDate] = React.useState(recordDetails.IncomingRecordDate)
    const [Subject, setSubject] = React.useState(recordDetails.Subject)
    const [FileIDId, setFileId] = React.useState(recordDetails.FileIDId)
    const [showLoader, setLoader] = React.useState(false);

    let handleFileChange = (e) => {
        setFileId(e.target.value);
    }

    if (recordDetails.FileIDId === null) {
        setFileId(0)
    }
    const onSubmit = (event) => {
        setLoader(true);
        event.preventDefault()
        console.log(new Date(IncomingRecordDate).toISOString())
        const data = {
            SendingOrganizationName: sendingOrg,
            ReferenceNumber: ReferenceNumber,
            IncomingRecordDate: IncomingRecordDate,
            Subject: Subject,
            FileIDId: FileIDId
        };
        editAndGetRecord(context, recordDetails.Id, data).then((record) => {

            setLoader(false);
            toast("Updated Successful")
            updateRecordInfo(record, index)
            setFileName(null)
            setReferenceNumber(null)
            setSendingOrg(null)
            setIncomingRecordDate(null)
            setSubject(null)
            setNum(num + 1)
            hideRecordModal()
            // window.location.reload()
        },
            (err) => {
                setLoader(false);
                toast.error("Something went wrong");

            })
    }
    return (
        <>
            {
                showLoader == false ? <div className="container-fluid p-5">
                    <div className="row justify-content-center text-center p-3 bg-info" style={{ "color": "white" }}>
                        <h4>
                            <b>{words.editRecord}</b>
                        </h4>
                    </div>
                    <hr />
                    <div className="row justify-content-center text-center h-100">
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <form onSubmit={(event) => onSubmit(event)}>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label">
                                        {words.fileName}
                                    </label>
                                    <div className="col-sm-7">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={fileName}
                                        />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="form-group row d-md-flex">
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
                                        <select className="form-control" onChange={handleFileChange} value={FileIDId} >
                                            {files && files.map((file) => <option value={file.Id}>{file.FileName}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <br />

                                <br />
                                <hr />
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <button
                                                className="btn btn-secondary btn-sm "
                                                onClick={hideRecordModal}
                                                type="button"
                                            >
                                                {words.cancel}
                                            </button>
                                            <button
                                                className=" btn bg-info btn-sm text-center ml-4" style={{ "color": "white" }}
                                                type="submit"
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

export default EditIncomingRecord;