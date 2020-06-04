import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NameRecordsContext from '../NameRecordsContext';
import NameRecordItem from '../NameRecordItem/NameRecordItem';
import './NameRecordList.css'


//This component handles the rendering of the namerecords that are present in the TRUE YOU
//database. 
class NameRecordList extends Component {
  static proptTypes = {
    nameRecords: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]).isRequired,
      })
    )
  };

  static defaultProps = {
    nameRecords: []
  };

  static contextType = NameRecordsContext;


  //This function maps through each record, and creates a component for each entry,
  //which is then rendered on the screen for the user.  
  render() {
    const { nameRecords } = this.context
    return (
      <section className='NameRecordList'>
        <h2>Your Names</h2>
        <ul className='NameRecordList__list' aria-live='polite'>
          {nameRecords.map(record =>
            <NameRecordItem
              key={record.id}
              {...record}
            />
          )}
        </ul>
      </section>
    );
  }
}

export default NameRecordList;
