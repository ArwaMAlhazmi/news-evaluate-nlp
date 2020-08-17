var path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')
//Require environment variables
require('dotenv').config()
// const app_key = process.env.API_KEY

const app = express()

/* Middleware*/
// app.use(express.static('dist'))
app.use(express.static('../../dist'))
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('../../dist/index.html'))
})

app.post('/sentimentapi', async (req, res) => {
	const app_key = process.env.API_KEY
	const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${app_key}&url=${req.body.url}&lang=en`
	console.log(apiUrl)

	let response = await fetch(apiUrl)

	//handle not 200 response
	if(!response.ok){
		console.log('server api call response error')
		throw new Error
	}

	let data = await response.json()
	if(data.status.msg === 'OK') {

		const evaluation = {}
		evaluation.agreement = data.agreement
		evaluation.irony = data.irony
		evaluation.subjectivity = data.subjectivity
		evaluation.confidence = data.confidence
		res.json(evaluation)
	} else {
		console.log('server api call data error')
		throw new Error(data.status.msg)
		//res.json({msg: data.status.msg})
	}
	
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('App listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})