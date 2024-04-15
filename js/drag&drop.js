let currentDraggedElement;
let arrayPosition;
let currentStatus;
let offsetX;
let offsetY;
let touchedElement;

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
