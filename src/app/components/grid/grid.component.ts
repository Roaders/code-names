import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'; // Import Router
import { Location } from '@angular/common'; // Import Location
import { Cell, Grid, Row, Team, TeamCount } from '../../contracts';

const displayNames = ['Team One', 'Team Two', 'Team Three', 'Team Four'];
const DEFAULT_GRID_SIZE = 5;
const DEFAULT_TEAM_COUNT = 2;
const DEFAULT_CARD_COUNT = 8;
const DEFAULT_ASSASSIN_COUNT = 1;

@Component({
    selector: 'grid-component',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
    public grid: Grid<number>;

    public gridSize: number;
    public teamCount: TeamCount;
    public cardCount: number;
    public assassinCount: number;

    public assassins?: Cell[];
    public teams?: Team[];

    private _errorMessage: string | undefined;

    public get errorMessage(): string | undefined {
        return this._errorMessage;
    }

    constructor(
        route: ActivatedRoute,
        private location: Location,
    ) {
        this.gridSize = parseInt(route.snapshot.params['gridSize']) || DEFAULT_GRID_SIZE;
        this.teamCount = (parseInt(route.snapshot.params['teamCount']) as TeamCount) || DEFAULT_TEAM_COUNT;
        this.cardCount = parseInt(route.snapshot.params['cardCount']) || DEFAULT_CARD_COUNT;
        this.assassinCount = parseInt(route.snapshot.params['assassinCount']) || DEFAULT_ASSASSIN_COUNT;

        this.parseRouteParams(route.snapshot.params);

        const { assassins, teams, grid } = this.generateGame(this.teamCount, this.cardCount, this.assassinCount);

        this.grid = grid;
        this.assassins = assassins;
        this.teams = teams;
    }

    private parseRouteParams(params: Params): void {
        const assassins = parseCells(params['assassins']);
        if (assassins != null) {
            this.assassins = assassins;
        }

        const teams = parseTeams(params['teams']);
        if (teams != null) {
            this.teams = teams;
        }
    }

    public getCellStyle(cell: Cell): string | undefined {
        if (this.assassins?.some((assassin) => cellMatch(assassin, cell))) {
            return `bg-dark`;
        }

        if (this.teams?.[0]?.cells.some((teamCard) => cellMatch(teamCard, cell))) {
            return `bg-primary`;
        }

        if (this.teams?.[1]?.cells.some((teamCard) => cellMatch(teamCard, cell))) {
            return `bg-danger`;
        }

        if (this.teams?.[2]?.cells.some((teamCard) => cellMatch(teamCard, cell))) {
            return `bg-success`;
        }

        if (this.teams?.[3]?.cells.some((teamCard) => cellMatch(teamCard, cell))) {
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

    public newGame(): void {
        this.teams = undefined;
        this.assassins = undefined;

        const { assassins, teams, grid } = this.generateGame(this.teamCount, this.cardCount, this.assassinCount);

        this.grid = grid;
        this.assassins = assassins;
        this.teams = teams;
    }

    public reset(): void {
        this.teamCount = DEFAULT_TEAM_COUNT;
        this.cardCount = DEFAULT_CARD_COUNT;
        this.assassinCount = DEFAULT_ASSASSIN_COUNT;
        this.gridSize = DEFAULT_GRID_SIZE;

        this.teams = undefined;
        this.assassins = undefined;

        const { assassins, teams, grid } = this.generateGame(this.teamCount, this.cardCount, this.assassinCount);

        this.grid = grid;
        this.assassins = assassins;
        this.teams = teams;
    }

    private generateGame(
        teamCount: number,
        cardCount: number,
        assassinCount: number,
    ): { assassins: Cell[]; teams: Team[]; grid: Grid<number> } {
        this._errorMessage = undefined;

        console.log(`Generating new game`, {
            gridSize: this.gridSize,
            teamCount: this.teamCount,
            cardCount: this.cardCount,
            assassinCount: this.assassinCount,
        });

        const grid = generateGrid(this.gridSize);

        const cells = grid.map((row) => row.flat()).flat() as [Cell, ...Cell[]];

        const assassins = this.assassins ?? Array.from({ length: assassinCount }).map(() => randomItem(cells));

        try {
            const teamRandomiser = randomItem([
                0,
                ...Array.from({ length: teamCount - 1 }).map((_, index) => index + 1),
            ]);
            const teams =
                this.teams ??
                Array.from({ length: teamCount }).map((_, index) => {
                    const teamCards = this.calculateCardCount(cardCount, index, teamRandomiser);

                    return {
                        displayName: displayNames[index],
                        cells: Array.from({ length: teamCards }).map(() => randomItem(cells)),
                    };
                });

            this.location.replaceState(
                `/game/${this.teamCount}/${this.gridSize}/${this.cardCount}/${this.assassinCount}/${stringifyCells(assassins)}/${stringifyTeams(teams)}`,
            );

            return { assassins, teams, grid };
        } catch (error) {
            if (cells.length === 0) {
                this._errorMessage = `Grid not big enough for team and card count!`;
            } else {
                this._errorMessage = String(error);
            }

            console.error(`Error generating game`, { error, message: this._errorMessage });

            return { assassins: [], teams: [], grid };
        }
    }

    private calculateCardCount(cardCount: number, teamIndex: number, teamRandomiser: number): number {
        if (teamIndex === teamRandomiser) {
            return cardCount + 1;
        }

        return cardCount;
    }
}

function stringifyTeams(teams: Team[]): string {
    return teams.map((team) => stringifyCells(team.cells)).join('|');
}

function parseTeams(teamsString?: string): Team[] | undefined {
    if (teamsString == null) {
        return undefined;
    }

    return teamsString.split('|').map((teamString, index) => ({
        displayName: displayNames[index],
        cells: parseCells(teamString) ?? [],
    }));
}

const cellValueRegExp = /^\d+:\d+$/;

function parseCells(cellsString?: string): Cell[] | undefined {
    if (cellsString == null) {
        return undefined;
    }

    const cellValues = cellsString.split(',');

    if (cellValues.some((cellValue) => !cellValueRegExp.test(cellValue))) {
        return undefined;
    }

    return cellValues.map((cellString) => {
        const [row, column] = cellString.split(':').map((value) => parseInt(value));

        return { row, column };
    });
}

function stringifyCells(cells: Cell[]): string {
    return cells.map((cell) => `${cell.row}:${cell.column}`).join(',');
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
