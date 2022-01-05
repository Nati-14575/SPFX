import * as React from "react";
const ViewRecord = ({ words, hideViewRecordModal, showRemarkModal, recordDetails }) => {
    const [fileName, setFileName] = React.useState(recordDetails.Title)
    const [recipientOrg, setRecipientOrg] = React.useState(recordDetails.RecipientOrganizationName)
    const [ReferenceNumber, setReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [DateofDispatch, setDateofDispatch] = React.useState(recordDetails.DateofDispatch)
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

                    <div className="form-group row" style={{"boxShadow": "4px 4px 4px  grey"}}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.fileName} :</b>
                        </label>
                        <div className="col-sm-5 float-left">
                            {/* <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={fileName}
                            /> */}

                            <p>{fileName}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row" style={{"boxShadow": "4px 4px 4px  grey"}}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.recipientOrg} :</b>
                        </label>
                        <div className="col-sm-5">
                            {/* <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                value={recipientOrg}
                            /> */}

                            <p>{recipientOrg}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row" style={{"boxShadow": "4px 4px 4px  grey"}}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.referenceNumber} :</b>
                        </label>
                        <div className="col-sm-5">
                            {/* <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={ReferenceNumber}
                            /> */}
                             <p>{ReferenceNumber}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row" style={{"boxShadow": "4px 4px 4px  grey"}}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.dateOfDispatch} :</b>
                        </label>
                        <div className="col-sm-5">
                            {/* <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={DateofDispatch}
                            /> */}

                            <p>{DateofDispatch}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row" style={{"boxShadow": "4px 4px 4px  grey"}}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.deliveryPersonnel} :</b>
                        </label>
                        <div className="col-sm-7">
                            {/* <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={DeliveryPerson}
                            /> */}

                            <p>{DeliveryPerson}</p>
                        </div>
                    </div>
                    <br />
                    <div className="form-group row" style={{"boxShadow": "4px 4px 4px  grey"}}>
                        <label className="col-sm-4 col-form-label">
                            <b> {words.subject} :</b>
                        </label>
                        <div className="col-sm-7">
                            {/* <input
                                type="text"
                                className="form-control"
                                id="exampleInputPassword1"
                                value={Subject}
                            /> */}
                            <p>{Subject}</p>
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
                                {/* <button
                                    className=" btn btn-primary btn-sm float-right"
                                    onClick={() => {
                                        hideViewRecordModal(),
                                            showRemarkModal()
                                    }}
                                >
                                    {words.remark}
                                </button> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ViewRecord;