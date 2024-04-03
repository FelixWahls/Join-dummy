/**
 * creates html template for every assignable contact
 * @param {object} user
 * @param {number} i
 * @returns
 */
function createUserHtml(user, i) {
	return /*html*/ `
        <div class="single-user d-flex align-c" onclick="selectedUser(${i})" id="user${i}">
			<div class="user-info d-flex align-c">
				<div class="user-icon d-flex" id="user-capitals">${user.capitals}</div>
				<div class="user-name">${user.name}</div>
			</div>
			<img src="../img/Checkbox.png" />
		</div>
    `;
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
				<p>${element}</p>
				<div class="subtask-imgs d-flex align-c">
					<img
						src="../img/check-blue.png"
						class="subtask-actions" />
					<span class="vertical-line-sub"></span>
					<img src="../img/delete.png" class="subtask-actions" />
				</div>
			</li>
        `;
	}
}
