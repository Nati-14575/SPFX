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
                showLoader == false ? <div className="container-fluid ">
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
                            </div>
                        </div>


                        {remarks && remarks.map(remark => (
                            // <div className="container justify-content-center mt-5 border-left border-right">
                            //     <div className="d-flex justify-content-center py-2">
                            //         <div className="second py-2 px-2"> <span className="text1">{remark?.Comments}</span>
                            //             <div className="d-flex justify-content-between py-1 pt-2">
                            //                 <div><img src="https://i.imgur.com/AgAC1Is.jpg" width="18" /><span className="text2">{remark?.userName}</span></div>
                            //                 <div>About 30 minutes ago</div>
                            //             </div>
                            //         </div>
                            //     </div>

                            //     {/* <div className="card-body "> */}
                            // </div>
                            <div className="commented-section mt-2">
                                <div className="d-flex flex-row align-items-center commented-user">
                                    <h5 className="mr-2">{remark?.userName}</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">About thirty minutes ago</span>
                                </div>
                                <div className="comment-text-sm"><span>{remark?.Comments}</span></div>
                            </div>
                        ))}

                        {/* </div>
                        </div> */}
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
                </div> : <Loader />
            }

        </>
    )
}

export default Remark