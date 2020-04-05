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

function buildEventCard(event, location, city) {
  const url = event.url;
  const img_url = event.logo != null ? event.logo.url : 'https://upload.wikimedia.org/wikipedia/commons/1/12/Testbild.png'
  return `
      <div class="eds-card eds-card--neutral" role="presentation">
        <section
          class="eds-l-pad-all-6 eds-media-card-content eds-media-card-content--grid eds-media-card-content--standard eds-media-card-content--fixed"
          role="presentation">
          <aside class="eds-media-card-content__image-container">
            <div class="eds-media-card-content__image-wrapper eds-media-card-content__image-wrapper--with-width">
              <div class="eds-media-card-content__image-content">
                <div
                  class="eds-media-card-content__image-placeholder"
                  style="background-color:#EFF2F5;"
                />
                <img
                  class="eds-media-card-content__image eds-max-img"
                  src="${img_url}"
                />
              </div>
            </div>
            ${event.is_free ? `<div class="eds-media-card-content__flag eds-align--center eds-text-bs eds-text-color--grey-600">
              <span class="eds-text-color--grey-700">Free</span>
            </div>`: ''}
          </aside>
          <main class="eds-media-card-content__content-container">
            <div class="eds-media-card-content__content">
              <div class="eds-media-card-content__content__principal">
                <div class="eds-media-card-content__primary-content">
                  <div class="eds-text-bs eds-text-color--grey-600" />
                  <h3 class="eds-media-card-content__title eds-text-color--grey-800 eds-text-bl">
                    ${event.name.html}
                  </h3>
                </div>
                <div class="eds-media-card-content__sub-content">
                  <div class="eds-text-bs--fixed eds-text-color--grey-600 eds-l-mar-top-1">
                    ${moment(event.start.local).format('llll')}
                  </div>
                  <div class="eds-media-card-content__sub-content-cropped">
                    <div class="eds-text-bs--fixed eds-text-color--grey-600 eds-l-mar-top-1">
                      ${location} ${city}
                    </div>
                    <div class="eds-text-bs--fixed eds-text-color--grey-600 eds-l-mar-top-1" />
                      <a href="${url}" target=_blank>
                        <button class="eds-btn eds-btn--button eds-btn--fill btn-align-right" type="button">
                        Get Tickets
                        </button>
                      </a>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    `
}
  