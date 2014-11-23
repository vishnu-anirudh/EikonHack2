d3.csv('data/londonstockexchange.csv', function(data) {
  data.sort(function(a, b) {
    var aValue = parseInt(a.MarketCapInMillions);
    var bValue = parseInt(b.MarketCapInMillions);
    if (aValue < bValue)
      return -1;
    if (aValue > bValue)
      return 1;
    return 0;
  });
  console.log(data);
  var chart = d3.select('.chart');
  var marketCaps = $.map(data, function(company) { return parseFloat(company.MarketCapInMillions); })
  var scale = d3.scale.linear()
                .domain([d3.min(marketCaps), d3.max(marketCaps)])
                .range([5, parseInt(chart.style('width'))]);
  chart
    .selectAll('div')
      .data(data)
    .enter().append('div')
    .style('width', function(d) { return scale(d.MarketCapInMillions) + 'px'; })
    .style('height', '20px')
    .style('margin', '2px 0')
    .style('background', 'red')
    .style('white-space', 'nowrap')
    .text(function(d) { return d.Company + ' - ' + '£' + Math.round(d.MarketCapInMillions) + 'm'; });
});
