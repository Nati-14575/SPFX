import * as React from "react";
import Remark from "./remark";
import Modal from "./modal";
import ModalEditRecord from "./modal-edit-record";
import EditIncomingRecord from "./editIncomingRecord";
import ViewIncomingRecord from "./viewIncomingRecord";
export const incomingColumns = [
  {
    Header: (({ words, hideColumns }) => {
      return <div >{words.recordName}</div>
    }),
    columnId: 2,
    accessor: 'Title',
    Cell: (props) => {
      const data = props.row.original
      return <div style={{ display: "flex", justifyContent: "space-between" }}>
        {data.Title}
        <a href={data.downloadUrl} className="btn btn-success btn-margin"><i className="fa fa-download"
        ></i></a>
      </div>
    }
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
      return words.receievingPersonnel
    }),
    columnId: 5,
    accessor: 'DeliveryPersonnelName',
  },
  {
    Header: (({ words }) => {
      return words.IncomingRecordDate
    }),
    columnId: 6,
    accessor: 'IncomingRecordDate',
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
      const data = props.row.original
      return (
        <>
          <div>
            <button type="button" className="btn btn-primary btn-margin" onClick={() => setViewRecord(true)}><i className="fa fa-eye"
            ></i></button>
            <button
              type="button"
              className="btn btn-success btn-margin"
              onClick={() => setEditModal(true)}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button type="button" className="btn btn-primary  btn-margin" onClick={() => setRemarkModal(true)}><label>{props.words.addRemark}</label></button>
          </div>

          <Modal show={editModal} handleClose={() => setEditModal(false)} additionalStyles={{}}>
            {editModal && <EditIncomingRecord words={props.words} context={props.context} hideRecordModal={() => setEditModal(false)} recordDetails={data} setIncommingRecords={props.setRecords} files={props.files} index={props.row.index} updateRecordInfo={props.updateRecordInfo} setNum={props.setNum} num={props.num} />}
          </Modal>
          <Modal
            show={viewRecord}
            handleClose={() => setViewRecord(false)}
            additionalStyles={{}}
          >
            {viewRecord && <ViewIncomingRecord words={props.words} hideViewRecordModal={(event) => {
              event.preventDefault()
              setViewRecord(false)
            }} recordDetails={data} showRemarkModal={(event) => {
              event.preventDefault()
              setRemarkModal(true)
            }} />}
          </Modal>
          <Modal
            show={remarkModal}
            handleClose={() => setRemarkModal(false)}
            additionalStyles={{}}
          >
            {remarkModal && <Remark words={props.words} id={data.Id} context={props.context} hideViewRemarkModal={() => setRemarkModal(false)} />}
          </Modal>
        </>
      )
    }
  },
]