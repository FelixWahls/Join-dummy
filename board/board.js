async function initBoard() {
	await includeHTML();
	let tasksData = await getItem('allTasks');
	// tasksData = JSON.parse(tasksData);
	splitTasks(tasksData);
}

function slideIn() {
	let slideInput = document.querySelector('#add-task-slider');
	let slideInputBG = document.querySelector('#slide-transition-wrapper');
	if (slideInput.classList.contains('slide-in-transition')) {
		slideInput.classList.remove('slide-in-transition');
		slideInputBG.classList.remove('wrapper-transition');
		slideInputBG.classList.add('d-none');
	} else {
		slideInput.classList.add('slide-in-transition');
		slideInputBG.classList.remove('d-none');
		slideInputBG.classList.add('wrapper-transition');
	}
}

function splitTasks(tasksData) {
	let toDoTasks = tasksData.filter((tasksData) => tasksData.cardContainer === 'to-do-container');
	renderTasks(toDoTasks, 'to-do-container');
	let inProgressTasks = tasksData.filter(
		(tasksData) => tasksData.cardContainer === 'in-progress-container'
	);
	renderTasks(inProgressTasks, 'in-progress-container');
	let awaitFeedbackTasks = tasksData.filter(
		(tasksData) => tasksData.cardContainer === 'await-feedback-container'
	);
	renderTasks(awaitFeedbackTasks, 'await-feedback-container');
	let doneTasks = tasksData.filter((tasksData) => tasksData.cardContainer === 'done-container');
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
