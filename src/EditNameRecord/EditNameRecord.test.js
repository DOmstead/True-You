import React from 'react';
import ReactDOM from 'react-dom';
import EditNameRecord from './EditNameRecord';

//This test makes sure this component can mount without crashing
it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<EditNameRecord {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
