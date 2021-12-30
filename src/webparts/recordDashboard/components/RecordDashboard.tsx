import * as React from "react";
import { IRecordDashboardProps } from "./IRecordDashboardProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./main.css";
import Modal from "./modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { English, AMHARIC } from "./words";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
} from "@microsoft/sp-http";

import "react-tabs/style/react-tabs.css";
import ModalEditRecord from "./modal-edit-record";
import { TextField } from "office-ui-fabric-react";
import Incoming from './incoming';
import Outgoing from './outGoing';

export interface TableItems {
  incommingRecords: any;
  outgoingRecords: any;
  show: boolean;
  showRecord: boolean;
  showViewRecord: boolean;
  showViewRemark: boolean;
  recipient: any;
  delivery_personnel: any;
  date_of_disp: any;
  reference_num: any;
  subject: any;
  id: any;
  inputFile: any;
  fileName: any;
  caller: any;
  words: any;
  htmlData: any;
  remarks: any;
  remarkTitle: any;
  remarkDetail: any;
}

export default class RecordDashboard extends React.Component<
  IRecordDashboardProps,
  TableItems,
  {}
> {
  public constructor(props: IRecordDashboardProps) {
    super(props);
    this.state = {
      words: English,
      incommingRecords: null,
      outgoingRecords: null,
      show: false,
      showRecord: false,
      showViewRecord: false,
      showViewRemark: false,
      recipient: null,
      delivery_personnel: null,
      date_of_disp: null,
      reference_num: null,
      subject: null,
      id: null,
      inputFile: null,
      fileName: null,
      caller: null,
      htmlData: null,
      remarks: null,
      remarkDetail: null,
      remarkTitle: null
    };
    this.getIncommingRecords().then((response) => {
      console.log(response)
      this.setState({
        incommingRecords: response,
      });
    });
    this.getOutgoingRecords().then((response) => {
      this.setState({
        outgoingRecords: response,
      });
    });
  }

  //  for fetching incomming records
  private async getIncommingRecords(): Promise<any> {
    const url: string =
      this.props.context.pageContext.web.absoluteUrl +
      "/_api/web/lists/getbytitle('OutgoingLibrary')/items?$select=*,EncodedAbsUrl&$filter=RecordType eq 'Incomming'";

    return (await this.props.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json) => {
        return json.value;
      })) as Promise<any>;
  }

  // for fetching outgoing records
  private async getOutgoingRecords(): Promise<any> {
    const url: string =
      this.props.context.pageContext.web.absoluteUrl +
      "/_api/web/lists/getbytitle('OutgoingLibrary')/items?$select=*,EncodedAbsUrl&$filter=RecordType eq 'Outgoing'";

    return (await this.props.context.spHttpClient
      .get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json) => {
        return json.value;
      })) as Promise<any>;
  }


  // for showing and hiding upload file modal
  showModal = (event: any, text: any) => {
    this.setState({
      show: true,
      caller: text,
    });
  };

  hideModal = (e) => {
    e.preventDefault();
    this.setState({
      show: false,
    });
  };

  //for showing nd hiding edit record modal
  showRecordModal = () => {
    this.setState({
      showRecord: true,
    });
  };

  hideRecordModal = (e) => {
    e.preventDefault();

    this.setState({
      showRecord: false,
      id: "",
      date_of_disp: "",
      recipient: "",
      reference_num: "",
      delivery_personnel: "",
      subject: "",
      fileName: "",
    });
  };

  // for showing and hiding view record modal
  showViewRecordModal = () => {
    this.setState({
      showViewRecord: true,
    });
  };

  hideViewRecordModal = (e) => {
    e.preventDefault();

    this.setState({
      showViewRecord: false,
      id: "",
      date_of_disp: "",
      recipient: "",
      reference_num: "",
      delivery_personnel: "",
      subject: "",
      fileName: "",
    });
  };

  // for showing and hiding remark modal
  showViewRemarkModal = () => {

    this.setState({
      showViewRemark: true,
      showViewRecord: false
    });
  };

  onRemarkSubmit = (e) => {
    e.preventDefault();
    const urlRemark: string = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('RecordRemarks')/items";

    const data = {
      Title: this.state.remarkTitle,
      Comments: this.state.remarkDetail,
      RecordId: this.state.id
    };

    const remarkOption: ISPHttpClientOptions = {
      body: JSON.stringify(data),
    };


    this.props.context.spHttpClient.post(urlRemark, SPHttpClient.configurations.v1, remarkOption).then(() => {
      toast("Remark Uploaded Successfully");
    })
    this.setState({
      id: "",
      remarkDetail: "",
      remarkTitle: "",
    });

  }

  hideViewRemarkModal = (e) => {
    e.preventDefault();

    this.setState({
      showViewRemark: false,
      id: "",
      date_of_disp: "",
      recipient: "",
      reference_num: "",
      delivery_personnel: "",
      subject: "",
      fileName: "",
      remarkDetail: "",
      remarkTitle: "",
      remarks: null
    });
  };

  // for populating edit record fields
  editRecord(e, record) {
    this.setState({
      showRecord: true,
      id: record.Id,
      date_of_disp: record.DateofDispatch,
      recipient: record.RecipientOrganizationName,
      reference_num: record.ReferenceNumber,
      delivery_personnel: record.DeliveryPersonnelName,
      subject: record.Subject,
      fileName: record.Title,

    });
  }

  //for showing and populating view record modal fields
  viewRecord(e, record) {
    this.setState({
      showViewRecord: true,
      id: record.Id,
      date_of_disp: record.DateofDispatch,
      recipient: record.RecipientOrganizationName,
      reference_num: record.ReferenceNumber,
      delivery_personnel: record.DeliveryPersonnelName,
      subject: record.Subject,
      fileName: record.Title,
    });
  }

  // for showing and populating view remark modal
  viewRemark(e, record) {
    this.setState({
      showViewRemark: true,
      id: record.Id,
      date_of_disp: record.DateofDispatch,
      recipient: record.RecipientOrganizationName,
      reference_num: record.ReferenceNumber,
      delivery_personnel: record.DeliveryPersonnelName,
      subject: record.Subject,
      fileName: record.Title,
      remarks: record.Remarks
    });

  }


  // for handling file upload change
  handleFileChange = (e: any) => {
    let file = e.target.files[0];
    this.setState({
      inputFile: file,
    });
  };

  // foe fetching reocrd using name
  async getRecordUsingName(): Promise<any> {
    let updateUrl =
      this.props.context.pageContext.web.absoluteUrl +
      "/_api/web/lists/getByTitle('OutgoingLibrary')/items?$filter=FileLeafRef eq '" +
      this.state.inputFile.name +
      "'";
    return (await this.props.context.spHttpClient
      .get(updateUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((json) => {
        return json.value;
      })) as Promise<any>;
  }

  // for adding record
  handleIncommingSubmit = (event: any): Promise<any> => {
    event.preventDefault();
    const url: string =
      this.props.context.pageContext.web.absoluteUrl +
      "/_api/web/lists/getByTitle('OutgoingLibrary')/RootFolder/files/add(url='" +
      this.state.inputFile.name +
      "',overwrite=true)";
    var options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json",
      },
      body: this.state.inputFile,
    };
    return this.props.context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, options)
      .then(() => {
        this.getRecordUsingName().then((response) => {
          let updateUrl =
            this.props.context.pageContext.web.absoluteUrl +
            "/_api/web/lists/getByTitle('OutgoingLibrary')/items(" +
            response[0].Id +
            ")";
          const recordInfo: any = {
            Title: this.state.inputFile.name,
            RecordType: "Incomming",
          };

          const headers: any = {
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*",
          };
          const recordOption: ISPHttpClientOptions = {
            headers: headers,
            body: JSON.stringify(recordInfo),
          };

          this.props.context.spHttpClient
            .post(updateUrl, SPHttpClient.configurations.v1, recordOption)
            .then(() => {
              toast("Uploaded Successfully");
              this.setState({
                show: false,
              });
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  //for adding outgoing record

  handleOutgoingSubmit = (event: any): Promise<any> => {
    event.preventDefault();
    const url: string =
      this.props.context.pageContext.web.absoluteUrl +
      "/_api/web/lists/getByTitle('OutgoingLibrary')/RootFolder/files/add(url='" +
      this.state.inputFile.name +
      "',overwrite=true)";
    var options: ISPHttpClientOptions = {
      headers: {
        Accept: "application/json",
      },
      body: this.state.inputFile,
    };
    return this.props.context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, options)
      .then(() => {
        this.getRecordUsingName().then((response) => {
          let updateUrl =
            this.props.context.pageContext.web.absoluteUrl +
            "/_api/web/lists/getByTitle('OutgoingLibrary')/items(" +
            response[0].Id +
            ")";
          const recordInfo: any = {
            Title: this.state.inputFile.name,
            RecordType: "Outgoing",
          };

          const headers: any = {
            "X-HTTP-Method": "MERGE",
            "IF-MATCH": "*",
          };
          const recordOption: ISPHttpClientOptions = {
            headers: headers,
            body: JSON.stringify(recordInfo),
          };

          this.props.context.spHttpClient
            .post(updateUrl, SPHttpClient.configurations.v1, recordOption)
            .then(() => {
              toast("Uploaded Successfully");
              this.setState({
                show: false,
              });
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  // for handling input field value change
  public onchange(event: any, stateValue: any) {
    let state = {};
    state[stateValue] = event.target.value;
    this.setState(state);
  }

  // for updating reocrd meta data
  public onSubmit(event: any): void {
    console.log("under on submit");
    event.preventDefault();
    const url: string =
      this.props.context.pageContext.web.absoluteUrl +
      "/_api/web/lists/getByTitle('OutgoingLibrary')/items(" +
      this.state.id +
      ")";

    const data = {
      RecipientOrganizationName: this.state.recipient,
      ReferenceNumber: this.state.reference_num,
      DateofDispatch: this.state.date_of_disp,
      DeliveryPersonnelName: this.state.delivery_personnel,
      Subject: this.state.subject,
    };
    const headers: any = {
      "X-HTTP-Method": "MERGE",
      "IF-MATCH": "*",
    };
    const recordOption: ISPHttpClientOptions = {
      headers: headers,
      body: JSON.stringify(data),
    };

    this.props.context.spHttpClient
      .post(url, SPHttpClient.configurations.v1, recordOption)
      .then(() => {
        toast("Updated Successfully");
        this.setState({
          showRecord: false,
          id: "",
          date_of_disp: "",
          recipient: "",
          reference_num: "",
          delivery_personnel: "",
          subject: "",
          fileName: "",
        });
      })
      .catch((err) => console.log(err));
  }

  // for changing lang to english
  setLangEnglish = () => {
    this.setState({
      words: English,
    });
  };

  // for changing lang to amharic
  setLangAmharic = () => {
    this.setState({
      words: AMHARIC,
    });
  };


  public render(): React.ReactElement<IRecordDashboardProps> {
    let cssURL =
      "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    SPComponentLoader.loadCss(
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
    );
    if (this.state.id) {
      const url: string = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('RecordRemarks')/items?$select=Comments&$filter=RecordId eq " + this.state.id;

      this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
        return response.json();
      })
        .then((json) => {
          this.setState({
            remarks: json.value
          })
        })
    }
    return (
      <>

        <div className="container text-center">
          <button className="btn btn-primary btn-margin" onClick={this.setLangEnglish}>
            EN
          </button>
          <button className="btn btn-success btn-margin" onClick={this.setLangAmharic}>
            AM
          </button>
        </div>
        {/* for rendering incoming and outgoing tabs */}
        <Tabs>
          <TabList>
            <Tab>{this.state.words.incomming}</Tab>
            <Tab>{this.state.words.outgoing}</Tab>
          </TabList>

          <TabPanel>
            {/* Incoming tab content */}
            <Incoming state={this.state} showModal={this.showModal} viewRecord={this.viewRecord} viewRemark={this.viewRemark} editRecord={this.editRecord}/>
          </TabPanel>

          <TabPanel>
            {/* Outgoing tab content */}
            <Outgoing state={this.state} showModal={this.showModal} viewRecord={this.viewRecord} viewRemark={this.viewRemark} editRecord={this.editRecord}/>
           </TabPanel>
           
        </Tabs>

        {/* Upload file modal */}
        <Modal show={this.state.show} handleClose={this.hideModal}>
          <div className="container-fluid ">
            <div className="row justify-content-center text-center ">
              <h4>
                <b>{this.state.words.uploadRecord}</b>
              </h4>
            </div>
            <hr />
            <div className="row justify-content-center text-center h-100">
              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <form
                  onSubmit={(event) => {
                    this.state.caller === "Incomming"
                      ? this.handleIncommingSubmit(event)
                      : this.handleOutgoingSubmit(event);
                  }}
                >
                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      id="fileInput"
                      onChange={(event) => this.handleFileChange(event)}
                    />
                  </div>
                  <hr />
                  <div className="form-group">
                    {/* <div className="container"> */}
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-secondary btn-sm float-left"
                          onClick={this.hideModal}
                        >
                          {this.state.words.cancel}
                        </button>
                        <button
                          type="submit"
                          className=" btn btn-primary btn-sm float-right"
                        >
                          {this.state.words.submit}
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        {/* Edit Record modal */}
        <ModalEditRecord
          show={this.state.showRecord}
          handleClose={this.hideRecordModal}
        >
          <div className="container-fluid ">
            <div className="row justify-content-center text-center ">
              <h4>
                <b>{this.state.words.editRecord}</b>
              </h4>
            </div>
            <hr />
            <div className="row justify-content-center text-center h-100">
              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <form onSubmit={(event) => this.onSubmit(event)}>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.fileName}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={this.state.fileName}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.recipientOrg}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={this.state.recipient}
                        onChange={(event) => this.onchange(event, "recipient")}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.referenceNumber}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={this.state.reference_num}
                        onChange={(event) =>
                          this.onchange(event, "reference_num")
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.dateOfDispatch}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={this.state.date_of_disp}
                        onChange={(event) =>
                          this.onchange(event, "date_of_disp")
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.deliveryPersonnel}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={this.state.delivery_personnel}
                        onChange={(event) =>
                          this.onchange(event, "delivery_personnel")
                        }
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.subject}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={this.state.subject}
                        onChange={(event) => this.onchange(event, "subject")}
                      />
                    </div>
                  </div>
                  <br />

                  <br />
                  <hr />
                  <div className="form-group">
                    {/* <div className="container"> */}
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-secondary btn-sm float-left"
                          onClick={this.hideRecordModal}
                        >
                          {this.state.words.cancel}
                        </button>
                        <button
                          className=" btn btn-primary btn-sm float-right"
                          type="submit"
                        >
                          {this.state.words.submit}
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalEditRecord>

        {/* View Record Modal */}
        <ModalEditRecord
          show={this.state.showViewRecord}
          handleClose={this.hideViewRecordModal}
        >
          <div className="container-fluid ">
            <div className="row justify-content-center text-center ">
              <h4>
                <b>{this.state.words.viewRecord}</b>
              </h4>
            </div>
            <br />
            <hr />
            <div className="row justify-content-center text-center h-100">
              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <form onSubmit={(event) => this.onSubmit(event)}>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.fileName}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={this.state.fileName}
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.recipientOrg}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={this.state.recipient}
                        onChange={(event) => this.onchange(event, "recipient")}
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.referenceNumber}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={this.state.reference_num}
                        onChange={(event) =>
                          this.onchange(event, "reference_num")
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.dateOfDispatch}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={this.state.date_of_disp}
                        onChange={(event) =>
                          this.onchange(event, "date_of_disp")
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.deliveryPersonnel}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={this.state.delivery_personnel}
                        onChange={(event) =>
                          this.onchange(event, "delivery_personnel")
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.subject}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={this.state.subject}
                        onChange={(event) => this.onchange(event, "subject")}
                        disabled
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="form-group">
                    {/* <div className="container"> */}
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          className="btn btn-secondary btn-sm float-left"
                          onClick={this.hideViewRecordModal}
                        >
                          {this.state.words.cancel}
                        </button>
                        <button
                          className=" btn btn-primary btn-sm float-right"
                          type="button"
                          onClick={this.showViewRemarkModal}
                        >
                          {this.state.words.remark}
                        </button>


                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </form>
              </div>


            </div>
          </div>
        </ModalEditRecord>

        {/* Remark Modal */}
        <ModalEditRecord
          show={this.state.showViewRemark}
          handleClose={this.hideViewRemarkModal}
        >

          <div className="container-fluid ">
            <div className="row justify-content-center text-center" >
              <h4>
                <b>{this.state.words.addRemark}</b>
              </h4>
            </div>
            <hr />
            <div className="row justify-content-center text-center h-100">
              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <form onSubmit={(event) => this.onRemarkSubmit(event)}>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.title}
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.remarkTitle}
                        onChange={(e) => this.setState({
                          remarkTitle: e.target.value
                        })}
                      />
                    </div>
                  </div>
                  <br />
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      {this.state.words.detail}
                    </label>
                    <div className="col-sm-7">
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={this.state.remarkDetail} onChange={(e) => {
                        this.setState({
                          remarkDetail: e.target.value
                        })
                      }}></textarea>
                    </div>
                  </div>
                  <br />
                  <div className="form-group">
                    {/* <div className="container"> */}
                    <div className="row">
                      <div className="col-md-12">
                        {/* <button
                          className="btn btn-secondary btn-sm float-left"
                          onClick={this.hideRecordModal}
                        >
                          {this.state.words.cancel}
                        </button> */}
                        <button
                          className=" btn btn-primary btn-sm float-right"
                          type="submit"
                        >
                          {this.state.words.submit}
                        </button>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>

                </form>
              </div>
              <br />
              {/* <hr /> */}
              {/* <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12" style={{ backgroundColor: "grey", color: "white" }}>
                <h4><b>{this.state.words.listRemarks}</b></h4>
              </div> */}

              <br />

              <div className="col col-sm-12 col-md-12 col-lg-12 col-xl-12 content-height">
                <hr style={{ borderStyle: "solid", borderColor: "grey" }} />
                {/* <div className="col-md-2">
                  <img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Image Description" />
                </div> */}
                <div className="col-md-9">

                  <div className="card">
                    {this.state.remarks && this.state.remarks.map(remark => (
                      <div className="card-body">
                        <>
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">{remark.Comments}</p>
                        </>

                      </div>
                    ))}

                  </div>
                </div>

              </div>




            </div>

            <div className="form-group">
              {/* <div className="container"> */}
              <div className="row">
                <div className="col-md-12">
                  <button
                    className="btn btn-secondary btn-sm float-left"
                    onClick={this.hideViewRemarkModal}
                  >
                    {this.state.words.cancel}
                  </button>
                  {/* <button
                          className=" btn btn-primary btn-sm float-right"
                          type="submit"
                        >
                          {this.state.words.submit}
                        </button> */}
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </ModalEditRecord>



        <ToastContainer />
      </>
    );
  }
}
