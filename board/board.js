let tasksData;
let currentDraggedElement;

async function initBoard() {
	await includeHTML();
	await initAddTask();
	tasksData = await getItem('allTasks');
	contacts = await getItem('contacts');
	// tasksData = JSON.parse(tasksData);
	renderTasksBoard();
	console.log(userList);
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
		}
	}
}

function renderTasksBoard() {
	let toDoTasks = tasksData.filter((t) => t['cardContainer'] == 'to-do-container');
	renderTasks(toDoTasks, 'to-do-container');
	let inProgressTasks = tasksData.filter((t) => t['cardContainer'] == 'in-progress-container');
	renderTasks(inProgressTasks, 'in-progress-container');
	let awaitFeedbackTasks = tasksData.filter(
		(t) => t['cardContainer'] == 'await-feedback-container'
	);
	renderTasks(awaitFeedbackTasks, 'await-feedback-container');
	let doneTasks = tasksData.filter((t) => t['cardContainer'] == 'done-container');
	renderTasks(doneTasks, 'done-container');
}

function renderTasks(tasks, container) {
	let currentTaskContainer = document.getElementById(container);
	currentTaskContainer.innerHTML = '';
	if (tasks.length === 0) {
		currentTaskContainer.innerHTML = createEmptyContainerHtml(container);
	} else {
		for (let i = 0; i < tasks.length; i++) {
			const element = tasks[i];
			currentTaskContainer.innerHTML += createCardHtml(element, i);
			createAssignedUsersHtml(element, i);
			createSubtasksHtml(element, i);
		}
	}
}

function startDragging(id) {
	currentDraggedElement = id;
}

function allowDrop(ev) {
	ev.preventDefault();
}

async function moveTo(container) {
	tasksData[currentDraggedElement]['cardContainer'] = container;
	console.log(tasksData[currentDraggedElement]);
	await setItem('allTasks', allTasks);
	renderTasksBoard();
}

function highlight(id) {
	document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
	document.getElementById(id).classList.remove('drag-area-highlight');
}

function slideBigCard(i) {
	let slideBigCard = document.querySelector('#big-card-slider');
	let slideInputBG = document.querySelector('#slide-transition-wrapper');
	if (slideBigCard.classList.contains('big-card-slide-transition')) {
		hideBigCard(slideInputBG, slideBigCard);
	} else {
		initShowBigCard(slideInputBG, slideBigCard, i);
	}
}

function hideBigCard(slideInputBG, slideBigCard) {
	slideBigCard.classList.remove('big-card-slide-transition');
	slideInputBG.classList.remove('wrapper-transition');
	slideInputBG.classList.add('d-none');
	resetForm();
}

function initShowBigCard(slideInputBG, slideBigCard, i) {
	let activeTask = allTasks[i];
	slideBigCard.classList.add('big-card-slide-transition');
	slideInputBG.classList.remove('d-none');
	slideInputBG.classList.add('wrapper-transition');
	createBigCard(i);
	createBigCardUsers(activeTask);
	createBigTaskSubtasks(i);
	subtasks = activeTask.subtasks;
}

function transformDate(i) {
	let currentDate = allTasks[i].date;
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

async function toggleSubtaskCheckbox(taskIndex, subIndex) {
	let currSubtask = allTasks[taskIndex].subtasks[subIndex];
	currSubtask.done = !currSubtask.done;
	updateSubCounter(taskIndex, currSubtask);
	createBigTaskSubtasks(taskIndex);
	await setItem('allTasks', allTasks);
	await initBoard();
}

function updateSubCounter(taskIndex) {
	let currTask = allTasks[taskIndex];
	let currSubtaskCounter = 0;

	for (let i = 0; i < currTask.subtasks.length; i++) {
		if (currTask.subtasks[i].done === true) {
			currSubtaskCounter += 1;
		}
	}
	currTask.subtaskCounter = currSubtaskCounter;
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

function setInputContainer(container) {
	toDoContainer = container;
}

function editTask(i) {
	let currentTask = allTasks[i];
	createEditTaskHtml(currentTask);
	createEditSubtaskList = createEditSubtaskHtml(currentTask);
}

function editSubtaskCard(i, container) {
	let subtaskContent = document.querySelector(`#subtask-element${i}`);
	let editContainer = document.getElementById(`${container}`);
	let subtaskEditInput = document.querySelector(`#edit-subtask-${i}`);
	subtaskContent.classList.add('d-none');
	editContainer.classList.remove('d-none');
	document.getElementById(`edit-subtask-${i}`).focus();
	subtaskEditInput.value = subtasks[i].subtaskName;
}
