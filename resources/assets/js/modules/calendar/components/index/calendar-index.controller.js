import ControllerBase from 'base/controller.base';
import moment from 'moment';
import issuesViewModalController from 'modules/issues/components/view-modal/issues-view-modal.controller';
import issuesViewModalTemplate from 'modules/issues/components/view-modal/issues-view-modal.html';

export default class CalendarIndexController extends ControllerBase {

    static get $inject() {

        return ['$stateParams', '$rootScope', '$state', 'issuesService', '$mdDialog'];
    }

    $onInit() {

        // this.loadIsues().then(() => this.load());

    }

    // load() {
    //     this.myDate = moment();
    //     this.nowMoment = moment().format("YYYY-MM-DD");
    //     this.year = moment().year();
    //     this.month = moment().month();
    //     this.weeks = [
    //         "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
    //     ];
    //
    //     this.monthNames = [
    //         "January", "February", "March", "April", "May", "June",
    //         "July", "August", "September", "October", "November", "December"
    //     ];
    //
    //     this.info = { id: this.month, text: this.monthNames[this.month] + ", " + this.year};
    //
    //     this.issuesList = [];
    //
    //   //  console.log( this.list);
    //
    //     this.list.forEach((item) => {
    //         if (item.id) {
    //             //console.log(item.id);
    //             this.issuesList.push({
    //                 id: item.id,
    //                 name: item.subject,
    //                 start_date: item.start_date ? item.start_date : 'not set',
    //                 due_date: item.due_date ?  item.due_date : 'not set' ,
    //                 status: item.status.name,
    //                 assigned: item.assigned ? item.assigned.firstname  + ' ' + item.assigned.lastname : 'not assigned',
    //                 author: item.author ? item.author.firstname  + ' ' + item.author.lastname : '_',
    //                 priority: item.priority.name,
    //                 project: item.project.name,
    //                 data:item
    //             });
    //         }
    //     });
    //     console.log(this.issuesList);
    //    this.calendar = this.buildCalendar(this.myDate);
    //
    // }
    //
    //
    // buildCalendar(date){
    //     const startDay = moment(date).clone().startOf('month').startOf('week');
    //     const endDay = moment(date).clone().endOf('month').endOf('week');
    //     var calendar = [];
    //     var index = startDay.clone();
    //     while (index.isBefore(endDay, 'day')) {
    //         calendar.push(
    //             new Array(7).fill(0).map(
    //                 function(n, i) {
    //                     return {date: index.add(1, 'day').date(), dateMoment: moment(index).format("YYYY-MM-DD"), dateWeek: moment(index).weekday(), dateMonth:moment(index).month() } ;
    //                 }
    //             )
    //         );
    //     }
    //
    //     if (this.issuesList) {
    //         calendar.forEach((item,key) => {
    //             item.forEach((itemDt) =>{
    //                 itemDt.issues = [];
    //                 this.issuesList.forEach((itemIs,key)=>{
    //
    //                     if (itemDt.dateMoment == itemIs.start_date || itemDt.dateMoment == itemIs.due_date ) {
    //                         itemDt.issues.push({
    //                                 issues: itemIs
    //                             }
    //                         );
    //                     }
    //                 });
    //             });
    //         });
    //     }
    //
    //
    //     return calendar;
    // }
    //
    // previous(date){
    //     let previousDate = date.clone();
    //     this.myDate = previousDate.subtract(1, 'months');
    //     this.month = this.myDate.month();
    //     if (this.month > date.month() ) {
    //         this.year = this.year-1;
    //     }
    //     this.calendar = this.buildCalendar(this.myDate);
    //     this.info = { id: this.month, text: this.monthNames[this.month] + ", " + this.year};
    // }
    //
    // next(date){
    //     let nextDate = date.clone();
    //     this.myDate = nextDate.add(1, 'months');
    //     this.month = this.myDate.month();
    //     if (this.month < date.month() ) {
    //         this.year = this.year+1;
    //     }
    //     this.calendar = this.buildCalendar( this.myDate);
    //     this.info = { id: this.month, text: this.monthNames[this.month] + ", " + this.year};
    // }
    //
    // loadIsues(){
    //     return this.issuesService.all()
    //         .getList({
    //             project_identifier: this.currentProjectId()
    //         })
    //         .then((response) => {
    //             this.list = response.data;
    //         });
    // }
    //
    // currentProjectId() {
    //     return this.$stateParams.hasOwnProperty('project_id') ? this.$stateParams.project_id : null;
    // }
    //
    // viewIssue($event, issue) {
    //     this.$mdDialog.show(
    //         this.constructor.setMdDialogConfig($event.target, {
    //             selectedIssue: issue
    //         })
    //     );
    // }
    //
    // static setMdDialogConfig(target, data = {}) {
    //     return {
    //         controller: issuesViewModalController,
    //         controllerAs: '$ctrl',
    //         bindToController: true,
    //         locals: data,
    //         template: issuesViewModalTemplate,
    //         clickOutsideToClose: true,
    //         openFrom: target,
    //         closeTo: target,
    //     };
    // }
    //
    // goToProject(identifier){
    //     this.$state.go('projects.inner.info', {project_id: identifier});
    // }
}