import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-issues-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
})
export class IssuesMainComponent implements OnInit {

    ngOnInit() {
        console.log('IssuesMainComponent init');
    }

}
