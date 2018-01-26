import ControllerBase from 'base/controller.base';

export default class CalendarIndexController extends ControllerBase {

    static get $inject() {

        return ['$stateParams', '$rootScope', '$mdDialog', '$state'];
    }

    $onInit() {

        this.myDate = new Date();
        this.year = this.myDate.getFullYear();
        this.month = this.myDate.getMonth();
        this.now = this.myDate.getDate();

        this.tiles = this.daysInMonthInfo(this.month,this.year);

        this.weeks = [
            "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
        ];

        this.monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        this.buildWeek(this.myDate,this.month);
        this.info = { id: this.month, text: this.monthNames[this.month] + ", " + this.year};



        //  this.buildMonth(this.now, this.month);
    }


    previous(id){

        id = id-1;
        if (id < 0) {
            id = 11;
            this.year = this.year - 1;
        }

        this.info = { id: id, text: this.monthNames[id] + ", " + this.year};

        this.tiles = this.daysInMonthInfo(id,this.year);
    }

    next(id){

        id = id+1;
        if (id >11) {
            id = 0;
            this.year = this.year + 1;
        }

        this.info = { id: id, text: this.monthNames[id] + ", " + this.year};

        this.tiles = this.daysInMonthInfo(id,this.year);

    }


    daysInMonthInfo(month,year) {

        let col = new Date(year, month + 1, 0).getDate();

        this.tiles = [];

        for (var i = 0; i < col; i++) {

            var date = new Date(year, month, i+1);

            var localy = this.getLocalDay(date);

            this.tiles.push({
                day: date.getDate(),
                month: month,
                week: this.getWeekDay(localy-1),
                number: date.getDay()
            });
        }

        console.log( this.tiles);

        return this.tiles;
    }

    getLocalDay(date) {

        var day = date.getDay();
        if (day == 0) day = 7;

        return day;
    }

    buildWeek(date, month) {

    }

    buildMonth(start, month) {
        // run buildWeek
    }


    getWeekDay(date) {

        var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ,'Sunday'];
        // var days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ,'Воскресенье'];
        return days[date];
    }
}