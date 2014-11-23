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
    .append('span')
    .style('position', 'relative')
    .style('top', '2px')
    .text(function(d) { return d.Company + ' - ' + '£' + Math.round(d.MarketCapInMillions) + 'm'; });
});

d3.csv('data/eurocompfirm.csv', function(data) {
  data.sort(function(a, b) {
    var aSector = a.Industry;
    var bSector = b.Industry;
    var aCountry = a.Country;
    var bCountry = b.Country;
    if (aCountry < bCountry)
      return -1;
    if (aCountry > bCountry)
      return 1;
    if (aSector < bSector)
      return -1;
    if (aSector > bSector)
      return 1;
    return 0;
  });
  console.log(data)
  var countries = $.map(data, function(company) { return company.Country; })
  countries = countries.filter(function(country, index, inputArray) {
    return inputArray.indexOf(country) == index;
  });
  console.log(countries);
  var country_el = d3.select('.countries');
  country_el
    .selectAll('div')
      .data(countries)
    .enter().append('div')
    .classed('country', true)
    .attr('id', function(country) { return country; })
    .style('background', 'blue')
    .style('height', '20px')
    .style('margin', '2px 0')
    .append('span')
    .style('position', 'relative')
    .style('top', '2px')
    .text(function(country) { return country; })
  $('.country').click(function(event) {
    var target = $(event.target);
    var countryCompanies = [];
    $.each(data, function(company) {
      if (company.Country == target.attr('id'))
        countryCompanies.push(company);
    });
    var sectors = $.map(data, function(company) { return company.Industry; });
    sectors = sectors.filter(function(sector, index, inputArray) {
      return inputArray.indexOf(sector) == index;
    });
    d3.select('#country-info')
    .selectAll('div')
      .data(sectors)
    .enter().append('div')
    .style('height', '20px')
    .style('margin', '2px 0')
    .style('background', 'red')
    .style('white-space', 'nowrap')
    .append('span')
    .style('position', 'relative')
    .style('top', '2px')
    .text(function(sector) { return sector; });
    console.log($(event.target).attr('id'));
  });
//  $.each(countries, function(country_index, country) {
//    var companies = $.map(data, function(company) {
//      return company );
//    });
//    $.each(data, function(company_index, company) {
//      if (company.Country == country) {
//        console.log(country);
//      }
//    });
//  });
});
