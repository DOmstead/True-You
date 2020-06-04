import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NameRecordsContext from '../NameRecordsContext';
import config from '../config';
import './NameRecordItem.css';


//This function performs an api request that allows us to remove a record
function deleteNameRecordRequest(nameRecordId, cb) {
  fetch(config.API_ENDPOINT + `/${nameRecordId}`, {
    method: 'DELETE',
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
      cb(nameRecordId)
    })
    .catch(error => {
      console.error(error)
    })
}

//This section handles what renders for the end user.
export default function NameRecordItem(props) {
  return (
    <NameRecordsContext.Consumer>
      {(context) => (
        <li className='NameRecordItem'>
          <div className='NameRecordItem__row'>
            <h3 className='NameRecordItem__name'>
              <p
                target='_blank'
                rel='noopener noreferrer'>
                {props.name}
              </p>
            </h3>
          </div>
          <p className='NameRecordItem__era'>
            {props.era}
          </p>
          <div className='NameRecordItem__buttons'>
            <Link to={`/edit/${props.id}`}>
              Edit
            </Link>
            {' '}
            <button
              className='NameRecordItem__description'
              onClick={() =>
                deleteNameRecordRequest(props.id, context.deleteNameRecord)
              }>
              Delete
            </button>
          </div>
        </li>
      )}
    </NameRecordsContext.Consumer>
  )
}

NameRecordItem.defaultProps = {
  onClickDelete: () => {},
}

//This sets the relevant proptypes and requires the neccessary pieces. 
NameRecordItem.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  era: PropTypes.string.isRequired,
  recent: PropTypes.string,
  onClickDelete: PropTypes.func,
}
