/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 

// adds an svg to csv-scatter div 
const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/scatter.csv").then((data) => {
  console.log(data); 
  // find max score
  let maxY = d3.max(data, function(d) { return d.score; });
  
  // sets y axis scale and range
  let yScale = d3.scaleLinear()
            .domain([0,maxY])
            .range([height-margin.bottom,margin.top]); 
            
  // sets x axis scale and  range
  let xScale = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

  // places the y axis element on the svg  
  svg3.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) 
    .call(d3.axisLeft(yScale)) 
    .attr("font-size", '20px'); 

  // places the x axis element on the svg and adds tick labels
  svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale) 
            .tickFormat(i => data[i].day))  
    .attr("font-size", '20px'); 

  // sets up tooltip div to associate with csv scatter div
  const tooltip3 = d3.select("#csv-scatter") 
    .append("div") 
    .attr('id', "tooltip3") 
    .style("opacity", 0) 
    .attr("class", "tooltip"); 

  // in the case the mouse hovers over div, tooltip will unhide and display name and score 
  const mouseover3 = function(event, d) {
    tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
    .style("opacity", 1);  
  }

  // tooltip is to be placed at specified positiosn relative to the mouse pointer
  const mousemove3 = function(event, d) {
    tooltip3.style("left", (event.x)+"px") 
    .style("top", (event.y + yTooltipOffset) +"px"); 
  }

  // in the case the mouse leaves div, tooltip will hide again
  const mouseleave3 = function(event, d) { 
    tooltip3.style("opacity", 0); 
  }

  // adds rectangles according to data in data1 to divs with class bar, and has 
  // tooltip functionality 
  svg3.selectAll("circle") 
   .data(data) 
   .enter()  
   .append("circle") 
     .attr("cx", (d) => xScale(d.day)) 
     .attr("cy", (d) => yScale(d.score)) 
     .attr("r", 10) 
     .on("mouseover", mouseover3) 
     .on("mousemove", mousemove3)
     .on("mouseleave", mouseleave3);
});








