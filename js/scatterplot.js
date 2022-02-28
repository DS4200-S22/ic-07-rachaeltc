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


d3.csv("data/scatter.csv").then((data3) => {
  console.log(data3); 

  // find max score
let maxY2 = d3.max(data3, function(d) { return d.score; });

let maxX2 = d3.max(data3, function(d) { return d.day; });

// sets y axis scale and range
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

// Tsets x axis scale and  range
let xScale2 = d3.scaleLinear()
            .domain([0,maxX2])
            .range([margin.left, width - margin.right]); 

// places the y axis element on the svg  
svg3.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale2)) 
   .attr("font-size", '20px'); 

// places the x axis element on the svg and adds tick labels
svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale2))  
    .attr("font-size", '20px'); 

// sets up tooltip div to associate with csv scatter div
const tooltip2 = d3.select("#csv-scatter") 
.append("div") 
.attr('id', "tooltip2") 
.style("opacity", 0) 
.attr("class", "tooltip"); 

// in the case the mouse hovers over div, tooltip will unhide and display day and score 
const mouseover2 = function(event, d) {
tooltip2.html("day: " + d.day + "<br> Score: " + d.score + "<br>") 
.style("opacity", 1);  
}

// tooltip is to be placed at specified positiosn relative to the mouse pointer
const mousemove2 = function(event, d) {
tooltip2.style("left", (event.x)+"px") 
.style("top", (event.y + yTooltipOffset) +"px"); 
}

// in the case the mouse leaves div, tooltip will hide again
const mouseleave2 = function(event, d) { 
tooltip2.style("opacity", 0); 
}

  // adds rectangles according to data in data1 to divs with class bar, and has 
  // tooltip functionality 
  svg3.selectAll(".circ") 
   .data(data3) 
   .enter()  
   .append("circle") 
     .attr("class", "circ") 
     .attr("cx", (d) => xScale2(d.day)) 
     .attr("cy", (d) => yScale2(d.score)) 
     .attr("r", 10)
     .on("mouseover", mouseover2) 
     .on("mousemove", mousemove2)
     .on("mouseleave", mouseleave2);
});