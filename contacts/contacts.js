let currentContact = 0;

async function initContacts() {
	await includeHTML();
	contacts = await getItem('contacts');
	users = await getItem('users');
	initContactlist();
}
/**
 *
 * @param {string} name
 * @returns
 */
function extractCapitalLetters(name) {
	let capitals = '';
	for (let i = 0; i < contacts.length; i++) {
		if (contacts[i].name === name) {
			for (let j = 0; j < name.length; j++) {
				if (name[j] === name[j].toUpperCase() && name[j] !== ' ') {
					capitals += name[j];
				}
			}
			contacts[i].capitals = capitals;
			break;
		}
	}
	return capitals;
}

/*function initRegisteredUser(){
	for (let i = 0; i < users.length; i++) {
		let newUser = {
			name: users[i]['user'],
			email: users[i]['email'],
			telefon: '',
			color: getRandomColor(),
			capitals: extractCapitalLetters(users[i]['user']),
			addTask: false,
		};
		contacts.push(newUser);
	}

	let initContacts = document.querySelector('#initContacts');
	initContacts.innerHTML = '';
	let lastInitial = null;
	contacts.sort((a, b) => a.name.localeCompare(b.name));
	displaySortedContactsByInitial(initContacts, lastInitial);
}*/

async function initContactlist() {
	//initRegisteredUser();
	let initContacts = document.querySelector('#initContacts');
	initContacts.innerHTML = '';
	let lastInitial = null;
	displaySortedContactsByInitial(initContacts, lastInitial);
}

function displaySortedContactsByInitial(initContacts, lastInitial) {
	for (let i = 0; i < contacts.length; i++) {
		const contact = contacts[i];
		const currentInitial = contact.name[0].toUpperCase();
		if (currentInitial !== lastInitial) {
			initContacts.innerHTML += appendInitialSectionHeader(currentInitial);
			lastInitial = currentInitial;
		}
		initContacts.innerHTML += appendContactCardToDisplay(contact, i);
	}
}

function appendInitialSectionHeader(currentInitial) {
	return `
          <div class="listInitiale">
            <span class="firstCharacter">${currentInitial}</span>
          </div>
          <div class="partingLineDiv">
            <div class="partingLine">
            </div>
          </div>
        `;
}

function appendContactCardToDisplay(contact, i) {
	return `
        <div class="contactCard" id='contactCard${i}' onclick='openContactCard(${i})'>
          <div class="monogramCircle" style="background-color: ${contact.color}">
            <span class="mongram">${extractCapitalLetters(contact.name)}</span>
          </div>
          <div class="contactDetails">
            <div>
              <span class="contactName" id="contactName${i}">${contact.name}</span>
            </div>
            <div>
              <span class="contactMail">${contact.email}</span>
            </div>
          </div>
        </div>
      `;
}

/**
 * @description Generates a random hexadecimal color code.
 * @returns {string} A string representing a random color in hexadecimal format.
 */
function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function openContactCard(i) {
	renderContactOverviewWithTransition(i);
	updateContactCardsStyle(i);
	openContactCardResp(i);
	adjustLayoutForMobile();
}

function adjustLayoutForMobile() {
	if (window.innerWidth < 960) {
		document.querySelector('#initContacts').style.display = 'none';
		document.querySelector('.contRespWindow').style.display = 'flex';
		document.querySelector('.addNewContactIconContResp').style.display = 'none';
	}
}

function renderContactOverviewWithTransition(i) {
	let contactOverview = document.querySelector('.contactOverview');
	contactOverview.innerHTML = '';
	contactOverview.innerHTML = contactOverviewTemplate(i);
	contactOverview.classList.add('contactOverviewTransition');
	contactOverview.classList.remove('contactOverviewTransitionRemove');
}

function updateContactCardsStyle(i) {
	let contactCard = document.querySelector(`#contactCard${i}`);
	for (let j = 0; j < contacts.length; j++) {
		const contact = contacts[j];
		let contactCard = document.querySelector(`#contactCard${j}`);
		updateContactNameColorForDesktop(j, i);
		contactCard.style.backgroundColor = '#FFFFFF';
	}
	if (window.innerWidth > 960) {
		contactCard.style.backgroundColor = '#2A3647';
	}
}

function updateContactNameColorForDesktop(j, i) {
	if (window.innerWidth > 960) {
		document.querySelector(`#contactName${j}`).style.color = 'black';
		document.querySelector(`#contactName${i}`).style.color = '#FFFFFF';
	}
}

