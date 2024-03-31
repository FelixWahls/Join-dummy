let contacts = [
    { 'name': 'Max Meyer', 'email': 'maxmeyer@gmail.com', 'telefon': '0123456789', 'color': '' },
    { 'name': 'Anna Schmidt', 'email': 'annaschmidt@gmail.com', 'telefon': '0123456790', 'color': ''  },
    { 'name': 'Lukas Bauer', 'email': 'lukasbauer@gmail.com', 'telefon': '0123456791', 'color': ''  },
    { 'name': 'Sophia Becker', 'email': 'sophiabecker@gmail.com', 'telefon': '0123456792', 'color': ''  },
    { 'name': 'Felix Klein', 'email': 'felixklein@gmail.com', 'telefon': '0123456793', 'color': ''  },
    { 'name': 'Emilia Hoffmann', 'email': 'emiliahoffmann@gmail.com', 'telefon': '0123456794', 'color': ''  },
    { 'name': 'Noah Schmid', 'email': 'noahschmid@gmail.com', 'telefon': '0123456795', 'color': ''  },
    { 'name': 'Mia Fischer', 'email': 'miafischer@gmail.com', 'telefon': '0123456796', 'color': ''  },
    { 'name': 'Elias Wolf', 'email': 'eliaswolf@gmail.com', 'telefon': '0123456797', 'color': ''  },
    { 'name': 'Lena Krause', 'email': 'lenakrause@gmail.com', 'telefon': '0123456798', 'color': ''  }
  ];

  function extractCapitalLetters(name) {
    let capitals = '';
    for (let i = 0; i < name.length; i++) {
      if (name[i] === name[i].toUpperCase() && name[i] !== ' ') {
        capitals += name[i];
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
          <div class="monogramCircleDiv">
            <div class="monogramCircle" style="background-color: ${getRandomColor(i)}">
              <span class="mongram">${extractCapitalLetters(contact.name)}</span>
            </div>
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
    };
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

function openContactCard(i){
    let contactOverview = document.querySelector('.contactOverview');
    for (let j = 0; j < contacts.length; j++) {
        const contact = contacts[j];
        let contactCard = document.querySelector(`#contactCard${j}`);
        contactCard.style.backgroundColor = "#FFFFFF";
    }
    let contactCard = document.querySelector(`#contactCard${i}`);
    contactCard.style.backgroundColor = "#2A3647";
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

function addNewContact(){
    alert('uhsdg');
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
  
  