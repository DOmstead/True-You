import React from 'react';
import ReactDOM from 'react-dom';
import AddNameRecord from './AddNameRecord';


//This test makes sure the AddNameRecord component renders without crashing. 
it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    history: {
      push: () => {},
    },
  }
  ReactDOM.render(<AddNameRecord {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
