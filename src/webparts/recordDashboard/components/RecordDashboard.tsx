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
import Loader from "./Loader";
export interface TableItems {
  incommingRecords: any;
  outgoingRecords: any;
  show: boolean;
  words: any
  caller: any,
  tabIndex: number,
  files: any,
  showUploadModal: boolean,
  recordDetail: any,
  showLoader: boolean
}

export default class RecordDashboard extends React.Component<
  IRecordDashboardProps,
  TableItems,
  {}
> {
  public constructor(props: IRecordDashboardProps) {
    super(props);
    this.state = {
      words: null,
      incommingRecords: null,
      outgoingRecords: null,
      show: false,
      caller: null,
      tabIndex: 0,
      files: null,
      showUploadModal: false,
      recordDetail: null,
      showLoader: false
    };
    let cssURL =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);
    SPComponentLoader.loadCss(
      "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"
    );
    this.setIncommingRecords()
    this.setOutgoingRecords()
    this.setFiles()
  }

  componentDidMount(): void {
    this.getLocalStorage();
    this.getWords()
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

  setWords(selectedWords) {
    { selectedWords ? localStorage.setItem('words', JSON.stringify(selectedWords)) : localStorage.setItem('words', JSON.stringify(English)) }
    this.setState({
      words: selectedWords
    })
  }

  getWords() {
    const storedWords = localStorage.getItem('words') ? localStorage.getItem('words') : JSON.stringify(English)
    if (storedWords) {
      this.setState({
        words: JSON.parse(storedWords)
      })
    }
  }
  setFiles = () => {
    GetFiles(this.props.context).then((response) => {
      const data: any = [];
      data.push({
        Id: 0,
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
    this.setState({
      recordDetail: recordDetail
    });
  }

  setIncommingRecords = () => {
    this.setState({ showLoader: true });
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
          downloadUrl: item.EncodedAbsUrl
        });
        this.setState({ showLoader: false });
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
          Subject: item.Subject,
          downloadUrl: item.EncodedAbsUrl
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
    this.setState({
      incommingRecords: data
    })
  }

  updateOutgoingRecordInfo = (record, index) => {
    let data = this.state.outgoingRecords
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
  showModal = (event, text: any) => {
    event.preventDefault()
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
    this.setWords(English)
  };

  // for changing lang to amharic
  setLangAmharic = () => {
    this.setWords(AMHARIC)
  };

  public render(): React.ReactElement<IRecordDashboardProps> {
    return (
      <>
        {
          this.state.words &&
            this.state.showLoader == false ?
            <>
              <div className="container text-center">
                <button className="btn btn-primary btn-margin" type="button" onClick={this.setLangEnglish}>
                  EN
                </button>
                <button className="btn btn-success btn-margin" type="button" onClick={this.setLangAmharic}>
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

                <Modal handleClose={() => this.setState({ show: false })} show={this.state.show} additionalStyles={{}}  >
                  <UploadFile caller={this.state.caller} words={this.state.words} hideModal={(event) => {
                    this.setState({ show: false })
                  }} context={this.props.context} setIncommingRecords={this.addChangeToIncommingRecords} setOutgoingRecords={this.addChangeToOutgoingRecord} />
                </Modal>
              </Tabs>
              <ToastContainer />
            </> : <Loader />
        }
      </>
    );
  }
}
