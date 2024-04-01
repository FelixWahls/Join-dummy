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
				<div class="user-icon" id="user-capitals">${user.capitals}</div>
				<div class="user-name">${user.name}</div>
			</div>
			<img src="../img/Checkbox.png" />
		</div>
    `;
}
