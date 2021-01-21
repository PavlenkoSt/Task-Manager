let app = new Vue({
    el: '#app',
    data: {
        load: false,
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
        allTasks: {},
        taskDates: [],
        fullDateStr: '',
        activeAddInput: false,
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
            this.removeActive();
        },
        increase: function () {
            this.month++;
            if (this.month > 11) {
                this.month = -1;
                this.month++;
                this.year++;
            }
            this.removeActive();
        },
        setActive(day) {
            this.activeDay = day.index;
            this.getDayTasks();
            this.getFullDate(day);
        },
        removeActive() {
            this.activeDay = '';
        },
        setNewTask() {
            if (this.inputTask) {
                this.currentTasks.push({
                    task: this.inputTask,
                    done: false,
                    edit: false,
                });
                this.inputTask = '';
                this.setDayTasks();
            }
        },
        doneTask(task) {
            task.done = true;
            this.setLocalStorage();
        },
        removeTask(index) {
            this.currentTasks.splice(index, 1);
            this.setDayTasks();
        },
        getEditInput(index) {
            this.cancelEdit();
            this.currentTasks[index].edit = true;
            this.editInputTask = this.currentTasks[index].task;
        },
        cancelEdit() {
            for (let task of this.currentTasks) {
                if (task.edit) {
                    task.edit = false;
                }
            }
        },
        editTask(index) {
            this.currentTasks[index].task = this.editInputTask;
            this.currentTasks[index].edit = false;
            this.setDayTasks();
        },
        setDayTasks() {
            this.allTasks[`${this.activeDay}-${this.month}-${this.year}`] = this.currentTasks;
            if (!this.allTasks[`${this.activeDay}-${this.month}-${this.year}`].length) {
                delete this.allTasks[`${this.activeDay}-${this.month}-${this.year}`];
            }
            this.getAllTasksDates();
            this.detectTasksDays();
            this.setLocalStorage();
        },
        getDayTasks() {
            if (this.allTasks[`${this.activeDay}-${this.month}-${this.year}`]) {
                this.currentTasks = this.allTasks[`${this.activeDay}-${this.month}-${this.year}`];
            } else {
                this.currentTasks = [];
            }
        },
        getAllTasksDates() {
            if (Object.keys(this.allTasks)) {
                this.taskDates = Object.keys(this.allTasks);
            }
        },
        doneDayTasks(day) {
            let flag = true;
            let arr = this.allTasks[`${day}-${this.month}-${this.year}`];
            if (arr) {
                for (let dayTasks of arr) {
                    if (!dayTasks.done) {
                        flag = false;
                    }
                }
                return flag;
            }
            return false;
        },
        isDeadline(day) {
            let dateNov = new Date();
            let dateTask = new Date(this.year, this.month, day + 1);
            let arr = this.allTasks[`${day}-${this.month}-${this.year}`];
            let flag = false;
            if (arr) {
                if (dateNov > dateTask) {
                    flag = true;
                }
                return flag;
            }
            return false;
        },
        detectTasksDays(day) {
            let flag = false;
            if (this.taskDates.length) {
                this.taskDates.forEach(date => {
                    let dateArr = date.split('-');
                    if (day == dateArr[0] && this.month == dateArr[1] && this.year == dateArr[2]) {
                        flag = true;
                    }
                });
            }
            return flag;
        },
        getFullDate(day) {
            this.fullDateStr = `${this.getZero(day.index)}.${this.getZero(this.month + 1)}.${String(this.year)}`;
        },
        getZero(str) {
            if (str < 10) {
                return 0 + String(str);
            }
            return String(str);
        },
        activateAddInput() {
            if (!this.activeAddInput) {
                this.activeAddInput = true;
            }
        },
        deactivateAddInput() {
            this.inputTask = '';
            if (this.activeAddInput) {
                this.activeAddInput = false;
            }
        },
        setLocalStorage() {
            let json = JSON.stringify(this.allTasks);
            localStorage.setItem('tasks', json);
        },
        initSaveValuesLocalStorage() {
            this.allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
        },
    },
    computed: {
        getActive() {
            return this.activeDay;
        },
    },
    created() {
        window.addEventListener('load', () => {
            this.initSaveValuesLocalStorage();
            this.getAllTasksDates();
            this.load = true;
        })
    },
});