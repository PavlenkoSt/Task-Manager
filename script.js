// Реализуйте чеклист. Должен быть инпут с добавлением задачи, а над ним - список с задачами. Возле каждой задачи чекбос. Если нажать на чекбокс - задача становится выполненной, перечеркивается и становится серого цвета, чекбокс при этом пропадает. Справа от любой задачи должен быть крестик для удаления этой задачи.

// Пусть новая задача добавляется по нажатию клавиши Enter.

// Задачу также можно поредактировать, если сделать двойной клик по ней - в этом случае вместо пункта списка появляется инпут с текстом задачи, можно поредактировать текст задачи, нажать Enter и задача изменится. Инпут при этом исчезнет.

let app = new Vue({
    el: '#app',
    data: {
        inputTask: '',
        currentTasks: [],
        editInputTask: '',
    },
    methods: {
        setNewTask() {
            this.currentTasks.push({
                task: this.inputTask,
                done: false,
                edit: false,
            });
            this.inputTask = '';
        },
        doneTask(task) {
            task.done = true;
        },
        removeTask(index) {
            this.currentTasks.splice(index, 1);
        },
        getEditInput(index) {
            this.currentTasks[index].edit = true;
            this.editInputTask = this.currentTasks[index].task;
        },
        editTask(index) {
            this.currentTasks[index].task = this.editInputTask;
            this.currentTasks[index].edit = false;
        },

    }
});