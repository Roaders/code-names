import { Component } from '@angular/core';
import { Cell, Grid, Row } from './contracts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    public readonly grid: Grid<any>;

    public readonly gridSize: number;
    public readonly teamCount: number;
    public readonly cardCount: number
    public readonly assassinCount: number;

    public assassins: Cell[];
    public teamCells: Cell[][];

    constructor(){

        this.gridSize = 5;
        this.teamCount = 2;
        this.cardCount = 8
        this.assassinCount = 1;

        this.grid = generateGrid(this.gridSize);

        const { assassins, teams} = this.generateGame();

        this.assassins = assassins;
        this.teamCells = teams

        console.log(this.grid);
    }

    public getCellStyle(cell: Cell): string | undefined {
        if(this.assassins.some(assassin => cellMatch(assassin, cell))){
            return `bg-dark`
        }
        
        if(this.teamCells[0].some(teamCard => cellMatch(teamCard, cell))){
            return `bg-primary`
        }
        
        if(this.teamCells[1].some(teamCard => cellMatch(teamCard, cell))){
            return `bg-danger`
        }



        return `bg-warning bg-opacity-50`;
    }

    private generateGame(): {assassins: Cell[], teams: Cell[][]}{
        const cells = this.grid.map(row => row.flat()).flat() as [Cell, ...Cell[]];

        const assassins = Array.from({length: this.assassinCount}).map(() => randomItem(cells));

        //TODO: for 2 player game generate extra cell for team that goes first
        const teamOne = Array.from({length: this.cardCount}).map(() => randomItem(cells));
        const teamTwo = Array.from({length: this.cardCount}).map(() => randomItem(cells));

        const teams = [teamOne, teamTwo];

        return { assassins, teams };
    }

}

function cellMatch(one: Cell, two: Cell): boolean{
    return one.column === two.column && one.row === two.row;
}

function randomItem<T>(items: [T, ...T[]]): T{
    const randomIndex = Math.floor(Math.random() * items.length);

    return items.splice(randomIndex, 1)[0];
}

function generateGrid<TSize extends number>(size: TSize): Grid<TSize>{
    return Array.from({length: size}).map((_, row) => generateRow(size, row)) as Grid<TSize>;
}

function generateRow<TSize extends number>(size: TSize, row: number): Row<TSize>{
    return Array.from({length: size}).map((_, column) => ({row, column})) as Row<TSize>;
}