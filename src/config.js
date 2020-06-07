//This file is neccessary to set the relevant variable values we want to obfuscate  
//in our code for security.

export default {
  //This is the API Point for local development prior to production.
  // API_ENDPOINT: `http://localhost:8800/api/namerecords`,
  API_ENDPOINT: `https://floating-basin-86683.herokuapp.com/api/namerecords`,
  API_KEY: process.env.REACT_APP_API_KEY,
}
