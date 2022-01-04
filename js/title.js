// update h1 and h2 elements depending on chosen dataset 

export default function title(dataSet) {
    const title = d3.select('h1');
    const description = d3.select('h2#description');
    const products = dataSet.children.reduce((acc, category) => {
        return acc + category.children.length
    }, 0)

    title.text(d => dataSet.name === 'Kickstarter' 
        ? dataSet.name + ' pledges' 
        : dataSet.name === 'Movies' 
            ? dataSet.name + ' sales' 
            : 'Video Game sales');
            
    description.text(d => dataSet.name === 'Kickstarter'
        ? `Top ${products} most pledged kickstarters grouped by category`
        : dataSet.name === 'Movies'
            ? `Top ${products} most sold movies grouped by genre`
            : `Top ${products} most sold video games grouped by platform`);
}