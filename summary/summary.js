async function render() {
	allTasks = await getItem('allTasks');
	let a = 0;
	let b = 0;
	let c = 0;
	let d = 0;
	let u = 0;
	let date = 0;

	for (let i = 0; i < allTasks.length; i++) {
		const task = allTasks[i];

		if (task['cardContainer'] == 'to-do-container') {
			a++;
		}
		if (task['cardContainer'] == 'in-progress-container') {
			b++;
		}
		if (task['cardContainer'] == 'await-feedback-container') {
			c++;
		}
		if (task['cardContainer'] == 'done-container') {
			d++;
		}
		if (task['prioName'] == 'urgent') {
			u++;
			if ((u = 1)) {
				date = transformDate(i);
			}
		}

		document.querySelector('.summaryToDo').innerHTML = a;
		document.querySelector('.summaryDone').innerHTML = d;
		document.querySelector('.summaryUrgent').innerHTML = u;
		document.querySelector('.summaryDate').innerHTML = date;
		document.querySelector('.summaryAllTasks').innerHTML = i + 1;
		document.querySelector('.summaryProgress').innerHTML = b;
		document.querySelector('.summaryFeedback').innerHTML = c;
		document.querySelector('#greeting-name').innerHTML = 'AAA BBB';
	}
}
