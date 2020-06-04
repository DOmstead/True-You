import React, { Component } from  'react';
import PropTypes from 'prop-types';
import NameRecordsContext from '../NameRecordsContext';
import config from '../config'
import './EditNameRecord.css';

const Required = () => (
  <span className='EditNameRecord__required'>*</span>
)


//This section sets up the EditNameRecord component. It is used to make patch requests to
//the server if a name needs to be updated. This is handy in case an entry is faulty in some
//way, such as having the incorrect spelling or classification. 
class EditNameRecord extends Component {
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

  //This API call runs when the component is mounted, allowing us to edit the specific 
  //requested record.

  // componentDidMount() {
  //   const { nameRecordId } = this.props.match.params
  //   fetch(config.API_ENDPOINT + `/${nameRecordId}`, {
  //     method: 'GET',
  //     headers: {
  //       'authorization': `Bearer ${config.API_KEY}`
  //     }
  //   })
  //     .then(res => {
  //       if (!res.ok)
  //         return res.json().then(error => Promise.reject(error))

  //       return res.json()
  //     })
  //     .then(responseData => {
  //       this.setState({
  //         id: responseData.id,
  //         name: responseData.name,
  //         gender: responseData.gender,
  //         era: responseData.era,
  //         recent: responseData.recent,
  //       })
  //     })
  //     .catch(error => {
  //       console.error(error)
  //       this.setState({ error })
  //     })
  // }


  //This series of functions target specific pieces of data and call the setState 
  //function accordingly 
  handleChangeName = e => {
    this.setState({ name: e.target.value })
  };

  handleChangeGender = e => {
    this.setState({ gender: e.target.value })
  };

  handleChangeEra = e => {
    this.setState({ era: e.target.value })
  };

  handleChangeRecent = e => {
    this.setState({ recent: e.target.value })
  };


  //This section dictates what occurs when the user submits the form, checking for 
  //required data, making the relevant api call, and setting state accordingly. 

  handleSubmit = e => {
    e.preventDefault()
    const { nameRecordId } = this.props.match.params
    const { id, name, gender, era, recent } = this.state
    const newNameRecord = { id, name, gender, era, recent }
    fetch(config.API_ENDPOINT + `/${nameRecordId}`, {
      method: 'PATCH',
      body: JSON.stringify(newNameRecord),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
      .then(() => {
        this.resetFields(newNameRecord)
        this.context.updateNameRecord(newNameRecord)
        this.props.history.push('/')
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  }

//This section automatically resets the fields when the user submits the form.

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      name: newFields.name || '',
      gender: newFields.gender || '',
      era: newFields.era || '',
      recent: newFields.recent || null,
    })
  }

  //This function executes when the edit request is cancelled.
  handleClickCancel = () => {
    this.props.history.push('/')
  };


  //This section renders the end user interface for this component.  
  render() {
    const { error, name, gender, era } = this.state
    return (
      <section className='EditNameRecord'>
        <h2>Edit Name Record</h2>
        <form
          className='EditNameRecord__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditNameRecord__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <input
            type='hidden'
            name='id'
          />
          <div>
            <label htmlFor='name'>
              Name
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter Name Here'
              required
              value={name}
              onChange={this.handleChangeName}
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
              placeholder='Please enter gender as M for Male, F for Female, or B for Both/NonBinary'
              required
              value={gender}
              onChange={this.handleChangeGender}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Is This Name Modern or Classic?
            </label>
            <textarea
              name='era'
              id='era'
              placeholder='Enter "Modern" or "Classic"'
              value={era}
              onChange={this.handleChangeEra}
            />
          </div>
          <div className='EditNameRecord__buttons'>
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

export default EditNameRecord;
