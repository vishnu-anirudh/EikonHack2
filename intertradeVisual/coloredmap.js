/**
 * Created by gaoxinyang on 14-1-18.
 */
/* Backbone style execution */

var map = new Map({
        scope:'world',
        projection:'mercator',
        el: $('#container'),



        geography_config: {
            highlightOnHover: false,
            popupOnHover: false


            //popupTemplate: _.template('<div class="hoverinfo"><strong><%= geography.properties.name %></strong> <% if (data.electoralVotes) { %><hr/>  Electoral Votes: <%= data.electoralVotes %> <% } %></div>')
        },


        fills: {

            defaultFill: '#e4f6f8'
        }
});





map.render();
