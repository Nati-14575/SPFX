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
      return <div >{words.recordName}</div>
    }),
    columnId: 2,
    accessor: 'Title',
  },
  {
    Header: (({ words, hideColumns }) => {
      return <div >{words.senderOrg}</div>
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
      const data = props.row.original
      return (
        <>
          <div>
            <td>
              <button type="button" className="btn btn-primary btn-margin" onClick={() => setViewRecord(true)}><i className="fa fa-eye"
              ></i></button>
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
            <EditIncomingRecord words={props.words} context={props.context} hideRecordModal={() => setEditModal(false)} recordDetails={data} setIncommingRecords={props.setRecords} files={props.files} index={props.row.index} updateRecordInfo={props.updateRecordInfo} setNum={props.setNum} num={props.num} />
          </Modal>
          <ModalEditRecord
            show={viewRecord}
            handleClose={() => setViewRecord(false)}
          >
            <ViewIncomingRecord words={props.words} hideViewRecordModal={(event) => {
              event.preventDefault()
              setViewRecord(false)
            }} recordDetails={data} showRemarkModal={(event) => {
              event.preventDefault()
              setRemarkModal(true)
            }} />
          </ModalEditRecord>
          <ModalEditRecord
            show={remarkModal}
            handleClose={() => setRemarkModal(false)}
          >
            {remarkModal && <Remark words={props.words} id={data.Id} context={props.context} hideViewRemarkModal={() => setRemarkModal(false)} />}
          </ModalEditRecord>
        </>
      )
    }
  },
]