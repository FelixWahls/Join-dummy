let currentContact = 0;

/**
 * @description Initializes contact management by dynamically loading HTML content and fetching contact and user data.
 */
async function initContacts() {
	await includeHTML();
	contacts = await getItem('contacts');
	users = await getItem('users');
	initContactlist();
}

/**
 * @description Extracts and returns all capital letters from the name of a specific contact.
 * @function extractCapitalLetters
 * @param {string} name - The name of the contact whose capital letters are to be extracted.
 * @returns {string} A string containing all the capital letters from the contact's name.
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

function initRegisteredUser() {
	/*for (let i = 0; i < users.length; i++) {
		let newUser = {
			name: users[i]['user'],
			email: users[i]['email'],
			telefon: '',
			color: getRandomColor(),
			capitals: extractCapitalLetters(users[i]['user']),
			addTask: false,
		};
		contacts.push(newUser);
	}*/

	let initContacts = document.querySelector('#initContacts');
	initContacts.innerHTML = '';
	let lastInitial = null;
	contacts.sort((a, b) => a.name.localeCompare(b.name));
	displaySortedContactsByInitial(initContacts, lastInitial);
}

/**
 * @description Initializes the contact list by clearing previous entries and displaying sorted contacts.
 */

async function initContactlist() {
	//initRegisteredUser();
	let initContacts = document.querySelector('#initContacts');
	initContacts.innerHTML = '';
	let lastInitial = null;
	displaySortedContactsByInitial(initContacts, lastInitial);
}

/**
 * @description Displays contacts in a specified container, sorted by the initial letter of each contact's name.
 *  @param {HTMLElement} initContacts - The HTML container where contacts will be displayed.
 * @param {string} lastInitial - The last initial letter used to create a section header. Updated dynamically as contacts are processed.
 */

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

/**
 * @description Generates HTML markup for a section header based on the initial letter of a contact's name.
 * @function appendInitialSectionHeader
 * @param {string} currentInitial - The initial letter to be displayed in the section header.
 * @returns {string} HTML string representing the section header for the given initial letter.
 */

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

/**
 * Generates HTML markup for a contact card that includes clickable behavior and some display details.
 * @param {Object} contact - An object containing the contact's details such as name, email, and color.
 * @param {number} i - The index of the contact in the list, used to uniquely identify elements within the card.
 * @returns {string} HTML string representing a single contact card, ready to be inserted into the DOM.
 */

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

/**
 * Handles the process of opening a contact card with transitions.
 * @param {number} i - The index of the selected contact in the list, used to identify and manipulate specific elements.
 */
function openContactCard(i) {
	renderContactOverviewWithTransition(i);
	updateContactCardsStyle(i);
	openContactCardResp(i);
	adjustLayoutForMobile();
}

/**
 * Adjusts the layout of the webpage to better suit mobile devices based on screen size.
 */

function adjustLayoutForMobile() {
	if (window.innerWidth < 960) {
		document.querySelector('#initContacts').style.display = 'none';
		document.querySelector('.contRespWindow').style.display = 'flex';
		document.querySelector('.addNewContactIconContResp').style.display = 'none';
	}
}

/**
 * Renders a detailed view of a contact with a transition effect to enhance user interaction.
 * @param {number} i - The index of the contact in the list, used to fetch and display the detailed contact information.
 */

function renderContactOverviewWithTransition(i) {
	let contactOverview = document.querySelector('.contactOverview');
	contactOverview.innerHTML = '';
	contactOverview.innerHTML = contactOverviewTemplate(i);
	contactOverview.classList.add('contactOverviewTransition');
	contactOverview.classList.remove('contactOverviewTransitionRemove');
}

/**
 * Updates the visual styles of contact cards based on a selected index, with specific styles for desktop screens.
 * @param {number} i - The index of the currently selected contact, which is used to apply specific styles.
 */
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

/**
 * Adjusts the text color of contact names in a list, highlighting the selected contact by changing its color.
 * @param {number} j - The index of the contact whose color should be reset to black.
 * @param {number} i - The index of the selected contact whose color will be set to white.
 */
function updateContactNameColorForDesktop(j, i) {
	if (window.innerWidth > 960) {
		document.querySelector(`#contactName${j}`).style.color = 'black';
		document.querySelector(`#contactName${i}`).style.color = '#FFFFFF';
	}
}

