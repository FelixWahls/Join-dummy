// Waits for the DOM to be fully loaded before initializing link references and animations.
document.addEventListener('DOMContentLoaded', () => {
 setGuestLogInHref();
 initAnimations();
 setLegalNoticeHref();
 setPrivacyPolicyHref();
 document.querySelector('.logIn-button').addEventListener('click', validateLogin);
});


/**
* Sets the href attribute of the <a> element with the ID "legalNotice".
*/
function setLegalNoticeHref() {
 var legalNoticeLink = document.getElementById('legalNotice');
 if (legalNoticeLink) {
   legalNoticeLink.href = 'http://127.0.0.1:5501/legalNotice/legalNotice.html';
 }
}


/**
* Sets the href attribute of the <a> element with the ID "privacyPolicy".
*/
function setPrivacyPolicyHref() {
 var privacyPolicyLink = document.getElementById('privacyPolicy');
 if (privacyPolicyLink) {
   privacyPolicyLink.href = 'http://127.0.0.1:5501/privacyPolicy/privacyPolicy.html';
 }
}


/**
* Attaches a click event listener to the "guestLogIn" button to redirect users.
*/
function setGuestLogInHref() {
 console.log("setGuestLogInHref called");
 var guestLogInButton = document.getElementById('guestLogIn');
 if (guestLogInButton) {
   console.log("Button found");
   guestLogInButton.addEventListener('click', function() {
     console.log("Redirecting to summary page");
     window.location.href = 'http://127.0.0.1:5501/html/summary.html';
   });
 } else {
   console.log("Button not found");
 }
}


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
* Validates the login attempt by checking the email and password against hardcoded values.
*/
async function validateLogin(event) {
 event.preventDefault();  // Verhindert, dass das Formular normal gesendet wird
 const emailInput = document.getElementById('email');  // Zugriff auf das E-Mail-Eingabefeld
 const passwordInput = document.getElementById('password');  // Zugriff auf das Passwort-Eingabefeld
 
 try {
     const userData = await getItem('user-' + emailInput.value);  // Abrufen der Benutzerdaten vom Server
     const user = JSON.parse(userData);  // Parsen der gespeicherten JSON-Daten zu einem JavaScript-Objekt
     
     if (user && user.password === passwordInput.value) {  // Überprüfen, ob Benutzer existiert und das Passwort übereinstimmt
         console.log('Login successful');  // Konsolenausgabe, wenn Login erfolgreich
     } else {
         console.log('Login failed: Incorrect email or password');  // Konsolenausgabe bei falschem Passwort
         setWrongPasswordStyles();  // Anwendung visueller Feedback-Stile für falsches Passwort
     }
 } catch (error) {
     console.log('Login failed:', error);  // Konsolenausgabe bei einem Fehler beim Abruf oder Verarbeiten der Daten
     setWrongPasswordStyles();  // Anwendung visueller Feedback-Stile für Fehler
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
