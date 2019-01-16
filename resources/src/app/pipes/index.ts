import {NgModule} from '@angular/core';
import {MomentPipe} from './moment.pipe';

export const PIPES = [MomentPipe];

@NgModule({
    declarations: PIPES,
    exports: PIPES,
})
export class PipesModule {
}
