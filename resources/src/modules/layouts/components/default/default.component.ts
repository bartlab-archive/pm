import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterEvent,
} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {filter, startWith} from 'rxjs/operators';
import {LayoutsService} from '../../services/layouts.service';
import {
    LayoutsDefaultDestroyAction,
    LayoutsDefaultInitAction,
} from '../../store/actions/default.action';

import {selectLeftItems, selectRightItems, selectTabs, selectTopItems} from '../../store/selectors/menus.selector';

export const flat = (arr) => arr.reduce((acc, val) => acc.concat(val), []);

@Component({
    selector: 'app-layouts-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit, OnDestroy {
    // public topMenuItems = this.layoutsService.getTopMenu();
    // public sideItems = [
    //     {
    //         url: '/',
    //         icon: 'home',
    //         name: 'Home',
    //     },
    //     // {
    //     //     url: '/my/page',
    //     //     icon: 'person',
    //     //     name: 'My page'
    //     // },
    //     {
    //         url: '/admin',
    //         icon: 'settings_applications',
    //         name: 'Administrator',
    //     },
    //     {
    //         url: '/projects',
    //         icon: 'work',
    //         name: 'Projects',
    //     },
    //     // {
    //     //     url: '/activity',
    //     //     icon: 'access_time',
    //     //     name: 'Overall activity'
    //     // },
    //     // {
    //     //     url: '/users',
    //     //     icon: 'face',
    //     //     name: 'Users',
    //     // },
    //     {
    //         url: '/activity',
    //         icon: 'access_time',
    //         name: 'Overall activity',
    //     },
    //     {
    //         url: '/issues',
    //         icon: 'list',
    //         name: 'View all issues',
    //     },
    //     // {
    //     //     url: '/time_entries',
    //     //     icon: 'timelapse',
    //     //     name: 'Overall spent time'
    //     // }
    // ];

    public topItems$: Observable<Array<any>> = this.store.pipe(select(selectTopItems), filter(Boolean));
    public topItems: Array<any>;

    public rightItems$: Observable<Array<any>> = this.store.pipe(select(selectRightItems), filter(Boolean));
    public rightItems: Array<any>;

    public leftItems$: Observable<Array<any>> = this.store.pipe(select(selectLeftItems), filter(Boolean));
    public leftItems: Array<any>;

    public activeTab: Tab;
    public tabs$: Observable<Tab[]> = this.store.pipe(select(selectTabs));
    public tabs: Tab[] = [];

    public navigationEnd$: Observable<RouterEvent> = this.router.events.pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
    );

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
            this.topItems$.subscribe((items) => {
                this.topItems = items;
            }),

            this.rightItems$.subscribe((items) => {
                this.rightItems = items;
            }),

            this.leftItems$.subscribe((items) => {
                this.leftItems = items;
            }),

            combineLatest(
                this.tabs$,
                this.navigationEnd$.pipe(startWith(null)),
            ).subscribe(([tabs]) => {
                const activePath = this.getFullPath(
                    this.router.routerState.root,
                );

                this.tabs = tabs;
                this.activeTab = tabs.reduce((acc, tab) => {
                    if (activePath.startsWith(tab.path)) {
                        if (acc) {
                            return tab.path.length > acc.path.length
                                ? tab
                                : acc;
                        }

                        return tab;
                    }

                    return acc;
                }, null);
            }),
        );
    }

    public ngOnDestroy() {
        this.store.dispatch(new LayoutsDefaultDestroyAction());
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        );
    }

    public getPathFromRoot(route: ActivatedRoute): ActivatedRoute[] {
        if (route.firstChild) {
            return this.getPathFromRoot(route.firstChild);
        }

        return route.pathFromRoot;
    }

    public getFullPath(route: ActivatedRoute): string {
        const pathFromRoot = this.getPathFromRoot(route);
        const urls = pathFromRoot
            .map(
                (activatedRoute) =>
                    activatedRoute.snapshot && activatedRoute.snapshot.url,
            )
            .filter(Boolean);

        const paths = flat(urls).map((url) => url.path);
        return `/${paths.join('/')}`;
    }

    public isActiveTab(tab: Tab): boolean {
        return this.activeTab === tab;
    }
}
