import {
    Component,
    forwardRef,
    Input,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
} from '@angular/core';

import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms';

import {MDEActions as MDEActionsEnum} from '../../interfaces/mde.directive';
import MDEActions from '../../pluigins/mde.actions';
import MDE from '../../pluigins/mde';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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

@Component({
    selector: 'app-main-md-editor',
    templateUrl: './md-editor.component.html',
    styleUrls: ['./codemirror.component.scss', './md-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MainMDEditorComponent),
            multi: true,
        },

        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MainMDEditorComponent),
            multi: true,
        },
    ],
})
export class MainMDEditorComponent
    implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
    @Input()
    public formControlName: string;

    @Input()
    public attrs: any;

    @ViewChild('mdElement')
    public mdElement: ElementRef;

    public control: AbstractControl;
    public mdEditor: MDE = null;
    public mdeActionsEnum = MDEActionsEnum;

    ngOnInit(): void {
        const element = this.mdElement.nativeElement;
        if (this.attrs) {
            Object.keys(this.attrs).forEach((attr) => {
                element.setAttribute(attr, this.attrs[attr]);
            });
        }

        this.mdEditor = new MDE({
            element,
            toolbar: [],
        });
    }

    ngAfterViewInit(): void {
        let value = this.control.value;
        if (value) {
            this.mdEditor.value(value);
        }

        this.mdEditor.codemirror.on('change', () => {
            value = this.mdEditor.value();
            this.control.setValue(value);
        });

        this.control.valueChanges.subscribe((valueChange) => {
            if (valueChange !== value) {
                this.mdEditor.value(valueChange);
            }
        });
    }

    registerOnChange(fn: any): void {}

    registerOnTouched(fn: any): void {}

    registerOnValidatorChange(fn: () => void): void {}

    setDisabledState(isDisabled: boolean): void {}

    validate(control: AbstractControl): ValidationErrors | null {
        this.control = control;
        return null;
    }

    writeValue(obj: any): void {}

    isFullscreen = false;

    onButtonClick(event, type: MDEActionsEnum) {
        if (type === this.mdeActionsEnum.toggleFullScreen) {
            this.isFullscreen = !this.isFullscreen;
        } else if (
            type === this.mdeActionsEnum.toggleSideBySide &&
            !this.isFullscreen
        ) {
            this.isFullscreen = true;
        }

        if (mdeActions[type]) {
            mdeActions[type](this.mdEditor);
        }
    }
}
