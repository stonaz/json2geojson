function getData(url) {
/*
* Get Data in async way, so that it can return an object to a variable
*/
var data;
    $.ajax({
        async: false, //thats the trick
        url: url,
        dataType: 'json',
        success: function(response){
        data = response;
        }
        
    });
    return data;
}

function latLngtoWKT(lng,lat) {
return "POINT(" + lng + " " + lat + ")";
 }

var openlabGeoJSON= new geojsonColl();
var openlabJSON=getData("openlabor.json")
for (var i in openlabJSON){
    if (openlabJSON[i].j_latitude && openlabJSON[i].j_longitude) {
        var feature = new featureConstructor;
        feature.geometry = latLngtoWKT(openlabJSON[i].j_longitude,openlabJSON[i].j_latitude)
        feature.properties = openlabJSON[i]
        openlabGeoJSON.features.push(feature)
    }
    
        }
        
console.log (openlabGeoJSON)