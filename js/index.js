import getData from "./getData.js";
import drawTreemap from "./drawTreemap.js";

getData().then(({kickstarters, movies, videogames}) => {

    const graphDim = { w: 1200, h: 800 };

    drawTreemap(kickstarters, graphDim); // on pageload build document with kickstarters dataSet

    const kickstartersBTN = document.querySelector('button.kickstarters');
    const moviesBTN = document.querySelector('button.movies');
    const videogamesBTN = document.querySelector('button.videogames');
    
    kickstartersBTN.onclick = () => drawTreemap(kickstarters, graphDim);
    moviesBTN.onclick = () => drawTreemap(movies, graphDim);
    videogamesBTN.onclick = () => drawTreemap(videogames, graphDim);
})