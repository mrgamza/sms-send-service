const express = require('express')
const http = require('http')

const rootController = require('./controller/RootController');

const startText = `
 _   _      _ _       
| | | | ___| | | ___  
| |_| |/ _ \\ | |/ _ \\ 
|  _  |  __/ | | (_) |
|_| |_|\\___|_|_|\\___/ 

sms send service start.
`

const app = express()
app.use(express.json())

app.route("/").get(rootController.get)

const port = process.env.PORT || 3000
app.listen(port, async () => {
    console.log(startText)
})
