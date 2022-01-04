export default function legend(selection, nodes, colors) {

   // filter data to get legend items
   const categories = nodes.filter(d => d.height === 1);

   // legend rect dims
   const [legendElemW, legendElemH] = [40, 30];

   // legend g element and data-join
   const legend = selection.selectAll('g#legend').data([nodes[0].data.name], d => d);

   const legendEnter = legend.enter().append('g')
            .attr('id', 'legend')
            .attr('transform', 'translate(3, 850)');

   legendEnter.merge(legend);
   legend.exit().remove();

   // legend data-join and groups
   const legendGroups = legendEnter.selectAll('g.legend-item').data(categories, d => d.data.id + 'LegendGroup');
   const legendGroupsEnter = legendGroups.enter().append('g')
     .attr('transform', (d,i) => `translate(${Math.floor(i/3) * 200}, ${(i%3) * legendElemH * 1.5})`)

   // legend items rects
   legendGroupsEnter.append('rect')
          .attr('class', 'legend-item')
          .attr('width', legendElemW)
          .attr('height', legendElemH)
          .attr('stroke', '#000')
          .attr('fill-opacity', 0.6)
     .merge(legendGroups)
          .attr('fill', d => colors(d.data.name))

   // legend items labels
   legendGroupsEnter.append('text')
          .attr('x', 46)
          .attr('y', 28)
          .attr('font-size', 16)
     .merge(legendGroups)
          .text(d => d.data.name)
}