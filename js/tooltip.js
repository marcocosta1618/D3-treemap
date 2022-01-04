import debounce from './debounce.js';

export default function tooltip() {

   const tooltip = d3.select('div#tooltip');

   let graphRect;
   const getGraphRect = () => {
      graphRect = document.querySelector('div.graph-container').getBoundingClientRect();
   }
   window.addEventListener('resize', debounce(getGraphRect, 100));
   window.addEventListener('scroll', debounce(getGraphRect, 100));

   function handleMouseover(e) {

      const tooltipPOS = () => {
         const cursorX = e.clientX - graphRect.left;
         const cursorY = e.clientY + window.scrollY;
         const X = cursorX < graphRect.width / 2
            ? `${cursorX}px`
            : `${cursorX - 200}px`;
         const Y = cursorY + 'px';
         return {
            X, Y
         }
      }

      const dataValue = this.getAttribute('data-value');
      tooltip
         .attr('data-value', dataValue)
         .html(`
            <p>Category: ${this.getAttribute('data-category')}</p>
            <p>${this.getAttribute('data-name')}</p>
            <p>Value: ${dataValue}</p>
         `)
         .style('opacity', 0.85)
         .style('top', tooltipPOS().Y)
         .style('left', tooltipPOS().X)
   }

   function handleMouseout() {
      tooltip
         .style('opacity', 0)
   }

   return {
      handleMouseover,
      handleMouseout,
      getGraphRect
   }
}