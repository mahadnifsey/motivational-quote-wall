const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

// Updated to remove key - fix this`
let db,
    connectionString = process.env.DB_STRING,
    dbName = 'star-wars-quotes'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    db = client.db(dbName)
    const quotesCollection = db.collection('quotes')


    // MiddleWare
    //============
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.static('public'))  // Makes this public folder accessible.
    app.use(bodyParser.json()) // Teaching our server to read JSON data.


    // Routes
    //============
    app.get('/', (req, res) => {
      quotesCollection.find().toArray()
        .then(results => {
          console.log(results)
          res.render('index.ejs', {quotes: results}) // Once promise is furfilled, it will render to index
        })
        .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body) 
        .then(result => {
          console.log(result)
          res.redirect('/') // After submit, this will redirect and refresh page
        })
        .catch(error => console.error(error))
    })

    // Update - Finding and changing item in database
    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Grant Cardone'},
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true // If no such quote exists, upsert will create a new quote.
        }
      )
        .then(result => {
          console.log(result)
          res.json('Success')
        })
        .catch(error => console.error(error))
    })

    // Delete - Find and Delete item in database
    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name } // We already passed the name 'Dan Lok' from Fetch method in main.js we can instead use req.body.name instead
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json(`Deleted Dan Lok quote`)
        })
        .catch(error => console.error(error))
    })

    // app.listen(3000, function() {
    //   console.log('listening on 3000')
    // });
    //Server Running
    app.listen(process.env.PORT, () => {
      console.log("Server is running, you better catch it!");
    });
  })