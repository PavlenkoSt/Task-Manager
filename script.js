let app = new Vue({
    el: '#app',
    data: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        dFirstMonth: '1',
        day: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        monthes: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        date: new Date(),
        activeDay: '',
        inputTask: '',
        currentTasks: [],
        editInputTask: '',
    },
    methods: {
        calendar: function () {
            let days = [];
            let week = 0;
            days[week] = [];
            let dlast = new Date(this.year, this.month + 1, 0).getDate();
            for (let i = 1; i <= dlast; i++) {
                if (new Date(this.year, this.month, i).getDay() != this.dFirstMonth) {
                    a = { index: i };
                    days[week].push(a);
                    if (i == new Date().getDate() && this.year == new Date().getFullYear() && this.month == new Date().getMonth()) { a.current = '#747ae6' };
                    if (new Date(this.year, this.month, i).getDay() == 6 || new Date(this.year, this.month, i).getDay() == 0) { a.weekend = '#ff0000' };
                }
                else {
                    week++;
                    days[week] = [];
                    a = { index: i };
                    days[week].push(a);
                    if ((i == new Date().getDate()) && (this.year == new Date().getFullYear()) && (this.month == new Date().getMonth())) { a.current = '#747ae6' };
                    if (new Date(this.year, this.month, i).getDay() == 6 || new Date(this.year, this.month, i).getDay() == 0) { a.weekend = '#ff0000' };
                }
            }

            if (days[0].length > 0) {
                for (let i = days[0].length; i < 7; i++) {
                    days[0].unshift('');

                }
            }
            return days;
        },
        decrease: function () {
            this.month--;
            if (this.month < 0) {
                this.month = 12;
                this.month--;
                this.year--;
            }

        },
        increase: function () {
            this.month++;
            if (this.month > 11) {
                this.month = -1;
                this.month++;
                this.year++;
            }
        },
        setActive(day) {
            this.activeDay = day.index;
        },
        setNewTask() {
            if (this.inputTask) {
                this.currentTasks.push({
                    task: this.inputTask,
                    done: false,
                    edit: false,
                });
                this.inputTask = '';
            }
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
        getCurrentTask() {
            return this.currentTasks.length > 0;
        }
    },
    computed: {
        getActive() {
            return this.activeDay;
        },
    }
});