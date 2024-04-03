let currentContact = 0;

/**
 *
 * @param {string} name
 * @returns
 */
function extractCapitalLetters(name) {
  let capitals = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === name) {
      for (let j = 0; j < name.length; j++) {
        if (name[j] === name[j].toUpperCase() && name[j] !== " ") {
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
  let initContacts = document.querySelector("#initContacts");
  initContacts.innerHTML = "";
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
          <div class="monogramCircle" style="background-color: ${getRandomColor(
            i
          )}">
            <span class="mongram">${extractCapitalLetters(contact.name)}</span>
          </div>
          <div class="contactDetails">
            <div>
              <span class="contactName" id="contactName${i}">${contact.name}</span>
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
  if (!contacts[k].color) {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    contacts[k].color = color;
    return color;
  }else{
    return contacts[k].color;
  }
}

function openContactCard(i) {
  let contactOverview = document.querySelector(".contactOverview");
        
  for (let j = 0; j < contacts.length; j++) {
    const contact = contacts[j];
    let contactCard = document.querySelector(`#contactCard${j}`);
    document.querySelector(`#contactName${j}`).style.color = 'black';
    document.querySelector(`#contactName${i}`).style.color = '#FFFFFF';
    contactCard.style.backgroundColor = "#FFFFFF";
  }
  let contactCard = document.querySelector(`#contactCard${i}`);
  contactCard.style.backgroundColor = "#2A3647";
  contactOverview.innerHTML = "";
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
						<div class="editButtonContainer" onclick="openEditContactWindow(${i})">
							<img src="../img/edit.png" class="editIcon">
							<span class="editText">Edit</span>
						</div>
						<div class="deleteButtonContainer"  onclick="deleteContact(${i})">
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
  contactOverview.classList.add("contactOverviewTransition");
  contactOverview.classList.remove("contactOverviewTransitionRemove");
}

function openAddNewContactWindow() {
  //document.body.style.filter = "grayscale(40%)";
  //document.getElementById('addNewContactContainer').style.filter = "grayscale(0%)";
  document.getElementById("addNewContactContainer").classList.add("addNewContactContainerTransition");
  document.getElementById("addNewContactContainer").classList.remove("addNewContactContainerTransitionRemove");
}

function closeAddNewContactWindow() {
  document.getElementById("addNewContactContainer").classList.add("addNewContactContainerTransitionRemove");
  document.getElementById("addNewContactContainer").classList.remove("addNewContactContainerTransition");
}

function addNewContact(event) {
  // Verhindern, dass das Formular auf herkömmliche Weise gesendet wird
  event.preventDefault();

  let name = document.querySelector(".nameInputContainer").value;
  let email = document.querySelector(".emailInputContainer").value;
  let phone = document.querySelector(".phoneInputContainer").value;

  let newContact = {
    name: name,
    email: email,
    telefon: phone,
    color: "",
    capitals: "",
  };
  contacts.push(newContact);
  initContactlist();
  closeAddNewContactWindow();
  cancelInputValue();
  document.querySelector('#CreateResponseContainer').classList.add('CreateResponseContainerTransition');
  setTimeout(() => {
    document.querySelector('#CreateResponseContainer').classList.remove('CreateResponseContainerTransition');
    document.querySelector('#CreateResponseContainer').classList.add('CreateResponseContainerTransitionRemove');
  }, 1500);
  return false;
}

function deleteContact(i) {
  contacts.splice(i, 1);
  initContactlist();
  document.querySelector(".contactOverview").innerHTML = "";
}

function cancelInputValue() {
  document.querySelector(".nameInputContainer").value = "";
  document.querySelector(".emailInputContainer").value = "";
  document.querySelector(".phoneInputContainer").value = "";
}

function openEditContactWindow(i) {
  document.getElementById("editContactContainer").classList.add("addNewContactContainerTransition");
  document.getElementById("editContactContainer").classList.remove("addNewContactContainerTransitionRemove");
  document.querySelector("#imageColor").style.backgroundColor = contacts[i].color;
  document.querySelector("#ContactInicial").innerHTML = contacts[i].capitals;
  document.querySelector(".nameEditContainer").value = contacts[i].name;
  document.querySelector(".emailEditContainer").value = contacts[i].email;
  document.querySelector(".phoneEditContainer").value = contacts[i].telefon;
  currentContact = i;
}

function closeEditContactWindow() {
  document.getElementById("editContactContainer").classList.remove("addNewContactContainerTransition");
  document.getElementById("editContactContainer").classList.add("addNewContactContainerTransitionRemove");
  currentContact = 0;
}

function deleteContactInEditWindow() {
  contacts.splice(currentContact, 1);
  initContactlist();
  document.querySelector(".contactOverview").innerHTML = "";
  closeEditContactWindow();
}

function editContact(event) {
  event.preventDefault();
  contacts[currentContact].name =
    document.querySelector(".nameEditContainer").value;
  contacts[currentContact].email = document.querySelector(".emailEditContainer").value;
  contacts[currentContact].telefon = document.querySelector(".phoneEditContainer").value;
  initContactlist();
  closeEditContactWindow();
  openContactCard(currentContact);
}
