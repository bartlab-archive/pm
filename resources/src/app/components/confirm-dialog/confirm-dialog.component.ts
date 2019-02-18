import {
    Component,
    Inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-issues-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
})
export class AppConfirmDialogComponent implements OnInit, OnDestroy {

    public constructor(
        public dialogRef: MatDialogRef<AppConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Object,
    ) {
    }

    public ngOnInit(): void {

    }

    public ngOnDestroy(): void {
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
