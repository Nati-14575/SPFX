import * as React from "react";
import { IRecordDashboardProps } from "./IRecordDashboardProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./main.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { English, AMHARIC } from "./words"
import "react-tabs/style/react-tabs.css";
import { columns } from "./columns";
import Incomming from "./incomming";
import Outgoing from "./outgoing";
import { GetRecords } from "./actions";
import Modal from "./modal";
import UploadFile from "./uploadFile";
export interface TableItems {
  incommingRecords: any;
  outgoingRecords: any;
  show: boolean;
  words: any
  caller: any,
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
      caller: null
    };

    GetRecords(this.props.context, "Incomming").then((response) => {
      const data: any = [];
      response.map((item) => {
        data.push({
          Id: item.Id,
          Title: item.Title,
          RecipientOrganizationName: item.RecipientOrganizationName,
          ReferenceNumber: item.ReferenceNumber,
          DateofDispatch: item.DateofDispatch,
          DeliveryPersonnelName: item.DeliveryPersonnelName,
          Subject: item.Subject
        })
      })
      this.setState({
        incommingRecords: data,
      });
    });

    GetRecords(this.props.context, "Outgoing").then((response) => {
      const data: any = [];
      response.map((item) => {
        data.push({
          Id: item.Id,
          Title: item.Title,
          RecipientOrganizationName: item.RecipientOrganizationName,
          ReferenceNumber: item.ReferenceNumber,
          DateofDispatch: item.DateofDispatch,
          DeliveryPersonnelName: item.DeliveryPersonnelName,
          Subject: item.Subject
        })
      })
      this.setState({
        outgoingRecords: data,
      });
    });
  }

  // for showing and hiding upload file modal
  showModal = (text: any) => {
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
            {this.state.incommingRecords && <Incomming context={this.props.context} words={this.state.words} showModal={this.showModal} data={this.state.incommingRecords} columns={columns} />}
          </TabPanel>
          <TabPanel>
            {/* Outgoing tab content */}
            <Outgoing context={this.props.context} words={this.state.words} showModal={this.showModal} data={this.state.outgoingRecords} columns={columns} />
          </TabPanel>
          <Modal show={this.state.show} handleClose={() => this.setState({ show: false })} additionalStyles={{}}  >
            <UploadFile caller={this.state.caller} words={this.state.words} hideModal={() => this.setState({ show: false })} context={this.props.context} />
          </Modal>
        </Tabs>
        <ToastContainer />
      </>
    );
  }
}
