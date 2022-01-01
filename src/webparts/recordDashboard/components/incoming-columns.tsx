import * as React from "react";
import Remark from "./remark";
import Modal from "./modal";
import ModalEditRecord from "./modal-edit-record";
import EditIncomingRecord from "./editIncomingRecord";
import ViewIncomingRecord from "./viewIncomingRecord";
export const incomingColumns = [
  {
    Header: (({ words }) => {
      return <div>{words.id}</div>
    }),
    columnId: 1,
    accessor: 'Id',
  },
  {
    Header: (({ words, hideColumns }) => {
      return <div onClick={() => hideColumns("Title")}>{words.recordName}</div>
    }),
    columnId: 2,
    accessor: 'Title',
  },
  {
    Header: (({ words, hideColumns }) => {
      return <div onClick={() => hideColumns("SendingOrganizationName")}>{words.senderOrg}</div>
    }),
    columnId: 3,
    accessor: 'SendingOrganizationName',
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
      return words.IncomingRecordDate
    }),
    columnId: 5,
    accessor: 'IncomingRecordDate',
  },
  {
    Header: (({ words }) => {
      return words.subject
    }),
    columnId: 6,
    accessor: 'Subject',
  },
  {
    Header: () => {
      return null;
    },
    accessor: "modal",
    columnId: 7,
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
            <EditIncomingRecord words={props.words} context={props.context} hideRecordModal={() => setEditModal(false)} recordDetails={data} setIncommingRecords={props.setRecords} />
          </Modal>
          <ModalEditRecord
            show={viewRecord}
            handleClose={() => setViewRecord(false)}
          >
            <ViewIncomingRecord words={props.words} hideViewRecordModal={() => setViewRecord(false)} recordDetails={data} showRemarkModal={() => setRemarkModal(true)} />
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