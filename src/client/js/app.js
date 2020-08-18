import { handleError, validateForm } from './helper.js'

//Function to request api call through proxy server
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
		throw new Error;
	}

	const data = await response.json();
	return data;
}

// Function to get the uer url
const getUserUrl = (evt) => {
	const userUrl = document.querySelector('#userUrl').value;
	return userUrl;
}

//Function to update the UI with the analysis data
const updateUI = (data) => {

	const evalutionDiv = document.querySelector('#results');

	Object.keys(data).forEach(key => {
		const valueHolder = document.createElement('div');
		valueHolder.classList.add(`${key}`);
		valueHolder.innerHTML = `${key} : ${data[key]}`;
		evalutionDiv.appendChild(valueHolder);
	});

}

/* execution starts here */
// Event listener to add function to existing HTML DOM element
document.addEventListener('DOMContentLoaded',  () => {

	const evaluateBtn = document.querySelector('#evaluate');
	evaluateBtn.addEventListener('click', async (evt) => {

		document.querySelector('#results').innerHTML = '';
		try {
			if(validateForm(evt)) {
				const userUrl = getUserUrl(evt);
				const evaluationResult = await evaluateSentiment('/sentimentapi', userUrl);
				updateUI(evaluationResult);
			}
		} catch (err) {
			handleError(err);
		}

	});

});