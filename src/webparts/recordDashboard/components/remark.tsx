import * as React from "react";
import { getFilteredItems, loggedUserInfo, postItem } from "./actions"
import { toast } from "react-toastify";
import Loader from "./Loader";

const Remark = ({ words, id, context, hideViewRemarkModal }) => {
    const [loggedUser, setLoggedUser] = React.useState(null)
    const [userEmail, setUserEmail] = React.useState(null)
    const [remarkDetail, setRemarkDetail] = React.useState(null)
    const [remarks, setRemarks] = React.useState(null)
    const [showLoader, setLoader] = React.useState(false);
    const url = context.pageContext.web.absoluteUrl
    const userInfo = loggedUserInfo(context)
    const onRemarkSubmit = (event) => {
        setLoader(true);
        event.preventDefault()
        const data = {
            userName: loggedUser,
            Comments: remarkDetail,
            userEmail: userEmail,
            RecordId: id
        };

        postItem(context, "RecordRemarks", data).then((response) => {
            console.log(response)
            setRemarkDetail(null)
            setLoader(false);
            toast(words.remarkAddSuccess);
            getFilteredItems(context, "RecordRemarks", `?$select=*,Comments,userName&$filter=RecordId eq ${id}`).then((json) => {
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
        getFilteredItems(context, "RecordRemarks", `?$select=*,Comments,userName&$filter=RecordId eq ${id}`).then((result) => {
            setRemarks(result)
        })
        setLoggedUser(userInfo.displayName)
        setUserEmail(userInfo.email)
    }, [])
    return (
        <>

            {
                showLoader == false ?
                    <>
                        {/* <div className="container-fluid pt-5 pl-4 pr-4"> */}
                        {/* <div className="row justify-content-center text-center p-3 bg-info" style={{ "color": "white" }}>
                        <h4 style={{ "color": "white" }}>
                            {words.addRemark}
                        </h4>
                    </div>
                    <hr />
                    <div className="row justify-content-center text-center h-100">
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <form onSubmit={(event) => onRemarkSubmit(event)}>
                                <div className="form-group row">
                                    <label className="col-sm-4 col-form-label text-left">
                                        {words.detail}
                                    </label>
                                    <div className="col-sm-7">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={remarkDetail} onChange={(e) => setRemarkDetail(e.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="form-group py-3 ">
                                    <div className="row text-center">
                                        <div className="col-md-4 ml-auto">
                                            <button
                                                className=" btn bg-primary btn-sm " style={{ "color": "white" }}
                                                type="submit"
                                            >
                                                {words.submit}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <hr />
                        <br />
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 content-height">
                            <hr style={{ borderStyle: "solid", borderColor: "grey" }} />
                            <div className="row justify-content-center text-center p-3 bg-info" style={{ "color": "white" }}>
                                <h4 style={{ "color": "white" }}>
                                    {words.listRemarks}
                                </h4>
                            </div>
                        </div>
                        <hr style={{ borderStyle: "solid", borderColor: "grey" }} />
                        <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 mt-2"> */}


                        <>
                            <div className="container-fluid">
                                <div className="container mt-4 mb-3">
                                    <div className="py-3 text-center bg-primary text-light rounded-top my-3">
                                        {words.listRemarks}
                                    </div>
                                    <div className="d-flex justify-content-center row">
                                        <div className="col-md-12">
                                            <div className="d-flex flex-column comment-section">
                                                {remarks && remarks.length > 0 ? remarks.map(remark => (
                                                    <>
                                                        <div className="bg-white p-2">
                                                            <div className="d-flex flex-row user-info"><img className="rounded-circle" src={`${url}/_layouts/15/userphoto.aspx?size=L&username=${userEmail}`} width="40" />
                                                                <div className="d-flex flex-column justify-content-start ml-2"><span className="d-block font-weight-bold name">{remark?.userName}</span><span className="date text-black-50"></span></div>
                                                            </div>
                                                            <div className="mt-2">
                                                                <p className="comment-text">{remark?.Comments}</p>
                                                            </div>
                                                        </div>
                                                    </>

                                                )) : <>
                                                    <div className="container text-dark p-3 text-center h2 mb-2">No remarks available</div>
                                                </>}
                                                <div className="bg-light p-2">
                                                    <div className="d-flex flex-row align-items-start"><img className="rounded-circle" src={`${url}/_layouts/15/userphoto.aspx?size=L&username=${userEmail}`} width="40" /><textarea className="form-control ml-1 shadow-none textarea" value={remarkDetail} onChange={(e) => setRemarkDetail(e.target.value)} ></textarea></div>
                                                    <div className="mt-2 text-right"><button className="btn btn-primary btn-sm shadow-none" type="button" onClick={(event) => onRemarkSubmit(event)}> {words.submit}</button><button className="btn btn-outline-primary btn-sm ml-1 shadow-none" onClick={hideViewRemarkModal} type="button">{words.cancel}</button></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                        {/* </div> */}
                        {/* // </div> */}
                        {/* // </div> */}
                    </>
                    : <Loader />
            }

        </>
    )
}

export default Remark