import * as React from "react";
import { getRemark, submitRemark } from "./actions"
import { toast } from "react-toastify";
const Remark = ({ words, id, context, hideViewRemarkModal }) => {
    const [remarkTitle, setRemarkTitle] = React.useState(null)
    const [remarkDetail, setRemarkDetail] = React.useState(null)
    const [remarks, setRemarks] = React.useState(null)

    const onRemarkSubmit = (event) => {
        event.preventDefault()
        submitRemark(context, remarkTitle, remarkDetail, id).then((response) => {
            toast("Updated Successfully");
            setRemarkTitle(null)
            setRemarkDetail(null)
            hideViewRemarkModal()
        })
    }
    React.useEffect(() => {
        getRemark(context, id).then((json) => {
            setRemarks(json.value)
        })
    }, [])
    return (
        <div className="container-fluid ">
            <div className="row justify-content-center text-center" >
                <h4>
                    <b>{words.addRemark}</b>
                </h4>
            </div>
            <hr />
            <div className="row justify-content-center text-center h-100">
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <form onSubmit={(event) => onRemarkSubmit(event)}>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">
                                {words.title}
                            </label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={remarkTitle}
                                    onChange={(e) => setRemarkTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <br />
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label">
                                {words.detail}
                            </label>
                            <div className="col-sm-7">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={remarkDetail} onChange={(e) => setRemarkDetail(e.target.value)}></textarea>
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-12">
                                    <button
                                        className="btn btn-secondary btn-sm float-left"
                                        onClick={hideViewRemarkModal}
                                    >
                                        {words.cancel}
                                    </button>
                                    <button
                                        className=" btn btn-primary btn-sm float-right"
                                        type="submit"
                                    >
                                        {words.submit}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
                <br />
                <hr />
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ backgroundColor: "grey", color: "white" }}>
                    <h4><b>{words.listRemarks}</b></h4>
                </div>
                <br />
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 content-height">
                    <hr style={{ borderStyle: "solid", borderColor: "grey" }} />
                    <div className="col-md-9">

                        <div className="card">
                            {remarks && remarks.map(remark => (
                                <div className="card-body">
                                    <>
                                        <h5 className="card-title">{remark.Title}</h5>
                                        <p className="card-text">{remark.Comments}</p>
                                    </>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>




            </div>

            <div className="form-group">
                <div className="row">
                    <div className="col-md-12">
                        <button
                            className="btn btn-secondary btn-sm float-left"
                            onClick={hideViewRemarkModal}
                        >
                            {words.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Remark