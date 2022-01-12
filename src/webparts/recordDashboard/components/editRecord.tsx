import * as React from "react";
import { editAndGetRecord } from "./actions"
import { toast } from "react-toastify";
import Loader from "./Loader";

const EditRecord = ({ words, context, hideRecordModal, recordDetails, setOutgoingRecords }) => {
    function pad(numItem) {
        return (numItem < 10) ? '0' + numItem.toString() : numItem.toString();
    }
    let recordDate
    let arrRecordDate
    let finalDate
    let output

    if (recordDetails.DateofDispatch) {
        console.log(recordDetails.DateofDispatch)
        recordDate = recordDetails.DateofDispatch ? recordDetails.DateofDispatch : ""
        arrRecordDate = recordDate.split("/");
        arrRecordDate.map((element, index) => {
            arrRecordDate[index] = pad(element)
        })
        output = arrRecordDate.join("/");
        finalDate = output.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
        console.log(finalDate)
    }
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [recipientOrg, setRecipientOrg] = React.useState(recordDetails.RecipientOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [DateofDispatch, setDateofDispatch] = React.useState(recordDetails.DateofDispatch ? finalDate : "")
    const [DeliveryPerson, setDeliveryPerson] = React.useState(recordDetails.DeliveryPersonnelName)
    const [Subject, setSubject] = React.useState(recordDetails.Subject)
    const [showLoader, setLoader] = React.useState(false);

    const onSubmit = (event) => {
        setLoader(true);
        event.preventDefault()
        const data = {
            RecipientOrganizationName: recipientOrg,
            ReferenceNumber: ReferenceNumber,
            DateofDispatch: DateofDispatch ? new Date(DateofDispatch) : null,
            DeliveryPersonnelName: DeliveryPerson,
            Subject: Subject,
        };
        editAndGetRecord(context, recordDetails.Id, data).then((response) => {
            setLoader(false);
            toast("Updated Successfully");
            setFileName(null)
            setReferenceNumber(null)
            setRecipientOrg(null)
            setDateofDispatch(null)
            setDeliveryPerson(null)
            setSubject(null)
            hideRecordModal()
            setOutgoingRecords(response);
            window.location.reload();
        }, (err) => {
            setLoader(false);
            toast.error("Something went wrong");

        })
    }
    return (
        <>
            {
                showLoader == false ? <div className="container-fluid p-5">
                    <div className="row justify-content-center text-center p-3 bg-info">
                        <h4 style={{ "color": "white" }}>
                            <b>{words.editRecord}</b>
                        </h4>
                    </div>
                    <hr />
                    <div className="row justify-content-center text-center h-100">
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <form onSubmit={(event) => onSubmit(event)}>
                                <div className="form-group row pb-3">
                                    <label className="col-sm-4 col-form-label text-left">
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

export default EditRecord;