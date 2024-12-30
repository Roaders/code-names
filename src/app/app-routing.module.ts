import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewComponent } from './components/new-component/new-component.component';
import { GridComponent } from './components/grid/grid.component';

const routes: Routes = [
    { path: '', component: GridComponent }, // Default route
    { path: 'game/:teamCount/:gridSize/:cardCount/:assassinCount/:assassins/:teams', component: GridComponent },
    { path: 'new', component: NewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
