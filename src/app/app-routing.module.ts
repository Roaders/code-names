import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';

const routes: Routes = [
    { path: '', component: GridComponent },
    { path: 'game/:teamCount/:gridSize/:cardCount/:assassinCount/:assassins/:teams', component: GridComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
