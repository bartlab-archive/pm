import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

import MDE from '../../pluigins/mde';
import MDEActions from '../../pluigins/mde.actions';
import {MDEOptions, MDEActions as MDEActionsEnum, MDEClickEvent} from '../../interfaces/mde.directive';
import {MainMDEComponent} from '../../components/mde/mde.component';

const mdeActions = {
    [MDEActionsEnum.toggleBold]: MDEActions.toggleBold,
    [MDEActionsEnum.toggleItalic]: MDEActions.toggleItalic,
    [MDEActionsEnum.drawLink]: MDEActions.drawLink,
    [MDEActionsEnum.toggleHeadingSmaller]: MDEActions.toggleHeadingSmaller,
    [MDEActionsEnum.toggleHeadingBigger]: MDEActions.toggleHeadingBigger,
    [MDEActionsEnum.drawImage]: MDEActions.drawImage,
    [MDEActionsEnum.toggleBlockquote]: MDEActions.toggleBlockquote,
    [MDEActionsEnum.toggleOrderedList]: MDEActions.toggleOrderedList,
    [MDEActionsEnum.toggleUnorderedList]: MDEActions.toggleUnorderedList,
    [MDEActionsEnum.toggleCodeBlock]: MDEActions.toggleCodeBlock,
    [MDEActionsEnum.togglePreview]: MDEActions.togglePreview,
    [MDEActionsEnum.toggleStrikethrough]: MDEActions.toggleStrikethrough,
    [MDEActionsEnum.toggleHeading1]: MDEActions.toggleHeading1,
    [MDEActionsEnum.toggleHeading2]: MDEActions.toggleHeading2,
    [MDEActionsEnum.toggleHeading3]: MDEActions.toggleHeading3,
    [MDEActionsEnum.cleanBlock]: MDEActions.cleanBlock,
    [MDEActionsEnum.drawTable]: MDEActions.drawTable,
    [MDEActionsEnum.drawHorizontalRule]: MDEActions.drawHorizontalRule,
    [MDEActionsEnum.undo]: MDEActions.undo,
    [MDEActionsEnum.redo]: MDEActions.redo,
    [MDEActionsEnum.toggleSideBySide]: MDEActions.toggleSideBySide,
    [MDEActionsEnum.toggleFullScreen]: MDEActions.toggleFullScreen,
};

@Directive({
    selector: '[mde]',
})
export class MDEDirective implements OnInit {
    @Input() mde: MDEOptions;
    @Output() onChange = new EventEmitter<string>();

    private mdeContainer: ComponentRef<MainMDEComponent>;
    private mdEditor: MDE = null;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {}

    ngOnInit(): void {
        const containerFactory = this.componentFactoryResolver.resolveComponentFactory(MainMDEComponent);
        this.mdeContainer = this.viewContainerRef.createComponent(containerFactory);
        const rootRef = this.mdeContainer.instance.viewContainer.createEmbeddedView(this.templateRef);

        this.mdEditor = new MDE({
            element: rootRef.rootNodes[0],
            toolbar: [],
            ...this.mde,
        });

        this.mdEditor.codemirror.on('change', () => this.onChange.emit(this.mdEditor.value()));
        this.mdeContainer.instance.onClick.subscribe((event: MDEClickEvent) => {
            if (mdeActions[event.type]) {
                mdeActions[event.type](this.mdEditor);
            }
        });
    }
}
