import * as React from "react";
const ViewRecord = ({ words, hideViewRecordModal, showRemarkModal, recordDetails }) => {
    const [fileName] = React.useState(recordDetails.Title)
    const [recipientOrg] = React.useState(recordDetails.RecipientOrganizationName)
    const [ReferenceNumber] = React.useState(recordDetails.ReferenceNumber)
    const [DateofDispatch] = React.useState(recordDetails.DateofDispatch)
    const [Subject] = React.useState(recordDetails.Subject)

    return (
        <div className="container-fluid pt-5 pl-4 pr-4">
            <div className="row justify-content-center  p-3 bg-info">
                <h4 style={{ "color": "white" }}>
                    {words.viewRecord}
                </h4>
            </div>
            <br />
            <div className="row justify-content-center  h-100" >
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">

                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label text-left">
                            {words.fileName} :
                        </label>
                        <div className="col-sm-6 float-left text-left">
                            <p>{fileName}</p>
                        </div>
                    </div>

                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label text-left">
                            {words.recipientOrg} :
                        </label>
                        <div className="col-sm-6 text-left">
                            <p>{recipientOrg}</p>
                        </div>
                    </div>

                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label text-left">
                            {words.referenceNumber} :
                        </label>
                        <div className="col-sm-6 text-left">
                            <p>{ReferenceNumber}</p>
                        </div>
                    </div>

                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label text-left">
                            {words.dateOfDispatch} :
                        </label>
                        <div className="col-sm-6 text-left">
                            <p>{DateofDispatch}</p>
                        </div>
                    </div>

                    <div className="form-group row p-2" style={{ "boxShadow": "0 4px 2px -2px grey" }}>
                        <label className="col-sm-4 col-form-label text-left">
                            {words.subject} :
                        </label>
                        <div className="col-sm-6 text-left">
                            <p>{Subject}</p>
                        </div>
                    </div>

                    <div className="form-group p-4">
                        <div className="row">
                            <div className="col-md-12  d-flex justify-content-between">

                                <button
                                    className=" btn btn-primary btn-sm "
                                    type="button"
                                    onClick={() => {
                                        hideViewRecordModal(),
                                            showRemarkModal()
                                    }}
                                >
                                    {words.remark}
                                </button>
                                <button
                                    className="btn btn-danger btn-sm  "
                                    type="button"
                                    onClick={hideViewRecordModal}
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

export default ViewRecord;