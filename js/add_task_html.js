/**
 * creates html template for every assignable contact
 * @param {object} user
 * @param {number} i
 * @returns
 */
function createUnselectedUserHtml(contact, i) {
	return /*html*/ `
        <div class="single-user d-flex align-c" onclick="selectedUser(${i})" id="user${i}">
			<div class="user-info d-flex align-c">
				<div class="user-icon d-flex" id="user-capitals-${i}" style="background-color:${contact.color}">${contact.capitals}</div>
				<div class="user-name" id="full-user-name-${i}">${contact.name}</div>
			</div>
			<img src="../img/Checkbox.png" />
		</div>
    `;
}

function createSelectedUserHtml(contact, i) {
	return /*html*/ `
        <div class="single-user d-flex align-c active-user" onclick="selectedUser(${i})" id="user${i}">
			<div class="user-info d-flex align-c">
				<div class="user-icon d-flex" id="user-capitals-${i}" style="background-color:${contact.color}">${contact.capitals}</div>
				<div class="user-name" id="full-user-name-${i}">${contact.name}</div>
			</div>
			<img src="../img/checkbox-check-white.png" />
		</div>
    `;
}

function renderSelectedUsers() {
	let selectedContainer = document.querySelector('#selected-users');
	selectedContainer.innerHTML = '';
	let capitalsHtml = createUserCapitalsHtml();
	if (selectedUsers.length > 0) {
		for (let i = 0; i < selectedUsers.length; i++) {
			const element = selectedUsers[i];
			selectedContainer.innerHTML = capitalsHtml;
		}
	} else {
		selectedContainer = '';
	}
}

function createUserCapitalsHtml() {
	let capitalsHtml = '';
	for (let i = 0; i < selectedUsers.length; i++) {
		const element = selectedUsers[i]['userCapitals'];
		capitalsHtml += `
            <div class="user-icon d-flex" style="background-color:${selectedUsers[i].circleColor}">${element}</div>
        `;
	}
	return capitalsHtml;
}

function renderSubtasks() {
	let subtaskList = document.querySelector('#subtask-container');
	subtaskList.innerHTML = '';
	for (let i = 0; i < subtasks.length; i++) {
		const element = subtasks[i].subtaskName;
		subtaskList.innerHTML += /*html*/ `
            <li
				id="todo-id-${i}"
				class="todo-subtask d-flex"
				ondblclick="editSubtask(${i})">
                <div class="d-flex align-c todo-subtask-container" id="subtask-element${i}">
                    <p>${element}</p>
                    <div class="subtask-imgs d-flex align-c">
					    <img
						    src="../img/edit.png"
						    class="subtask-actions"
                            onclick="event.stopPropagation(); editSubtask(${i}, 'edit-subtask-container') "/>
					    <span class="vertical-line-sub"></span>
					    <img src="../img/delete.png" onclick="deleteSubtask(${i})" class="subtask-actions" />
				    </div>
                </div>
                <div class="d-flex align-c todo-subtask-container set-edit d-none" id="edit-subtask-container">
                    <input type="text" id="edit-subtask-${i}" class="subtask-edit">
                    <div class="subtask-imgs d-flex align-c">
					    <img
						    src="../img/check-blue.png"
						    class="subtask-actions" onclick="submitChange(${i})"/>
					    <span class="vertical-line-sub"></span>
					    <img src="../img/delete.png" onclick="deleteSubtask(${i})" class="subtask-actions" />
				    </div>
                </div>
			</li>
        `;
	}
}

function createCardHtml(task, i) {
	let categoryColor = setCategoryColor(task);
	return /*html*/ `
        <div class="flex-col single-task" id="task${task.id}" onclick="slideBigCard(${i})" draggable="true" ondragstart="startDragging(${task.id})">
			<div class="task-type" style="background-color:${categoryColor}">${task.category}</div>
			<div class="task-content">
				<h3>${task.title}</h3>
				<p>${task.description}</p>
			</div>
			<div id="subtask-content${i}" class="subtask-content"></div>
			<div class="bottom-content">
				<div class="assigned-users" id="small-card-users${i}">
				</div>
				<div class="priority">
					<img src="${task.priority}" alt="" />
				</div>
			</div>
		</div>
    `;
}

function createAssignedUsersHtml(task, i) {
	let container = document.getElementById(`small-card-users${i}`);
	container.innerHTML = '';
	for (let i = 0; i < task.users.length; i++) {
		const element = task.users[i];
		container.innerHTML += `<div class="user" style="background-color:${element.circleColor}">${element.userCapitals}</div>`;
	}
}

