//Dom Manuplation test 'validateForm'
test('Check validateForm able add class was-validated to .needs-validation form ', () => {

  document.body.innerHTML = `
    <form class="urlEntryForm needs-validation" novalidate>
        <label for="userUrl">Enter the url of the article or blog:</label><br>
        <input id="userUrl" type="text" name="input" value=""  placeholder="The url should start with https:// or http://" pattern="[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)" required>
        <div class="validation-text"></div>
        <button type="button" id="evaluate" name="" value="submit"> Evaluate </button>
    </form>
  `;

  const { validateForm } = require('./helper.js');

  const urlEntryForm = document.querySelector('.urlEntryForm');
  const userUrlInput = document.getElementById('userUrl');
  const evaluateBtn = document.getElementById('evaluate');

  evaluateBtn.addEventListener('click', (event)=> {
    validateForm(event)
  });

  userUrlInput.value = 'test';
  evaluateBtn.click();

  expect(urlEntryForm.classList.contains('was-validated')).toBeTruthy();
});
