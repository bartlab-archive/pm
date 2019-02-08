import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {LayoutsService} from '../../services/layouts.service';
import {LayoutsDefaultDestroyAction, LayoutsDefaultInitAction} from '../../store/actions/default.action';
import {selectTopTabs} from '../../store/selectors/layouts.selector';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-layouts-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit, OnDestroy {
    public topMenuItems = this.layoutsService.getTopMenu();
    public sideItems = [
        {
            url: '/',
            icon: 'home',
            name: 'Home',
        },
        // {
        //     url: '/my/page',
        //     icon: 'person',
        //     name: 'My page'
        // },
        {
            url: '/admin',
            icon: 'settings_applications',
            name: 'Administrator',
        },
        {
            url: '/projects',
            icon: 'work',
            name: 'Projects',
        },
        // {
        //     url: '/activity',
        //     icon: 'access_time',
        //     name: 'Overall activity'
        // },
        {
            url: '/users',
            icon: 'face',
            name: 'Users',
        },
        {
            url: '/activity',
            icon: 'access_time',
            name: 'Overall activity',
        },
        {
            url: '/issues',
            icon: 'list',
            name: 'View all issues',
        },
        // {
        //     url: '/time_entries',
        //     icon: 'timelapse',
        //     name: 'Overall spent time'
        // }
    ];
    public topTabs = null;
    private subscriptions: Subscription[] = [];

    public constructor(
        private layoutsService: LayoutsService,
        private store: Store<any>,
        private router: Router,
    ) {
    }

    public ngOnInit() {
        this.store.dispatch(new LayoutsDefaultInitAction());

        this.subscriptions.push(
            this.store.pipe(select(selectTopTabs)).subscribe((tabs) => {
                // setTimeout(() => (
                this.topTabs = tabs;
                // ));
            }),
        );
    }

    public ngOnDestroy() {
        this.store.dispatch(new LayoutsDefaultDestroyAction());
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
}
