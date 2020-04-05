
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
}



