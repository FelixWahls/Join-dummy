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

/**
 * creates the design for already selected users
 * @param {object} contact
 * @param {number} i
 * @returns
 */
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

/**
 * gets every selected user and calls the html for the capitals
 */
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

/**
 * creates the html for a capitals circle
 * @returns html for capitals circles
 */
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

/**
 * creates the list elements for every subtask that has been created for the current task
 */
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

/**
 * renders the add Task form on the board site
 */
function renderAddTaskHtml() {
	let container = document.getElementById('add-task-slider');
	container.innerHTML = /*html*/ `
        <img src="../img/close.png" class="close-window-btn" onclick="slideIn()" />
				<h1>Add Task</h1>
				<form id="add-task-form" onsubmit="return createTask(event)">
					<div class="task-container d-flex">
						<div class="left-col task-col d-flex">
							<div class="d-flex-col">
								<label for="title-input" class="req-label">Title</label>
								<input
									type="text"
									id="title-input"
									class="title-input"
									autocomplete="off"
									placeholder="Enter a title" />
								<div class="error d-none" id="error-title">
									This field is required
								</div>
							</div>
							<div class="d-flex-col">
								<label for="description-input">Description</label>
								<textarea
									name="description-input"
									id="description-input"
									class="description-input"
									placeholder="Enter a Description"
									cols="30"
									rows="10"
									maxlength="250"></textarea>
							</div>
							<div class="d-flex-col m-0 relative">
								<label for="assigned-to-input">Assigned to</label>
								<div class="input-container" onclick="openUserList()">
									<input
										type="text"
										id="assigned-to-input"
										autocomplete="off"
										class="assigned-to-input"
										placeholder="Select contacts to assign" 
										onkeyup="filterUsers()" />
									<img
										src="../img/arrow-drop-down.png"
										id="assigned-arrow"
										onclick="event.stopPropagation(); openUserList()" />
								</div>
								<div id="user-list" class="d-none absolute"></div>
								<div id="selected-users"></div>
							</div>
						</div>
						<span class="mid-line"></span>
						<div class="right-col task-col d-flex">
							<div class="d-flex-col">
								<label for="due-date-input" class="req-label">Due date</label>
								<input
									type="date"
									id="due-date-input"
									class="due-date-input"
									placeholder="dd/mm/yyyy" />
								<div class="error d-none" id="error-due-date">
									This field is required
								</div>
							</div>
							<div class="d-flex-col m-0">
								<label for="prio-container">Prio</label>
								<div id="prio-container" class="prio-container d-flex">
									<div
										class="prio d-flex"
										id="urgent"
										onclick="setPrio('urgent')">
										<p>Urgent</p>
										<img src="../img/prio-urgent.png" class="prio-image" />
									</div>
									<div
										class="prio d-flex active-medium"
										id="medium"
										onclick="setPrio('medium')">
										<p>Medium</p>
										<img src="../img/active-medium.png" class="prio-image" />
									</div>
									<div class="prio d-flex" id="low" onclick="setPrio('low')">
										<p>Low</p>
										<img src="../img/prio-low.png" class="prio-image" />
									</div>
								</div>
							</div>
							<div class="d-flex-col m-0">
								<label for="category-input" class="req-label">Category</label>
								<select
									name="category-input"
									id="category-input"
									class="category-input">
									<option value="" disabled selected hidden>
										Select task category
									</option>
									<option value="User Story">User Story</option>
									<option value="Technical Task">Technical Task</option>
								</select>
								<div class="error d-none" id="error-category">
									This field is required
								</div>
							</div>
							<div class="d-flex-col m-0">
								<label for="subtask-input" class="">Subtasks</label>
								<div class="input-container">
									<input
										type="text"
										id="subtask-input"
										class="subtask-input"
										autocomplete="off"
										placeholder="Add new subtask"
										onclick="activateInput()" />
									<img
										src="../img/add-subtask.png"
										onclick="event.stopPropagation(); activateInput(); setFocus()"
										id="add-subtask"
										class="add-subtasks-btn" />
									<div
										id="subtask-input-actions"
										class="d-flex align-c add-subtasks-btn d-none">
										<img
											src="../img/check-blue.png"
											class="subtask-actions submit-input"
											onclick="submitSubtask()" />
										<span class="vertical-line-sub"></span>
										<img
											src="../img/close.png"
											class="subtask-actions"
											onclick="deactivateInput()" />
									</div>
								</div>
								<ul id="subtask-container"></ul>
							</div>
						</div>
					</div>
					<div class="bottom-section d-flex">
						<div class="required-info">This field is required</div>
						<div class="add-task-btns d-flex">
							<button class="clear-field" type="reset" onclick="resetForm()">
								<p>Clear</p>
								<img src="../img/close.png" alt="" />
								<img src="../img/close-hover.png" class="d-none" />
							</button>
							<button class="create-task" type="submit">
								<p>Create Task</p>
								<img src="../img/create-task.png" alt="" />
							</button>
						</div>
					</div>
				</form>
				<div class="task-added-slider">
					<p>Task added to board</p>
					<img src="../img/tasks.png" alt="" />
				</div>
    `;
}

