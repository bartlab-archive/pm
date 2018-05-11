import ControllerBase from 'base/controller.base';
// import _ from 'lodash';
import moment from 'moment';

/*
todo: change template - user name, created_on. show as 2 rows?
todo: created_on_from_now text as link to activity
 */
export default class IssuesHistoryController extends ControllerBase {

    static get $inject() {
        return [];
    }

    get attrMap() {
        return {
            status_id: 'Status',
            assigned_to_id: 'Assigned',
            done_ratio: 'Done',
        };
    }

    $onInit() {
        this.journals = this.issue.journals.map((journal) => {
            journal.created_on_from_now = moment(journal.created_on).fromNow(true);

            // todo: convert prop value to text value
            journal.details = journal.details
                .filter((detail) => detail.property === 'attr')
                .map((detail) => {
                    switch (detail.prop_key) {
                        case 'status_id':
                            detail.title = 'Status';
                            break;

                        case 'assigned_to_id':
                            detail.title = 'Assigned';
                            break;

                        case 'done_ratio':
                            detail.title = '% Done';
                            break;

                        default:
                            detail.title = detail.prop_key;
                    }

                    return detail;
                });

            return journal;
        });
    }

}