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

export interface TableItems {
  incommingRecords: any;
  outgoingRecords: any;
  show: boolean;
  showRecord: boolean;
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
      recipient: null,
      delivery_personnel: null,
      date_of_disp: null,
      reference_num: null,
      subject: null,
      id: null,
      inputFile: null,
      fileName: null,
      caller: null,
    };
    this.getIncommingRecords().then((response) => {
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

  handleFileChange = (e: any) => {
    let file = e.target.files[0];
    this.setState({
      inputFile: file,
    });
  };

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

  public onchange(event: any, stateValue: any) {
    let state = {};
    state[stateValue] = event.target.value;
    this.setState(state);
  }

  public onSubmit(event: any): void {
    event.preventDefault();
    const url: string =
      this.context.pageContext.web.absoluteUrl +
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

  setLangEnglish = () => {
    this.setState({
      words: English,
    });
  };

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

    return (
      <>
        <div className="container">
          <button className="btn btn-primary" onClick={this.setLangEnglish}>
            EN
          </button>
          <button className="btn btn-warning" onClick={this.setLangAmharic}>
            AM
          </button>
        </div>
        <Tabs>
          <TabList>
            <Tab>{this.state.words.incomming}</Tab>
            <Tab>{this.state.words.outgoing}</Tab>
          </TabList>

          <TabPanel>
            <div className="">
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-primary float-right btnStyle"
                    onClick={(event) => this.showModal(event, "Incomming")}
                  >
                    {this.state.words.addRecord}
                  </button>
                  <br />
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-12">
                  <table className="table table-bordered">
                    <thead className="bg-info text-light">
                      <tr>
                        <td scope="col">{this.state.words.id}</td>
                        <td>{this.state.words.recordName}</td>
                        <td scope="col">{this.state.words.recipientOrg}</td>
                        <td scope="col">{this.state.words.referenceNumber}</td>
                        <td scope="col">{this.state.words.dateOfDispatch}</td>
                        <td scope="col">
                          {this.state.words.deliveryPersonnel}
                        </td>
                        <td scope="col">{this.state.words.subject}</td>
                        <td scope="col">{this.state.words.actions}</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.incommingRecords &&
                        this.state?.incommingRecords.map((listItem: any) => {
                          return (
                            <tr>
                              <th scope="row">{listItem?.Id}</th>
                              <td>{listItem?.Title}</td>
                              <td>{listItem?.RecipientOrganizationName}</td>
                              <td>{listItem?.ReferenceNumber}</td>
                              <td>{listItem?.DateofDispatch}</td>
                              <td>{listItem?.DeliveryPersonnelName}</td>
                              <td>{listItem?.Subject}</td>
                              <td>
                                {/* <button type="button" className="btn btn-primary"><i className="far fa-eye"></i></button> */}
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={(e) => this.editRecord(e, listItem)}
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                {/* <button type="button" className="btn btn-danger"><i className="far fa-trash-alt"></i></button> */}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="">
              <div className="row">
                <div className="col-12">
                  <button
                    className="btn btn-primary float-right btnStyle"
                    onClick={(event) => this.showModal(event, "Outgoing")}
                  >
                    {this.state.words.addRecord}
                  </button>
                  <br />
                </div>
              </div>
              <br />
              <br />
              <div className="row">
                <div className="col-12">
                  <table className="table table-bordered">
                    <thead className="bg-info text-light">
                      <tr>
                        <td scope="col">{this.state.words.id}</td>
                        <td>{this.state.words.recordName}</td>
                        <td scope="col">{this.state.words.recipientOrg}</td>
                        <td scope="col">{this.state.words.referenceNumber}</td>
                        <td scope="col">{this.state.words.dateOfDispatch}</td>
                        <td scope="col">
                          {this.state.words.deliveryPersonnel}
                        </td>
                        <td scope="col">{this.state.words.subject}</td>
                        <td scope="col">{this.state.words.actions}</td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.outgoingRecords &&
                        this.state?.outgoingRecords.map((listItem) => {
                          return (
                            <tr>
                              <th scope="row">{listItem.Id}</th>
                              <td>{listItem.Title}</td>
                              <td>{listItem?.RecipientOrganizationName}</td>
                              <td>{listItem?.ReferenceNumber}</td>
                              <td>{listItem?.DateofDispatch}</td>
                              <td>{listItem?.DeliveryPersonnelName}</td>
                              <td>{listItem?.Subject}</td>
                              <td>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                >
                                  <i className="fa fa-eye"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={(e) => this.editRecord(e, listItem)}
                                >
                                  <i className="fa fa-edit"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <Modal show={this.state.show} handleClose={this.hideModal}>
              <p>Modal</p>
            </Modal> */}
            </div>
          </TabPanel>
        </Tabs>

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

        <ToastContainer />
      </>
    );
  }
}