/**
 * Generates HTML content for displaying an overview of a contact, including interactive edit and delete buttons.
 * @param {number} i - Index of the contact in the contacts array to generate the HTML content for.
 * @returns {string} A string of HTML content that can be directly inserted into a webpage to display the contact's overview.
 */
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

/**
 * Opens the modal window for adding a new contact by applying CSS transitions and displaying the overlay.
 */
function openAddNewContactWindow() {
	document.getElementById('addNewContactContainer').classList.add('addNewContactContainerTransition');
	document.getElementById('addNewContactContainer').classList.remove('addNewContactContainerTransitionRemove');
	document.querySelector('.overlay').style.display = 'flex';
}

/**
 * Closes the modal window for adding a new contact by applying CSS transitions and hiding the overlay.
 */
function closeAddNewContactWindow() {
	document.getElementById('addNewContactContainer').classList.add('addNewContactContainerTransitionRemove');
	document.getElementById('addNewContactContainer').classList.remove('addNewContactContainerTransition');
	document.querySelector('.overlay').style.display = 'none';
}

/**
 * Handles the event to add a new contact from form input fields, prevents default form submission,
 * gathers data, and manages subsequent actions to update UI components and close the modal window.
 * @param {Event} event - The event object provided by the form submission.
 * @returns {boolean} Always returns false to ensure no further form submission occurs.
 */

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

/**
 * Searches through the `contacts` array for a contact with a matching name and opens the contact card if found.
 * @param {string} name - The name of the contact to search for.
 */

function findAndOpenContactCardByName(name) {
	for (let k = 0; k < contacts.length; k++) {
		if (name == contacts[k].name) {
			openContactCard(k);
		}
	}
}

/**
 * Triggers a closing animation sequence on the 'CreateResponseContainer' element.
 */
function animateCloseAddNewContainerDesktop() {
	document.querySelector('#CreateResponseContainer').classList.remove('CreateResponseContainerTransitionRemove');
	document.querySelector('#CreateResponseContainer').classList.add('CreateResponseContainerTransition');
	setTimeout(() => {
		document.querySelector('#CreateResponseContainer').classList.remove('CreateResponseContainerTransition');
		document.querySelector('#CreateResponseContainer').classList.add('CreateResponseContainerTransitionRemove');
	}, 1500);
}

/**
 * Creates a new contact object and adds it to the 'contacts' array. It also updates the 'contacts' storage.
 * @param {string} name - The name of the new contact.
 * @param {string} email - The email address of the new contact.
 * @param {string} phone - The phone number of the new contact.
 */
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

/**
 * Deletes a contact from the 'contacts' array and updates the display.
 * @param {number} i - The index of the contact to delete from the 'contacts' array.
 */
async function deleteContact(i) {
	contacts.splice(i, 1);
	setItem('contacts', contacts);
	initContactlist();
	document.querySelector('.contactOverview').innerHTML = '';
}

/**
 * Clears the input fields for creating a new contact.
 */
function cancelInputValue() {
	document.querySelector('.nameInputContainer').value = '';
	document.querySelector('.emailInputContainer').value = '';
	document.querySelector('.phoneInputContainer').value = '';
}

/**
 * Opens the edit contact window for a specific contact.
 * @param {number} i - The index of the contact in the global `contacts` array.
 */
function openEditContactWindow(i) {
	document.getElementById('editContactContainer').classList.add('addNewContactContainerTransition');
	document.getElementById('editContactContainer').classList.remove('addNewContactContainerTransitionRemove');
	document.querySelector('.overlay').style.display = 'flex';
	document.querySelector('#imageColor').style.backgroundColor = contacts[i].color;
	document.querySelector('#ContactInicial').innerHTML = contacts[i].capitals;
	document.querySelector('.nameEditContainer').value = contacts[i].name;
	document.querySelector('.emailEditContainer').value = contacts[i].email;
	document.querySelector('.phoneEditContainer').value = contacts[i].telefon;
	currentContact = i;
}

/**
 * Closes the edit contact window and clears related visual effects.
 *
 * This function hides the edit contact modal by reversing the visual transition effects applied during opening.
 * It hides the overlay and resets the `currentContact` variable to zero, effectively clearing any specific contact 
 * selection context.
 *
 * @function closeEditContactWindow
 * 
 * @example
 * // Close the edit contact window and reset the editing context.
 * closeEditContactWindow();
 */

function closeEditContactWindow() {
	document.getElementById('editContactContainer').classList.remove('addNewContactContainerTransition');
	document.getElementById('editContactContainer').classList.add('addNewContactContainerTransitionRemove');
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
