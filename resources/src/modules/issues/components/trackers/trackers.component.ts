import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-issues-trackers',
    templateUrl: './trackers.component.html',
    styleUrls: ['./trackers.component.scss'],
})
export class IssuesTrackersComponent implements OnInit {
    public pending$: Observable<boolean>;

    public ngOnInit() {
        // console.log('IssuesMainComponent init');
    }

    public refresh() {}
}
