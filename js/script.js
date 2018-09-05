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

    snippet.innerText= "<script src='https://code.jquery.com/jquery-2.1.4.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.js'></script><link rel='stylesheet' href='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/1d4210b9/css/snippet.css'><div id='org_id' style='display:none'>"+org_id+"</div><div id='events'></div><div class='eb-link'><i><a href='http://www.eventbrite.com' target=_blank>powered by Eventbrite</a></i></div><script src='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/615271fb/js/snippet-script.js' onload='getevents()'></script>"
}
