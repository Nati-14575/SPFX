import * as React from "react";
import { getRemark, submitRemark, getLoggedUser } from "./actions"
import { toast } from "react-toastify";
const Remark = ({ words, id, context, hideViewRemarkModal }) => {
    const [loggedUser, setLoggedUser] = React.useState(null)
    const [remarkDetail, setRemarkDetail] = React.useState(null)
    const [remarks, setRemarks] = React.useState(null)

    const onRemarkSubmit = (event) => {
        event.preventDefault()
        submitRemark(context, loggedUser, remarkDetail, id).then((response) => {
            toast("Updated Successfully");
            getRemark(context, id).then((json) => {
                setRemarks(json.value)
            })
            setRemarkDetail(null)
            hideViewRemarkModal()
        })
    }
    React.useEffect(() => {
        getRemark(context, id).then((json) => {
            setRemarks(json.value)
        })
        getLoggedUser(context).then((json) => {
            setLoggedUser(json)
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
                                        className=" btn btn-primary btn-sm float-left"
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
                {/* <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ backgroundColor: "grey", color: "white" }}>
                    <h4><b>{words.listRemarks}</b></h4>
                </div> */}
                <br />
                <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 content-height">
                    <hr style={{ borderStyle: "solid", borderColor: "grey" }} />
                    <div className="mb-2 text-center col-offset-2">
                        <h4><b>{words.listRemarks}</b></h4>

                        {remarks && remarks.map(remark => (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <>
                                        <h5 className="card-title text-center">{remark?.userName}</h5>
                                        <p className="card-text text-center">{remark.Comments}</p>
                                    </>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>




            </div>

            <div className="form-group">
                <div className="row mt-2">
                    <div className="col-md-12">
                        <button
                            className="btn btn-default btn-sm float-left"
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