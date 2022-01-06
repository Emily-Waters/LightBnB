const db = require('../db');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db
    .query(`SELECT * FROM users WHERE email = $1`,[email])
    .then(res => res.rows[0])
    .catch(err => err);
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db
    .query(`SELECT * FROM users WHERE id = $1`,[id])
    .then(res => res.rows[0])
    .catch(err => err);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return db
    .query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *`, [user.name, user.email, user.password])
    .then(res => res.rows[0])
    .catch(err => err);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db
    .query(`SELECT * FROM properties JOIN reservations ON properties.id = reservations.property_id WHERE reservations.guest_id = $1 LIMIT $2`,
      [guest_id, limit])
    .then(res => res.rows)
    .catch(err => err);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  const whereVerb = 'WHERE';
  const andVerb = 'AND';
  let currentVerb = whereVerb;
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `
    ${currentVerb} city LIKE $${queryParams.length} `;
    currentVerb = andVerb;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `
    ${currentVerb} cost_per_night >= $${queryParams.length} `;
    currentVerb = andVerb;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `
    ${currentVerb} cost_per_night <= $${queryParams.length} `;
    currentVerb = andVerb;
  }

  queryString += `GROUP BY properties.id `;
  queryParams.push(`${options.minimum_rating || 0}`);
  queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night LIMIT $${queryParams.length};`;

  return db
    .query(queryString, queryParams)
    .then(res => res.rows)
    .catch(err => err);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

const addProperty = function(property) {
  //  Honestly, dunno if this is a great idea to write it like this but I wanted to see if I could, and it worked.
  const propKeys = Object.keys(property);
  const queryParams = Object.values(property);
  const tokenList = queryParams.map((x,i) => '$' + ++i).toString();
  const queryString = `
  INSERT INTO properties (${propKeys.toString()}) VALUES (${tokenList}) RETURNING *`;
  return db
    .query(queryString, queryParams)
    .then(res => res.rows[0])
    .catch(err => err);
};
exports.addProperty = addProperty;
