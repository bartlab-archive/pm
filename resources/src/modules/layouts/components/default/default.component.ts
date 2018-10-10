import {Component} from '@angular/core';
import {LayoutsService} from '../../services/layouts.service';

@Component({
    selector: 'app-layouts-default',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})
export class DefaultComponent {

    public topMenuItems = this.layoutsService.getTopMenu();

    public constructor(
        private layoutsService: LayoutsService
    ) {
    }
}
