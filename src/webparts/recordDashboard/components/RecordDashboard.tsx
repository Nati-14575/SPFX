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
import { GetFiles, GetRecords } from "./actions";
import Modal from "./modal";
import UploadFile from "./uploadFile";
import UploadIncomingDetail from "./UploadIncomingDetail";
export interface TableItems {
  incommingRecords: any;
  outgoingRecords: any;
  show: boolean;
  words: any
  caller: any,
  tabIndex: number,
  files: any,
  showUploadModal: boolean,
  recordDetail: any
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
      tabIndex: 0,
      files: null,
      showUploadModal: false,
      recordDetail: null
    };

    this.setIncommingRecords()
    this.setOutgoingRecords()
    this.setFiles()
  }

  componentDidMount(): void {
    // this.setState({tabIndex: 1});
    this.getLocalStorage();
  }

  getLocalStorage() {

    if (localStorage.getItem('selectedTab') != null) {
      var selectedTab = localStorage.getItem('selectedTab');
      this.setState({ tabIndex: parseInt(selectedTab) });

    }
    else {
      this.setLocalStorage(this.state.tabIndex);
    }
  }

  setLocalStorage(index) {

    localStorage.setItem('selectedTab', (index).toString());
    this.setState({ tabIndex: index });
  }

  setFiles = () => {
    GetFiles(this.props.context).then((response) => {
      const data: any = [];
      data.push({
        Id: null,
        Title: null,
        FileName: this.state.words.selectLocation
      })
      response.map((item) => {
        data.push({
          Id: item.Id,
          Title: item.Title,
          FileName: item.FileName
        });

      })
      this.setState({
        files: data,
      });
    });
  }

  setRecordDetail = (recordDetail) => {
    console.log("under record detail");
    console.log(recordDetail);
    this.setState({
      recordDetail: recordDetail
    });
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
          Subject: item.Subject,
          FileIDId: item.FileIDId,

        })
      })
      var newData = data;
      this.setState({
        incommingRecords: newData,
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
          DateofDispatch: item.DateofDispatch ? new Date(item.DateofDispatch).toLocaleDateString(
            "en-us"
          ) : null,
          DeliveryPersonnelName: item.DeliveryPersonnelName,
          Subject: item.Subject
        })
      })
      var newData = data;
      this.setState({
        outgoingRecords: newData,
      });
    });
  }

  addChangeToIncommingRecords = (record) => {
    let data = this.state.incommingRecords;

    var incommingRecord = {
      Id: record.Id,
      Title: record.Title,
      SendingOrganizationName: record.SendingOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      IncomingRecordDate: record.IncomingRecordDate ? new Date(record.IncomingRecordDate).toLocaleDateString(
        "en-us"
      ) : null,
      Subject: record.Subject,
      FileIDId: record.FileIDId,
    };

    data.splice(0, 0, incommingRecord);

    this.setState({
      incommingRecords: data
    });

  }

  addChangeToOutgoingRecord = (record) => {
    let data = this.state.outgoingRecords
    let newRecord = {
      Id: record.Id,
      Title: record.Title,
      RecipientOrganizationName: record.RecipientOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      DateofDispatch: record.DateofDispatch ? new Date(record.DateofDispatch).toLocaleDateString(
        "en-us"
      ) : null,
      DeliveryPersonnelName: record.DeliveryPersonnelName,
      Subject: record.Subject
    }

    data.splice(0, 0, newRecord);
    this.setState({
      outgoingRecords: data
    })
  }

  updateIncomingRecordInfo = (record, index) => {
    let data = this.state.incommingRecords
    data[index] = {
      Id: record.Id,
      Title: record.Title,
      SendingOrganizationName: record.SendingOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      IncomingRecordDate: record.IncomingRecordDate,
      Subject: record.Subject
    }
    console.log(data)
    this.setState({
      incommingRecords: data
    })
  }

  updateOutgoingRecordInfo = (record, index) => {
    console.log("under outgping record info");
    let data = this.state.outgoingRecords
    console.log(data)
    index = data.findIndex(obj => obj.Id == record.Id);
    if (index != -1) {
      var newRecord = {
        Id: record.Id,
        Title: record.Title,
        RecipientOrganizationName: record.RecipientOrganizationName,
        ReferenceNumber: record.ReferenceNumber,
        DateofDispatch: record.DateofDispatch,
        DeliveryPersonnelName: record.DeliveryPersonnelName,
        Subject: record.Subject
      }
      data.push(newRecord);;
      this.setState({
        outgoingRecords: data
      })

    }
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

  // for showing and hiding upload file modal
  showUploadModal = (e) => {
    // this.setState({
    //   showUploadModal: true
    // });
  };

  hideUploadModal = (e) => {
    e.preventDefault();
    this.setState({
      showUploadModal: false
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

    this.setFiles()

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
        <Tabs selectedIndex={this.state.tabIndex} onSelect={index => { this.setLocalStorage(index) }}>
          <TabList>
            <Tab>{this.state.words.incomming}</Tab>
            <Tab>{this.state.words.outgoing}</Tab>

          </TabList>

          <TabPanel >
            {/* Incoming tab content */}
            {this.state.incommingRecords && <Incomming context={this.props.context} words={this.state.words} showModal={this.showModal} data={this.state.incommingRecords} key={this.state.incommingRecords} setRecords={this.addChangeToIncommingRecords} updateRecordInfo={this.updateIncomingRecordInfo} files={this.state.files} columns={incomingColumns} />}
          </TabPanel>
          <TabPanel >
            {/* Outgoing tab content */}
            {this.state.outgoingRecords && <Outgoing context={this.props.context} words={this.state.words} showModal={this.showModal} data={this.state.outgoingRecords} key={this.state.outgoingRecords} setRecords={this.addChangeToOutgoingRecord} files={this.state.files} columns={columns} updateRecordInfo={this.updateOutgoingRecordInfo} />}
          </TabPanel>
          <Modal show={this.state.show} handleClose={() => this.setState({ show: false })} additionalStyles={{}}  >
            <UploadFile caller={this.state.caller} words={this.state.words} hideModal={() => this.setState({ show: false })} context={this.props.context} setIncommingRecords={this.addChangeToIncommingRecords} setOutgoingRecords={this.addChangeToOutgoingRecord} showDetailRecord={() => this.setState({ showUploadModal: true })} setRecordDetail={this.setRecordDetail} />
          </Modal>

          <Modal show={this.state.showUploadModal} handleClose={() => this.setState({ showUploadModal: false })} additionalStyles={{}}  >
            {/* <h1>Hello</h1> */}
            <UploadIncomingDetail words={this.state.words} hideRecordModal={() => this.setState({ showUploadModal: false })} context={this.props.context} recordDetails={this.state.recordDetail} key={this.state.recordDetail} files={this.state.files} />
          </Modal>
        </Tabs>
        <ToastContainer />
      </>
    );
  }
}
