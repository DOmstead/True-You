import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NameRecordsContext from '../NameRecordsContext';
import './Tips.css';
import { render } from 'react-dom';



//This component provides Tips to the user once they select a name they feel fits them.

class Tips extends Component {

    static contextType = NameRecordsContext;

    state = {
        error: null,
        gender: this.context.gender,
        era: this.context.era,
        recent: this.context.recent,
        nameChosen: this.context.nameChosen,
    };

//This sections renders the tips about next steps for the user.
render() {
  return (
      <section className='Tips'> 
          <div>
              <h2>{this.context.nameChosen}</h2>
              <h2>Congratulations!</h2>
              <p className= 'topP'>You've taken the first step towards choosing the True You</p>
              <p className= 'topP'>Here are a few more steps you can take to find out if this name is right for you longterm</p>
              <ol>
                  <ul>
                    <li>Go to a local coffee shop and when they ask for your name, try giving them this one</li>
                    <li>How did it feel when they called out your new name?</li>
                  </ul>
                  <ul>
                    <li>Tell a friend you are considering changing your name and ask them to try using it</li>
                    <li>Did you like it when they said your name?</li>
                  </ul>
                  <ul>
                      <li>Practicing by your self is a great choice as well!</li>
                      <li>Look in the mirror and practice introducing yourself using this new name. Did it make you smile?</li>
                  </ul>
              </ol>
              <p className= 'bottomP'>If you decide this name is not for you click the link below to go back to the selection page, or click the home link to start again</p>
          </div>
          <div>
          <Link className= 'tryAgain' to={'/selectionPage'}>
            Let's Try Again
          </Link>
          </div>
      </section>
  );
}
}

export default Tips
