//This file is neccessary to set the relevant variable values we want to obfuscate  
//in our code for security.

export default {
  API_ENDPOINT: `http://localhost:8800/api/namerecords`,
  API_KEY: process.env.REACT_APP_API_KEY,
}
