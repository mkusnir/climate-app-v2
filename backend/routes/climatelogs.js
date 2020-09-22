const router = require('express').Router();
const ClimateLog = require('../models/climatelog.model');

// Handles GET requests on /
router.route('/').get((req, res) => {
  ClimateLog.find()
    .then(ClimateLogs => res.json(ClimateLogs))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Handles GET requests on /latest, returns the most recent entry in the database
router.route('/latest').get((req, res) => {
  ClimateLog.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
  .then(ClimateLog => res.json(ClimateLog))
  .catch(err => res.status(400).json('Error: ' + err));
});

// Handles POST requests on /add
router.route('/add').post((req, res) => {
  // parses request body for sampleData (add other vars here)
  const temperature = req.body.temperature;
  const humidity = req.body.humidity;
  const pressure = req.body.pressure;
  const co2 = req.body.co2;
  const freeMem = req.body.freeMem;
  const timestamp = req.body.timestamp;

  // Creates newClimateLog with parsed data
  const newClimateLog = new ClimateLog({temperature, humidity, pressure, co2, freeMem, timestamp});

  newClimateLog.save()
    .then(() => res.json('Climate Log added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;