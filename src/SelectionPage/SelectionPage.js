import React, { Component } from  'react';
import PropTypes from 'prop-types';
import NameRecordsContext from '../NameRecordsContext';
import './SelectionPage.css';
import { Link } from 'react-router-dom';

//This component allows the user to select the gender and era of the name they feel
//may best fit them. Those choices are then captured in setState calls as well as
//update context for the app overall.

class SelectionPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = NameRecordsContext;



  state = {
    error: null,
    id: '',
    name: '',
    gender: 'M',
    era: 'Classic',
    recent: null,
    maleClicked: false,
    femaleClicked: false,
    nonBinaryClicked: false,
    classicEraClicked: false,
    modernEraClicked: false,
    activeBackgroundColor: 'rgb(221, 73, 73)',
    nonActiveBackgroundColor: 'green',
    maleBackground: 'green',
    femaleBackground: 'green',
    nonBinaryBackground: 'green',
    classicEraBackground: 'green',
    modernEraBackground: 'green',
  };


  //The functions below are in charge of the various data and setState calls that capture
  //the data neccessary for the app.

  selectNameRecords = nameRecords => {
    this.setState({
      nameRecords,
      error: null,
    })
  };

  //These functions change the selected gender based on the input of the user

  handleChangeGender = value => {
    this.setState({ gender: value })
  };

  handleChangeGenderMale = () => {
    this.setState({gender: "M"})
  };

  handleChangeGenderFemale = () => {
    this.setState({gender: "F"})
  };

  handleChangeGenderNonBinary = () => {
    this.setState({gender: "B"})
  };

  handleChangeEra = value => {
    this.setState({ era: value })
  };

  handleChangeEraClassic = () => {
    this.setState({ era: "Classic" })
  };

  handleChangeEraModern = () => {
    this.setState({ era: "Modern" })
  };


  //This set of functions is called when the corresponding button is clicked and handles
  //changing which button is active

  clickedMale = () => {
    if(this.state.maleClicked === false){
      this.setState({maleClicked: true, femaleClicked: false, nonBinaryClicked: false})
    }
  }

  clickedFemale = () => {
    if(this.state.femaleClicked === false){
    this.setState({maleClicked: false, femaleClicked: true, nonBinaryClicked: false})
    }
  }

  clickedNonBinary = () => {
    if(this.state.nonBinaryClicked === false){
    this.setState({maleClicked: false, femaleClicked: false, nonBinaryClicked: true})
    }
  }

  clickedClassicEra = () => {
    if(this.state.classicEraClicked === false){
    this.setState({classicEraClicked: true, modernEraClicked: false})
    }
  }

  clickedModernEra = () => {
    if(this.state.modernEraClicked === false){
    this.setState({modernEraClicked: true, classicEraClicked: false})
    }
  }


//These functions change state values based off what the user has clicked. It is responsible
//for making sure the active button is correctly displayed to the user and shows a different
//background based on if a button is active or not. This provides a good user experience by
//making it clear what options they have chosen. 

  genderColorCheck = () => {

    if(this.state.maleClicked === true){
      if(this.state.maleBackground !== this.state.activeBackgroundColor){
        this.setState({maleBackground: this.state.activeBackgroundColor, femaleBackground:this.state.nonActiveBackgroundColor, nonBinaryBackground:this.state.nonActiveBackgroundColor  })
      }
    }
    if(this.state.femaleClicked === true){
      if(this.state.femaleBackground !== this.state.activeBackgroundColor){
        this.setState({femaleBackground: this.state.activeBackgroundColor, maleBackground:this.state.nonActiveBackgroundColor, nonBinaryBackground:this.state.nonActiveBackgroundColor  })
      }
    }
    if(this.state.nonBinaryClicked === true){
      if(this.state.nonBinaryBackground !== this.state.activeBackgroundColor){
        this.setState({nonBinaryBackground: this.state.activeBackgroundColor, maleBackground:this.state.nonActiveBackgroundColor, femaleBackground:this.state.nonActiveBackgroundColor  })
      }
    }
  }

  eraColorCheck = () => {

    if(this.state.classicEraClicked === true){
      if(this.state.classicEraBackground !== this.state.activeBackgroundColor){
        this.setState({classicEraBackground: this.state.activeBackgroundColor, modernEraBackground:this.state.nonActiveBackgroundColor})
      }
    }
    if(this.state.modernEraClicked === true){
      if(this.state.modernEraBackground !== this.state.activeBackgroundColor){
        this.setState({modernEraBackground: this.state.activeBackgroundColor, classicEraBackground:this.state.nonActiveBackgroundColor})
      }
    }
  }

  componentDidUpdate(){
    this.genderColorCheck()
    this.eraColorCheck()
  }

  
  //This function prevents the default submit action, and then replaces it with corresponding
  //setState and context calls. 
  handleSubmit = e => {
    e.preventDefault()
    const { gender, era } = this.state
    const newNameRequest = { gender, era }
    this.context.setGender(newNameRequest)
    this.context.setEra(newNameRequest)
  }

  //This section renders the end user interface for this component.
    render() {
    const { error } = this.state
    return (
      <section className='SelectNameRecord'>
        <h2>What type of name you are looking for?</h2>
        <form
          className='SelectNameRecord__form'
          onSubmit={this.handleSubmit}
        >
          <div className='SelectNameRecord__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div className='button-container'>
            <h3>Please select the prefered gender of your name</h3>
              <button className="selectorButton selectorButtonOn" onClick = {() => {this.handleChangeGenderMale(); this.clickedMale();} } style= {{backgroundColor: this.state.maleBackground}} >Male</button>
              <button className="selectorButton selectorButtonOn" onClick = {() => {this.handleChangeGenderFemale(); this.clickedFemale();} } style= {{backgroundColor: this.state.femaleBackground}}>Female</button>
              <button className="selectorButton selectorButtonOn" onClick = {() => {this.handleChangeGenderNonBinary(); this.clickedNonBinary();} } style= {{backgroundColor: this.state.nonBinaryBackground}}>Both/NonBinary</button>
            <h3>Please select whether you prefer a name that is more Classic or Modern</h3>
              <button className="selectorButton selectorButtonOn" onClick = {() => {this.handleChangeEraClassic(); this.clickedClassicEra();} } style= {{backgroundColor: this.state.classicEraBackground}}>Classic</button>
              <button className="selectorButton selectorButtonOn" onClick = {() => {this.handleChangeEraModern(); this.clickedModernEra();} } style= {{backgroundColor: this.state.modernEraBackground}}>Modern</button>
          </div>
            <br></br>
          <Link className= 'selectionLink' to={'/namePresentation'}>
            Find My Name
          </Link>
        </form>
      </section>
    );
  }
}

export default SelectionPage;
