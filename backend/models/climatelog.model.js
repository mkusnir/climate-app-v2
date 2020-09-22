const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const climateLogSchema = new Schema({
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  pressure: { type: Number, required: true },
  co2: { type: Number, required: true },
  freeMem: {type: Number, required: true},
  timestamp: { type: Date, required: true }
}, {

});

climateLogSchema.index({createdAt: 1},{expireAfterSeconds: 604800});
const ClimateLog = mongoose.model('ClimateLog', climateLogSchema);

module.exports = ClimateLog;