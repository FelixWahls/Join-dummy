/**
 *
 * @param {string} name
 * @returns
 */
function extractCapitalLetters(name) {
	let capitals = '';
	for (let i = 0; i < contacts.length; i++) {
		if (contacts[i].name === name) {
			for (let j = 0; j < name.length; j++) {
				if (name[j] === name[j].toUpperCase() && name[j] !== ' ') {
					capitals += name[j];
				}
			}
			contacts[i].capitals = capitals;
			break; // Once found, no need to continue looping
		}
	}
	return capitals;
}

function initContactlist() {
	let initContacts = document.querySelector('#initContacts');
	initContacts.innerHTML = '';
	let lastInitial = null;

	// Sortiere die Kontakte alphabetisch nach Namen, um die Gruppierung zu vereinfachen
	contacts.sort((a, b) => a.name.localeCompare(b.name));

	for (let i = 0; i < contacts.length; i++) {
		const contact = contacts[i];

		// Extrahiere den ersten Großbuchstaben des aktuellen Namens
		const currentInitial = contact.name[0].toUpperCase();
		// Überprüfe, ob der aktuelle Großbuchstabe gleich dem letzten ist
		if (currentInitial !== lastInitial) {
			// Wenn nicht, füge einen neuen Abschnitt mit der ersten Großbuchstabe hinzu
			initContacts.innerHTML += `
          <div class="listInitiale">
            <span class="firstCharacter">${currentInitial}</span>
          </div>
          <div class="partingLineDiv">
            <div class="partingLine">
            </div>
          </div>
        `;
			lastInitial = currentInitial; // Aktualisiere den letzten Großbuchstaben
		}

		// Füge den Kontakt in der entsprechenden Gruppe hinzu
		initContacts.innerHTML += `
        <div class="contactCard" id='contactCard${i}' onclick='openContactCard(${i})'>
          <div class="monogramCircle" style="background-color: ${getRandomColor(i)}">
            <span class="mongram">${extractCapitalLetters(contact.name)}</span>
          </div>
          <div class="contactDetails">
            <div>
              <span class="contactName">${contact.name}</span>
            </div>
            <div>
              <span class="contactMail">${contact.email}</span>
            </div>
          </div>
        </div>
      `;
	}
}

function getRandomColor(k) {
	// Erzeugt eine zufällige Farbe im Hex-Format
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	contacts[k].color = color;
	return color;
}

function openContactCard(i) {
	let contactOverview = document.querySelector('.contactOverview');
	for (let j = 0; j < contacts.length; j++) {
		const contact = contacts[j];
		let contactCard = document.querySelector(`#contactCard${j}`);
		contactCard.style.backgroundColor = '#FFFFFF';
	}
	let contactCard = document.querySelector(`#contactCard${i}`);
	contactCard.style.backgroundColor = '#2A3647';
	contactOverview.innerHTML = '';
	contactOverview.innerHTML = `
            <div class="nameContainer">
				<div class="inicialeCircle"  style="background-color: ${contacts[i].color}">
					<span class="inicial">${extractCapitalLetters(contacts[i].name)}</span>
				</div>
				<div class="editContactContainer">
					<div class="name">
						<span class="fullname">${contacts[i].name}</span>
					</div>
					<div class="changeButtonsContainer">
						<div class="editButtonContainer">
							<img src="../img/edit.png" class="editIcon">
							<span class="editText">Edit</span>
						</div>
						<div class="deleteButtonContainer">
							<img src="../img/delete.png" class="deleteIcon">
							<span class="deleteText">Delete</span>
						</div>
					</div>
				</div>
			</div>
			<div class="contactInformationTitle">
				<span class="contactInformation">Contact Information</span>
			</div>
			<div class="accessibility">
				<div class="mailDiv">
					<div>
						<span class="mailAdressTitel">Email</span>
					</div>
					<div>
						<span class="mailAdress">${contacts[i].email}</span>
					</div>

				</div>
				<div class="mailDiv">
					<div>
						<span class="mailAdressTitel">Phone</span>
					</div>
					<div>
						<span class="mailAdress">${contacts[i].telefon}</span>
					</div>
				</div>
			</div>
    `;
	contactOverview.classList.add('contactOverviewTransition');
	contactOverview.classList.remove('contactOverviewTransitionRemove');
}

<<<<<<< HEAD
function addNewContact(){
  document.getElementById('addNewContactContainer').classList.add('addNewContactContainerTransition');
  document.getElementById('addNewContactContainer').classList.remove('addNewContactContainerTransitionRemove');
=======
function addNewContact() {
	alert('uhsdg');
>>>>>>> 171c0efb0bad2e337dbcbfb943022ef5b0b993cd
}

/*
<div class="nameContainer">
				<div class="inicialeCircle">
					<span class="inicial">AM</span>
				</div>
				<div class="editContactContainer">
					<div class="name">
						<span class="fullname">Anton Mayer</span>
					</div>
					<div class="changeButtonsContainer">
						<div class="editButtonContainer">
							<img src="../img/edit.png" class="editIcon">
							<span class="editText">Edit</span>
						</div>
						<div class="deleteButtonContainer">
							<img src="../img/delete.png" class="deleteIcon">
							<span class="deleteText">Delete</span>
						</div>
					</div>
				</div>
			</div>
			<div class="contactInformationTitle">
				<span class="contactInformation">Contact Information</span>
			</div>
			<div class="accessibility">
				<div class="mailDiv">
					<div>
						<span class="mailAdressTitel">Email</span>
					</div>
					<div>
						<span class="mailAdress">antom@gmail.com</span>
					</div>

				</div>
				<div class="mailDiv">
					<div>
						<span class="mailAdressTitel">Phone</span>
					</div>
					<div>
						<span class="mailAdress">+49 1111 111 11 1</span>
					</div>
				</div>
			</div>
*/
