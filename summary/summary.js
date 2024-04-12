async function render(){
    allTasks = await getItem('allTasks');
    for (let i = 0; i < allTasks.length; i++) {
        const tasks = allTasks[i];
        document.querySelector('.summaryToDo').innerHTML = 10;
        document.querySelector('.summaryDone').innerHTML = 20;
        document.querySelector('.summaryUrgent').innerHTML = 30;
        document.querySelector('.summaryDate').innerHTML = '01.01.2025';
        document.querySelector('.summaryAllTasks').innerHTML = i+1;
        document.querySelector('.summaryProgress').innerHTML = 50;
        document.querySelector('.summaryFeedback').innerHTML = 60;
        document.querySelector('#greeting-name').innerHTML = 'AAA BBB';
    }
    
}