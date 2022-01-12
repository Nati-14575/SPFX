import * as React from "react";
import { getRemark, submitRemark, getLoggedUser } from "./actions"
import { toast } from "react-toastify";
import Loader from "./Loader";

const Remark = ({ words, id, context, hideViewRemarkModal }) => {
    const [loggedUser, setLoggedUser] = React.useState(null)
    const [remarkDetail, setRemarkDetail] = React.useState(null)
    const [remarks, setRemarks] = React.useState(null)
    const [showLoader, setLoader] = React.useState(false);

    const onRemarkSubmit = (event) => {
        setLoader(true);
        event.preventDefault()
        submitRemark(context, loggedUser, remarkDetail, id).then((response) => {
            setRemarkDetail(null)
            setLoader(false);
            toast("Remark Added Successfully");
            getRemark(context, id).then((json) => {
                setRemarks(json.value)
            })
            hideViewRemarkModal()
        },
            (err) => {
                setLoader(false);
                toast.error("Something went wrong");

            }
        )
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
        <>

            {
                showLoader == false ? <div className="container-fluid p-5">
                    <div className="row justify-content-center text-center p-3 bg-info" style={{ "color": "white" }}>
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
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.detail}
                                    </label>
                                    <div className="col-sm-7">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={remarkDetail} onChange={(e) => setRemarkDetail(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <br />
                                <div className="form-group">
                                    <div className="row text-center">
                                        <div className="col-md-12">
                                            <button
                                                className=" btn bg-info btn-sm " style={{ "color": "white" }}
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
                            </div>

                        </div>

                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 ">

                            {remarks && remarks.map(remark => (
                                <>
                                    <div className=" card  offset-md-1 col-md-8 col-sm-12 col-lg-8 offset-lg-2">
                                        <div className="card-body text-center">
                                            <div className="row">
                                                <div className="col-md-3 col-sm-12">
                                                    <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" alt="user" width="50" className="rounded-circle" />
                                                    <br />
                                                    <p>{remark?.userName}</p>
                                                </div>
                                                <div className="col-md-8 col-sm-12" style={{ "backgroundColor": "lightgrey" }}>

                                                    <p className="float-left">{remark?.Comments}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </>

                            ))}

                        </div>

                    </div>

                    <div className="form-group">
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <button
                                    className="btn btn-default btn-sm float-left"
                                    onClick={hideViewRemarkModal}
                                    type="button"
                                >
                                    {words.cancel}
                                </button>
                            </div>
                        </div>
                    </div>
                </div> : <Loader />
            }

        </>
    )
}

export default Remark