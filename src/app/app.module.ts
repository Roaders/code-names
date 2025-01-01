import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { GridComponent } from './components/grid/grid.component'; // Import GridComponent

@NgModule({
    declarations: [AppComponent, GridComponent], // Declare GridComponent
    imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
