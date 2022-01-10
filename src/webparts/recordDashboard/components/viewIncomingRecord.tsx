import * as React from "react";
const ViewIncomingRecord = ({ words, hideViewRecordModal, showRemarkModal, recordDetails }) => {
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [senderOrg, setSenderOrg] = React.useState(recordDetails.SendingOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [IncomingRecordDate, setIncomingRecordDate] = React.useState(recordDetails.IncomingRecordDate)
    const [DeliveryPerson, setDeliveryPerson] = React.useState(recordDetails.DeliveryPersonnelName)
    const [Subject, setSubject] = React.useState(recordDetails.Subject)

    return (
        <div className="container-fluid p-5">
            <div className="row justify-content-center text-center p-3 bg-info" style={{ "color": "white !important" }}>
                <h4>
                    <b>{words.viewRecord}</b>
                </h4>
            </div>
            {/* <hr /> */}
            <br />
            <div className="row justify-content-center text-center h-100">
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
                            <b>{words.senderOrg} :</b>
                        </label>
                        <div className="col-sm-5">

                            <p>{senderOrg}</p>
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
                            <b>{words.IncomingRecordDate} :</b>
                        </label>
                        <div className="col-sm-5">

                            <p>{IncomingRecordDate}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.deliveryPersonnel} :</b>
                        </label>
                        <div className="col-sm-5">

                            <p>{DeliveryPerson}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label">
                            <b>{words.subject} :</b>
                        </label>
                        <div className="col-sm-5">


                            <p>{Subject}</p>
                        </div>
                    </div>
                    <br />

                    <br />
                    {/* <hr /> */}
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-12">
                                <button
                                    className="btn btn-secondary btn-sm text-center"
                                    onClick={(event) => hideViewRecordModal(event)}
                                >
                                    {words.cancel}
                                </button>
                                <button
                                    className=" btn bg-info btn-sm ml-4" style={{ "color": "white" }}
                                    type="button"
                                    onClick={(event) => {
                                        hideViewRecordModal(event)
                                        showRemarkModal(event)
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

export default ViewIncomingRecord;