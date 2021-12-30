import * as React from "react";
import "./modal.css";

const Outgoing = ({ state, showModal, viewRecord, viewRemark, editRecord }) => {


    return (
        <div className="">
            <div className="row">
                <div className="col-12">
                    <button
                        className="btn btn-primary float-right btnStyle"
                        onClick={(event) => showModal(event, "Outgoing")}
                    >
                        {state.words.addRecord}
                    </button>
                    <br />
                </div>
            </div>
            <br />
            <br />
            <div className="row table-overflow">
                <div className="col-12">
                    <table className="table table-bordered">
                        <thead className="bg-info text-light">
                            <tr>
                                <td scope="col">{state.words.id}</td>
                                <td>{state.words.recordName}</td>
                                <td scope="col">{state.words.recipientOrg}</td>
                                <td scope="col">{state.words.referenceNumber}</td>
                                <td scope="col">{state.words.dateOfDispatch}</td>
                                <td scope="col">
                                    {state.words.deliveryPersonnel}
                                </td>
                                <td scope="col">{state.words.subject}</td>
                                <td scope="col">{state.words.actions}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {state.outgoingRecords &&
                                state?.outgoingRecords.map((listItem) => {
                                    return (
                                        <tr>
                                            <th scope="row">{listItem.Id}</th>
                                            <td>{listItem.Title}</td>
                                            <td>{listItem?.RecipientOrganizationName}</td>
                                            <td>{listItem?.ReferenceNumber}</td>
                                            <td>{listItem?.DateofDispatch}</td>
                                            <td>{listItem?.DeliveryPersonnelName}</td>
                                            <td>{listItem?.Subject}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-margin"
                                                >
                                                    <i className="fa fa-eye"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-success btn-margin"
                                                    onClick={(e) => editRecord(e, listItem)}
                                                >
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button type="button" className="btn btn-primary mr-2 btn-margin" onClick={(e) => viewRemark(e, listItem)}><i className="fa fa-plus"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <Modal show={state.show} handleClose={hideModal}>
    <p>Modal</p>
  </Modal> */}
        </div>

    );
};

export default Outgoing;
