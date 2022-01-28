import * as React from "react";
const ViewIncomingRecord = ({ words, hideViewRecordModal, showRemarkModal, recordDetails }) => {
    const [fileName] = React.useState(recordDetails.Title)
    const [senderOrg] = React.useState(recordDetails.SendingOrganizationName)
    const [ReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [IncomingRecordDate] = React.useState(recordDetails.IncomingRecordDate)
    const [DeliveryPerson] = React.useState(recordDetails.DeliveryPersonnelName)
    const [Subject] = React.useState(recordDetails.Subject)

    return (
        <div className="container-fluid pt-3 pl-4 pr-4">
            <div className="row justify-content-center text-center p-3 bg-info" style={{ "color": "white !important" }}>
                <h4 style={{ "color": "white" }}>
                    {words.viewRecord}
                </h4>
            </div>
            <br />
            <div className="row justify-content-center text-center h-100">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">

                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-5 col-form-label text-left">
                            {words.fileName} :
                        </label>
                        <div className="col-sm-6 text-left float-left">

                            <p>{fileName}</p>
                        </div>
                    </div>
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-5 col-form-label text-left">
                            {words.senderOrg} :
                        </label>
                        <div className="col-sm-6 d-flex align-items-center text-left">

                            <p>{senderOrg}</p>
                        </div>
                    </div>
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-5 col-form-label text-left">
                            {words.referenceNumber} :
                        </label>
                        <div className="col-sm-6 text-left">

                            <p>{ReferenceNumber}</p>
                        </div>
                    </div>
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-5 col-form-label text-left">
                            {words.IncomingRecordDate} :
                        </label>
                        <div className="col-sm-6 text-left">

                            <p>{IncomingRecordDate}</p>
                        </div>
                    </div>
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-5 col-form-label text-left">
                            {words.receievingPersonnel} :
                        </label>
                        <div className="col-sm-6 text-left">

                            <p>{DeliveryPerson}</p>
                        </div>
                    </div>
                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-5 col-form-label text-left">
                            {words.subject} :
                        </label>
                        <div className="col-sm-6 text-left">
                            <p>{Subject}</p>
                        </div>
                    </div>
                    <div className="form-group pt-3 pb-2">
                        <div className="row">
                            <div className="col-md-12 text-center d-flex justify-content-between">

                                <button
                                    className=" btn bg-primary btn-sm " style={{ "color": "white" }}
                                    type="button"
                                    onClick={(event) => {
                                        hideViewRecordModal(event)
                                        showRemarkModal(event)
                                    }}
                                >
                                    {words.remark}
                                </button>
                                <button
                                    className="btn btn-danger btn-sm text-center "
                                    onClick={(event) => hideViewRecordModal(event)}
                                >
                                    {words.cancel}
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