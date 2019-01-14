import {Component, OnInit, Input} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-issues-journals',
    templateUrl: './journals.component.html',
    styleUrls: ['./journals.component.scss'],
})
export class IssuesJournalsComponent implements OnInit {
    constructor() {
    }

    @Input() journals: any[];

    ngOnInit() {
        this.journals = this.journals.map((journal) => {
                return {
                    ...journal,
                    'format_created_on': moment(journal.created_on).fromNow()
                };
            }
        );
    }
}
