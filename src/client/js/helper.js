/* Function to Handle Async Requests Errors */
export const handleError = (err) => {

	if (err.message){
		console.log(err.message);
		alert(err.message);
	} else {
		alert('Something went wrong, try again later!');
	}
}

//handle form inputs validation
export const validateForm = (evt) => {

	const urlInputForm = document.querySelector('.needs-validation');

	// handle wrong url input
	const urlInput = document.getElementById('userUrl');

	if(urlInput.validity.patternMismatch){
		urlInput.nextElementSibling.innerHTML = 'Enter a valid url please';
	};

	if (urlInputForm.checkValidity() === false){

		evt.preventDefault();
		evt.stopPropagation();
		urlInputForm.classList.add('was-validated');

		return false;
	} else {
		document.querySelector('.needs-validation').classList.remove('was-validated');
		return true;
	};

};
