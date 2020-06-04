import React, { Component } from  'react';
import NameRecordsContext from '../NameRecordsContext';
import { Link } from 'react-router-dom';
import './NamePresentation.css';

//This component handles the displaying of the chosen based off the input provided by a user
//It also allows the ser to cycle through the database of available names until they find one that fits them.

class NamePresentation extends Component {

  static contextType = NameRecordsContext;
  
  state = {
    error: null,
    id: '',
    name: '',
    gender: this.context.gender,
    era: this.context.era,
    recent: this.context.recent,
    selectedName: '',
    selectedNames: '',
    namePositionToDisplay: 0
  };

  //This calls the main function of this component when it mounts.
  componentDidMount() {
  this.nameSelector()
  }

  //This function goes through the database of names and find those suitable to the request
  //made by the user. It then updates the state held by this component, as well as 
  //updates the context, which is used by the greater app as a whole. 
  nameSelector = () => {
    let newNames = [];
    for(let i=0; i < this.context.nameRecords.length; i++){
      let record = this.context.nameRecords[i];
        if(this.state.gender === record.gender && this.state.era === record.era/* and not recent */){ 
          newNames.push(record.name);
        }
      }
    this.setState({selectedNames: newNames})
    this.setState({selectedName: newNames[0]})
    this.context.setNameChosen(this.state.selectedName)
    console.log(this.state.selectedName) 
  } 

  //This function changes what name is displayed to the user as they cycle through the requests.
  changeNamePositionToDisplay = () => {
    if(this.state.namePositionToDisplay < this.state.selectedNames.length - 1){
      this.setState({namePositionToDisplay: this.state.namePositionToDisplay + 1})
      this.context.setNameChosen(this.state.selectedNames[this.state.namePositionToDisplay + 1])
    }
    else{
      this.setState({namePositionToDisplay: 0})
      this.context.setNameChosen(this.state.selectedNames[0])
    }
  }
    
  //This section renders the end user interface for this component.  
  render() {
      const {namePositionToDisplay} = this.state
      return (
          <section className='NamePresentation'> 
        <div>
            <h2>How Does</h2>
            <h3>{this.state.selectedNames[namePositionToDisplay]}</h3>
            <p>Make You Feel?</p>
        </div>
        <div>
        <Link to={'/tips'}>
          I Love It! Give me some tips to make it mine!
        </Link>
        </div>
        <div>
        <button type='button' onClick={this.changeNamePositionToDisplay}>
            Not for Me
        </button>
        </div>
        <div>
        <Link to={'/selectionPage'}>
          Want to change your choices? Click here to go back to the option selection page
        </Link>
        </div>
          </section>
      );
    }
  }
    
  export default NamePresentation;