function createSubtasksHtml(task, i) {
	let container = document.getElementById(`subtask-content${i}`);
	container.innerHTML = '';
	if (task.subtasks.length > 0) {
		let subtaskBarWidth = calcSubtaskProgress(task);
		container.innerHTML += /*html*/ `
				<span class="subtask-bar-empty">
					<span class="subtask-bar-progress" style="width: ${subtaskBarWidth}px;"></span>
				</span>
				<span>${task.subtaskCounter}/${task.subtasks.length} Subtasks</span>
        `;
	} else {
		return '';
	}
}

function calcSubtaskProgress(task) {
	console.log(task.subtaskCounter);
	let singleProgress = 125 / task.subtasks.length;
	return singleProgress * task.subtaskCounter;
}

function createEmptyContainerHtml(containerType) {
	let emptyText = '';
	switch (containerType) {
		case 'to-do-container':
			emptyText = 'No tasks to do';
			break;
		case 'in-progress-container':
			emptyText = 'No tasks in Progress';
			break;
		case 'await-feedback-container':
			emptyText = 'No tasks await feedback';
			break;
		case 'done-container':
			emptyText = 'No tasks done';
			break;
		default:
			emptyText = 'No tasks';
	}
	return /*html*/ `
        <div class="no-tasks">
			<div id="no-task-text">${emptyText}</div>
		</div>
    `;
}

function createBigCard(i) {
	let currentTask = allTasks[i];
	let correctDate = transformDate(i);
	let priorityName = currentTask.prioName;
	let newPrioName = priorityName.charAt(0).toUpperCase() + priorityName.slice(1);
	let categoryColor = setCategoryColor(currentTask);
	let bigCardContainer = document.querySelector('#big-card-slider');
	bigCardContainer.innerHTML = /*html*/ `
        <div class="header-section">
			<div class="task-type" style="background-color: ${categoryColor}">${currentTask.category}</div>
			<img src="../img/close.png" onclick="slideBigCard()" />
		</div>
		<div class="content-section">
			<h2 class="big-card-title">${currentTask.title}</h2>
			<p class="task-description">${currentTask.description}</p>
		</div>
		<div class="task-info-section flex-col">
			<div class="due-date-content d-flex">
				<p class="big-card-lable">Due date:</p>
				<p class="big-card-lable-content">${correctDate}</p>
			</div>
			<div class="priority-content d-flex">
				<p class="big-card-lable">Priority:</p>
				<p class="big-card-lable-content d-flex align-c">
                ${newPrioName} <img src="${currentTask.priority}" id="big-card-prio-img" />
				</p>
			</div>
			<div class="flex-col assigned-to-content">
				<p class="big-card-lable">Assigned To:</p>
				<div class="big-card-assigned-users" id="big-card-users">
                </div>
			</div>
			<div class="flex-col assigned-to-content">
				<p class="big-card-lable">Subtasks:</p>
				<div class="big-card-subtask-list flex-col" id="subtask-container">
				</div>
			</div>
		</div>
		<div class="big-card-bottom">
			<span class="big-card-buttons d-flex align-c pointer" onclick="deleteTask(${currentTask.id})"
				><img src="../img/delete.png" />Delete</span
			>
			<span class="vertical-line-sub"></span>
			<span class="big-card-buttons d-flex align-c pointer" onclick="editTask(${i})"
				><img src="../img/edit.png" />Edit</span
			>
		</div>
    `;
}

function createBigCardUsers(currentTask) {
	let bigCardUsersHtml = document.getElementById('big-card-users');
	bigCardUsersHtml.innerHTML = '';
	let allAssignedUsers = currentTask.users;
	for (let i = 0; i < allAssignedUsers.length; i++) {
		const element = allAssignedUsers[i];
		bigCardUsersHtml.innerHTML += /*html*/ `
            <div class="single-big-card-user d-flex align-c">
                <div class="user-icon d-flex" style="background-color:${element.circleColor}">${element.userCapitals}</div>
		        <div class="user-name" style="font-size: 19px">${element.fullUserNames}</div>
            </div> 
        `;
	}
}

function createBigTaskSubtasks(index) {
	let subtaskContainer = document.getElementById('subtask-container');
	subtaskContainer.innerHTML = '';
	let allSubs = allTasks[index].subtasks;
	for (let i = 0; i < allSubs.length; i++) {
		const currSubtask = allSubs[i];
		subtaskContainer.innerHTML += /*html*/ `
            <span class="big-single-subtask d-flex align-c" onclick="toggleSubtaskCheckbox(${index}, ${i})"
				><img src="${getSubtaskImg(
					currSubtask
				)}" id="cardSubtask${i}" onclick="" class="subtask-checkbox pointer" />${
			currSubtask.subtaskName
		}</span
			>
        `;
	}
}

function getSubtaskImg(currSubtask) {
	if (currSubtask.done === true) {
		return '../img/CheckboxCheck.png';
	} else {
		return '../img/Checkbox.png';
	}
}

