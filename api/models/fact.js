const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const factSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true }
})

factSchema.plugin(AutoIncrement, { id: 'fact_id_seq', inc_field: 'fact_id'})

module.exports = mongoose.model('Fact', factSchema)
