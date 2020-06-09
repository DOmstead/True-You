import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage'
import AddNameRecord from './AddNameRecord/AddNameRecord';
import EditNameRecord from './EditNameRecord/EditNameRecord';
import SelectionPage from './SelectionPage/SelectionPage';
import NameRecordList from './NameRecordList/NameRecordList';
import NamePresentation from './NamePresentation/NamePresentation';
import Tips from './Tips/Tips';
import NameRecordsContext from './NameRecordsContext';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';


//This component is the main componenet of this program, and is therefore named app
//in keeping with industry best practices. 
class App extends Component {



  state = {
    nameRecords: [],
    gender: "M",
    era: "Classic",
    error: null,
    recent: [],
    nameChosen: ""
  };


  //These functions allow calls to be made throughout the rest of the app and 
  //have context be update here. They are defined as part of context further down. 
  setNameRecords = nameRecords => {
    this.setState({
      nameRecords: nameRecords,
      error: null,
    })
  }

  setEra = newEra => {
    this.setState({
      era: newEra.era
    })
  }
  
  setGender = newGender => {
    this.setState({
      gender: newGender.gender,
    })
  }

  setNameChosen = nameChosen => {
    this.setState({
      nameChosen: nameChosen,
    })
  }

  addNameRecord = nameRecord => {
    this.setState({
      nameRecords: [ ...this.state.nameRecords, nameRecord ],
    })
  }

  deleteNameRecord = nameRecordId => {
    const newNameRecords = this.state.nameRecords.filter(record =>
      record.id !== nameRecordId
    )
    this.setState({
      nameRecords: newNameRecords
    })
  }


  //This fetch call is made to populate nameRecords from our API. This occurs as soon as the app 
  //mounts, so that when the user reaches the point in their userflow when their name would be displayed,
  // the data is ready to present. This helps create a positive experience for the user. 

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(this.setNameRecords)
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  updateNameRecord = updatedNameRecord => {
    this.setState({
      nameRecords: this.state.nameRecords.map(record =>
        (record.id !== updatedNameRecord.id) ? record : updatedNameRecord
      )
    })
  }


  //This section sets the value for context, calling in functions that allow context to be 
  //updated elsewhere throughout the app. Under return it all handles all the pathing
  //for the app, showing what components render on what areas. 
  render() {
    const contextValue = {
      nameRecords: this.state.nameRecords,
      gender:this.state.gender,
      era:this.state.era,
      recent:this.state.recent,
      nameChosen:this.state.nameChosen,
      addNameRecord: this.addNameRecord,
      deleteNameRecord: this.deleteNameRecord,
      updateNameRecord: this.updateNameRecord,
      setEra: this.setEra,
      setGender: this.setGender,
      setNameRecords: this.setNameRecords,
      setNameChosen: this.setNameChosen
    }
    return (
      <main className='App'>
        <NameRecordsContext.Provider value={contextValue}>
          <Nav />
          <br></br>
          <div className='content' aria-live='polite'>
          <Route
              exact
              path='/'
              component={LandingPage}
            />
          <Route
              exact
              path='/selectionPage'
              component={SelectionPage}
            />
          <Route
              exact
              path='/namePresentation'
              component={NamePresentation}
            />
          <Route
              exact
              path='/tips'
              component={Tips}
            />            
          <Route
              exact
              path='/nameRecordList'
              component={NameRecordList}
            />
          <Route
              path='/add-nameRecord'
              component={AddNameRecord}
            />
          <Route
              path='/edit/:nameRecordId'
              component={EditNameRecord}
            />
          </div>
        </NameRecordsContext.Provider>
      </main>
    );
  }
}

export default App;
