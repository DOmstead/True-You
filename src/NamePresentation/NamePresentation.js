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
    selectedName: '' || localStorage.getItem('selectedName'),
    selectedNames: [] || localStorage.getItem('selectedNames'),
    namePositionToDisplay: parseInt(localStorage.getItem('namePositionToDisplay')) || 0
  };

  //This calls the main function of this component when it mounts.
  componentDidMount() {
  this.nameSelector()
  }

  //This function goes through the database of names and find those suitable to the request
  //made by the user. It then updates the state held by this component, as well as 
  //updates the context, which is used by the greater app as a whole. 
  nameSelector = () => {
    let newNames = []
    let nameRecords = JSON.parse(localStorage.getItem('nameRecords'));
        for(let i=0; i < nameRecords.length; i++){
        let record = nameRecords[i];
          if(this.state.gender === record.gender && this.state.era === record.era){ 
            newNames.push(record.name);
          }
        }
        this.setState({selectedNames: newNames})
        localStorage.setItem('selectedNames', newNames)
        this.setState({selectedName: newNames[0]})
        this.context.setNameChosen(newNames[this.state.namePositionToDisplay])
  } 

  //This function changes what name is displayed to the user as they cycle through the requests.
  changeNamePositionToDisplay = () => {
    if(this.state.namePositionToDisplay < this.state.selectedNames.length - 1){
      this.setState({namePositionToDisplay: this.state.namePositionToDisplay + 1})
      this.context.setNameChosen(this.state.selectedNames[this.state.namePositionToDisplay + 1])
      localStorage.setItem('namePositionToDisplay', this.state.namePositionToDisplay + 1)
    }
    else{
      this.setState({namePositionToDisplay: 0})
      this.context.setNameChosen(this.state.selectedNames[0])
      localStorage.setItem('namePositionToDisplay', 0)
    }
  }
    
  //This section renders the end user interface for this component.  
  render() {
      const {namePositionToDisplay} = this.state
      const displayName = this.state.selectedNames[namePositionToDisplay] || 'Taylor'
      return (
          <section className='NamePresentation'> 
        <div>
            <h2>How Does</h2>
            <h3>{displayName}</h3>
            <p>Make You Feel?</p>
        </div>
        <div className= 'optionContainer'>
        <button className= 'moreNames' type='button' onClick={this.changeNamePositionToDisplay}>
            Let's Try Again
        </button>
        </div>
        <div className= 'optionContainer'>
        <Link className='linkToTips' to={'/tips'}>
          I Love It! Give Me Tips!
        </Link>
        </div>
        <div className= 'optionContainer'>
        <Link className= 'backToSelection' to={'/selectionPage'}>
          Want to change your choices? Click here to go back to the option selection page
        </Link>
        </div>
          </section>
      );
    }
  }
    
  export default NamePresentation;



