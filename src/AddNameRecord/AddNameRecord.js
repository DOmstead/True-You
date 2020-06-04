import React, { Component } from  'react';
import PropTypes from 'prop-types';
import NameRecordsContext from '../NameRecordsContext';
import config from '../config'
import './AddNameRecord.css';

const Required = () => (
  <span className='AddNameRecord__required'>*</span>
)

class AddNameRecord extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = NameRecordsContext;

  state = {
    error: null,
  };

  //This section dictates what occurs when the user submits the form, checking for 
  //required data, making the relevant api call, and setting state accordingly. 

  handleSubmit = e => {
  // This section prevents the default behavior and grabs the neccessary data values.
    e.preventDefault()
    const { name, gender, era } = e.target
    const nameRecord = {
      name: name.value,
      gender: gender.value,
      era: era.value,
    }

  //This api call sends the POST request to our server, adding the new name to our database.
  //This section is not used in the user accessible area but was built to allow the database to be expanded at will.
    this.setState({ error: null })
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(nameRecord),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(data => {
        name.value = ''
        gender.value = ''
        era.value = ''
        this.context.addNameRecord(data)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

  //This function handles what happens when a user clicks cancel on the form.
  handleClickCancel = () => {
    this.props.history.push('/')
  };


  //This section renders the end user interface for this component.  
  render() {
    const { error } = this.state
    return (
      <section className='AddNameRecord'>
        <h2>Want to add a new name to our ever expanding collection?</h2>
        <form
          className='AddNameRecord__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddNameRecord__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Name
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter the new name here'
              required
            />
          </div>
          <div>
            <label htmlFor='gender'>
              Gender
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='gender'
              id='gender'
              placeholder='Please put M for Male, F for Female, or B for Both/NonBinary'
              required
            />
          </div>
          <div>
            <label htmlFor='era'>
              Era
            </label>
            <textarea
              name='era'
              id='era'
              placeholder='Please choose Classic or Modern'
              required
            />
          </div>
          <div className='AddNameRecord__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default AddNameRecord;
