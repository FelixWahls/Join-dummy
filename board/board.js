let currentDraggedElement;

async function initBoard() {
	await includeHTML();
	await initAddTask();
	allTasks = await getItem('allTasks');
	contacts = await getItem('contacts');
	renderTasksBoard();
}

function slideIn() {
	if (window.innerWidth < 1000) {
		window.location.href = '../add_task/add_task.html';
	} else {
		let slideInput = document.querySelector('#add-task-slider');
		let slideInputBG = document.querySelector('#slide-transition-wrapper');
		if (slideInput.classList.contains('slide-in-transition')) {
			slideInput.classList.remove('slide-in-transition');
			slideInputBG.classList.remove('wrapper-transition');
			slideInputBG.classList.add('d-none');
			resetForm();
		} else {
			slideInput.classList.add('slide-in-transition');
			slideInputBG.classList.remove('d-none');
			slideInputBG.classList.add('wrapper-transition');
			renderAddTaskHtml();
		}
	}
}

function renderTasksBoard() {
	document.getElementById('to-do-container').innerHTML = '';
	document.getElementById('in-progress-container').innerHTML = '';
	document.getElementById('await-feedback-container').innerHTML = '';
	document.getElementById('done-container').innerHTML = '';
	for (let i = 0; i < allTasks.length; i++) {
		const element = allTasks[i];
		renderTask(element, i);
	}
}

function renderTask(task, taskIndex) {
	let container = document.getElementById(`${task.cardContainer}`);
	container.innerHTML += createCardHtml(task.id, taskIndex);
	createAssignedUsersHtml(taskIndex);
	createSubtasksHtml(taskIndex);
}

function startDragging(id) {
	currentDraggedElement = id;
}

function allowDrop(ev) {
	ev.preventDefault();
}

async function moveTo(container) {
	allTasks[currentDraggedElement]['cardContainer'] = container;
	await setItem('allTasks', allTasks);
	renderTasksBoard();
}

function highlight(id) {
	document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
	document.getElementById(id).classList.remove('drag-area-highlight');
}

function slideBigCard(taskIndex) {
	let slideBigCard = document.querySelector('#big-card-slider');
	let slideInputBG = document.querySelector('#slide-transition-wrapper');
	if (slideBigCard.classList.contains('big-card-slide-transition')) {
		hideBigCard(slideInputBG, slideBigCard);
	} else {
		initShowBigCard(slideInputBG, slideBigCard, taskIndex);
	}
}

function hideBigCard(slideInputBG, slideBigCard) {
	slideBigCard.classList.remove('big-card-slide-transition');
	slideInputBG.classList.remove('wrapper-transition');
	slideInputBG.classList.add('d-none');
}

function initShowBigCard(slideInputBG, slideBigCard, taskIndex) {
	let task = allTasks[taskIndex];
	slideBigCard.classList.add('big-card-slide-transition');
	slideInputBG.classList.remove('d-none');
	slideInputBG.classList.add('wrapper-transition');
	createBigCard(taskIndex);
	createBigCardUsers(taskIndex);
	createBigTaskSubtasks(taskIndex);
	subtasks = task.subtasks;
}

function transformDate(taskIndex) {
	let task = allTasks[taskIndex];
	let currentDate = task.date;
	let parts = currentDate.split('-');
	let year = parts[0];
	let month = parts[1];
	let day = parts[2];
	let date = new Date(year, month - 1, day);
	let formattedDate =
		('0' + date.getDate()).slice(-2) +
		'/' +
		('0' + (date.getMonth() + 1)).slice(-2) +
		'/' +
		date.getFullYear();
	return formattedDate;
	/*
	let currentDate = allTasks[i].date;
	let parts = currentDate.split('-');
	let year = parts[0];
	let month = parseInt(parts[1], 10) - 1;
	let day = parseInt(parts[2], 10);
	let date = new Date(year, month, day);
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let formattedDate = monthNames[date.getMonth()] + ' ' + day + ', ' + date.getFullYear();
	return formattedDate;
    */
}

async function toggleSubtaskCheckbox(taskIndex, subIndex) {
	let task = allTasks[taskIndex];
	currSubtask = task.subtasks[subIndex];
	currSubtask.done = !currSubtask.done;
	task.subtaskCounter = updateSubtaskCounter(task);
	createBigTaskSubtasks(taskIndex);
	await setItem('allTasks', allTasks);
	await initBoard();
}

function updateSubtaskCounter(task) {
	let currSubtaskCounter = 0;
	for (let i = 0; i < task.subtasks.length; i++) {
		if (task.subtasks[i].done === true) {
			currSubtaskCounter += 1;
		}
	}
	return currSubtaskCounter;
}

async function deleteTask(id) {
	for (let i = 0; i < allTasks.length; i++) {
		if (allTasks[i].id === id) {
			allTasks.splice(i, 1);
			break;
		}
	}
	slideBigCard();
	await setItem('allTasks', allTasks);
	await initBoard();
}

function editTask(taskIndex) {
	let task = allTasks[taskIndex];
	createEditTaskHtml(taskIndex);
	renderSelectedUsers();
	setPrio(task.prioName);
	setSelectedUsers(taskIndex);
	renderUsers();
	renderSubtasks();
}

function setSelectedUsers(taskIndex) {
	let taskUsers = allTasks[taskIndex].users;
	for (let i = 0; i < taskUsers.length; i++) {
		const currUserName = taskUsers[i].fullUserNames;
		for (let j = 0; j < contacts.length; j++) {
			const contact = contacts[j];
			if (contact.name === currUserName) {
				contacts[j].addTask = true;
				break;
			}
		}
	}
}

async function submitTaskChanges(taskIndex) {
	titleInput = validateField('#title-input', '#error-title');
	descriptionInput = document.querySelector('#description-input').value;
	dateInput = validateField('#due-date-input', '#error-due-date');
	categoryInput = validateField('#category-input', '#error-category');
	if (titleInput && dateInput && categoryInput) {
		await changeTask(taskIndex);
		if ((window.location.href = '../board/board.html')) {
			await initBoard();
		} else {
			window.location.href = '../board/board.html';
		}
	}
}

async function changeTask(taskIndex) {
	let task = allTasks[taskIndex];
	task.title = titleInput;
	task.description = descriptionInput;
	task.users = selectedUsers;
	task.date = dateInput;
	task.priority = activePrio;
	task.prioName = prioName;
	task.category = categoryInput;
	task.subtasks = subtasks;
	task.subtaskCounter = 0;
	task.cardContainer = toDoContainer;
	task.id = task.id;

	await setItem('allTasks', allTasks);
	resetForm();
	initBoard();
}

function filterTasks() {
	let searchTaskInput = document.getElementById('search-bar').value.toLowerCase();
	if (searchTaskInput == null || searchTaskInput == '' || searchTaskInput < 1) {
		renderTasksBoard();
	} else {
		renderFilteredTasks(searchTaskInput);
	}
}

function renderFilteredTasks(searchTaskInput) {
	for (let i = 0; i < allTasks.length; i++) {
		const currTitle = allTasks[i].title.toLowerCase();
		const currDesc = allTasks[i].description.toLowerCase();
		let currCard = document.getElementById(`task${allTasks[i].id}`);

		if (!currTitle.includes(searchTaskInput) || !currDesc.includes(searchTaskInput)) {
			currCard.classList.add('d-none');
		} else {
			currCard.classList.remove('d-none');
		}
	}
}
