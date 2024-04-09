let tasksData;
let currentDraggedElement;

async function initBoard() {
	await includeHTML();
	await initAddTask();
	tasksData = await getItem('allTasks');
	contacts = await getItem('contacts');
	// tasksData = JSON.parse(tasksData);
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
		}
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
		slideBigCard.classList.remove('big-card-slide-transition');
		slideInputBG.classList.remove('wrapper-transition');
		slideInputBG.classList.add('d-none');
		resetForm();
	} else {
		slideBigCard.classList.add('big-card-slide-transition');
		slideInputBG.classList.remove('d-none');
		slideInputBG.classList.add('wrapper-transition');
		createBigCard(i);
	}
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
