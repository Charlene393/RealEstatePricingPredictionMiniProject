function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if(uiBathrooms[i].checked){
            return parseInt(i)+1;
        }
}
    return -1
}

function getBHKValue(){
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i in uiBHK) {
        if(uiBHK[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}
function onClickedEstimatePrice(){
    console.log("Estimate price button clicked");
    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5000/predict_home_price"

    $.post(url, {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    }, function(data, status) {
        console.log("Got response for home price prediction request");
        if (data && data.estimated_price) {
            estPrice.innerHTML = "<h2>" + data.estimated_price + " Lakhs</h2>";
            console.log("Estimated Price:", data.estimated_price);
        } else {
            estPrice.innerHTML = "<h2>Could not estimate price</h2>";
            console.error("Invalid response format:", data);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        estPrice.innerHTML = "<h2>Error in estimating price</h2>";
        console.error("Error fetching estimated price:", textStatus, errorThrown);
    });

}
function onPageLoad() {
    console.log("Page has loaded successfully.");
    
    var url = "http://127.0.0.1:5000/get_location_names";

    $.get(url, function(data, status) {
        console.log("Got response for location names request");

        if (data && data.locations) {
            var locations = data.locations;
            var uiLocations = $("#uiLocations");

            uiLocations.empty(); // Clear existing options

            for (var i in locations) {
                var opt = new Option(locations[i], locations[i]);
                uiLocations.append(opt);
            }
        } else {
            console.error("Invalid data format received:", data);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching locations:", textStatus, errorThrown);
    });
}

window.onload = onPageLoad;

