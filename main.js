function loadNodes( newClusterNodes) {
    /*
* Load nodes in cluster group and defines click properties for the popup window
*/
    var layer = L.geoJson(newClusterNodes, {

        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                //populateOpen311Div(feature.properties.service_request_id, "true");
                this.bindPopup(feature.properties.professionalProfile);
            });

        },
        pointToLayer: function (feature, latlng) {
            var marker = new
            L.circleMarker(latlng, {
                radius: 8,
                fillColor: "orange",
                color: "blue",
                weight: 3,
                opacity: 1,
                fillOpacity: 0.8
            });
            //window.markerMap[feature.properties.service_request_id] = marker;
            //window.markerStatusMap[feature.properties.status].push(marker)
            //console.log(marker)
            return marker;
            
        }

    });

    return layer;
}


function loadData(url) {
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(response){
            var openlabGeoJSON = new Geojson;
            openlabGeoJSON.load(response,"j_longitude","j_latitude")
            //console.log(openlabGeoJSON)
//            L.geoJson(openlabGeoJSON, {
//    style: function (feature) {
//        return {color: "blue"};
//    },
//    onEachFeature: function (feature, layer) {
//        layer.bindPopup(feature.properties.professionalProfile);
//    }
//}).addTo(map);
            nodes=loadNodes(openlabGeoJSON)
            //console.log(map)
            map.addLayer(nodes);  
        }
        
    });
}

var map = L.map('map').setView([41.87, 12.49], 9);
var osm_layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
osm_layer.addTo(map);
loadData("openlabor.json");

