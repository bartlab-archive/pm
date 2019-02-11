import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

import {MDEActions as MDEActionsEnum, MDEClickEvent} from '../../interfaces/mde.directive';

@Component({
    selector: 'app-main-mde',
    templateUrl: './mde.component.html',
    styleUrls: ['./mde-codemirror.component.scss', './mde.component.scss'],
})
export class MainMDEComponent {
    @Input() template: TemplateRef<any>;
    @ViewChild('viewContainer', {read: ViewContainerRef}) viewContainer: ViewContainerRef;
    @Output() onClick = new EventEmitter<MDEClickEvent>();

    mdeActionsEnum = MDEActionsEnum;
    isFullscreen = false;

    onButtonClick(event, type: MDEActionsEnum) {
        if (type === this.mdeActionsEnum.toggleFullScreen) {
            this.isFullscreen = !this.isFullscreen;
        } else if(type === this.mdeActionsEnum.toggleSideBySide && !this.isFullscreen) {
            this.isFullscreen = true;
        }

        this.onClick.next({mouseEvent: event, type});
    }
}
