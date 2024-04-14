let overlayCanBeHidden = false;

function openAddNewContactRespWindow() {
	document
		.getElementById('addNewContactRespContainer')
		.classList.add('addNewContactRespContainerTransition');
	document
		.getElementById('addNewContactRespContainer')
		.classList.remove('addNewContactRespContainerTransitionRemove');
	document.querySelector('.overlay').style.display = 'flex';
}

function closeAddNewContactRespWindow() {
	document
		.getElementById('addNewContactRespContainer')
		.classList.add('addNewContactRespContainerTransitionRemove');
	document
		.getElementById('addNewContactRespContainer')
		.classList.remove('addNewContactRespContainerTransition');
	document.querySelector('.overlay').style.display = 'none';
}

async function addNewContactResp(event) {
	event.preventDefault();
	let name = document.querySelector('.nameInputResp').value;
	let email = document.querySelector('.emailInputResp').value;
	let phone = document.querySelector('.phoneInputResp').value;
	createNewContactDesktop(name, email, phone);
	initContactlist();
	closeAddNewContactRespWindow();
	cancelInputValueResp();
	animateCloseAddNewContainerMobile();
	openResponsiveContactCardByName(name);
	return false;
}

function openResponsiveContactCardByName(name) {
	for (let i = 0; i < contacts.length; i++) {
		if (name == contacts[i].name) {
			openContactCardResp(i);
		}
	}
}

function animateCloseAddNewContainerMobile() {
	document
		.querySelector('.createResponseContainerResponsiv')
		.classList.add('createResponseContainerResponsivTransition');
	setTimeout(() => {
		document
			.querySelector('.createResponseContainerResponsiv')
			.classList.remove('createResponseContainerResponsivTransition');
	}, 1500);
	document.querySelector('#initContacts').style.display = 'none';
	document.querySelector('.contRespWindow').style.display = 'flex';
	document.querySelector('.addNewContactIconContResp').style.display = 'none';
}

function cancelInputValueResp() {
	document.querySelector('.nameInputResp').value = '';
	document.querySelector('.emailInputResp').value = '';
	document.querySelector('.phoneInputResp').value = '';
}

function openContactCardResp(i) {
	contactDetailsInResponsiveView(i);
	highlightEditIconInResponsiveMode();
	currentContact = i;
}

function highlightEditIconInResponsiveMode() {
	if (window.innerWidth < 960) {
		document.querySelector('.editContactIconContResp').style.display = 'flex';
	}
	setTimeout(() => {
		document.querySelector('.editContactIconContResp').style.backgroundColor = '#2a3647';
		document.querySelector('.editContactIconContResp').style.border = '#2a3647';
	}, 1000);
}

function contactDetailsInResponsiveView(i) {
	document.querySelector('.inicialCircleRespLetters').innerHTML = contacts[i].capitals;
	document.querySelector('.contactNameTextResp').innerHTML = contacts[i].name;
	document.querySelector('.emailContactResp').innerHTML = contacts[i].email;
	document.querySelector('.phoneContactResp').innerHTML = contacts[i].telefon;
	document.querySelector('.inicialCircleGroundResp').style.backgroundColor = contacts[i].color;
}

function closeContactDetailsResp() {
	document.querySelector('#initContacts').style.display = 'block';
	document.querySelector('.contRespWindow').style.display = 'none';
	document.querySelector('.addNewContactIconContResp').style.display = 'flex';
	document.querySelector('.editContactIconContResp').style.display = 'none';
	document
		.querySelector('.editContactRespContainer')
		.classList.add('addNewContactRespContainerTransitionRemove');
	document
		.querySelector('.editContactRespContainer')
		.classList.remove('addNewContactRespContainerTransition');
}

function editContactRespWindow() {
	overlayCanBeHidden = true;
	document.querySelector('.overlay').style.display = 'flex';
	document.querySelector('.overlay').style.opacity = 0.3;
	document.querySelector('.editContactIconContResp').style.backgroundColor = '#29ABE2';
	document.querySelector('.editContactIconContResp').style.border = '#29ABE2';
	document
		.querySelector('.editContSmallContResp')
		.classList.remove('editContSmallContRespTransitionRemove');
	document
		.querySelector('.editContSmallContResp')
		.classList.add('editContSmallContRespTransition');
	setTimeout(() => {
		document.querySelector('.editContactIconContResp').style.display = 'none';
	}, 350);
}

