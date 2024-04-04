const form = document.getElementById('add-task-form');

/**
 * prevents the page from reloading when pressing the button
 */
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
 * checks if a user is already assigned and adjustes the design accordingly
 * @param {number} i
 */
function selectedUser(i) {
	let currentUser = document.querySelector(`#user${i}`);
	let userCapitals = document.querySelector(`#user-capitals-${i}`).textContent;
	let image = currentUser.querySelector('img');

	if (!currentUser.classList.contains('active-user')) {
		setActiveUser(currentUser, userCapitals, image);
	} else {
		deactivateUser(currentUser, i, image);
	}
}

function setActiveUser(currentUser, userCapitals, image) {
	currentUser.classList.add('active-user');
	image.src = '../img/checkbox-check-white.png';
	selectedUsers.push(userCapitals);
	console.log(userCapitals);
	renderSelectedUsers();
}

function deactivateUser(currentUser, i, image) {
	currentUser.classList.remove('active-user');
	image.src = '../img/Checkbox.png';
	const index = selectedUsers.indexOf(
		currentUser.querySelector(`#user-capitals-${i}`).textContent
	);
	if (index !== -1) {
		selectedUsers.splice(index, 1);
	}
	renderSelectedUsers();
}

function setPrio(priority) {
	let allBtns = document.getElementsByClassName('prio');
	setPrioColor(allBtns, priority);
	setPrioImage(priority);
}

/**
 * iterates through all Buttons and removes a possible active class after that assigns active class to selected button
 * @param {HTMLElement} allBtns list of all Buttons
 * @param {String} priority property selected button
 */
function setPrioColor(allBtns, priority) {
	for (let i = 0; i < allBtns.length; i++) {
		allBtns[i].classList.remove('active-urgent');
		allBtns[i].classList.remove('active-medium');
		allBtns[i].classList.remove('active-low');
	}
	let prioBtn = document.getElementById(priority);
	prioBtn.classList.add('active-' + priority);
}

/**
 * iterates over priority-JSON and compares the selected Button with every priority.
 * If prioritys are equal it changes the img.src attr. of the buttons Image.
 * If they are not the same it resets the img.sry attr. to the original value.
 * sets activePrio to the specific src value
 * @param {string} priority
 */
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

function activateInput() {
	let addSubtask = document.querySelector('#add-subtask');
	let subtasksInputActions = document.querySelector('#subtask-input-actions');

	addSubtask.classList.add('d-none');
	subtasksInputActions.classList.remove('d-none');
}

function deactivateInput() {
	let addSubtask = document.querySelector('#add-subtask');
	let subtasksInputActions = document.querySelector('#subtask-input-actions');

	addSubtask.classList.remove('d-none');
	subtasksInputActions.classList.add('d-none');
	document.querySelector('#subtask-input').value = '';
}

document.addEventListener('click', function (event) {
	const clickInsideInput = document.getElementById('subtask-input').contains(event.target);

	if (!clickInsideInput) {
		deactivateInput();
	}
});

function submitSubtask() {
	let subtaskContent = document.querySelector('#subtask-input').value;
	subtasks.push(subtaskContent);
	document.querySelector('#subtask-input').value = '';
	renderSubtasks();
}

function deleteSubtask(i) {
	let subtask = document.querySelector(`#todo-id-${i}`);
	subtasks.splice(i, 1);
	renderSubtasks();
}

function editSubtask(i) {
	let subtaskContent = document.querySelector(`#subtask-element${i}`);
	let editContainer = document.querySelector('#edit-subtask-container');
	let subtaskEditInput = document.querySelector(`#edit-subtask-${i}`);
	subtaskContent.classList.add('d-none');
	editContainer.classList.remove('d-none');
	document.getElementById(`edit-subtask-${i}`).focus();
	subtaskEditInput.value = subtasks[i];
}

function submitChange(i) {
	let newSubtaskContent = document.querySelector(`#edit-subtask-${i}`).value;
	subtasks[i] = newSubtaskContent;
	renderSubtasks();
}

function createTask() {
	titleInput = document.querySelector('#title-input').value;
	descriptionInput = document.querySelector('#description-input').value;
	dateInput = document.querySelector('#due-date-input').value;
	categoryInput = getCategory();
	pushTask();
}

function getCategory() {
	selectElement = document.querySelector('#category-input');
	output = selectElement.value;
	return output;
}

function pushTask() {
	let newTask = {
		title: titleInput,
		description: descriptionInput,
		users: selectedUsers,
		date: dateInput,
		priority: activePrio,
		category: categoryInput,
		subtasks: subtasks,
	};
	allTasks.push(newTask);
	console.log(allTasks);
}
