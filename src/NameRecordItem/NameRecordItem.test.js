import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NameRecordItem from './NameRecordItem';


//This test ensures the app is able to render this component without crashing
it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    name: 'sarah',
    gender: 'F',
    era: 'Modern',
    onClickDelete: () => {},
  }
  ReactDOM.render(
    <BrowserRouter>
      <NameRecordItem {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
