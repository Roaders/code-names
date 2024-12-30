import { Component } from '@angular/core';
import { Cell, Grid, Row, Team, TeamCount } from './contracts';

const displayNames = ['Team One', 'Team Two', 'Team Three', 'Team Four'];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    public grid: Grid<number>;

    public gridSize: number;
    public teamCount: TeamCount;
    public cardCount: number;
    public assassinCount: number;

    public assassins: Cell[];
    public teams: Team[];

    constructor() {
        this.gridSize = 6;
        this.teamCount = 2;
        this.cardCount = 8;
        this.assassinCount = 1;

        generateGrid(this.gridSize);

        const { assassins, teams, grid } = this.newGame();

        this.grid = grid;
        this.assassins = assassins;
        this.teams = teams;
    }

    public getCellStyle(cell: Cell): string | undefined {
        if (this.assassins.some((assassin) => cellMatch(assassin, cell))) {
            return `bg-dark`;
        }

        if (this.teams[0].cells.some((teamCard) => cellMatch(teamCard, cell))) {
            return `bg-primary`;
        }

        if (this.teams[1]?.cells.some((teamCard) => cellMatch(teamCard, cell))) {
            return `bg-danger`;
        }

        if (this.teams[2]?.cells.some((teamCard) => cellMatch(teamCard, cell))) {
            return `bg-success`;
        }

        if (this.teams[3]?.cells.some((teamCard) => cellMatch(teamCard, cell))) {
            return `bg-info`;
        }

        return `bg-warning bg-opacity-50`;
    }

    public getTextStyle(team: number): string | undefined {
        switch (team) {
            case 0:
                return 'text-primary';
            case 1:
                return 'text-danger';
            case 2:
                return 'text-success';
            case 3:
                return 'text-info';
            default:
                throw new Error(`Unknown team index: ${team}`);
        }
    }

    public newGame(): { assassins: Cell[]; teams: Team[]; grid: Grid<number> } {
        console.log(`Generating new game`, {
            gridSize: this.gridSize,
            teamCount: this.teamCount,
            cardCount: this.cardCount,
            assassinCount: this.assassinCount,
        });

        const grid = generateGrid(this.gridSize);

        const { assassins, teams } = this.generateGame(grid);

        this.grid = grid;
        this.assassins = assassins;
        this.teams = teams;

        return { assassins, teams, grid };
    }

    private generateGame(grid: Grid<number>): { assassins: Cell[]; teams: Team[] } {
        const cells = grid.map((row) => row.flat()).flat() as [Cell, ...Cell[]];

        const assassins = Array.from({ length: this.assassinCount }).map(() => randomItem(cells));

        const teamRandomiser = randomItem([0, 1]);
        const teams = Array.from({ length: this.teamCount }).map((_, index) => ({
            displayName: displayNames[index],
            cells: Array.from({
                length: this.calculateCardCount(index, teamRandomiser),
            }).map(() => randomItem(cells)),
        }));

        return { assassins, teams };
    }

    private calculateCardCount(teamIndex: number, teamRandomiser: number): number {
        if (this.teamCount == 2 && teamIndex === teamRandomiser) {
            return this.cardCount + 1;
        }

        return this.cardCount;
    }
}

function cellMatch(one: Cell, two: Cell): boolean {
    return one.column === two.column && one.row === two.row;
}

function randomItem<T>(items: [T, ...T[]]): T {
    if (items.length === 0) {
        throw new Error(`Unable to pick random item from empty array`);
    }

    const randomIndex = Math.floor(Math.random() * items.length);

    return items.splice(randomIndex, 1)[0];
}

function generateGrid<TSize extends number>(size: TSize): Grid<TSize> {
    return Array.from({ length: size }).map((_, row) => generateRow(size, row)) as Grid<TSize>;
}

function generateRow<TSize extends number>(size: TSize, row: number): Row<TSize> {
    return Array.from({ length: size }).map((_, column) => ({
        row,
        column,
    })) as Row<TSize>;
}
