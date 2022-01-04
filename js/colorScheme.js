export default function colorScheme(nodes) {

    // a palette of optimally distinct colors adapted from https://mokole.com/palette.html
    const colorsArr = [
        'gray',
        'seagreen',
        'darkorange',
        'olive',
        'lime',
        'red',
        'darkturquoise',
        'fuchsia',
        'gold',
        'chartreuse',
        'darkslateblue',
        'mediumspringgreen',
        'aqua',
        'brown',
        'dodgerblue',
        'yellowgreen',
        'plum',
        'deeppink',
        'lightsalmon',
        'seashell'
    ];

    // (nodes of height 1 represent different product categories) 
    // build a categories array and use it to feed the domain of a d3.scaleOrdinal(),
    // and feed the scale's range with a discret color scheme 
    const categories = nodes.reduce((accum, obj) => {
        return obj.height === 1 ? accum.concat(obj.data.name) : accum
    }, []);

    const colors = d3.scaleOrdinal()
        .domain(categories)
        .range(colorsArr);

    return {
        colors
    };
}
