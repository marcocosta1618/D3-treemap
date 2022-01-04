import title from "./title.js";
import colorScheme from "./colorScheme.js";
import tooltip from "./tooltip.js";
import legend from "./legend.js";

export default function drawTreemap(dataSet, graphDim) {

    title(dataSet);

    // graph dimensions
    const { w, h } = graphDim;

    // svg graph element and attributes
    const svgArea = d3.select('svg.graph')
        .attr('viewBox', `0 0 ${w} ${h * 1.25}`) // 1.25 makes room for legend within the svg element
        .attr('preserveAspectRatio', 'xMinYMin meet');

    // tooltip helper functions
    const { handleMouseover, handleMouseout, getGraphRect } = tooltip();
    
    //// process data for the treemap
    // layout dim and padding
    const treemap = d3.treemap().size([w, h]).padding(3);
    // root node
    const root = d3.hierarchy(dataSet); 
    // give each node a unique id (for key function in data join) based on its name
    root.descendants().forEach((node, i) => {
        const name = node.data.name.replace(/[,'":()]|\s/g, '') + i;
        node.data.id = name;
    });

    // compute value for each node and its descendants, and sort them:
    const nodes = treemap(root
            .sum(node => node.value)
            .sort((a, b) => b.value - a.value))
        .descendants();

    // apply color scheme
    const { colors } = colorScheme(nodes);

    // create an array of unique ids for every nodes
    const clipPathID = nodes.map(() => `O-${Math.random().toString(16).slice(2)}`);

    // animated transition
    const trans = d3.transition().duration(750);

    //// data joins
    // groups and groupsEnter
    const groups = svgArea.selectAll('g.tile').data(nodes, d => d.data.id);
    const groupsEnter = groups.enter().append('g').attr('class', 'tile');

    groupsEnter
        .attr('transform', d => `translate(${w/2}, ${h/2})`)
            .merge(groups)
        .transition(trans)
        .attr('transform', d => `translate(${d.x0}, ${d.y0})`);
    groups.exit().remove();

    // rect elements
    groupsEnter.append('rect')
            .attr('class', 'tile')
            .attr('stroke', d => d.height === 1 ? '#666' : '#f3f3f3')
            .attr('fill-opacity', 0.6)
            .attr('width', 0)
            .attr('height', 0)
            .on('mouseover', handleMouseover)
            .on('mouseout', handleMouseout)
        .merge(groups.select('rect.tile'))
            .attr('data-id', d => d.data.id)
            .attr('data-name', d => d.data.name)
            .attr('data-category', d => d.parent ? d.parent.data.name : '')
            .attr('data-value', d => d.value)
            .transition(trans)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', d => d.height === 1 ? colors(d.data.name) : 'rgba(0, 0, 0, 0)');
    
    //  labels clip-path
    groupsEnter.append('clipPath')
        .merge(groups.select('clipPath'))
            .attr('id', (d,i) => clipPathID[i])
            .html(d => `
                <rect width='${d.x1 - d.x0 -3}' height='${d.y1 - d.y0 -2}'>
                </rect>`
            );

    // labels text
    const text = groups.select('text');
    const splitName = (node) => node.data.name.split(/\s/g).map(word => ({ word }));

    groupsEnter.append('text')
            .attr('font-size', 13)
        .merge(text)
            .attr('clip-path', (d,i) => `url(#${clipPathID[i]})`)
            .selectAll('tspan').data(d => d.height === 0 ? splitName(d) : '')
            .enter().append('tspan')
            .attr('opacity', 0)
        .merge(text.selectAll('tspan').data(d => splitName(d)))
            .attr('x', 3)
            .attr('y', (d,i) => 17 + (i *17))
            .text(d => d.word)
            .transition(trans)
            .attr('opacity', 1);

    // get div.graphContainer ClientRect after render - for tooltip positioning
    getGraphRect();

    // draw legend
    legend(svgArea, nodes, colors);
}