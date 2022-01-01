import * as React from "react";
import Table from "./table";

const Incomming = ({ words, context, showModal, columns, data, setRecords }) => {
    return (
        <div className="">
            <div className="row">
                <div className="col-12">
                    <button
                        className="btn btn-primary float-right btnStyle"
                        onClick={() => showModal("Incomming")}
                    >
                        {words.addRecord}
                    </button>
                    <br />
                </div>
            </div>
            <br />
            <br />
            <div className="row table-overflow">
                <div className="col-12">
                    <Table data={data} context={context} columns={columns} setRecords={setRecords} words={words} />
                </div>
            </div>
        </div>
    )
}

export default Incomming;