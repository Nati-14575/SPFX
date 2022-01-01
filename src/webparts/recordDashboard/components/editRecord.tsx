import * as React from "react";
import { editRecord } from "./actions"
import { toast } from "react-toastify";
const EditRecord = ({ words, context, hideRecordModal, recordDetails, setOutgoingRecords }) => {
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [recipientOrg, setRecipientOrg] = React.useState(recordDetails.RecipientOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [DateofDispatch, setDateofDispatch] = React.useState(recordDetails.DateofDispatch)
    const [DeliveryPerson, setDeliveryPerson] = React.useState(recordDetails.DeliveryPersonnelName)
    const [Subject, setSubject] = React.useState(recordDetails.Subject)
    const onSubmit = (event) => {
        event.preventDefault()
        const data = {
            RecipientOrganizationName: recipientOrg,
            ReferenceNumber: ReferenceNumber,
            DateofDispatch: DateofDispatch,
            DeliveryPersonnelName: DeliveryPerson,
            Subject: Subject,
        };
        editRecord(context, recordDetails.Id, data).then(() => {
            toast("Updated Successfully");
            setOutgoingRecords()
            setFileName(null)
            setReferenceNumber(null)
            setRecipientOrg(null)
            setDateofDispatch(null)
            setDeliveryPerson(null)
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
                                    type="text"
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
                                        setDateofDispatch(event.target.value)
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
                                        type="reset"
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

export default EditRecord;