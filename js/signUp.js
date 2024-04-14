let checkboxState = false;

/**
 * Initializes event listeners for UI elements related to the checkbox,
 * password input fields, and password visibility toggles upon DOM content fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.signUp-button').disabled = true;
	document.getElementById('checkboxImg').onclick = toggleCheckbox;
	document.getElementById('password').oninput = () => handlePasswordInput('password');
	document.getElementById('confirmPw').oninput = () => handlePasswordInput('confirmPw');
	document.getElementById('passwordIcon').onclick = () =>
		togglePasswordVisibility('password', 'passwordIcon');
	document.getElementById('confirmPwIcon').onclick = () =>
		togglePasswordVisibility('confirmPw', 'confirmPwIcon');
});


/**
 * Toggles the state of the checkbox and updates the checkbox image
 * based on the current state.
 */
function toggleCheckbox() {
	checkboxState = !checkboxState;
	const checkboxImg = document.getElementById('checkboxImg');
	checkboxImg.src = checkboxState ? '../img/CheckboxCheck.png' : '../img/Checkbox.png';
	document.querySelector('.signUp-button').disabled = !checkboxState;
}

/**
 * Handles input events on password fields and updates the icon
 * to indicate whether the field is empty or contains text.
 *
 * @param {string} fieldId - The ID of the password input field.
 */
function handlePasswordInput(fieldId) {
	const field = document.getElementById(fieldId);
	const iconId = fieldId + 'Icon';
	const icon = document.getElementById(iconId);
	icon.src = field.value ? '../img/HidePassword.png' : '../img/Lock.png';
}

/**
 * Toggles the visibility of the password in the specified field
 * and updates the icon to reflect the current visibility state.
 *
 * @param {string} fieldId - The ID of the password input field.
 * @param {string} iconId - The ID of the icon indicating visibility state.
 */
function togglePasswordVisibility(fieldId, iconId) {
	const field = document.getElementById(fieldId);
	const icon = document.getElementById(iconId);

	if (!field.value) {
		return;
	}

	field.type = field.type === 'password' ? 'text' : 'password';
	icon.src = field.type === 'password' ? '../img/HidePassword.png' : '../img/ShowPassword.png';
}

/**
 * Validates the form by checking the checkbox state and comparing the passwords.
 * Prevents form submission if validations fail.
 *
 * @param {Event} event - The form submission event.
 * @returns {boolean} - False if validations fail, to prevent form submission.
 */
function validateForm(event) {
	event.preventDefault();
	const password = document.getElementById('password').value;
	const confirmPw = document.getElementById('confirmPw').value;

	if (!validateCheckbox() || !comparePasswords(password, confirmPw)) {
		return false;
	}
	addUser();
}

/**
 * Validates the state of the checkbox.
 *
 * @returns {boolean} - True if the checkbox is checked, false otherwise.
 */
function validateCheckbox() {
	if (!checkboxState) {
		alert('Please accept the privacy policy by clicking the checkbox.');
		return false;
	}
	return true;
}

/**
 * Compares the password and confirm password fields for equality.
 * Clears the fields and displays an error message if they do not match.
 *
 * @param {string} password - The password entered.
 * @param {string} confirmPw - The confirmation password entered.
 * @returns {boolean} - True if the passwords match, false otherwise.
 */
function comparePasswords(password, confirmPw) {
	if (password !== confirmPw) {
		document.getElementById('password').value = '';
		document.getElementById('confirmPw').value = '';
		const wrongPwElement = document.querySelector('.wrongPw');
		wrongPwElement.style.color = '#FF8190';

		setTimeout(() => {
			wrongPwElement.style.color = 'white';
		}, 3000);

		return false;
	}
	return true;
}

/**
 * Adds a new user to the users array and logs a message.
 * Redirects to the login page after adding the user.
 */
async function addUser() {
 const name = document.getElementById('name').value;
 const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;

 let newUser = {
     name: name,
     email: email,
     password: password
 };

 // Benutzer zum lokalen Array hinzufügen
 users.push(newUser);
 console.log("Added to local array:", newUser);

 // Benutzerdaten als String für die Speicherung aufbereiten
 let userString = JSON.stringify(newUser);
 
 try {
     // Versuch, den Benutzer auf dem Server zu speichern
     const response = await setItem('user-' + email, userString);
     console.log("Response from server:", response);
     if (response.status === 'success') {
         showPopup();
         displayUsers();  // Zeige Popup bei Erfolg
     } else {
         console.error('Failed to save user:', response);
         // Optional: Entfernen des Benutzers aus dem lokalen Array, falls das Speichern fehlschlägt
         users.pop();
     }
 } catch (error) {
     console.error('Error saving user:', error);
     // Optional: Entfernen des Benutzers aus dem lokalen Array, falls das Speichern fehlschlägt
     users.pop();
 }
}



async function retrieveUser(email) {
 try {
     const userData = await getItem('user-' + email);
     const user = JSON.parse(userData);
     console.log("Retrieved user data:", user);
     return user;
 } catch (error) {
     console.error('Error retrieving user:', error);
 }
}




/**
 * Displays a popup message indicating successful sign-up.
 */
function showPopup() {
	const popup = document.createElement('div');
	popup.className = 'popup';
	popup.textContent = 'You Signed Up successfully';

	const signUpField = document.querySelector('.signUpField');
	if (signUpField) {
		signUpField.appendChild(popup);
		popup.style.position = 'absolute';
		popup.style.display = 'flex';
	}

	setTimeout(() => {
		popup.style.display = 'none';
		redirectToLogin();
	}, 1000);
}

/**
 * Redirects the user to the login page.
 */
function redirectToLogin() {
	window.location.href = 'http://127.0.0.1:5501/LogIn/logIn.html';
}
function displayUsers() {
 console.log("Current users in the array:");
 users.forEach((user, index) => {
     console.log(`User ${index + 1}: Name - ${user.name}, Email - ${user.email}`);
 });
}
