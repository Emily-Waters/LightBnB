const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = {
  query: (queryString, queryParams) => {
    console.log('In index.js!');
    console.log('Query string: ',queryString);
    return pool
      .query(queryString, queryParams);
  }
};