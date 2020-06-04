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
    gender: '',
    era: '',
    recent: null,
  };


  //The functions below are in charge of the various data and setState calls that capture
  //the data neccessary for the app.

  selectNameRecords = nameRecords => {
    this.setState({
      nameRecords,
      error: null,
    })
  }

  handleChangeGender = value => {
    this.setState({ gender: value })
  };

  handleChangeEra = value => {
    this.setState({ era: value })
  };

  handleChangeGenderMale = () => {
    this.setState({gender: "M"})
  }

  handleChangeGenderFemale = () => {
    this.setState({gender: "F"})
  }

  handleChangeGenderNonBinary = () => {
    this.setState({gender: "B"})
  }

  handleChangeEraClassic = () => {
    this.setState({ era: "Classic" })
  };

  handleChangeEraModern = () => {
    this.setState({ era: "Modern" })
  };


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
        <h2>Tell us a bit about the what type of name you are looking for</h2>
        <form
          className='SelectNameRecord__form'
          onSubmit={this.handleSubmit}
        >
          <div className='SelectNameRecord__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
            <h3>Please select the prefered gender of your name</h3>
              <button onClick = {this.handleChangeGenderMale}>Male</button>
              <button onClick = {this.handleChangeGenderFemale}>Female</button>
              <button onClick = {this.handleChangeGenderNonBinary}>Both/NonBinary</button>
            <h3>Please select whether you prefer a name that is more Classic or Modern</h3>
              <button onClick = {this.handleChangeEraClassic}>Classic</button>
              <button onClick = {this.handleChangeEraModern}>Modern</button>
            <br></br>
          <Link to={'/namePresentation'}>
            Find My Name
          </Link>
        </form>
      </section>
    );
  }
}

export default SelectionPage;
