let contacts = [
    { 'name': 'Max Meyer', 'email': 'maxmeyer@gmail.com', 'telefon': '0123456789' },
    { 'name': 'Anna Schmidt', 'email': 'annaschmidt@gmail.com', 'telefon': '0123456790' },
    { 'name': 'Lukas Bauer', 'email': 'lukasbauer@gmail.com', 'telefon': '0123456791' },
    { 'name': 'Sophia Becker', 'email': 'sophiabecker@gmail.com', 'telefon': '0123456792' },
    { 'name': 'Felix Klein', 'email': 'felixklein@gmail.com', 'telefon': '0123456793' },
    { 'name': 'Emilia Hoffmann', 'email': 'emiliahoffmann@gmail.com', 'telefon': '0123456794' },
    { 'name': 'Noah Schmid', 'email': 'noahschmid@gmail.com', 'telefon': '0123456795' },
    { 'name': 'Mia Fischer', 'email': 'miafischer@gmail.com', 'telefon': '0123456796' },
    { 'name': 'Elias Wolf', 'email': 'eliaswolf@gmail.com', 'telefon': '0123456797' },
    { 'name': 'Lena Krause', 'email': 'lenakrause@gmail.com', 'telefon': '0123456798' }
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
  
  /*function initContactlist() {
    let initContacts = document.querySelector('#initContacts');
    initContacts.innerHTML = '';
    contacts.forEach(contact => {
      const capitals = extractCapitalLetters(contact.name);
      initContacts.innerHTML += `
        <div class="listInitial">
          <span class="firstCharacter">${capitals[0]}</span>
        </div>
        <div class="partingLineDiv">
          <div class="partingLine"></div>
        </div>
        <div class="contactCard">
          <div class="monogramCircleDiv">
            <div class="monogramCircle">
              <span class="mongram">${capitals}</span>
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
    });
  }*/

  function initContactlist() {
    let initContacts = document.querySelector('#initContacts');
    initContacts.innerHTML = '';
    let lastInitial = null;
  
    // Sortiere die Kontakte alphabetisch nach Namen, um die Gruppierung zu vereinfachen
    contacts.sort((a, b) => a.name.localeCompare(b.name));
  
    contacts.forEach(contact => {
      // Extrahiere den ersten Großbuchstaben des aktuellen Namens
      const currentInitial = contact.name[0].toUpperCase();
      // Überprüfe, ob der aktuelle Großbuchstabe gleich dem letzten ist
      if (currentInitial !== lastInitial) {
        // Wenn nicht, füge einen neuen Abschnitt mit der ersten Großbuchstabe hinzu
        initContacts.innerHTML += `
          <div class="listInitial">
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
        <div class="contactCard">
          <div class="monogramCircleDiv">
            <div class="monogramCircle">
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
    });
  }
  
  