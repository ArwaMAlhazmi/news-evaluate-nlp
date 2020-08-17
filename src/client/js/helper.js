/* Function to Handle Async Requests Errors */
export const handleError = (err) => {

	if (err.message){
		console.log(err.message);
		alert(err.message);
	} else {
		alert('Something went wrong, try again later!');
		console.log('Something went wrong, try again later!');
	}
}