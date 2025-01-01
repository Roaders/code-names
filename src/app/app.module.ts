import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './components/grid/grid.component';
import packageJson from '../../package.json';

@NgModule({
    declarations: [AppComponent, GridComponent],
    imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private titleService: Title) {
        this.titleService.setTitle(`Codenames v${packageJson.version}`);
    }
}
