var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    password: 'customurl',
    user:'urlshortener',
    database: 'URL' 
});

connection.connect();

connection.query(`select * from URL where SHORTURL = 'fb';`, (err, res, fields) => {
    if (err) throw err;
    console.log("Database connected successfully!");
    if (res.length == 0) 
        console.log('Table is empty')
    else
        console.log(res);
});

exports.connection = connection;
