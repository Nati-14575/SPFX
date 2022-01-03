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
import { incomingColumns } from "./incoming-columns";
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
  tabIndex: number
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
      caller: null,
      tabIndex: 0
    };
    this.setIncommingRecords()
    this.setOutgoingRecords()
    this.getLocalStorage()
  }

  getLocalStorage()
  {
    console.log("under get local storage");

    if(localStorage.getItem('selectedTab') != null)
    {
      var selectedTab= localStorage.getItem('selectedTab');
      this.setState({ tabIndex: parseInt(selectedTab)}, () => {
        console.log("under callback");
        console.log(this.state.tabIndex );
      }); 
   
    }
    else{
      this.setLocalStorage(this.state.tabIndex);
    }
  }

  setLocalStorage(index)
  {

    localStorage.setItem('selectedTab', (index).toString());
    this.setState({tabIndex: index});
  }

  setIncommingRecords = () => {
    GetRecords(this.props.context, "Incomming").then((response) => {
      const data: any = [];
      response.map((item) => {
        data.push({
          Id: item.Id,
          Title: item.Title,
          SendingOrganizationName: item.SendingOrganizationName,
          ReferenceNumber: item.ReferenceNumber,
          IncomingRecordDate: item.IncomingRecordDate ? new Date(item.IncomingRecordDate).toLocaleDateString(
            "en-us"
          ) : null
          ,
          Subject: item.Subject
        })
      })
      this.setState({
        incommingRecords: data,
      });
    });
  }

  setOutgoingRecords = () => {
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

  addChangeToIncommingRecords = (record) => {
    let data = this.state.incommingRecords
    data.push({
      Id: record.Id,
      Title: record.Title,
      SendingOrganizationName: record.SendingOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      IncomingRecordDate: record.IncomingRecordDate,
      Subject: record.Subject
    })
    this.setState({
      incommingRecords: data
    })
  }

  addChangeToOutgoingRecord = (record) => {
    let data = this.state.outgoingRecords
    data.push({
      Id: record.Id,
      Title: record.Title,
      SendingOrganizationName: record.SendingOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      IncomingRecordDate: record.IncomingRecordDate,
      Subject: record.Subject
    })
    console.log(data)
    this.setState({
      outgoingRecords: data
    })
  }

  updateIncomingRecordInfo = (record, index) => {
    let data = this.state.incommingRecords
    console.log(data[index])
    data[index] = {
      Id: record.Id,
      Title: record.Title,
      SendingOrganizationName: record.SendingOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      IncomingRecordDate: record.IncomingRecordDate,
      Subject: record.Subject
    }
    console.log(data[index])
    this.setState({
      incommingRecords: data
    })
  }

  updateOutgoingRecordInfo = (record, index) => {
    let data = this.state.incommingRecords
    console.log(data[index])
    data[index] = {
      Id: record.Id,
      Title: record.Title,
      SendingOrganizationName: record.SendingOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      IncomingRecordDate: record.IncomingRecordDate,
      Subject: record.Subject
    }
    console.log(data[index])
    this.setState({
      incommingRecords: data
    })
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
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    SPComponentLoader.loadCss(
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
    );
    console.log("under render for consoling tab index");
    console.log(this.state.tabIndex);
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
        <Tabs selectedIndex={this.state.tabIndex} onSelect={index => {  this.setLocalStorage(index)}}>
          <TabList>
            <Tab>{this.state.words.incomming}</Tab>
            <Tab>{this.state.words.outgoing}</Tab>
          </TabList>

          <TabPanel >
            {/* Incoming tab content */}
            {this.state.incommingRecords && <Incomming context={this.props.context} words={this.state.words} showModal={this.showModal} data={this.state.incommingRecords} setRecords={this.addChangeToIncommingRecords} updateRecordInfo={this.updateIncomingRecordInfo} columns={incomingColumns} />}
          </TabPanel>
          <TabPanel >
            {/* Outgoing tab content */}
            {this.state.outgoingRecords && <Outgoing context={this.props.context} words={this.state.words} showModal={this.showModal} data={this.state.outgoingRecords} setRecords={this.addChangeToOutgoingRecord} columns={columns} updateRecordInfo={this.updateOutgoingRecordInfo} />}
          </TabPanel>
          <Modal show={this.state.show} handleClose={() => this.setState({ show: false })} additionalStyles={{}}  >
            <UploadFile caller={this.state.caller} words={this.state.words} hideModal={() => this.setState({ show: false })} context={this.props.context} setIncommingRecords={this.addChangeToIncommingRecords} setOutgoingRecords={this.addChangeToOutgoingRecord} />
          </Modal>
        </Tabs>
        <ToastContainer />
      </>
    );
  }
}
