import * as React from "react";
import { IRecordDashboardProps } from "./IRecordDashboardProps";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { English, AMHARIC } from "./words"
import "react-tabs/style/react-tabs.css";
import { columns } from "./columns";
import { incomingColumns } from "./incoming-columns";
import Incomming from "./incomming";
import Outgoing from "./outgoing";
import { getAllItems, getFilteredItems } from "./actions";
import Modal from "./modal";
import UploadFile from "./uploadFile";
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
      words: English,
      incommingRecords: null,
      outgoingRecords: null,
      show: false,
      caller: null,
      tabIndex: 0,
      files: null,
      showUploadModal: false,
      recordDetail: null,
      showLoader: false,
    };
    let cssURL =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
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
    this.getLanguage()

    const localStorageSetHandler = () => {
      this.getLanguage()
    }

    window.addEventListener("itemInserted", localStorageSetHandler, true);

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

  setLanguage(lang) {
    localStorage.setItem('lang', lang)
  }

  getLanguage = () => {
    const selectedLanguage = localStorage.getItem('lang') ? localStorage.getItem('lang') : "en"
    { !localStorage.getItem('lang') && this.setLanguage("en") }
    if (selectedLanguage === "en") {
      this.setState({
        words: English
      })
    }
    else if (selectedLanguage === "am") {
      this.setState({
        words: AMHARIC
      })
    }
  }
  setFiles = () => {
    getAllItems(this.props.context, "File").then((response) => {
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
  getFormattedResult(num) {
    if (num <= 9) {
      return `0${num}`
    }
    return num;
  }
  setIncommingRecords = () => {
    this.setState({ showLoader: true });
    getFilteredItems(this.props.context, "OutgoingLibrary", "?$select=*,EncodedAbsUrl,FileLeafRef&$filter=RecordType eq 'Incoming'&$orderBy=Id desc").then((response) => {
      const data: any = [];
      response.map((item) => {
        const incomingRecordDate = new Date(item.IncomingRecordDate) || null
        data.push({
          Id: item.Id,
          Title: item.FileLeafRef,
          SendingOrganizationName: item.SendingOrganizationName,
          ReferenceNumber: item.ReferenceNumber,
          IncomingRecordDate: incomingRecordDate ? this.getFormattedResult(incomingRecordDate.getMonth() + 1) + "/" + this.getFormattedResult(incomingRecordDate.getDate()) + "/" + this.getFormattedResult(incomingRecordDate.getFullYear()) : null,
          DeliveryPersonnelName: item.DeliveryPersonnelName,
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
    getFilteredItems(this.props.context, "OutgoingLibrary", "?$select=*,EncodedAbsUrl,FileLeafRef&$filter=RecordType eq 'Outgoing'").then((response) => {
      const data: any = [];
      response.map((item) => {
        const dateOfDispatch = new Date(item.DateofDispatch)
        data.push({
          Id: item.Id,
          Title: item.FileLeafRef,
          RecipientOrganizationName: item.RecipientOrganizationName,
          ReferenceNumber: item.ReferenceNumber,
          DateofDispatch: dateOfDispatch ? this.getFormattedResult(dateOfDispatch.getMonth() + 1) + "/" + this.getFormattedResult(dateOfDispatch.getDate()) + "/" + this.getFormattedResult(dateOfDispatch.getFullYear()) : null,
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
    const incomingRecordDate = new Date(record.IncomingRecordDate) || null
    console.log(incomingRecordDate.getMonth());
    console.log(incomingRecordDate.getDate());

    var incommingRecord = {
      Id: record.Id,
      Title: record.FileLeafRef,
      SendingOrganizationName: record.SendingOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      IncomingRecordDate: incomingRecordDate ? this.getFormattedResult(incomingRecordDate.getMonth() + 1) + "/" + this.getFormattedResult(incomingRecordDate.getDate()) + "/" + this.getFormattedResult(incomingRecordDate.getFullYear()) : null,
      Subject: record.Subject,
      DeliveryPersonnelName: record.DeliveryPersonnelName,
      FileIDId: record.FileIDId,
      downloadUrl: record.EncodedAbsUrl
    };

    data.splice(0, 0, incommingRecord);

    this.setState({
      incommingRecords: data
    });

  }

  addChangeToOutgoingRecord = (record) => {
    let data = this.state.outgoingRecords
    const outgoingRecordDate = new Date(record.DateofDispatch) || null
    let newRecord = {
      Id: record.Id,
      Title: record.FileLeafRef,
      RecipientOrganizationName: record.RecipientOrganizationName,
      ReferenceNumber: record.ReferenceNumber,
      DateofDispatch: outgoingRecordDate ? this.getFormattedResult(outgoingRecordDate.getMonth() + 1) + "/" + this.getFormattedResult(outgoingRecordDate.getDate()) + "/" + this.getFormattedResult(outgoingRecordDate.getFullYear()) : null,
      DeliveryPersonnelName: record.DeliveryPersonnelName,
      Subject: record.Subject
    }

    data.splice(0, 0, newRecord);
    this.setState({
      outgoingRecords: data
    })
  }

  updateIncomingRecordInfo = (record) => {
    this.setState({ showLoader: true })
    const incomingRecordDate = new Date(record.IncomingRecordDate) || null
    let data = this.state.incommingRecords
    let itemIndex = data.findIndex((item) => item.Id == record.Id)
    if (itemIndex != -1) {
      var editedRecord = {
        Id: record.Id,
        Title: record.FileLeafRef,
        SendingOrganizationName: record.SendingOrganizationName,
        ReferenceNumber: record.ReferenceNumber,
        IncomingRecordDate: incomingRecordDate ? this.getFormattedResult(incomingRecordDate.getMonth() + 1) + "/" + this.getFormattedResult(incomingRecordDate.getDate()) + "/" + this.getFormattedResult(incomingRecordDate.getFullYear()) : null,
        Subject: record.Subject,
        DeliveryPersonnelName: record.DeliveryPersonnelName,
        FileIDId: record.FileIDId,
        downloadUrl: record.EncodedAbsUrl
      }
      data[itemIndex] = editedRecord
      data.push(editedRecord)
      let updatedRecords = data
      this.setState({
        incommingRecords: updatedRecords
      })
      data.pop()
      updatedRecords = data
      this.setState({
        incommingRecords: updatedRecords,
        showLoader: false
      })
    }
  }

  updateOutgoingRecordInfo = (record, index) => {
    this.setState({ showLoader: true })
    let data = this.state.outgoingRecords
    const dateOfDispatch = new Date(record.DateofDispatch)
    index = data.findIndex(obj => obj.Id == record.Id);
    if (index != -1) {
      var editedRecord = {
        Id: record.Id,
        Title: record.FileLeafRef,
        RecipientOrganizationName: record.RecipientOrganizationName,
        ReferenceNumber: record.ReferenceNumber,
        DateofDispatch: dateOfDispatch ? this.getFormattedResult(dateOfDispatch.getMonth() + 1) + "/" + this.getFormattedResult(dateOfDispatch.getDate()) + "/" + this.getFormattedResult(dateOfDispatch.getFullYear()) : null,
        DeliveryPersonnelName: record.DeliveryPersonnelName,
        Subject: record.Subject
      }
      data[index] = editedRecord
      data.push(editedRecord);
      let updatedRecords = data
      this.setState({
        outgoingRecords: updatedRecords
      })
      data.pop()
      updatedRecords = data
      this.setState({
        outgoingRecords: updatedRecords,
        showLoader: false
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


  public render(): React.ReactElement<IRecordDashboardProps> {
    return (
      <>
        {
          this.state.words &&
            this.state.showLoader == false ?
            <>
              {/* for rendering incoming and outgoing tabs */}
              {/* <div className="d-flex">
                <button className="btn btn-primary" type="button" onClick={(e) => this.setLanguage("en")}>EN</button>
                <button className="btn btn-primary" type="button" onClick={(e) => this.setLanguage("am")} >AM</button>
              </div> */}
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
                  {this.state.show && <UploadFile caller={this.state.caller} words={this.state.words} hideModal={(event) => {
                    this.setState({ show: false })
                  }} context={this.props.context} setIncommingRecords={this.addChangeToIncommingRecords} setOutgoingRecords={this.addChangeToOutgoingRecord} />}
                </Modal>
              </Tabs>
              <ToastContainer />
            </> : <Loader />
        }
      </>
    );
  }
}
