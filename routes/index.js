//import { getDB } from '../database/dbservices';
const getDB = require('../database/dbservices').getDB;
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
  let val = await getDB('idk'); 
  console.log(val);
});

module.exports = router;
