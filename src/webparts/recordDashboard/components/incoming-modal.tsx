import * as React from "react";
import "./modal.css";
import ModalEditRecord from "./modal-edit-record";



const Incoming = ({ state, showModal, viewRecord, viewRemark, editRecord, hideRecordModal, showViewRemarkModal, hideViewRecordModal,hideViewRemarkModal,onInputChange,onSubmit, onRemarkSubmit, setState }) => {


    return (
       <>
        {/* Edit Record modal */}
        <ModalEditRecord
          show={state.showRecord}
          handleClose={hideRecordModal}
        >
          <div className="container-fluid ">
            <div className="row justify-content-center text-center ">
              <h4>
                <b>{state.words.editRecord}</b>
              </h4>
            </div>
            <hr />
            <div className="row justify-content-center text-center h-100">
              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <form onSubmit={(event) => onSubmit(event)}>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.fileName}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={state.fileName}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.recipientOrg}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={state.recipient}
                        onChange={(event) => onInputChange(event, "recipient")}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.referenceNumber}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.reference_num}
                        onChange={(event) =>
                          onInputChange(event, "reference_num")
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.dateOfDispatch}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.date_of_disp}
                        onChange={(event) =>
                          onInputChange(event, "date_of_disp")
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.deliveryPersonnel}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.delivery_personnel}
                        onChange={(event) =>
                          onInputChange(event, "delivery_personnel")
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.subject}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.subject}
                        onChange={(event) => onInputChange(event, "subject")}
                      />
                    </div>
                  </div>
                  <br />

                  <br />
                  <hr />
                  <div className="form-group">
                    {/* <div className="container"> */}
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-secondary btn-sm float-left"
                          onClick={hideRecordModal}
                        >
                          {state.words.cancel}
                        </button>
                        <button
                          className=" btn btn-primary btn-sm float-right"
                          type="submit"
                        >
                          {state.words.submit}
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalEditRecord>

        {/* View Record Modal */}
        <ModalEditRecord
          show={state.showViewRecord}
          handleClose={hideViewRecordModal}
        >
          <div className="container-fluid ">
            <div className="row justify-content-center text-center ">
              <h4>
                <b>{state.words.viewRecord}</b>
              </h4>
            </div>
            <br />
            <hr />
            <div className="row justify-content-center text-center h-100">
              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <form onSubmit={(event) => onSubmit(event)}>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.fileName}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={state.fileName}
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.recipientOrg}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={state.recipient}
                        onChange={(event) => onInputChange(event, "recipient")}
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.referenceNumber}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.reference_num}
                        onChange={(event) =>
                          onInputChange(event, "reference_num")
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.dateOfDispatch}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.date_of_disp}
                        onChange={(event) =>
                          onInputChange(event, "date_of_disp")
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.deliveryPersonnel}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.delivery_personnel}
                        onChange={(event) =>
                          onInputChange(event, "delivery_personnel")
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.subject}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={state.subject}
                        onChange={(event) => onInputChange(event, "subject")}
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="form-group">
                    {/* <div className="container"> */}
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-secondary btn-sm float-left"
                          onClick={hideViewRecordModal}
                        >
                          {state.words.cancel}
                        </button>
                        <button
                          className=" btn btn-primary btn-sm float-right"
                          type="button"
                          onClick={showViewRemarkModal}
                        >
                          {state.words.remark}
                        </button>


                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </form>
              </div>


            </div>
          </div>
        </ModalEditRecord>

        {/* Remark Modal */}
        <ModalEditRecord
          show={state.showViewRemark}
          handleClose={hideViewRemarkModal}
        >

          <div className="container-fluid ">
            <div className="row justify-content-center text-center" >
              <h4>
                <b>{state.words.addRemark}</b>
              </h4>
            </div>
            <hr />
            <div className="row justify-content-center text-center h-100">
              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <form onSubmit={(event) => onRemarkSubmit(event)}>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.title}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        value={state.remarkTitle}
                        onChange={(e) => setState({
                          remarkTitle: e.target.value
                        })}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {state.words.detail}
                    </label>
                    <div className="col-sm-7">
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={state.remarkDetail} onChange={(e) => {
                        setState({
                          remarkDetail: e.target.value
                        })
                      }}></textarea>
                    </div>
                  </div>
                  <br />
                  <div className="form-group">
                    {/* <div className="container"> */}
                    <div className="row">
                      <div className="col-md-12">
                        {/* <button
                          className="btn btn-secondary btn-sm float-left"
                          onClick={hideRecordModal}
                        >
                          {state.words.cancel}
                        </button> */}
                        <button
                          className=" btn btn-primary btn-sm float-right"
                          type="submit"
                        >
                          {state.words.submit}
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>

                </form>
              </div>
              <br />
              {/* <hr /> */}
              {/* <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ backgroundColor: "grey", color: "white" }}>
                <h4><b>{state.words.listRemarks}</b></h4>
              </div> */}

              <br />

              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 content-height">
                <hr style={{ borderStyle: "solid", borderColor: "grey" }} />
                {/* <div className="col-md-2">
                  <img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Image Description" />
                </div> */}
                <div className="col-md-9">

                  <div className="card">
                    {state.remarks && state.remarks.map(remark => (
                      <div className="card-body">
                        <>
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">{remark.Comments}</p>
                        </>

                      </div>
                    ))}

                  </div>
                </div>

              </div>




            </div>

            <div className="form-group">
              {/* <div className="container"> */}
              <div className="row">
                <div className="col-md-12">
                  <button
                    className="btn btn-secondary btn-sm float-left"
                    onClick={hideViewRemarkModal}
                  >
                    {state.words.cancel}
                  </button>
                  {/* <button
                          className=" btn btn-primary btn-sm float-right"
                          type="submit"
                        >
                          {state.words.submit}
                        </button> */}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </ModalEditRecord>
       </>
    );
};

export default Incoming;
