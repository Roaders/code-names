type Tuple<T, N extends number> = number extends N ? T[] : TupleAppend<T, N, []>;
type TupleAppend<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : TupleAppend<T, N, [T, ...R]>;

export type Cell = { row: string; column: string };

export type Row<N extends number> = Tuple<Cell, N>;

export type Grid<N extends number> = Tuple<Row<N>, N>;

export type TeamCount = 2 | 3 | 4;

export type Team = { displayName: string; cells: Cell[] };
