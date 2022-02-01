import * as React from "react";
import { getFilteredItems, loggedUserInfo, postItem } from "./actions"
import { toast } from "react-toastify";
import Loader from "./Loader";
import Modal from "./modal";
import SuccessToast from "./success-toast";

const Remark = ({ words, id, context, hideViewRemarkModal }) => {
    const [loggedUser, setLoggedUser] = React.useState(null)
    const [userEmail, setUserEmail] = React.useState(null)
    const [remarkDetail, setRemarkDetail] = React.useState(null)
    const [remarks, setRemarks] = React.useState(null)
    const [showLoader, setLoader] = React.useState(false);
    const [showToasterLoader, setToasterLoader] = React.useState(false);
    const [modalContent, setModalContent] = React.useState(null);

    
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
            setRemarkDetail(null)
            setLoader(false);
            // toast(words.remarkAddSuccess);

            // show informative modal
            setToasterLoader(true);
            setModalContent(<> <SuccessToast word={words} setToastLoader={setToasterLoader} message={words.remarkAddSucces} messageHeader="Successful"></SuccessToast></>);

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
                                                            <div className="d-flex flex-row user-info"><img className="rounded-circle" src={`${url}/_layouts/15/userphoto.aspx?size=L&username=${remark.userEmail}`} width="40" />
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

            {/* infomative modal */}
            <Modal show={showToasterLoader} handleClose={setToasterLoader} additionalStyles={null}>
                {modalContent}
            </Modal>

        </>
    )
}

export default Remark