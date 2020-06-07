import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { render } from 'react-dom';



//This component is the first thing a user sees when they go to this app. 
// It is rendered on the '/' path, and serves as an introduction to what this app does
// and why a user may wish to use it.

class LandingPage extends Component {

render() {
  return (
      <section className='Landing'> 
          <div>
              <h1>TRUE YOU</h1>
              <p>There comes a time in all our lives where we question</p>
              <p>Is this really who I am?</p>
              <p>Sometimes, the answer we find inside ourselves raises a need.</p>
              <p>A need for change.</p>
              <p>Sometimes a small change. Sometimes a large change.</p>
              <p>Sometimes that change means finding a new name</p>
              <p>TRUE YOU. Find yourself. Find Your Name.</p>
          </div>
          <Link className= 'LandingToSelection' to={'/selectionPage'}>
            Get Started
          </Link>
      </section>
  );
}
}

export default LandingPage
