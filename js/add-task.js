let userList;

async function initAddTask() {
	await includeHTML();
	allTasks = await getItem('allTasks');
	contacts = await getItem('contacts');
	userList = document.querySelector('#user-list');
}

document.addEventListener('DOMContentLoaded', function () {
	document.body.addEventListener('click', function (event) {
		userList = document.getElementById('user-list');
		let inputContainer = document.querySelector('#assigned-to-input');
		let isClickInsideUserList = userList && userList.contains(event.target);
		let isClickInsideInputContainer = inputContainer && inputContainer.contains(event.target);

		if (!isClickInsideUserList && !isClickInsideInputContainer) {
			closeUserList(userList);
		}
	});
});

function closeUserList(userList) {
	if (userList) {
		userList.classList.add('d-none');
		document.querySelector('#assigned-arrow').src = '../img/arrow-drop-down.png';
	}
}

document.addEventListener('DOMContentLoaded', function () {
	document.body.addEventListener('click', function (event) {
		let subtaskInput = document.getElementById('subtask-input');
		let subtaskInputActions = document.getElementById('subtask-input-actions');
		let isClickInsideSubtaskInput = subtaskInput && subtaskInput.contains(event.target);
		let isClickInsideSubtaskInputActions =
			subtaskInputActions && subtaskInputActions.contains(event.target);

		if (!isClickInsideSubtaskInput && !isClickInsideSubtaskInputActions) {
			deactivateInput();
		}
	});
});
/**
 * checks if user List is already opened and either closes or opens it
 */
function openUserList() {
	let arrow = document.querySelector('#assigned-arrow');
	if (userList.classList.contains('d-none')) {
		userList.classList.remove('d-none');
		arrow.src = '../img/arrow-drop-up.png';
		renderUsers();
	} else {
		userList.classList.add('d-none');
		arrow.src = '../img/arrow-drop-down.png';
	}
}

/**
 *  iterates over all contacts
 * @param {HTMLElement} userList
 */
function renderUsers() {
	userList.innerHTML = '';
	let userSearchInput = document.querySelector('#assigned-to-input').value;
	let filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(userSearchInput)
	);
	if (userSearchInput !== '') {
		showFilteredUsers(filteredContacts);
	} else {
		showAllContacts();
		console.log(contacts);
	}
}

function showFilteredUsers(filteredContacts) {
	for (let i = 0; i < filteredContacts.length; i++) {
		const contact = filteredContacts[i];
		if (contact.addTask == false) {
			userList.innerHTML += createUnselectedUserHtml(contact, i);
		} else {
			userList.innerHTML += createSelectedUserHtml(contact, i);
		}
	}
}

function showAllContacts() {
	for (let i = 0; i < contacts.length; i++) {
		const contact = contacts[i];
		if (contact.addTask == false) {
			userList.innerHTML += createUnselectedUserHtml(contact, i);
		} else {
			userList.innerHTML += createSelectedUserHtml(contact, i);
		}
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
		setActiveUser(currentUser, userCapitals, image, i);
		contacts[i]['addTask'] = true;
	} else {
		deactivateUser(currentUser, i, image);
		contacts[i]['addTask'] = false;
	}
}

function setActiveUser(currentUser, userCapitals, image, i) {
	let selectedUserName = document.querySelector(`#full-user-name-${i}`).textContent;
	currentUser.classList.add('active-user');
	image.src = '../img/checkbox-check-white.png';
	let selectedUserList = {
		userCapitals: userCapitals,
		fullUserNames: selectedUserName,
	};
	selectedUsers.push(selectedUserList);
	renderSelectedUsers();
}

function deactivateUser(currentUser, i, image) {
	currentUser.classList.remove('active-user');
	image.src = '../img/Checkbox.png';
	const index = selectedUsers.findIndex(
		(user) => user.fullUserNames === document.querySelector(`#full-user-name-${i}`).textContent
	);
	if (index !== -1) {
		selectedUsers.splice(index, 1);
		renderSelectedUsers();
	}
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

function submitSubtask() {
	let subtaskContent = document.querySelector('#subtask-input').value;
	if (subtaskContent == '') {
		deactivateInput();
	} else {
		subtasks.push(subtaskContent);
		document.querySelector('#subtask-input').value = '';
		renderSubtasks();
		deactivateInput();
	}
}

function deleteSubtask(i) {
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

function createTask(event) {
	event.preventDefault(); // Prevent form submission
	titleInput = validateField('#title-input', '#error-title');
	descriptionInput = document.querySelector('#description-input').value;
	dateInput = validateField('#due-date-input', '#error-due-date');
	categoryInput = validateField('#category-input', '#error-category');

	if (titleInput && dateInput && categoryInput) {
		pushTask();
	}
}

function validateField(fieldId, errorId) {
	let field = document.querySelector(fieldId);
	let errorContainer = document.querySelector(errorId);

	if (field.value.trim() !== '') {
		field.classList.remove('input-error');
		errorContainer.classList.add('d-none');
		return field.value.trim();
	} else {
		field.classList.add('input-error');
		errorContainer.classList.remove('d-none');
		return null;
	}
}

function getCategory() {
	selectElement = document.querySelector('#category-input');
	output = selectElement.value;
	return output;
}

async function pushTask() {
	let newTask = {
		title: titleInput,
		description: descriptionInput,
		users: selectedUsers,
		date: dateInput,
		priority: activePrio,
		category: categoryInput,
		subtasks: subtasks,
		cardContainer: toDoContainer,
		id: allTasks.length > 0 ? allTasks[allTasks.length - 1].id + 1 : 0,
	};
	allTasks.push(newTask);
	await setItem('allTasks', allTasks);
	resetForm();
	showSlider();
}

function showSlider() {
	document.querySelector('.task-added-slider').classList.remove('task-added-transition-remove');
	document.querySelector('.task-added-slider').classList.add('task-added-transition');
	setTimeout(() => {
		document.querySelector('.task-added-slider').classList.remove('task-added-transition');
		document.querySelector('.task-added-slider').classList.add('task-added-transition-remove');
	}, 900);
}

function resetForm() {
	let myForm = document.querySelector('#add-task-form');
	resetAssignedUsers();
	titleInput = '';
	descriptionInput = '';
	dateInput = '';
	categoryInput = '';
	selectedUsers = [];
	renderSelectedUsers();
	setPrio('medium');
	subtasks = [];
	renderSubtasks();
	myForm.reset();
}

function resetAssignedUsers() {
	contacts.forEach((contact) => {
		contact.addTask = false;
	});
}
