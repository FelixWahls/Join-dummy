let tasksData;
let currentDraggedElement;

async function initBoard() {
	await includeHTML();
	tasksData = await getItem('allTasks');
	contacts = await getItem('contacts');
	// tasksData = JSON.parse(tasksData);
	renderTasksBoard();
}

function slideIn() {
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
	for (let i = 0; i < tasks.length; i++) {
		const element = tasks[i];
		console.log(element);
		currentTaskContainer.innerHTML += createCardHtml(element, i);
	}
}

function startDragging(id) {
	currentDraggedElement = id;
}

function allowDrop(ev) {
	ev.preventDefault();
}

function moveTo(container) {
	tasksData[currentDraggedElement]['cardContainer'] = container;
	renderTasksBoard();
}
