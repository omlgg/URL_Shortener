//import { connection } from "./init";
const connection = require('./init').connection;


exports.getDB = async function getDB(shortURL) {
  let longURL;
  await connection.query('SHOW DATABASES;'), function(error, results, fields) {
    if (error) throw error;
    longURL = results;
  }
  return longURL;
}


exports.getURL = function getURL(shortURL, callback) {
  
  connection.query(`
    SELECT SHORTURL, LONGURL, CREATEDATE, UPDATEDATE from URL WHERE SHORTURL = '${shortURL}';    
    `, 
    
    function(error, results, fields) {
        if (error) {
          //throw error
          callback(error);
          return;
        }
        callback(null, results);
  });
}

exports.updateAccessCount = function (shortURL) {
  connection.query(`
    UPDATE URL
    SET ACCESSCOUNT = ACCESSCOUNT + 1
    WHERE SHORTURL = '${shortURL}';`);
}



exports.addURL = function addURL(shortURL, longURL, callback) {
  connection.query(`
      INSERT INTO URL
      VALUES ('${shortURL}', '${longURL}', NOW(), NOW(), 0);
    `,

    function(error, results, fields) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, results);
    }
  );

}

exports.updateURL = function updateURL (shortURL, longURL, callback) {
  connection.query(`
      UPDATE URL
      SET LONGURL = '${longURL}', UPDATEDATE = NOW()
      WHERE SHORTURL = '${shortURL}';
    `,

    function(error, results, fields) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, results);
    }
  );
}


exports.deleteURL = function deleteURL(shortURL, callback) {
  connection.query(`
      DELETE FROM URL
      WHERE SHORTURL = '${shortURL}';
    `,
    
    function(error, results, fields) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, results);
    }
  );
}

exports.getURLStat = function (shortURL, callback) {
  connection.query(`
      SELECT * FROM URL
      WHERE SHORTURL = '${shortURL}';
    `,
    function(error, results, fields) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, results);
    })
}