# CodeNames

CodeNames is a web application for playing the popular word game "Codenames". This application allows users to set up a game with customizable settings and play with multiple teams.

## Features

- Customizable game settings including team count, grid size, card count, and assassin count.
- Dynamic grid generation based on the specified settings.
- Shareable url allows a generated board to be shared between players of the game
- play with no assassin or multiple assassins

## How to Play

 - Generate your own custom board with the desired number of teams (up to 4), assassin count (usually 1 less than the number of teams), card count and grid size.
 - If you are playing with 3 teams you will most likely need to generate a 6 * 6 grid so that it is big enough for the all cards for all the teams (dependent on the number of cards and assassins selected)
 - Once the board is generated share the url of the board with all the Spymasters playing the game. They will all get the same randomly generated board
 - Lay out the codenames as usual according to the grid size generated
 - If playing with more than 2 teams (or with more than 8 cards per team) additional cards will be needed for the new teams. The colors are green and light blue. These can be made from any card or paper or could even be buttons or any sort of marker.
 - The team with the randomly selected additional card goes first.

## Building the application

### Prerequisites

- Node.js and npm installed on your machine.
- Angular CLI installed globally.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/codenames.git
    cd codenames
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1. Start the development server:
    ```sh
    npm run start
    ```

2. Open your browser and navigate to `http://localhost:4200`.

### Building the Application

To build the application for production, run:
```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Running the website

The app is available at:  
[https://codenames.cineworld-planner.co.uk/](https://codenames.cineworld-planner.co.uk/)

## Project Structure

- `src/app/components/`: Contains the Angular components used in the application.
  - `app/`: Main application component.
  - `grid/`: Grid component for displaying the game grid.
- `src/app/contracts/`: Contains TypeScript interfaces and types used in the application.
- `src/app/app-routing.module.ts`: Defines the application routes.
- `src/app/app.module.ts`: Main application module.

## Usage

### Game Settings

You can customize the game settings using the input fields provided in the UI:
- **Team Count**: Number of teams (2-4).
- **Grid Size**: Size of the grid (minimum 2).
- **Card Count**: Number of cards per team (minimum 2).
- **Assassin Count**: Number of assassins (minimum 1).

### Generating a New Game

Click the "Generate" button to create a new game with the specified settings. The game grid and team cards will be displayed based on the settings.

### Sharing Game Configurations

The application uses route parameters to save and share game configurations. You can copy the URL from the address bar and share it with others to load the same game configuration.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

