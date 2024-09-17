document.addEventListener("DOMContentLoaded", function() {
    // Data
    const data = [
        { year: '2015', value: 30, details: [10, 20, 15] },
        { year: '2016', value: 80, details: [25, 30, 25] },
        { year: '2017', value: 45, details: [15, 20, 10] },
        { year: '2018', value: 60, details: [20, 25, 15] },
        { year: '2019', value: 90, details: [30, 35, 25] },
        { year: '2020', value: 100, details: [35, 40, 25] }
    ];

    // Dimensions
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG Container
    const svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleBand()
        .domain(data.map(d => d.year))
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);

    // Axes
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Bars
    const bars = svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {
            const xValue = x(d.year);
            console.log(`x(${d.year}) = ${xValue}`); // Debug statement
            return xValue;
        })
        .attr("y", function(d) {
            const yValue = y(d.value);
            console.log(`y(${d.value}) = ${yValue}`); // Debug statement
            return yValue;
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
            const heightValue = height - y(d.value);
            console.log(`height(${d.value}) = ${heightValue}`); // Debug statement
            return heightValue;
        })
        .style("fill", "steelblue")
        .on("click", function(event, d) {
            const expanded = d3.select(this).classed("expanded");
            d3.selectAll(".bar").classed("expanded", false);
            d3.selectAll(".detail-bar").remove();
            
            if (!expanded) {
                d3.select(this).classed("expanded", true);
                const detailData = d.details;
                svg.selectAll(".detail-bar")
                    .data(detailData)
                    .enter().append("rect")
                    .attr("class", "detail-bar")
                    .attr("x", (d, i) => x(d.year) + i * (x.bandwidth() / detailData.length))
                    .attr("y", d => y(d))
                    .attr("width", x.bandwidth() / detailData.length)
                    .attr("height", d => height - y(d))
                    .style("fill", "orange");
            }
        });

    // Initial Animation
    bars.transition()
        .duration(750)
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value));
});
