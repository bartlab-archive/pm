import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LayoutsService {
    private leftMenu = [];
    private topMenu = [];

    public addTopMenuItem(item: any) {
        this.topMenu.push(item);
        return this;
    }

    public addLeftMenuItem(item: any) {
        this.leftMenu.push(item);
        return this;
    }

    public getTopMenu() {
        return this.topMenu;
    }

    public getLeftMenu() {
        return this.leftMenu;
    }
}
