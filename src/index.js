const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const livereload = require('easy-livereload')
morgan = require('morgan')

const fileMetadaHandler = require('./handler')

dotenv.config()
const app = express()
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :body - :response-time ms'))

const PORT = process.env.PORT

app.use(cors({optionsSuccessStatus: 200}))
app.use('/public', express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: 'false'}))
app.use(bodyParser.json())

if (app.get('env') === 'development') {
    app.use(livereload({
        app: app
    }))
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/form.html');
})

app.post('/api/fileanalyse', fileMetadaHandler)

const listener = app.listen(PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})