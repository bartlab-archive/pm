import ControllerBase from 'base/controller.base';
import _ from 'lodash';
import moment from 'moment';

/*
todo: change template - user name, created_on. show as 2 rows?
todo: created_on_from_now text as link to activity
todo: anchor for histiry block "#note-n"
todo: make edit, delete and quote history item
todo: mark private note
todo: is Description updated, show "diff" button and hide value from history list
 */
export default class IssuesHistoryController extends ControllerBase {

    static get $inject() {
        return [];
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

                        case 'description':
                            detail.title = 'Description';
                            detail.old_value = '...';
                            detail.value = '...';
                            break;

                        default:
                            detail.title = _.capitalize(detail.prop_key);
                    }

                    return detail;
                });

            return journal;
        });
    }

}