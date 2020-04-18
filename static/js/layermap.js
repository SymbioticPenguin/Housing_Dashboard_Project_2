var cities = [
    {
        name: "San Diego",
        location: [32.7157, -117.1611]
      },
    {
        name: "Chula Vista",
        location: [32.6401, -117.0842]
    },
    {
        name:"Oceanside",
        location:[33.211666,-117.325836]
    },
    {
        name:"Escondido",
        location:[33.124722, -117.080833]
    },
    {
        name:"El Cajon",
        location:[32.7948, -116.9625]
    },
    {
        name:"Vista",
        location:[33.193611, -117.241112]
    },
    {
        name:"Carlsbad",
        location:[33.1581, -117.3506]
    },
    {
        name:"San Marcos",
        location:[33.1350206, -117.17433]
    },
    {
        name:"Spring Valley",
        location:[32.7448, -116.9989]
    },
    {
        name:"La Mesa",
        location:[32.7678, -117.0231]
    },
    {
        name:"Encitias",
        location:[33.0370, -117.2920]
    },
    {
        name:"National City",
        location:[32.6781, -117.0992]
    },
    {
        name:"Santee",
        location:[32.8384, -116.9739]
    },
    {
        name:"Poway",
        location:[32.9628, -117.0359]
    },
    {
        name:"Fallbrook",
        location:[33.3764, -117.2511]
    },
    {
        name:"Lakeside",
        location:[32.8573, -116.9222]
    },
    {
        name:"Romona",
        location:[33.0414, -116.8793]
    },
    {
        name:"Imperial Beach",
        location:[32.5839, -117.1131]
    },
    {
        name:"Lemon Grove",
        location:[32.7426, -117.0314]
    },
    {
        name:"Coronado",
        location:[32.6859, -117.1831]
    },
    {
        name:"Jamul",
        location:[32.7170, -116.8761]
    },
    {
        name:"Rancho Santa Fe",
        location:[33.0203, -117.2028]
    },
    {
        name:"Valley Center",
        location:[33.2184, -117.0342]
    },
    {
        name:"Alpine",
        location:[32.8351, -116.7664]
    },
    {
        name:"Bonita",
        location:[32.6583, -117.0353]
    },
    {
        name:"Solana Beach",
        location:[32.9912, -117.2711]
    },
    {
        name:"Bonsall",
        location:[33.2889, -117.2256]
    },
    {
        name:"Descanso",
        location:[32.8528, -116.6159]
    },
    {
        name:"Campo",
        location:[32.6076, -116.4697]
    },
    {
        name:"Del Mar",
        location:[32.9595, -117.2653]
    },
    {
        name:"Dulzura",
        location:[32.6442, -116.7814]
    },
    {
        name:"Julian",
        location:[33.0787, -116.6020]
    },
    {
        name:"Borrego Springs",
        location:[33.2559, -116.3750]
    },
    {
        name:"Pauma Valley",
        location:[33.3034, -116.9814]
    },
    {
        name:"Warner Springs",
        location:[33.2770, -116.6494]
    },
    {
        name:"Pala",
        location:[33.3652, -117.0765]
    },
    {
        name:"Santa Ysabel",
        location:[33.1092, -116.6738]
    },
    {
        name:"Boulevard",
        location:[32.6636, -116.2738]
    },
    {
        name:"Pine Valley",
        location:[32.8214, -116.5292]
    },
    {
        name:"Potrero",
        location:[32.6048, -116.613]
    },
    {
        name:"Palomar Mountain",
        location:[33.3634, -116.8356]
    }



]
var cityMarkers = [];

for (var i = 0; i < cities.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  cityMarkers.push(
    L.marker(cities[i].location).bindPopup("<h1>" + cities[i].name + "</h1>")
  );
}

// Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
var cityLayer = L.layerGroup(cityMarkers);

// Define variables for our tile layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
  Dark: dark
};

// Overlays that may be toggled on or off
var overlayMaps = {
  Cities: cityLayer
};

// Create map object and set default layers
var myMap = L.map("map", {
  center: [33.0414, -116.8793],
  zoom: 9,
  layers: [light, cityLayer]


});

function updateMap(cityName)
{
    console.log(cityName);
    //take city name and update the map
    var latLngs = [];
        //loop through city array to find city name and spit out the latitude and longitude
        for(let i = 0; i < cities.length; i++)
        {
            //get the actual city name so when compare to name in array, it will have an easier time comparing
            // var cityActual = cityName.replace("_"," ",);
            var cityActual = cityName.replace(/_/g," ");
            // if the city name is in the array
            if(cityActual === cities[i].name)
            {
                //set the latitude and longitude to that of the city
                latLngs = cities[i].location;
                //break out once find city
                break;
            }
        }
        myMap.flyTo(latLngs, 12);
    }
//get data from update chart and use it to run update chart method
d3.select("#selDataset").on("change", updateMap(this.value));


// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);