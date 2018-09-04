function getevents() {

    // Snippet Version
    /* var org_id = document.getElementById('org_id').innerText;
    var token = document.getElementById('api_token').innerText; */

    // Demo Version
    var org_id = document.getElementById('org_id').value;
    if(org_id==""){ 
        window.alert("Please enter an organizer ID!");
    }
    var token = '3ZWVQM2G5TPBMVUR4D2N';
    /* var location = document.getElementById("location").value;
    console.log(location); */

    // org_id = "6014006407"; // Instant Version
    
    var events = document.getElementById("events");
    if(org_id=="YOUR ORGANISER ID" || org_id ==""){
        events.innerHTML ="<i>Please enter your organizer ID</i>"
    } else {
        events.innerHTML = "<i>Loading events, please stand by...</i>";
    }

    var call = 'https://www.eventbriteapi.com/v3/events/search/?organizer.id='+org_id+'&expand=venue&sort_by=date&token='+token;

    /* if(location == " "){
        var call = 'https://www.eventbriteapi.com/v3/events/search/?organizer.id='+org_id+'&expand=venue&sort_by=date&token='+token;
    } else {
        var call = 'https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address='+location+'&organizer.id='+org_id+'&expand=venue&sort_by=date&token='+token;
    } */
    
    // via Org Profile
    //$.get('https://www.eventbriteapi.com/v3/events/search/?organizer.id='+org_id+'&expand=venue&sort_by=date&token='+token,

    // Org Profile with location  
    // $.get('https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address='+location+'&organizer.id='+org_id+'&expand=venue&sort_by=date&token='+token, 

    // via my owned events, regardless of org
    // $.get('https://www.eventbriteapi.com/v3/users/me/owned_events/?status=live&expand=venue&token='+token, 

    // GET /organizations/:id/events/ via organization

    $.get(call,

    function(res) {
        if(res.events.length) {
            var s = "";
            for(i=0;i<res.events.length;i++) {
                var event = res.events[i];
                var eventTime = moment(event.start.local).format('MMMM Do YYYY, h:mm A');
                var event_name = event.name.text
                
                // Event description (unused)
                /* if (event.description.text == null){
                var event_desc = "";
                } else {
                var event_desc = event.description.text
                } */
                    
                if (event.venue.address.city == null){
                var city = "N/A";
                } else {
                var city = event.venue.address.city
                }

                if (event.venue.address.address_1 == null){
                var ven_address = "";
                } else {
                var ven_address = ", " + event.venue.address.address_1  
                }

                if (event.logo == null){
                var img_url = "https://upload.wikimedia.org/wikipedia/commons/1/12/Testbild.png";
                } else {
                var img_url = event.logo.url;
                }
                console.dir(event);
                s += "<div class='eventList' style='background-image: url("+img_url+"); background-size: cover; background-repeat: no-repeat, background-position: center'><div id='wrapper2'>";
                s += "<div class='title'><a href='" + event.url + "' target=_blank>" + event_name + "</a></div>";
                s += "<div class='info'><b>" + eventTime + "</b> <br> in <b>" + city + "</b>" + ven_address + "</div>";
                s += "<p><a href='" + event.url + "' target =_blank> <button class='btn-tickets'>Get Tickets</button></a></p>";
                s += "</div></div>";
            }
            events.innerHTML= s;
        } else {
            events.innerHTML= "<p>Sorry, there are no upcoming events.</p>";
        }
    });
    var snippet = document.getElementById('snippet');

    snippet.innerText= "<script src='https://code.jquery.com/jquery-2.1.4.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.js'></script><link rel='stylesheet' href='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/c046a8a9/css/snippet.css'><div id='org_id' style='display:none'>"+org_id+"</div><div id='events'></div><div class='eb-link'><i><a href='http://www.eventbrite.com' target=_blank>powered by Eventbrite</a></i></div><script src='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/8cf7b47f/js/snippet-script.js' onload='kk()'></script>"
}
