import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    MatProgressBarModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatCardModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {UsersService} from './services/users.service';
import {UsersEffects} from './store/effects/users.effects';
import {reducers} from './store/reducers';
import {routes} from './users.routes';
import {
    ErrorFormComponent,
    ProfileFormComponent,
    ProfileItemComponent,
    UsersFilterComponent,
    UsersListComponent,
    UserStatusComponent,
} from './components';

@NgModule({
    declarations: [
        UsersListComponent,
        UsersFilterComponent,
        ProfileFormComponent,
        ProfileItemComponent,
        UserStatusComponent,
        ErrorFormComponent,
    ],
    entryComponents: [
        UsersListComponent,
        ProfileFormComponent,
        ProfileItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('moduleUsers', reducers, {}),
        EffectsModule.forFeature([UsersEffects]),
        FlexLayoutModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatChipsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatMenuModule,
        MatButtonModule,
        MatGridListModule,
        MatToolbarModule,
        MatProgressBarModule,
    ],
    providers: [
        UsersService,
    ],
})
export class UsersModule {

    public constructor() {
    }
}
