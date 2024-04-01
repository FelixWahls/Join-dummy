const form = document.getElementById('add-task-form');

form.addEventListener('submit', function (event) {
	event.preventDefault();
});

/**
 * checks if user List is already opened and either closes or opens it
 */
function openUserList() {
	let userList = document.querySelector('#user-list');
	let arrow = document.querySelector('#assigned-arrow');

	if (userList.classList.contains('d-none')) {
		userList.classList.remove('d-none');
		arrow.src = '../img/arrow-drop-up.png';
		renderUsers(userList);
	} else {
		userList.classList.add('d-none');
		arrow.src = '../img/arrow-drop-down.png';
	}
}

/**
 *  iterates over all contacts
 * @param {HTMLElement} userList
 */
function renderUsers(userList) {
	userList.innerHTML = '';
	for (let i = 0; i < contacts.length; i++) {
		const contact = contacts[i];
		userList.innerHTML += createUserHtml(contact, i);
	}
}

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
				<div class="user-icon">${user.capitals}</div>
				<div class="user-name">${user.name}</div>
			</div>
			<img src="../img/Checkbox.png" />
		</div>
    `;
}

/**
 * checks if a user is already assigned and adjustes the design accordingly
 * @param {number} i
 */
function selectedUser(i) {
	let activeUser = document.querySelector(`#user${i}`);
	let image = activeUser.querySelector('img');

	if (!activeUser.classList.contains('active-user')) {
		activeUser.classList.add('active-user');
		image.src = '../img/checkbox-check-white.png';
	} else {
		activeUser.classList.remove('active-user');
		image.src = '../img/Checkbox.png';
	}
}
