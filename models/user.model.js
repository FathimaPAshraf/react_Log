const mongoose = require('mongoose')

const User = new mongoose.Schema(
{
userName: { type: String, required: true },
email: { type: String, required: true, unique: true },
phone: { type: String, required: true },
psw: { type: String, required: true },

},
{ collection: 'notes' }
)

const model = mongoose.model('Notes', User)

module.exports = model