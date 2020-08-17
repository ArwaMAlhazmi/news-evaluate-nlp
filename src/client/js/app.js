import { handleError } from './helper.js'

//Function to 
const evaluateSentiment = async (url='', userUrl='') => {

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify({url: userUrl}),
		headers:{
			"Content-type": "application/json; charset=UTF-8"
		}
	});

	//handle not 200 response
	if(!response.ok){
		console.log('evaluateSentiment Error thrown');
		throw new Error;
	}

	const data = await response.json();
	return data;
}

//
const getUserUrl = () => {
	const userUrl = document.querySelector('#userUrl').value;
	return userUrl;
}

//
const updateUI = (data) => {

	const evalutionDiv = document.querySelector('#results');
	evalutionDiv.innerHTML = '';

	Object.keys(data).forEach(key => {
		const valueHolder = document.createElement('div');
		valueHolder.classList.add(`${key}`);
		valueHolder.innerHTML = `${key} : ${data[key]}`;
		evalutionDiv.appendChild(valueHolder);
	});

 	// document.querySelector('.urlEntryForm').reset();
}

/* execution starts here */
// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded',  () => {

	const evaluateBtn = document.querySelector('#evaluate');
	evaluateBtn.addEventListener('click', async () => {

		try {
			const userUrl = getUserUrl();
			const evaluationResult = await evaluateSentiment('/sentimentapi', userUrl);
			updateUI(evaluationResult);
		} catch (err) {
			console.log('inside catch error thrown');
			handleError(err);
		}

	});

});