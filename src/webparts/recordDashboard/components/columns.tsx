import * as React from "react";
import ViewRecord from "./viewRecord";
import EditRecord from "./editRecord";
import Remark from "./remark";
import Modal from "./modal";
import ModalEditRecord from "./modal-edit-record";
export const columns = [
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

            <button type="button" className="btn btn-primary btn-margin" onClick={() => setViewRecord(true)} ><i className="fa fa-eye"
            ></i></button>
            <button
              type="button"
              className="btn btn-success btn-margin"
              onClick={() => setEditModal(true)}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button type="button" className="btn btn-primary btn-margin" onClick={() => setRemarkModal(true)}><label>{props.words.addRemark}</label></button>

          </div>

          <Modal handleClose={() => setEditModal(false)} show={editModal} additionalStyles={{}}>
            {editModal && <EditRecord words={props.words} context={props.context} hideRecordModal={() => setEditModal(false)} recordDetails={data} key={props.data} setOutgoingRecords={props.updateRecordInfo} />}
          </Modal>
          <Modal
            additionalStyles={{}}
            show={viewRecord}
            handleClose={() => setViewRecord(false)}
          >
            {viewRecord && <ViewRecord words={props.words} hideViewRecordModal={() => setViewRecord(false)} recordDetails={data} showRemarkModal={() => setRemarkModal(true)} />}
          </Modal>
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