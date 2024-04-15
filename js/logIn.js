document.addEventListener('DOMContentLoaded', () => {
 initAnimations();
 const loginButton = document.querySelector('.logIn-button');
 if (loginButton) {
     loginButton.addEventListener('click', validateLogin);
 }
});

/**
* Initializes animations for the website's logo and content visibility.
*/
function initAnimations() {
 const logo = document.querySelector('.logo-icon');
 const websiteContent = document.querySelector('.Website');
 setTimeout(() => {
     websiteContent.style.display = 'flex';
 }, 500);
 setTimeout(() => {
     animateLogo(logo);
 }, 3500);
}

/**
* Animates the logo by setting its position, size, and transformation.
* 
* @param {HTMLElement} logo - The logo element to be animated.
*/
function animateLogo(logo) {
 logo.style.top = '80px';
 logo.style.left = '77px';
 logo.style.width = '100.03px';
 logo.style.height = '121.97px';
 logo.style.transform = 'translate(0, 0)';
}

/**
* Handles input in the password field and updates the icon based on field content.
* 
* @param {string} fieldId - The ID of the password input field.
*/
function handlePasswordInput(fieldId) {
 const field = document.getElementById(fieldId);
 const icon = document.getElementById(fieldId + 'Icon');
 icon.src = field.value ? '../img/HidePassword.png' : '../img/Lock.png';
}

/**
* Toggles the visibility of the password and updates the icon accordingly.
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
* Validates the login attempt by checking the email and password against stored values.
*/
async function validateLogin() {
 const emailInput = document.getElementById('email').value;
 const passwordInput = document.getElementById('password').value;

 try {
     let users = await getItem('users');
     if (!users) {
         throw new Error("Keine Benutzerdaten gefunden.");
     }

     const user = users.find(user => user.email === emailInput && user.password === passwordInput);
     if (user) {
         window.location.href = '../html/summary.html';
     } else {
         setWrongPasswordStyles();
         const wrongPwElement = document.querySelector('.wrongPw');
         wrongPwElement.textContent = "E-Mail oder Passwort falsch. Bitte versuchen Sie es erneut!";
     }
 } catch (error) {
     console.error('Fehler bei der Anmeldung:', error);
     setWrongPasswordStyles();
 }
}

/**
* Applies visual feedback for a wrong password attempt.
*/
function setWrongPasswordStyles() {
 const wrongPwElement = document.querySelector('.wrongPw');
 const passwordInput = document.getElementById('password');
 wrongPwElement.style.color = '#FF8190';
 passwordInput.style.border = '1px solid rgb(252, 57, 73)';
}

/**
* Toggles the checkbox image between checked and unchecked states.
*/
function toggleCheckbox() {
 const checkboxImg = document.querySelector('.checkbox');
 if (checkboxImg.src.includes('Checkbox.png')) {
     checkboxImg.src = '../img/CheckboxCheck.png';
 } else {
     checkboxImg.src = '../img/Checkbox.png';
 }
}

/**
* Removes the box shadow style from the email input field upon user input.
* 
* @param {HTMLElement} element - The email input field element.
*/
function removeEmailBoxShadow(element) {
 element.style.boxShadow = 'none';
}
