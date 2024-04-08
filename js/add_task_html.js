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
				<div class="user-icon d-flex" id="user-capitals-${i}">${contact.capitals}</div>
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
				<div class="user-icon d-flex" id="user-capitals-${i}">${contact.capitals}</div>
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
            <div class="user-icon d-flex">${element}</div>
        `;
	}
	return capitalsHtml;
}

function renderSubtasks() {
	let subtaskList = document.querySelector('#subtask-container');
	subtaskList.innerHTML = '';
	for (let i = 0; i < subtasks.length; i++) {
		const element = subtasks[i];
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
                            onclick="event.stopPropagation(); editSubtask(${i})"/>
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
	let assignedUsersHtml = createAssignedUsersHtml(task);
	let subtasksHtml = createSubtasksHtml(task);
	return /*html*/ `
        <div class="flex-col single-task" id="task${task.id}" onclick="slideBigCard(${i})" draggable="true" ondragstart="startDragging(${task.id})">
			<div class="task-type">${task.category}</div>
			<div class="task-content">
				<h3>${task.title}</h3>
				<p>${task.description}</p>
			</div>
			${subtasksHtml}
			<div class="bottom-content">
				<div class="assigned-users">
                    ${assignedUsersHtml}
				</div>
				<div class="priority">
					<img src="${task.priority}" alt="" />
				</div>
			</div>
		</div>
    `;
}

function createAssignedUsersHtml(task) {
	let assignedUserCapitals = '';
	for (let i = 0; i < task.users.length; i++) {
		const element = task.users[i];
		assignedUserCapitals += `<div class="user user-one">${element.userCapitals}</div>`;
	}
	return assignedUserCapitals;
}

function createSubtasksHtml(task) {
	if (task.subtasks > 0) {
		let subtaskBarWidth = calcSubtaskProgress(task);
		return /*html*/ `
            <div class="subtask-content">
				<span class="subtask-bar-empty">
					<span class="subtask-bar-progress" style="width: ${subtaskBarWidth}px;"></span>
				</span>
				<span>0/${task.subtasks.length} Subtasks</span>
			</div>
        `;
	} else {
		return '';
	}
}

function calcSubtaskProgress(task) {}

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
