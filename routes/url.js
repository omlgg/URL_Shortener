var express = require('express');
var router = express.Router();
const { getURL, updateURL, deleteURL, addURL, getURLStat, updateAccessCount} = require('../database/dbservices');

/* GET url. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL Shortener' });
});

// Get shortened URL
router.get('/:shortURL', async function(req, res, next) {
    shortURL = req.params['shortURL'];
    
    getURL(shortURL, (err, result) => {
        try {
            if (err) throw err;
            if (result.length == 0) 
                throw new Error("Cannot find URL");

            updateAccessCount(shortURL);
            res.send(result[0]);
        }
        catch (error) {
            res.status(404).send('Cannot find URL');
            return;
        }
    });
});

//POST shortened URL
router.post('/', function(req, res, next) {
    shortURL = req.body['shortURL'];
    longURL = req.body['longURL'];
    
    addURL(shortURL, longURL, (err, result) => {
        try {
            if (err) throw err;
            //res.status(200).send('URL Created');
            getURL(shortURL, (err, result) => {
                try {
                    if (err) throw err;
                    if (result.length == 0) 
                        throw new Error("Cannot find URL");
        
                    res.status(201).send(result[0]);
                }
                catch (error) {
                    res.status(404).send('Cannot find URL');
                    return;
                }
            });
        } catch (error) {
            res.status(400).send('Cannot create URL');
            return;
        }
    });
    
    
});

//Modify shortened URL
router.delete('/:shortURL', function(req, res, next) {
    shortURL = req.params['shortURL'];

    getURL(shortURL, (error, result) =>{
        try{
            if (error) throw error;
            if (result.length == 0) throw new Error("URL not found");
            deleteURL(shortURL, (error, result) => {
                try {
                    if (error) throw error;
                    res.status(200).send("URL removed");
                } catch (error) {
                    res.status(500).send("Unable to delete URL, please check again if URL exists");
                }
            })
        } catch (err) {
            res.status(404).send("URL does not exist");
            return;
        }
    });
    
    
});

//Modify shortened URL
router.put('/', function(req, res, next) {
    shortURL = req.body['shortURL'];
    longURL = req.body['longURL']
    
    updateURL(shortURL, longURL, (error, result) => {
        try {
            if (error) throw error;
            ///res.status(200).send("URL updated");
            getURL(shortURL, (err, result) => {
                try {
                    if (err) throw err;
                    if (result.length == 0) 
                        throw new Error("Cannot find URL");
        
                    res.status(200).send(result[0]);
                }
                catch (error) {
                    res.status(404).send('Cannot find URL');
                    return;
                }
            });
        } catch (error) {
            res.status(400).send("Unable to update URL, please check again if URL exists");
            return;
        }
    });

    
});



router.get('/:shortURL/stats', async function(req, res, next) {
    shortURL = req.params['shortURL'];
    
    getURLStat(shortURL, (err, result) => {
        try {
            if (err) throw err;
            //console.log(result)
            if (result.length == 0) 
                throw new Error("Cannot find URL");
            res.send(result[0]);
        }
        catch (error) {
            res.status(404).send('Cannot find URL');
            return;
        }
    });
    
});



module.exports = router;
