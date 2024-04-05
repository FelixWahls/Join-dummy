const STORAGE_TOKEN = 'BG6WOK154AJ68UO0AQPTHWG0N5RXRC9BZCQ9TZVT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';
let contacts = [
	{
		'name': 'Max Meyer',
		'email': 'maxmeyer@gmail.com',
		'telefon': '0123456789',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Anna Schmidt',
		'email': 'annaschmidt@gmail.com',
		'telefon': '0123456790',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Lukas Bauer',
		'email': 'lukasbauer@gmail.com',
		'telefon': '0123456791',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Sophia Becker',
		'email': 'sophiabecker@gmail.com',
		'telefon': '0123456792',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Felix Klein',
		'email': 'felixklein@gmail.com',
		'telefon': '0123456793',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Emilia Hoffmann',
		'email': 'emiliahoffmann@gmail.com',
		'telefon': '0123456794',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Noah Schmid',
		'email': 'noahschmid@gmail.com',
		'telefon': '0123456795',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Mia Fischer',
		'email': 'miafischer@gmail.com',
		'telefon': '0123456796',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Elias Wolf',
		'email': 'eliaswolf@gmail.com',
		'telefon': '0123456797',
		'color': '',
		'capitals': '',
		'addTask': false,
	},
	{
		'name': 'Lena Krause',
		'email': 'lenakrause@gmail.com',
		'telefon': '0123456798',
		'color': '',
		'capitals': '',
		'addTask': false,
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

let allTasks = [];

let titleInput;
let descriptionInput;
let selectedUsers = [];
let dateInput;
let activePrio = '../img/prio-medium.png';
let categoryInput;
let subtasks = [];

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

async function setItem(key, value) {
	const payload = { key, value, token: STORAGE_TOKEN };
	return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) }).then((res) =>
		res.json()
	);
}

async function getItem(key) {
	const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
	return fetch(url)
		.then((res) => res.json())
		.then((res) => {
			// Verbesserter code
			if (res.data) {
				return res.data.value;
			}
			throw `Could not find data with key "${key}".`;
		});
}
