const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://Fathimaashraf:fathy9656@cluster0.go7lq.mongodb.net/intot")

app.post('/api/About', async (req, res) => {
console.log(req.body)
try {
const newPassword = await bcrypt.hash(req.body.psw, 10)
await User.create({
userName: req.body.userName,
email: req.body.email,
phone: req.body.phone,
psw: newPassword,
})
res.json({ status: 'ok' })
} catch (err) {
res.json({ status: 'error', error: 'Duplicate email' })
}
})

app.post('/api/Login', async (req, res) => {
const user = await User.findOne({
userName: req.body.userName,
})

if (!user) {
return { status: 'error', error: 'Invalid login' }
}

const isPasswordValid = await bcrypt.compare(
req.body.psw,
user.psw
)

if (isPasswordValid) {
const token = jwt.sign(
{
userName: user.userName,
psw: user.psw,
},
'secret123'
)

return res.json({ status: 'ok', user: token })
} else {
return res.json({ status: 'error', user: false })
}
})

app.get("/api/data", async(req,res) =>
{
    User.find()
    .then(foundDetails => res.json(foundDetails))

})

app.listen(3001, function() {
    console.log('express server is running on port 3001');
});
