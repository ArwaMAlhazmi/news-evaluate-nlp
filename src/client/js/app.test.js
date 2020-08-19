import "regenerator-runtime/runtime";

//aysnc function test 'evaluateSentiment'
test('proxy server returns an object with an agreement item', () => {
	const { evaluateSentiment } = require('./app.js');
	return evaluateSentiment('http://localhost:8081/sentimentapi', 'https://www.google.com/').then(data => {
		expect(data.agreement).toBeTruthy();
	})
})