function createEditTaskHtml(currentTask) {
	let bigCardContainer = document.querySelector('#big-card-slider');
	bigCardContainer.innerHTML = /*html*/ `
        <div class="edit-task-container flex-col">
            <div class="edit-task-wrapper">
				<div class="edit-task-element flex-col">
					<span>Title</span>
					<input type="text" id="edit-task-title" class="title-input" value="${currentTask.title}" />
				</div>
				<div class="edit task-element flex-col">
					<span>Description</span>
					<textarea
						name="edit-task-description"
						id="edit-task-description"
						cols="30"
						rows="10"
						maxlength="250">${currentTask.description}</textarea>
				</div>
				<div class="edit-task-container flex-col">
					<span>Assigned to</span>
                    <div class="relative input-container">
					    <input type="text" class="title-input assigned-to-input" placeholder="Select contacts to assign"/>
					    <img
						    src="../img/arrow-drop-down.png"
						    id="edit-assigned-arrow"
						    autocomplete="off"
						    onclick="event.stopPropagation(); openEditUserList()" />
                    </div>
				</div>
				<div class="edit-task-element flex-col">
					<span>Due date</span>
					<input type="date" class="due-date-input" value="${currentTask.date}" />
				</div>
				<div class="edit-task-element flex-col">
					<span>Prio</span>
					<div id="" class="prio-container d-flex">
						<div class="prio d-flex" id="edit-urgent" onclick="setPrio('urgent')">
							<p>Urgent</p>
							<img src="../img/prio-urgent.png" class="prio-image" />
						</div>
						<div class="prio d-flex active-medium" id="edit-medium" onclick="setPrio('medium')">
							<p>Medium</p>
							<img src="../img/active-medium.png" class="prio-image" />
						</div>
						<div class="prio d-flex" id="edit-low" onclick="setPrio('low')">
							<p>Low</p>
							<img src="../img/prio-low.png" class="prio-image" />
						</div>
					</div>
				</div>
				<div class="edit-task-element flex-col">
					<span>Category</span>
					<select name="category-input" id="category-input" class="category-input">
						<option value="" disabled selected hidden>Select task category</option>
						<option value="User Story">User Story</option>
						<option value="Technical Task">Technical Task</option>
					</select>
				</div>
				<div class="edit-task-element flex-col">
                    <span>Subtasks</span>
                    <div class="input-container">
                        <input
                            type="text"
                            id="subtask-input-card"
                            class="subtask-input"
                            autocomplete="off"
                            placeholder="Add new subtask"
                            onclick="activateInput('add-subtask-card', 'sub-input-action-card')" />
                        <img
                            src="../img/add-subtask.png"
                            onclick="event.stopPropagation(); activateInput('add-subtask-card', 'sub-input-action-card')"
                            id="add-subtask-card"
                            class="add-subtasks-btn" />
                        <div id="sub-input-action-card" class="d-flex align-c add-subtasks-btn d-none">
                            <img
                                src="../img/check-blue.png"
                                class="subtask-actions submit-input"
                                onclick="submitSubtask('subtask-input-card')" />
                            <span class="vertical-line-sub"></span>
                            <img src="../img/close.png" class="subtask-actions" onclick="deactivateInput('add-subtask-card', 'sub-input-action-card')" />
                        </div>
                    </div>
                    <ul id="edit-subtask-container"></ul>
				</div>
                <button type="submit" onclick="event.preventDefault() editTask()">OK</button>
            </div>
		</div>
    `;
}

function createEditSubtaskHtml(currentTask) {
	let subtaskList = document.querySelector('#edit-subtask-container');
	subtaskList.innerHTML = '';
	for (let i = 0; i < currentTask.subtasks.length; i++) {
		const element = currentTask.subtasks[i].subtaskName;
		subtaskList.innerHTML += /*html*/ `
            <li
                id="todo-id-${i}"
                class="todo-subtask d-flex"
                ondblclick="editSubtask(${i})">
                <div class="d-flex align-c todo-subtask-container" id="subtask-element${i}">
                    <p>${element}</p>
                    <div class="subtask-imgs d-flex align-c">
                        <img
                            src="../img/edit.png"
                            class="subtask-actions"
                            onclick="event.stopPropagation(); editSubtask(${i}, 'edit-subtask-container-card', ${element}) "/>
                        <span class="vertical-line-sub"></span>
                        <img src="../img/delete.png" onclick="deleteSubtask(${i})" class="subtask-actions" />
                    </div>
                </div>
                <div class="d-flex align-c todo-subtask-container set-edit d-none" id="edit-subtask-container-card">
                    <input type="text" id="edit-subtask-${i}" class="subtask-edit">
                    <div class="subtask-imgs d-flex align-c">
                        <img
                            src="../img/check-blue.png"
                            class="subtask-actions" onclick=""/>
                        <span class="vertical-line-sub"></span>
                        <img src="../img/delete.png" onclick="" class="subtask-actions" />
                    </div>
                </div>
            </li>
        `;
	}
}