function contactOverviewTemplate(i) {
	return `
	<div class="nameContainer">
		<div class="inicialeCircle"  style="background-color: ${contacts[i].color}">
			<span class="inicial">${extractCapitalLetters(contacts[i].name)}</span>
		</div>
		<div class="editContactContainer">
			<div class="name">
				<span class="fullname">${contacts[i].name}</span>
			</div>
			<div class="changeButtonsContainer">
				<div class="editButtonContainer" onclick="openEditContactWindow(${i})">
					<img src="../img/edit.png" class="editIcon">
					<span class="editText">Edit</span>
				</div>
				<div class="deleteButtonContainer"  onclick="deleteContact(${i})">
					<img src="../img/delete.png" class="deleteIcon">
					<span class="deleteText">Delete</span>
				</div>
			</div>
		</div>
	</div>
	<div class="contactInformationTitle">
		<span class="contactInformation">Contact Information</span>
	</div>
	<div class="accessibility">
		<div class="mailDiv">
			<div>
				<span class="mailAdressTitel">Email</span>
			</div>
			<div>
				<span class="mailAdress">${contacts[i].email}</span>
			</div>

		</div>
		<div class="mailDiv">
			<div>
				<span class="mailAdressTitel">Phone</span>
			</div>
			<div>
				<span class="mailAdress">${contacts[i].telefon}</span>
			</div>
		</div>
	</div>
	`;
}

function openAddNewContactWindow() {
	document
		.getElementById('addNewContactContainer')
		.classList.add('addNewContactContainerTransition');
	document
		.getElementById('addNewContactContainer')
		.classList.remove('addNewContactContainerTransitionRemove');
	document.querySelector('.overlay').style.display = 'flex';
}

function closeAddNewContactWindow() {
	document
		.getElementById('addNewContactContainer')
		.classList.add('addNewContactContainerTransitionRemove');
	document
		.getElementById('addNewContactContainer')
		.classList.remove('addNewContactContainerTransition');
	document.querySelector('.overlay').style.display = 'none';
}

function addNewContact(event) {
	event.preventDefault();
	let name = document.querySelector('.nameInputContainer').value;
	let email = document.querySelector('.emailInputContainer').value;
	let phone = document.querySelector('.phoneInputContainer').value;
	createNewContactDesktop(name, email, phone);
	initContactlist();
	closeAddNewContactWindow();
	cancelInputValue();
	animateCloseAddNewContainerDesktop();
	findAndOpenContactCardByName(name);
	return false;
}

function findAndOpenContactCardByName(name) {
	for (let k = 0; k < contacts.length; k++) {
		if (name == contacts[k].name) {
			openContactCard(k);
		}
	}
}

function animateCloseAddNewContainerDesktop() {
	document
		.querySelector('#CreateResponseContainer')
		.classList.remove('CreateResponseContainerTransitionRemove');
	document
		.querySelector('#CreateResponseContainer')
		.classList.add('CreateResponseContainerTransition');
	setTimeout(() => {
		document
			.querySelector('#CreateResponseContainer')
			.classList.remove('CreateResponseContainerTransition');
		document
			.querySelector('#CreateResponseContainer')
			.classList.add('CreateResponseContainerTransitionRemove');
	}, 1500);
}

function createNewContactDesktop(name, email, phone) {
	let newContact = {
		name: name,
		email: email,
		telefon: phone,
		color: getRandomColor(),
		capitals: '',
		addTask: false,
	};
	contacts.push(newContact);
	setItem('contacts', contacts);
}

async function deleteContact(i) {
	contacts.splice(i, 1);
	setItem('contacts', contacts);
	initContactlist();
	document.querySelector('.contactOverview').innerHTML = '';
}

function cancelInputValue() {
	document.querySelector('.nameInputContainer').value = '';
	document.querySelector('.emailInputContainer').value = '';
	document.querySelector('.phoneInputContainer').value = '';
}

function openEditContactWindow(i) {
	document
		.getElementById('editContactContainer')
		.classList.add('addNewContactContainerTransition');
	document
		.getElementById('editContactContainer')
		.classList.remove('addNewContactContainerTransitionRemove');
	document.querySelector('.overlay').style.display = 'flex';
	document.querySelector('#imageColor').style.backgroundColor = contacts[i].color;
	document.querySelector('#ContactInicial').innerHTML = contacts[i].capitals;
	document.querySelector('.nameEditContainer').value = contacts[i].name;
	document.querySelector('.emailEditContainer').value = contacts[i].email;
	document.querySelector('.phoneEditContainer').value = contacts[i].telefon;
	currentContact = i;
}

function closeEditContactWindow() {
	document
		.getElementById('editContactContainer')
		.classList.remove('addNewContactContainerTransition');
	document
		.getElementById('editContactContainer')
		.classList.add('addNewContactContainerTransitionRemove');
	document.querySelector('.overlay').style.display = 'none';
	currentContact = 0;
}

async function deleteContactInEditWindow() {
	contacts.splice(currentContact, 1);
	setItem('contacts', contacts);
	initContactlist();
	document.querySelector('.contactOverview').innerHTML = '';
	closeEditContactWindow();
}

async function editContact(event) {
	event.preventDefault();
	updateCurrentContactDetails();
	setItem('contacts', contacts);
	initContactlist();
	closeEditContactWindow();
	openMatchingContactCard();
}

function openMatchingContactCard() {
	for (let k = 0; k < contacts.length; k++) {
		if (document.querySelector('.nameEditContainer').value == contacts[k].name) {
			openContactCard(k);
		}
	}
}

function updateCurrentContactDetails() {
	contacts[currentContact].name = document.querySelector('.nameEditContainer').value;
	contacts[currentContact].email = document.querySelector('.emailEditContainer').value;
	contacts[currentContact].telefon = document.querySelector('.phoneEditContainer').value;
}
