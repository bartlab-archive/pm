import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router,} from '@angular/router';
import {ItemRequestAction} from '../../store/actions/issues.action';
import {selectIssuesActive, selectIssuesStatus} from '../../store/selectors/issues';
import {RequestStatus} from '../../../../app/interfaces/api';

@Component({
    selector: 'app-issues-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class IssuesItemComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public item = null;
    private id: number = this.activatedRoute.snapshot.params['id'];
    public pending: boolean = false;
    public journals: any[];

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        private markdownService: MarkdownService
    ) {
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.store.pipe(select(selectIssuesStatus))
                .subscribe((status) => {
                    if (status === RequestStatus.pending) {
                        this.pending = true;
                    } else {
                        this.pending = false;
                    }
                }),

            this.store.pipe(select(selectIssuesActive))
                .subscribe((data) => {
                        if (data) {
                            this.item = Object.keys(data).reduce((acc, key) => {
                                if (key === 'description') {
                                    acc[key] = this.markdownService.compile(data[key]);
                                }
                                return acc;
                            }, {...data});

                            if (data.journals && data.journals.length) {
                                this.journals = data.journals.map((journal) => {
                                    return {
                                        ...journal,
                                        'format_created_on': moment(journal.created_on).fromNow()
                                    };
                                });
                            }
                        }
                    }
                )
        );

        this.load();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public load(): void {
        this.store.dispatch(new ItemRequestAction(this.id));
    }

    public watch(): void {
        // todo: dispatch new action
        this.item.is_watcheble = !this.item.is_watcheble;
    }
}
