
const token = 'R4PTI3KDPNFP27WIQ7Q3'

function getevents() {
    const events = document.getElementById("events")
    let orgId = document.getElementById('orgId').value
    console.log(orgId)
    if(orgId=="YOUR ORGANISER ID" || orgId ==""){
        events.innerHTML ="<i>Please enter your organizer ID</i>"
    } else {
        events.innerHTML = "<i>Loading events, please stand by...</i>";
    }

    const call = 'https://www.eventbriteapi.com/v3/organizations/'+orgId+'/events/?status=live&token='+token
    
    $.get(call,function(result){
        let eventList = result.events
        
       if(eventList.length){
            events.innerHTML = ''
           for(i=0;i<eventList.length;i++){
               let event = eventList[i]
               console.log(event)
               let location
               let city
               if(event.online_event){
                    location = 'online'
                    city = ''
                    let eventCard = buildEventCard(event, location, city)
                    events.innerHTML += eventCard
                }else if(event.venue_id == null){
                    location = ''
                    city = ''
                    let eventCard = buildEventCard(event, location, city)
                    events.innerHTML += eventCard
                }else{
                    const venueCall = 'https://www.eventbriteapi.com/v3/venues/'+event.venue_id+'/?token='+token
                    $.get(venueCall,function(res) {
                        location = res.address.address_1
                        city = res.address.city
                        let eventCard = buildEventCard(event, location, city)
                        events.innerHTML += eventCard
                    });
                }
           }
        } else {
            events.innerHTML= '<p>Sorry, there are no upcoming events.</p>'
        }
    })
    
    var snippet = document.getElementById('snippet');

    snippet.innerText= "<script src='https://code.jquery.com/jquery-2.1.4.min.js'></script><script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.3/moment.js'></script><link rel='stylesheet' href='https://cdn.evbstatic.com/s3-build/28813-rc2018-08-29_16.04-33b338f/js/node_modules/eventbrite_design_system/css/eds.css'crossorigin='anonymous' /><link rel='stylesheet' href='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/ed78fcb6/css/snippet.css'><div id='widgetbox' style='width:40%'><div id='orgId' style='display:none'>"+orgId+"</div><div id='events'></div><div class='eb-link'><i><a href='http://www.eventbrite.com' target=_blank>powered by Eventbrite</a></i></div></div><script src='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/6185c70f/js/snippet-script.js' onload='getevents()'></script><script src='https://cdn.rawgit.com/mhennigEB/Event-List-Widget/5d9bdac8/js/event-card.js'>"
}



