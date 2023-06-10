import Express from 'express'
import Morgan from 'morgan'
import BodyParser from 'body-parser'
import 'dotenv'

import * as RootController from './controller/RootController.js'
import * as SendController from './controller/SendController.js'


// express setting

const app = Express()
app.use(BodyParser.json())

Morgan.token('body', req => JSON.stringify(req.body))
app.use(Morgan(':method :url :status :body - :response-time ms'))

// Route

app.route("/").get(RootController.hi)
app.route('/send').post(SendController.send)

// Server start

const domain = process.env.ENVIRONMENT == 'local' ? 'localhost' : ''
const port = process.env.PORT || 3000
const startText = `
 _______  _______  _______                           __                              __
|     __||   |   ||     __| .-----..-----..-----..--|  | .-----..-----..----..--.--.|__|.----..-----.
|__     ||       ||__     | |__ --||  -__||     ||  _  | |__ --||  -__||   _||  |  ||  ||  __||  -__|
|_______||__|_|__||_______| |_____||_____||__|__||_____| |_____||_____||__|   \\___/ |__||____||_____|

Start Time : ${new Date().toLocaleString()}
Domain: http://${domain}:${port}
`
app.listen(port, async () => {
    console.log(startText)
})
