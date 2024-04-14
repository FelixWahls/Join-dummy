let toDoAmount = document.getElementById('toDoAmount');
let inProgressAmount = document.querySelector('.summaryProgress');
let awaitFeedbackAmount = document.querySelector('.summaryFeedback');
let doneAmount = document.querySelector('.summaryDone');
let allTasksAmount = document.querySelector('.summaryAllTasks');
let formattedDate;
let urgentCounter = 0;

async function render() {
	allTasks = await getItem('allTasks');
	getAllCounters();
	getUrgentTasks();
	findNearestDateObject();
	// changeDateFormat();
	allTasksAmount.innerHTML = allTasks.length;
}

function findNearestDateObject() {
	const currentDate = new Date();
	let nearestDateObject;
	let nearestDateDiff = Infinity;

	allTasks.forEach((task) => {
		const taskDate = new Date(task.date);
		const diff = Math.abs(taskDate - currentDate);
		if (diff < nearestDateDiff) {
			nearestDateDiff = diff;
			nearestDateObject = task;
		}
	});
	formatDate(nearestDateObject.date);
}

function formatDate(dateString) {
	const date = new Date(dateString);
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	formattedDate = date.toLocaleDateString('en-US', options);
	document.getElementById('mid-row-date').innerHTML = formattedDate;
}

function getAllCounters() {
	const taskCounts = {
		'to-do-container': 0,
		'in-progress-container': 0,
		'await-feedback-container': 0,
		'done-container': 0,
	};
	for (const key in allTasks) {
		// Überprüfe, ob das Objekt den Key "cardContainer" hat
		if (allTasks.hasOwnProperty(key) && allTasks[key].hasOwnProperty('cardContainer')) {
			// Inkrementiere den Zähler für den entsprechenden Container
			taskCounts[allTasks[key].cardContainer]++;
		}
	}
	toDoAmount.innerHTML = taskCounts['to-do-container'];
	inProgressAmount.innerHTML = taskCounts['in-progress-container'];
	awaitFeedbackAmount.innerHTML = taskCounts['await-feedback-container'];
	doneAmount.innerHTML = taskCounts['done-container'];
}

function getUrgentTasks() {
	allTasks.forEach((task) => {
		if (task.prioName === 'urgent') {
			urgentCounter++;
		}
	});
	document.getElementById('urgent-counter').innerHTML = urgentCounter;
}
