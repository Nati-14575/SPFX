import * as React from "react";
const ViewIncomingRecord = ({ words, hideViewRecordModal, showRemarkModal, recordDetails }) => {
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [senderOrg, setSenderOrg] = React.useState(recordDetails.SendingOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [IncomingRecordDate, setIncomingRecordDate] = React.useState(recordDetails.IncomingRecordDate)
    const [DeliveryPerson, setDeliveryPerson] = React.useState(recordDetails.DeliveryPersonnelName)
    const [Subject, setSubject] = React.useState(recordDetails.Subject)

    return (
        <div className="container-fluid ">
            <div className="row justify-content-center text-center ">
                <h4>
                    <b>{words.viewRecord}</b>
                </h4>
            </div>
            <hr />
            <div className="row justify-content-center text-center h-100">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">

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
                            {words.senderOrg}
                        </label>
                        <div className="col-sm-7">
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={senderOrg}
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
                                    onClick={hideViewRecordModal}
                                >
                                    {words.cancel}
                                </button>
                                <button
                                    className=" btn btn-primary btn-sm float-right"
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

export default ViewIncomingRecord;