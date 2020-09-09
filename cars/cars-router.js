const express = require('express');
const db = require('../data/dbConfig.js');
const router = express.Router();

// const knex = require('knex');
// const db = knex({
//     client: 'sqlite3',
//     connection: {
//         filename: './data/cars-dealer.db3'
//     },
//     useNullAsDefault: true
// });

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
      res.status(200).json(cars);
  })
  .catch(error => {
      console.log(error);
      res.status(500).json({
          message: error.message
      });
  });  
});

router.post('/', (req, res) => {
  const carsData = req.body;
  db('cars')
    .insert(carsData)
    .then(ids => {
      db('cars').where({ id: ids[0] })
        .then(newCarEntry => {
            res.status(200).json(newCarEntry);
          });
        })
        .catch(error => {
          console.log(error);
            res.status(500).json({
              message: error.message
          });
      });
});

module.exports = router;