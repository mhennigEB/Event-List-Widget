function getevents() {

    var org_id = document.getElementById('org_id').innerText;
    var token = '3ZWVQM2G5TPBMVUR4D2N';
    var events = document.getElementById("events");
    
    events.innerHTML = "<i>Loading events, please stand by...</i>";
    
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
}