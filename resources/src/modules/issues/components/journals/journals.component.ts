import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-issues-journals',
    templateUrl: './journals.component.html',
    styleUrls: ['./journals.component.scss'],
})
export class IssuesJournalsComponent {
    constructor() {
    }

    @Input() journals: any[];

}
