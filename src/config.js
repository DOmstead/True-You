//This file is neccessary to set the relevant variable values we want to obfuscate  
//in our code for security.

export default {
  //This is the API Point for local development prior to production.
  API_ENDPOINT: `https://true-you-api.onrender.com/api/namerecords`,
  API_KEY: process.env.REACT_APP_API_KEY,
}
