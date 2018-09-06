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

function buildEventCard(event) {
    var img_url = event.logo.url || "https://upload.wikimedia.org/wikipedia/commons/1/12/Testbild.png";
    
    var location = event.venue.name || event.venue.address.localized_address_display;
    if(location == event.venue.name){
      var city = ", "+ event.venue.address.city;
    } else {
      var city = "";
    }
  
    var url = event.url;
  
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
                      <a href="${url}" target=_blank>
                        <button class="eds-btn eds-btn--button eds-btn--fill btn-align-right" type="button">
                        Get Tickets
                        </button>
                      </a>
                    </div>
                    <div class="eds-text-bs--fixed eds-text-color--grey-600 eds-l-mar-top-1" />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    `;
  }
  