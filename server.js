var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
//Require environment variables
require('dotenv').config()

const app = express()

/* Middleware*/
app.use(express.static('dist'))
// app.use(express.static('../../dist'))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('../../dist/index.html'))
})

app.post('/sentimentapi', async (req, res) => {
	const app_key = process.env.API_KEY
	const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${app_key}&url=${req.body.url}&lang=en`
	
	try {

		let response = await fetch(apiUrl)

		let data = await response.json()
		if(data.status.msg === 'OK') {

			const evaluation = {}
			evaluation.agreement = data.agreement
			evaluation.irony = data.irony
			evaluation.subjectivity = data.subjectivity
			evaluation.confidence = data.confidence
			res.json(evaluation)
		} else {
			res.json({Error: data.status.msg})
		}

	} catch {
		res.status(500).send({status: 'error'})
	}
	
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('App listening on port 8081!')
})