async function deleteContactResp() {
	contacts.splice(currentContact, 1);
	setItem('contacts', contacts);
	initContactlist();
	closeContactDetailsResp();
	resetEditContactStyleResponsive();
	document.querySelector('.overlay').style.display = 'none';
	setTimeout(() => {
		document.querySelector('.editContactIconContResp').style.display = 'none';
	}, 350);
}

function resetEditContactStyleResponsive() {
	editContainerResponsiveTransitionOut();
	document.querySelector('.editContactIconContResp').style.backgroundColor = '#2a3647';
	document.querySelector('.editContactIconContResp').style.border = '#2a3647';
}

async function editContactResp(event) {
	event.preventDefault();
	updateContactInfoResp();
	setItem('contacts', contacts);
	initContactlist();
	closeEditContactRespWindow();
	openContactCard(currentContact);
	editContainerResponsiveTransitionOut();
}

function editContainerResponsiveTransitionOut() {
	document
		.querySelector('.editContSmallContResp')
		.classList.add('editContSmallContRespTransitionRemove');
	document
		.querySelector('.editContSmallContResp')
		.classList.remove('editContSmallContRespTransition');
}

function updateContactInfoResp() {
	contacts[currentContact].name = document.querySelector('#nameEditResp').value;
	contacts[currentContact].email = document.querySelector('#emailEditResp').value;
	contacts[currentContact].telefon = document.querySelector('#phoneEditResp').value;
}

async function deleteContactByEditResp(event) {
	event.preventDefault();
	contacts.splice(currentContact, 1);
	setItem('contacts', contacts);
	initContactlist();
	closeEditContactRespWindow();
	closeContactDetailsResp();
	editContainerResponsiveTransitionOut();
}

function openEditContactRespWindow() {
	document.querySelector('.overlay').style.display = 'flex';
	document
		.querySelector('.editContactRespContainer')
		.classList.add('addNewContactRespContainerTransition');
	document
		.querySelector('.editContactRespContainer')
		.classList.remove('addNewContactRespContainerTransitionRemove');
	document
		.querySelector('.editContSmallContResp')
		.classList.add('editContSmallContRespTransitionRemove');
	document
		.querySelector('.editContSmallContResp')
		.classList.remove('editContSmallContRespTransition');
	document.querySelector('.contRespWindow').style.display = 'none';
	editFContactDetailsResp();
}

function editFContactDetailsResp() {
	document.querySelector('#nameEditResp').value = contacts[currentContact].name;
	document.querySelector('#emailEditResp').value = contacts[currentContact].email;
	document.querySelector('#phoneEditResp').value = contacts[currentContact].telefon;
	document.querySelector('#editContactRespImageSubContainer').style.backgroundColor =
		contacts[currentContact].color;
	document.querySelector('.editContactRespLetters').innerHTML = contacts[currentContact].capitals;
}

function closeEditContactRespWindow() {
	document.querySelector('.overlay').style.display = 'none';
	document
		.querySelector('.editContactRespContainer')
		.classList.add('addNewContactRespContainerTransitionRemove');
	document
		.querySelector('.editContactRespContainer')
		.classList.remove('addNewContactRespContainerTransition');
	document.querySelector('.editContactIconContResp').style.display = 'none';
	openContactCard(currentContact);
}

function closeSmallEditField() {
	if (window.innerWidth < 960 && overlayCanBeHidden) {
		document.querySelector('.overlay').style.display = 'none';
		document.querySelector('.overlay').style.opacity = 0.3;
		document
			.querySelector('.editContSmallContResp')
			.classList.add('editContSmallContRespTransitionRemove');
		document
			.querySelector('.editContSmallContResp')
			.classList.remove('editContSmallContRespTransition');
		document.querySelector('.editContactIconContResp').style.display = 'flex';
	}
}
