const prioButtons = [
	{
		'priority': 'urgent',
		'activePrioImg': '../img/active-urgent.png',
		'inactivePrioImg': '../img/prio-urgent.png',
	},
	{
		'priority': 'medium',
		'activePrioImg': '../img/active-medium.png',
		'inactivePrioImg': '../img/prio-medium.png',
	},
	{
		'priority': 'low',
		'activePrioImg': '../img/active-low.png',
		'inactivePrioImg': '../img/prio-low.png',
	},
];

let activePrio = '../img/prio-medium.png';

/**
 * prevents the page from reloading when pressing the button
 */
const form = document.getElementById('add-task-form');

form.addEventListener('submit', function (event) {
	event.preventDefault();
});

/**
 * checks if user List is already opened and either closes or opens it
 */
function openUserList() {
	let userList = document.querySelector('#user-list');
	let arrow = document.querySelector('#assigned-arrow');

	if (userList.classList.contains('d-none')) {
		userList.classList.remove('d-none');
		arrow.src = '../img/arrow-drop-up.png';
		renderUsers(userList);
	} else {
		userList.classList.add('d-none');
		arrow.src = '../img/arrow-drop-down.png';
	}
}

/**
 *  iterates over all contacts
 * @param {HTMLElement} userList
 */
function renderUsers(userList) {
	userList.innerHTML = '';
	for (let i = 0; i < contacts.length; i++) {
		const contact = contacts[i];
		userList.innerHTML += createUserHtml(contact, i);
	}
}

/**
 * creates html template for every assignable contact
 * @param {object} user
 * @param {number} i
 * @returns
 */
function createUserHtml(user, i) {
	return /*html*/ `
        <div class="single-user d-flex align-c" onclick="selectedUser(${i})" id="user${i}">
			<div class="user-info d-flex align-c">
				<div class="user-icon">${user.capitals}</div>
				<div class="user-name">${user.name}</div>
			</div>
			<img src="../img/Checkbox.png" />
		</div>
    `;
}

/**
 * checks if a user is already assigned and adjustes the design accordingly
 * @param {number} i
 */
function selectedUser(i) {
	let activeUser = document.querySelector(`#user${i}`);
	let image = activeUser.querySelector('img');

	if (!activeUser.classList.contains('active-user')) {
		activeUser.classList.add('active-user');
		image.src = '../img/checkbox-check-white.png';
	} else {
		activeUser.classList.remove('active-user');
		image.src = '../img/Checkbox.png';
	}
}

function setPrio(priority) {
	let allBtns = document.getElementsByClassName('prio');
	setPrioColor(allBtns, priority);
	setPrioImage(priority);
}

function setPrioColor(allBtns, priority) {
	for (let i = 0; i < allBtns.length; i++) {
		allBtns[i].classList.remove('active-urgent');
		allBtns[i].classList.remove('active-medium');
		allBtns[i].classList.remove('active-low');
	}
	let prioBtn = document.getElementById(priority);
	prioBtn.classList.add('active-' + priority);
}

function setPrioImage(priority) {
	let prioImages = document.getElementsByClassName('prio-image');
	for (let i = 0; i < prioButtons.length; i++) {
		const element = prioButtons[i];
		if (element['priority'] === priority) {
			prioImages[i].src = prioButtons[i]['activePrioImg'];
			activePrio = prioButtons[i]['inactivePrioImg'];
		} else {
			prioImages[i].src = prioButtons[i]['inactivePrioImg'];
		}
	}
}
