let currentDraggedElement;

/**
 * calls starting functions and loads necessary JSON's
 */
async function initBoard() {
	await includeHTML();
	await initAddTask();
	allTasks = await getItem('allTasks');
	contacts = await getItem('contacts');
	renderTasksBoard();
}

/**
 * checks window width and either changes the Page to add-Task or initialises the slide Animation on the Board
 */
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

/**
 * gets all possible task containers and calls the renderTask function for every Object in AllTasks
 */
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

/**
 * gets the container where the card has to be displayed
 * calls functions to create the card-design
 * @param {object} task
 * @param {number} taskIndex
 */
function renderTask(task, taskIndex) {
	let container = document.getElementById(`${task.cardContainer}`);
	container.innerHTML += createCardHtml(task.id, taskIndex);
	createAssignedUsersHtml(taskIndex);
	createSubtasksHtml(taskIndex);
}

/**
 * sets the value to the id of the dragged element
 * @param {number} id
 */
function startDragging(id) {
	currentDraggedElement = id;
}

/**
 * enables the functionality to drop elements inside the according container
 * @param {Event} ev
 */
function allowDrop(ev) {
	ev.preventDefault();
}

/**
 * sets the cardContainer of the dragged Task to the new value of the container it has been dropped inside
 * saves the changes on server
 * @param {HTMLElement} container
 */
async function moveTo(container) {
	allTasks[currentDraggedElement]['cardContainer'] = container;
	await setItem('allTasks', allTasks);
	renderTasksBoard();
}

/**
 * implements hover effects when an element is dragged over
 * @param {number} id
 */
function highlight(id) {
	document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * removes the highlighting when dragged element is not over the container anymore
 * @param {number} id
 */
function removeHighlight(id) {
	document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * starts the animation for opening a task in the bigger few
 * @param {number} taskIndex
 */
function slideBigCard(taskIndex) {
	let slideBigCard = document.querySelector('#big-card-slider');
	let slideInputBG = document.querySelector('#slide-transition-wrapper');
	if (slideBigCard.classList.contains('big-card-slide-transition')) {
		hideBigCard(slideInputBG, slideBigCard);
	} else {
		initShowBigCard(slideInputBG, slideBigCard, taskIndex);
	}
}

/**
 * hides the big card container
 * @param {HTMLElement} slideInputBG
 * @param {HTMLElement} slideBigCard
 */
function hideBigCard(slideInputBG, slideBigCard) {
	slideBigCard.classList.remove('big-card-slide-transition');
	slideInputBG.classList.remove('wrapper-transition');
	slideInputBG.classList.add('d-none');
}

/**
 * starts the creation of the html to display the selected card in the big container
 * calls according functions to create the big card elements
 * @param {HTMLElement} slideInputBG
 * @param {HTMLElement} slideBigCard
 * @param {number} taskIndex
 */
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

/**
 * formats the date to be displayed as dd/mm/yyyy and replaces "-" with "/"
 * @param {number} taskIndex
 * @returns
 */
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
}

/**
 * toggles the status of the 'done' status of a subtask and updates the changes on the server and displays new values
 * @param {number} taskIndex
 * @param {number} subIndex
 */
async function toggleSubtaskCheckbox(taskIndex, subIndex) {
	let task = allTasks[taskIndex];
	currSubtask = task.subtasks[subIndex];
	currSubtask.done = !currSubtask.done;
	task.subtaskCounter = updateSubtaskCounter(task);
	createBigTaskSubtasks(taskIndex);
	await setItem('allTasks', allTasks);
	await initBoard();
}

/**
 * updates the subtask counter for the given task and returns the value to the previous function to be updated
 * @param {object} task
 * @returns
 */
function updateSubtaskCounter(task) {
	let currSubtaskCounter = 0;
	for (let i = 0; i < task.subtasks.length; i++) {
		if (task.subtasks[i].done === true) {
			currSubtaskCounter += 1;
		}
	}
	return currSubtaskCounter;
}

/**
 * deletes a task from the board
 * @param {number} id
 */
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

/**
 * initialises the edit functionality for a given task
 * @param {number} taskIndex
 */
function editTask(taskIndex) {
	let task = allTasks[taskIndex];
	createEditTaskHtml(taskIndex);
	renderSelectedUsers();
	setPrio(task.prioName);
	setSelectedUsers(taskIndex);
	renderUsers();
	renderSubtasks();
}

/**
 * sets the values of the addTask inside the contacts JSON to true, so the userList will highlight already selected users for a task
 * @param {number} taskIndex
 */
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

/**
 * checks if necissary input fields are empty or not
 * initialises the operation to update the give task
 * @param {number} taskIndex
 */
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

/**
 * sets new values for the given task
 * @param {number} taskIndex
 */
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

/**
 * checks if the searchbar input is empty
 * if it is, all tasks will be rendered
 * if it is not empty, the renderFilteredTasks function is called
 */
function filterTasks() {
	let searchTaskInput = document.getElementById('search-bar').value.toLowerCase();
	if (searchTaskInput == null || searchTaskInput == '' || searchTaskInput < 1) {
		renderTasksBoard();
	} else {
		renderFilteredTasks(searchTaskInput);
	}
}

/**
 * compares the searchbar input with the value of the title and the description of each task
 * if neither title nor description include the search input, the task will not be displayed
 * @param {string} searchTaskInput
 */
function renderFilteredTasks(searchTaskInput) {
	for (let i = 0; i < allTasks.length; i++) {
		const currTitle = allTasks[i].title.toLowerCase();
		const currDesc = allTasks[i].description.toLowerCase();
		let currCard = document.getElementById(`task${allTasks[i].id}`);

		if (currTitle.includes(searchTaskInput) || currDesc.includes(searchTaskInput)) {
			currCard.classList.remove('d-none');
		} else {
			currCard.classList.add('d-none');
		}
	}
}

