function getevents() {

    var org_id = document.getElementById('org_id').value;
    if(org_id==""){ 
        window.alert("Please enter an organizer ID!");
    }
    var token = '3ZWVQM2G5TPBMVUR4D2N';
    // var location = document.getElementById("location").value; 

    // org_id = "6014006407"; // Instant Version
    
    var events = document.getElementById("events");
    if(org_id=="YOUR ORGANISER ID" || org_id ==""){
        events.innerHTML ="<i>Please enter your organizer ID</i>"
    } else {
        events.innerHTML = "<i>Loading events, please stand by...</i>";
    }
    console.log(token, org_id)
    var call = 'https://www.eventbriteapi.com/v3/events/search/?organizer.id='+org_id+'&expand=venue&sort_by=date&token='+token; 

    $.get(call,

    function(res) {
        if(res.events.length) {
            var s = "";
            for(i=0;i<res.events.length;i++) {
                var event = res.events[i];
                var eventHtml = buildEventCard(event);
                s += eventHtml;
            }
            events.innerHTML= s;
        } else {
            events.innerHTML= "<p>Sorry, there are no upcoming events.</p>";
        }
    });
    var snippet = document.getElementById('snippet');

    snippet.innerText= "<script src='https://code.jquery.com/jquery-2.1.4.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.js'></script><link rel='stylesheet' href='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/ed78fcb6/css/snippet.css'><link rel='stylesheet' href='https://cdn.evbstatic.com/s3-build/28813-rc2018-08-29_16.04-33b338f/js/node_modules/eventbrite_design_system/css/eds.css'crossorigin='anonymous' /><div id='org_id' style='display:none'>"+org_id+"</div><div id='events'></div><div class='eb-link'><i><a href='http://www.eventbrite.com' target=_blank>powered by Eventbrite</a></i></div><script src='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/130c9c13/js/snippet-script.js' onload='getevents()'></script><script src='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/5d9bdac8/js/event-card.js'>"
}

