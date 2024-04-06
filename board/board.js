async function initBoard() {
	await includeHTML();
	let data = await getItem('allTasks');
	splitTasks(data);
}

function splitTasks(data) {
	let toDoTasks = data.filter((data) => data.cardContainer === 'toDo');
	renderTasks(toDoTasks, 'to-do-container');
	let inProgressTasks = data.filter((data) => data.cardContainer === 'inProgress');
	renderTasks(inProgressTasks, 'in-progress-container');
	let awaitFeedbackTasks = data.filter((data) => data.cardContainer === 'awaitFeedback');
	renderTasks(awaitFeedbackTasks, 'await-feedback-container');
	let doneTasks = data.filter((data) => data.cardContainer === 'done');
	renderTasks(doneTasks, 'done-container');
}

function renderTasks(tasks, container) {}
