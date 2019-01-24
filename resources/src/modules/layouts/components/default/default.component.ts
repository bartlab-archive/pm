import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutsService} from '../../services/layouts.service';
import {Store} from '@ngrx/store';
import {
    LayoutsDefaultDestroyAction,
    LayoutsDefaultInitAction
} from '../../store/actions/default.action';

@Component({
    selector: 'app-layouts-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {

    public topMenuItems = this.layoutsService.getTopMenu();
    public sideItems = [
        {
            url: '/',
            icon: 'home',
            name: 'Home'
        },
        {
            url: '/my/page',
            icon: 'person',
            name: 'My page'
        },
        {
            url: '/admin',
            icon: 'settings_applications',
            name: 'Administrator'
        },
        {
            url: '/projects',
            icon: 'work',
            name: 'Projects'
        },
        {
            url: '/activity',
            icon: 'access_time',
            name: 'Overall activity'
        },
        {
            url: '/issues',
            icon: 'list',
            name: 'View all issues'
        },
        {
            url: '/time_entries',
            icon: 'timelapse',
            name: 'Overall spent time'
        }
    ];

    public constructor(
        private layoutsService: LayoutsService,
        private store: Store<any>
    ) {
    }

    public ngOnInit() {
        this.store.dispatch(new LayoutsDefaultInitAction());
    }

    public ngOnDestroy() {
        this.store.dispatch(new LayoutsDefaultDestroyAction());
    }
}
