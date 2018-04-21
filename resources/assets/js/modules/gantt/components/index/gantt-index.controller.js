import ControllerBase from 'base/controller.base';
import moment from 'moment';

export default class GanttIndexController extends ControllerBase {

    static get $inject() {
        return ['$state','statusesService','issuesService','$stateParams'];
    }

    $onInit() {
        this.loadIsues().then(() => this.load());
    }

    load() {
        this.myDate = moment(); //.subtract(3,'month');
        this.nowMoment = moment().format("YYYY-MM-DD");
        this.year = moment().year();
        this.month = moment().month();

        this.weeks = [
            "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
        ];

        this.monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        this.info = { id: this.month, text: this.monthNames[this.month] + ", " + this.year};

        this.items = this.buildCalendar(this.myDate);


    }

    buildCalendar(date) {
        const startDate = moment(date);//.subtract(1,'month');
        const endMonth = moment(date).add(6,'month');
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var index = startDate.clone();
        var calendar = [];
        while (index.isBefore(endMonth, 'month')) {
            calendar.push({text: this.monthNames[index.month()],header: true});
            var lastDay = index.endOf('month').endOf('day').date();
            var startDay = index.startOf('month').startOf('day').date();
           for (var d = startDay; d <= lastDay; d++) {
               var mm = index.month()+1;
                   mm =  mm>9? mm : '0'+mm;
               var dd = (d > 9 )? d: '0'+d;
               var date = moment(moment(index).year()+ '-' + mm + '-' + dd);
               calendar.push({ text: d , ddt: moment(index).year()+ '-' + mm + '-' + dd ,dow: date.day() });
           }
               index.add(1, 'month');
        }

        console.log(calendar);
        return calendar;
    }

    loadIsues(){
        return this.issuesService.all()
            .getList({
                project_identifier: this.currentProjectId()
            })
            .then((response) => {
                this.list = response.data;
            });
    }

    currentProjectId() {
        return this.$stateParams.hasOwnProperty('project_id') ? this.$stateParams.project_id : null;
    }

    previous(date){

        this.myDate =  moment(date).subtract(1,'month');
        this.items = this.buildCalendar(this.myDate);
        this.month = this.myDate.month();

        if (this.month > date.month() ) {
            this.year = this.year-1;
        }
        this.info = { id: this.month, text: this.monthNames[this.month] + ", " + this.year};
    }

    next(date){
        this.myDate  =  moment(date).add(1,'month');
        this.items = this.buildCalendar( this.myDate );
        this.month = this.myDate.month();
        if (this.month < date.month() ) {
            this.year = this.year+1;
        }
        this.info = { id: this.month, text: this.monthNames[this.month] + ", " + this.year};
    }
}