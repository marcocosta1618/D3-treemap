export default async function getData() {
    
    const kickstartersURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
    const moviesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
    const videogamesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

    const [kickstarters, movies, videogames] = await Promise.all([
        d3.json(kickstartersURL),
        d3.json(moviesURL),
        d3.json(videogamesURL)
    ]);
    return ({
        kickstarters,
        movies,
        videogames
    });
}