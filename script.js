let contacts = [
	{
		'name': 'Max Meyer',
		'email': 'maxmeyer@gmail.com',
		'telefon': '0123456789',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Anna Schmidt',
		'email': 'annaschmidt@gmail.com',
		'telefon': '0123456790',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Lukas Bauer',
		'email': 'lukasbauer@gmail.com',
		'telefon': '0123456791',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Sophia Becker',
		'email': 'sophiabecker@gmail.com',
		'telefon': '0123456792',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Felix Klein',
		'email': 'felixklein@gmail.com',
		'telefon': '0123456793',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Emilia Hoffmann',
		'email': 'emiliahoffmann@gmail.com',
		'telefon': '0123456794',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Noah Schmid',
		'email': 'noahschmid@gmail.com',
		'telefon': '0123456795',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Mia Fischer',
		'email': 'miafischer@gmail.com',
		'telefon': '0123456796',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Elias Wolf',
		'email': 'eliaswolf@gmail.com',
		'telefon': '0123456797',
		'color': '',
		'capitals': '',
	},
	{
		'name': 'Lena Krause',
		'email': 'lenakrause@gmail.com',
		'telefon': '0123456798',
		'color': '',
		'capitals': '',
	},
];

const prioButtons = [
	{
		'priority': 'urgent',
		'activePrioImg': '../img/active-urgent.png',
		'inactivePrioImg': '../img/prio-urgent.png',
	},
	{
		'priority': 'medium',
		'activePrioImg': '../img/active-medium.png',
		'inactivePrioImg': '../img/prio-medium.png',
	},
	{
		'priority': 'low',
		'activePrioImg': '../img/active-low.png',
		'inactivePrioImg': '../img/prio-low.png',
	},
];

async function includeHTML() {
	let includeElements = document.querySelectorAll('[w3-include-html]');
	for (let i = 0; i < includeElements.length; i++) {
		const element = includeElements[i];
		file = element.getAttribute('w3-include-html'); // "includes/header.html"
		let resp = await fetch(file);
		if (resp.ok) {
			element.innerHTML = await resp.text();
		} else {
			element.innerHTML = 'Page not found';
		}
	}
}