/**
 * creates the basic html element for a small card
 * @param {number} taskId
 * @param {numer} taskIndex
 * @returns
 */
function createCardHtml(taskId, taskIndex) {
	let task = allTasks[taskIndex];
	let categoryColor = setCategoryColor(taskIndex);
	return /*html*/ `
        <div class="flex-col single-task" id="task${taskId}" onclick="slideBigCard(${taskId})" draggable="true" ondragstart="startDragging(${taskId})">
			<div class="task-type" style="background-color:${categoryColor}">${task.category}</div>
			<div class="task-content">
				<h3>${task.title}</h3>
				<p class="single-card-description">${task.description}</p>
			</div>
			<div id="subtask-content${taskId}" class="subtask-content"></div>
			<div class="bottom-content">
				<div class="assigned-users" id="small-card-users${taskId}">
				</div>
				<div class="priority">
					<img src="${task.priority}" alt="" />
				</div>
			</div>
		</div>
    `;
}

/**
 * creates the user-capitals circles for all selected users of the task
 * @param {number} taskIndex
 */
function createAssignedUsersHtml(taskIndex) {
	let task = allTasks[taskIndex];
	let container = document.getElementById(`small-card-users${task.id}`);
	container.innerHTML = '';
	for (let i = 0; i < task.users.length; i++) {
		const element = task.users[i];
		container.innerHTML += `<div class="user" style="background-color:${element.circleColor}">${element.userCapitals}</div>`;
	}
}

/**
 * returns the html template for subtask bars on small cards
 * @param {number} taskIndex
 * @returns html template for subtask bars
 */
