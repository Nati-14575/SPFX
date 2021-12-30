import * as React from "react";
import ViewRecord from "./viewRecord";
import EditRecord from "./editRecord";
import Remark from "./remark";
import Modal from "./modal";
import ModalEditRecord from "./modal-edit-record";
export const columns = [
  {
    Header: 'ID',
    columnId: 1,
    accessor: 'Id',
  },
  {
    Header: 'Record Name',
    columnId: 2,
    accessor: 'Title',
  },
  {
    Header: 'Recipient Organization',
    columnId: 3,
    accessor: 'RecipientOrganizationName',
  },
  {
    Header: 'Reference Number',
    columnId: 4,
    accessor: 'ReferenceNumber',
  },

  {
    Header: 'Date Of Dispatch',
    columnId: 5,
    accessor: 'DateofDispatch',
  },
  {
    Header: 'Delivery Personnel',
    columnId: 6,
    accessor: 'DeliveryPersonnelName',
  },
  {
    Header: 'Subject',
    columnId: 7,
    accessor: 'Subject',
  },
  {
    Header: () => {
      return null;
    },
    accessor: "modal",
    columnId: 8,
    Cell: (props) => {
      const [editModal, setEditModal] = React.useState(false)
      const [viewRecord, setViewRecord] = React.useState(false)
      const [remarkModal, setRemarkModal] = React.useState(false)
      const data = props.row.original;
      return (
        <>
          <div>
            <td>
              <button type="button" className="btn btn-primary btn-margin" ><i className="fa fa-eye"
                onClick={() => setViewRecord(true)}></i></button>
              <button
                type="button"
                className="btn btn-success btn-margin"
                onClick={() => setEditModal(true)}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button type="button" className="btn btn-primary mr-2 btn-margin" onClick={() => setRemarkModal(true)}><i className="fa fa-plus"></i></button>
            </td>
          </div>
          <Modal show={editModal} handleClose={() => setEditModal(false)} additionalStyles={{}}>
            <EditRecord words={props.words} context={props.context} hideRecordModal={() => setEditModal(false)} recordDetails={data} />
          </Modal>
          <ModalEditRecord
            show={viewRecord}
            handleClose={() => setViewRecord(false)}
          >
            <ViewRecord words={props.words} hideViewRecordModal={() => setViewRecord(false)} recordDetails={data} />
          </ModalEditRecord>
          <ModalEditRecord
            show={remarkModal}
            handleClose={() => setRemarkModal(false)}
          >
            <Remark words={props.words} id={data.Id} context={props.context} hideViewRemarkModal={() => setRemarkModal(false)} />
          </ModalEditRecord>
        </>
      )
    }
  },
]