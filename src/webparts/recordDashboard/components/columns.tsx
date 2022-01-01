import * as React from "react";
import ViewRecord from "./viewRecord";
import EditRecord from "./editRecord";
import Remark from "./remark";
import Modal from "./modal";
import ModalEditRecord from "./modal-edit-record";
export const columns = [
  {
    Header: (({ words, className, hideColumns }) => {
      return <div >{words.id}</div>
    }),
    columnId: 1,
    accessor: 'Id',
    Cell: ((props) => {
      return <div >{props.row.original.Id}</div>
    })
  },
  {
    Header: (({ words, hideColumns }) => {
      return words.recordName
    }),
    columnId: 2,
    accessor: 'Title',
  },
  {
    Header: (({ words }) => {
      return words.recipientOrg
    }),
    columnId: 3,
    accessor: 'RecipientOrganizationName',
  },
  {
    Header: (({ words }) => {
      return words.referenceNumber
    }),
    columnId: 4,
    accessor: 'ReferenceNumber',
  },

  {
    Header: (({ words }) => {
      return words.dateOfDispatch
    }),
    columnId: 5,
    accessor: 'DateofDispatch',
  },
  {
    Header: (({ words }) => {
      return words.deliveryPersonnel
    }),
    columnId: 6,
    accessor: 'DeliveryPersonnelName',
  },
  {
    Header: (({ words }) => {
      return words.subject
    }),
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
            <EditRecord words={props.words} context={props.context} hideRecordModal={() => setEditModal(false)} recordDetails={data} setOutgoingRecords={props.setRecords} />
          </Modal>
          <ModalEditRecord
            show={viewRecord}
            handleClose={() => setViewRecord(false)}
          >
            <ViewRecord words={props.words} hideViewRecordModal={() => setViewRecord(false)} recordDetails={data} showRemarkModal={() => setRemarkModal} />
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