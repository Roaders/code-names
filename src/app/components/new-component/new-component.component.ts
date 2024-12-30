import { Component } from '@angular/core';

@Component({
    selector: 'app-new-component',
    templateUrl: './new-component.component.html',
    styleUrls: ['./new-component.component.scss'],
})
export class NewComponent {
    constructor() {
        console.log('NewComponent initialized');
    }
}
