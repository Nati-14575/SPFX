import * as React from "react";
const ViewRecord = ({ words, hideViewRecordModal, showRemarkModal, recordDetails }) => {
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [recipientOrg, setRecipientOrg] = React.useState(recordDetails.RecipientOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [DateofDispatch, setDateofDispatch] = React.useState(recordDetails.DateofDispatch)
    const [DeliveryPerson, setDeliveryPerson] = React.useState(recordDetails.DeliveryPersonnelName)
    const [Subject, setSubject] = React.useState(recordDetails.Subject)

    return (
        <div className="container-fluid p-5">
            <div className="row justify-content-center text-center p-3 bg-info" style={{ "color": "white" }}>
                <h4>
                    <b>{words.viewRecord}</b>
                </h4>
            </div>
            <br />
            <div className="row justify-content-center text-center h-100" >
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">

                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.fileName} :</b>
                        </label>
                        <div className="col-sm-5 float-left">
                            <p>{fileName}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.recipientOrg} :</b>
                        </label>
                        <div className="col-sm-5">
                            <p>{recipientOrg}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.referenceNumber} :</b>
                        </label>
                        <div className="col-sm-5">
                            <p>{ReferenceNumber}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.dateOfDispatch} :</b>
                        </label>
                        <div className="col-sm-5">
                            <p>{DateofDispatch}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.deliveryPersonnel} :</b>
                        </label>
                        <div className="col-sm-7">
                            <p>{DeliveryPerson}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.subject} :</b>
                        </label>
                        <div className="col-sm-7">
                            <p>{Subject}</p>
                        </div>
                    </div>
                    <br />

                    <br />
                    {/* <hr /> */}
                    <div className="form-group ">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <button
                                    className="btn btn-secondary btn-sm text-center"
                                    type="button"
                                    onClick={hideViewRecordModal}
                                >
                                    {words.cancel}
                                </button>
                                <button
                                    className=" btn btn-primary btn-sm float-right"
                                    type="button"
                                    onClick={() => {
                                        hideViewRecordModal(),
                                            showRemarkModal()
                                    }}
                                >
                                    {words.remark}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewRecord;