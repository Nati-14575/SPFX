import * as React from "react";
import { editRecord } from "./actions"
import { toast } from "react-toastify";
const EditIncomingRecord = ({ words, context, hideRecordModal, recordDetails }) => {
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [sendingOrg, setSendingOrg] = React.useState(recordDetails.SendingOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [IncomingRecordDate, setIncomingRecordDate] = React.useState(recordDetails.IncomingRecordDate)
    const [Subject, setSubject] = React.useState(recordDetails.Subject)
    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            SendingOrganizationName: sendingOrg,
            ReferenceNumber: ReferenceNumber,
            IncomingRecordDate: IncomingRecordDate,
            Subject: Subject,
        };
        editRecord(context, recordDetails.Id, data).then(() => {
            toast("Updated Successfully");
            setFileName(null)
            setReferenceNumber(null)
            setSendingOrg(null)
            setIncomingRecordDate(null)
            setSubject(null)
            hideRecordModal()
        })
    }
    return (
        <div className="container-fluid ">
            <div className="row justify-content-center text-center ">
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
                                    type="text"
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

                        <br />
                        <hr />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-12">
                                    <button
                                        className="btn btn-secondary btn-sm float-left"
                                        onClick={hideRecordModal}
                                    >
                                        {words.cancel}
                                    </button>
                                    <button
                                        className=" btn btn-primary btn-sm float-right"
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
        </div>
    )
}

export default EditIncomingRecord;