function createSubtasksHtml(taskIndex) {
	let task = allTasks[taskIndex];
	let container = document.getElementById(`subtask-content${task.id}`);
	container.innerHTML = '';
	if (task.subtasks.length > 0) {
		let subtaskBarWidth = calcSubtaskProgress(taskIndex);
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

/**
 * calculates the width of the progress bar
 * @param {number} taskIndex
 * @returns the pixels the progress bar has to be wide
 */
function calcSubtaskProgress(taskIndex) {
	let task = allTasks[taskIndex];
	let singleProgress = 125 / task.subtasks.length;
	return singleProgress * task.subtaskCounter;
}

/**
 * creates the html for an empty card container
 * @param {string} containerType
 * @returns html template for no tasks in container
 */
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

/**
 * creates the html for a big card with every information of the given task
 * @param {number} taskIndex
 */
function createBigCard(taskIndex) {
	let task = allTasks[taskIndex];
	let correctDate = transformDate(taskIndex);
	let priorityName = task.prioName;
	let newPrioName = priorityName.charAt(0).toUpperCase() + priorityName.slice(1);
	let categoryColor = setCategoryColor(taskIndex);
	let bigCardContainer = document.querySelector('#big-card-slider');
	bigCardContainer.innerHTML = /*html*/ `
        <div class="header-section">
			<div class="task-type" style="background-color: ${categoryColor}">${task.category}</div>
			<img src="../img/close.png" onclick="slideBigCard()" />
		</div>
		<div class="content-section">
			<h2 class="big-card-title">${task.title}</h2>
			<p class="task-description">${task.description}</p>
		</div>
		<div class="task-info-section flex-col">
			<div class="due-date-content d-flex">
				<p class="big-card-lable">Due date:</p>
				<p class="big-card-lable-content">${correctDate}</p>
			</div>
			<div class="priority-content d-flex">
				<p class="big-card-lable">Priority:</p>
				<p class="big-card-lable-content d-flex align-c">
                ${newPrioName} <img src="${task.priority}" id="big-card-prio-img" />
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
			<span class="big-card-buttons d-flex align-c pointer" onclick="deleteTask(${task.id})"
				><img src="../img/delete.png" />Delete</span
			>
			<span class="vertical-line-sub"></span>
			<span class="big-card-buttons d-flex align-c pointer" onclick="editTask(${taskIndex})"
				><img src="../img/edit.png" />Edit</span
			>
		</div>
    `;
}

/**
 * creates the html for every currently assigned user of the given task
 * @param {number} taskIndex
 */
function createBigCardUsers(taskIndex) {
	let task = allTasks[taskIndex];
	let bigCardUsersHtml = document.getElementById('big-card-users');
	bigCardUsersHtml.innerHTML = '';
	let allAssignedUsers = task.users;
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

/**
 * creates the html to display every subtask of the current task with checkboxes
 * @param {number} taskIndex
 */
function createBigTaskSubtasks(taskIndex) {
	let task = allTasks[taskIndex];
	let subtaskContainer = document.getElementById('subtask-container');
	subtaskContainer.innerHTML = '';
	let allSubs = task.subtasks;
	for (let i = 0; i < allSubs.length; i++) {
		const currSubtask = allSubs[i];
		subtaskContainer.innerHTML += /*html*/ `
            <span class="big-single-subtask d-flex align-c" onclick="toggleSubtaskCheckbox(${taskIndex}, ${i})"
				><img src="${getSubtaskImg(
					currSubtask
				)}" id="cardSubtask${i}" onclick="" class="subtask-checkbox pointer" />${
			currSubtask.subtaskName
		}</span
			>
        `;
	}
}

/**
 * returns the img sourcecode for the current subtask checkbox
 * @param {object} currSubtask
 * @returns img.src for the checkbox of a subtask
 */
function getSubtaskImg(currSubtask) {
	if (currSubtask.done === true) {
		return '../img/CheckboxCheck.png';
	} else {
		return '../img/Checkbox.png';
	}
}

/**
 * creates the edit task HTML
 * @param {number} taskIndex
 */
function createEditTaskHtml(taskIndex) {
	let task = allTasks[taskIndex];
	selectedUsers = task.users;
	let bigCardContainer = document.querySelector('#big-card-slider');
	bigCardContainer.innerHTML = /*html*/ `
        <img src="../img/close.png" id="close-edit-task-window" onclick="slideBigCard(); resetForm()" />
        <div class="d-flex-col">
            <label for="title-input" class="req-label">Title</label>
            <input
                type="text"
                id="title-input"
                class="title-input"
                autocomplete="off"
                placeholder="Enter a title"
                value="${task.title}" />
            <div class="error d-none" id="error-title">
                This field is required
            </div>
        </div>
        <div class="d-flex-col">
            <label for="description-input">Description</label>
            <textarea
                name="description-input"
                id="description-input"
                class="description-input"
                placeholder="Enter a Description"
                cols="30"
                rows="10"
                maxlength="250">${task.description}</textarea>
        </div>
        <div class="d-flex-col m-0 relative">
            <label for="assigned-to-input">Assigned to</label>
            <div class="input-container" onclick="openUserList()">
                <input
                    type="text"
                    id="assigned-to-input"
                    autocomplete="off"
                    class="assigned-to-input"
                    placeholder="Select contacts to assign" 
					onkeyup="filterUsers()" />
                <img
                    src="../img/arrow-drop-down.png"
                    id="assigned-arrow"
                    onclick="event.stopPropagation(); openUserList()" />
            </div>
            <div id="user-list" class="d-none absolute"></div>
            <div id="selected-users"></div>
        </div>
    </div>
    <span class="mid-line"></span>
    <div class="right-col task-col d-flex">
        <div class="d-flex-col">
            <label for="due-date-input" class="req-label">Due date</label>
            <input
                type="date"
                id="due-date-input"
                class="due-date-input"
                placeholder="dd/mm/yyyy" 
                value="${task.date}" />
            <div class="error d-none" id="error-due-date">
                This field is required
            </div>
        </div>
        <div class="d-flex-col m-0">
            <label for="prio-container">Prio</label>
            <div id="prio-container" class="prio-container d-flex">
                <div
                    class="prio d-flex"
                    id="urgent"
                    onclick="setPrio('urgent')">
                    <p>Urgent</p>
                    <img src="../img/prio-urgent.png" class="prio-image" />
                </div>
                <div
                    class="prio d-flex active-medium"
                    id="medium"
                    onclick="setPrio('medium')">
                    <p>Medium</p>
                    <img src="../img/active-medium.png" class="prio-image" />
                </div>
                <div class="prio d-flex" id="low" onclick="setPrio('low')">
                    <p>Low</p>
                    <img src="../img/prio-low.png" class="prio-image" />
                </div>
            </div>
        </div>
        <div class="d-flex-col m-0">
            <label for="category-input" class="req-label">Category</label>
            <select
                name="category-input"
                id="category-input"
                class="category-input">
                <option value="" disabled selected hidden>
                    Select task category
                </option>
                <option value="User Story">User Story</option>
                <option value="Technical Task">Technical Task</option>
            </select>
            <div class="error d-none" id="error-category">
                This field is required
            </div>
        </div>
        <div class="d-flex-col m-0">
            <label for="subtask-input" class="">Subtasks</label>
            <div class="input-container">
                <input
                    type="text"
                    id="subtask-input"
                    class="subtask-input"
                    autocomplete="off"
                    placeholder="Add new subtask"
                    onclick="activateInput()" />
                <img
                    src="../img/add-subtask.png"
                    onclick="event.stopPropagation(); activateInput(); setFocus()"
                    id="add-subtask"
                    class="add-subtasks-btn" />
                <div
                    id="subtask-input-actions"
                    class="d-flex align-c add-subtasks-btn d-none">
                    <img
                        src="../img/check-blue.png"
                        class="subtask-actions submit-input"
                        onclick="submitSubtask()" />
                    <span class="vertical-line-sub"></span>
                    <img
                        src="../img/close.png"
                        class="subtask-actions"
                        onclick="deactivateInput()" />
                </div>
            </div>
            <ul id="subtask-container"></ul>
        </div>
        <button onclick="submitTaskChanges(${taskIndex})">OK</button>
    `;
}

/**
 * creates the edit subtask html inside of the edit window
 */
function createEditSubtaskHtml() {
	let subtaskList = document.querySelector('#subtask-container');
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
                             class="subtask-actions" onclick=""/>
                         <span class="vertical-line-sub"></span>
                         <img src="../img/delete.png" onclick="" class="subtask-actions" />
                     </div>
                 </div>
             </li>
         `;
	}
}
