// File: /Hotel Therme Meran/formextension.js
// VERSIONE FINALE E COMPLETA

export const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }) => trace?.type === 'Book_Form' || (trace.payload && trace.payload?.name === 'Book_Form'),
    
    render: async ({ trace, element }) => {

        // --- SEZIONE 1: CARICAMENTO DINAMICO DEI DATI ---
        const GITHUB_USER_REPO = 'https://trailblazeinnovation.github.io/Hotel';
        const generalPath = `${GITHUB_USER_REPO}/General Hotel Extensions`;
        const hotelSpecificPath = `${GITHUB_USER_REPO}/Hotel Therme Meran`;
        
        const langCode = (trace.payload.locale || 'en').split('-')[0];
        
        // Carica i testi statici dell'interfaccia (T) con fallback in inglese
        let T; 
        try {
            const langModule = await import(`${generalPath}/locales/${langCode}.js`);
            T = langModule.translations;
        } catch (error) {
            console.warn(`Translation for '${langCode}' not found. Falling back to 'en'.`);
            const fallbackModule = await import(`${generalPath}/locales/en.js`);
            T = fallbackModule.translations;
        }

        // Carica i dati dinamici specifici dell'hotel (D)
        const hotelDataModule = await import(`${hotelSpecificPath}/hotel-data.js`);
        const D = hotelDataModule.hotelData;
        
        // --- SEZIONE 2: PREPARAZIONE DEI DATI PER LA VISUALIZZAZIONE ---
        // Combina i dati grezzi dell'hotel con i formati di testo per creare le stringhe finali
        const processedRooms = D.rooms.map(room => {
            const name = room.name[langCode] || room.name['default'];
            const size = T.sizeText.replace('{size}', room.sizeSqm);
            const capacity = T.capacityText.replace('{min}', room.capacity.min).replace('{max}', room.capacity.max);
            const price = T.priceFrom.replace('{price}', room.priceFromPerPerson).replace('{currency}', D.currency);

            return {
                ...room, // Mantiene tutti i dati originali (id, image, etc.)
                // Aggiunge i campi finali pronti per essere mostrati nell'HTML
                displayName: name,
                displaySize: size,
                displayCapacity: capacity,
                displayPrice: price,
            };
        });

        // Filtra le camere preparate per categoria, pronte per essere usate nel form
        const suitesData = processedRooms.filter(r => r.category === 'suite');
        const roomsData = processedRooms.filter(r => r.category === 'room');
        
        // --- SEZIONE 3: CODICE ORIGINALE DEL FORM (HTML, CSS, JS) ---
        // Questo è il tuo codice originale al 100%, ora integrato con la nuova logica
        const formContainer = document.createElement('form');
        formContainer.classList.add('form-container');
        let currentStep = 1;
        let selectedStartDate = null;
        let selectedEndDate = null;
        
        const suitesCategoryImageUrl = D.categoryImages.suites;
        const roomsCategoryImageUrl = D.categoryImages.rooms;

        let currentAccommodationViewInStep3 = 'categories';

        formContainer.innerHTML = `
            <style>
            .form-container{font-family:"UCity Pro",sans-serif;width:100%;background:#fff;padding:20px;border-radius:5px}.steps{display:flex;justify-content:space-between;padding:10px 0;background:#fff;font-family:"UCity Pro",sans-serif}.step-indicator{flex:1;text-align:center;padding:10px;font-weight:700;color:#8b8686;background:#fff;border-radius:5px;font-family:"UCity Pro",sans-serif}.step-indicator.active span{background:#000!important;color:#fff;font-family:"UCity Pro",sans-serif}._1ddzqsn7{width:100%!important}.active{color:#000!important}.active span{background:#000;color:#fff}input,textarea{width:100%;padding:10px;margin:10px 0;border-radius:10px;border:1px solid #ccc;outline:none;font-family:"UCity Pro",sans-serif;box-sizing:border-box}input:hover,textarea:hover{border:1px solid #000}h2,label,input,textarea,button{font-family:"UCity Pro",sans-serif}.steps{position:relative;width:100%}.step-1 .bord2{position:absolute;border:2px solid #e1dada;width:100%;left:0;top:80px}.step-1.active .bord,.step-2.active .bord{position:absolute;border:2px solid #000;width:20%;left:0;top:80px}.step-2.active .bord{display:block!important}.step-3.active .bord{position:absolute;border:2px solid #000;width:40%;left:0;top:80px}.step-4.active .bord{position:absolute;border:2px solid #000;width:60%;left:0;top:80px}.step-5.active .bord{position:absolute;border:2px solid #000;width:80%;left:0;top:80px}.step-6.active .bord{position:absolute;border:2px solid #000;width:100%;left:0;top:80px}.visited span{background:#000!important;color:#fff}.next,.prev{background:0 0;border:1px solid gray;width:150px;color:#000;padding:10px 25px;border-radius:20px;cursor:pointer}.next:hover,.prev:hover{background:#000;color:#fff}.vfrc-message--extension-Forms{background:#fff!important}.step-content{margin-top:28px}.duration-btn{border:1px solid gray;background-color:#fff;color:#000}.BtnSimp{border-radius:8px;padding:10px 25px;cursor:pointer}.duration-btn.activeBtn{color:#fff;background:#000!important;border-color:#000!important}.duration-btn:not(.disabled):hover{color:#fff;background:#000!important;border-color:#000!important}.duration-btn.disabled{opacity:.5;cursor:not-allowed;background:#f5f5f5!important;border:1px solid #ddd!important;color:#999!important}.custom-radio-container{display:flex;align-items:center;cursor:pointer;padding:5px 0;margin-bottom:5px}.custom-radio-container input[type=radio][name=durationType]{opacity:0;position:absolute;width:1px;height:1px}.custom-radio-square{width:14px;height:14px;border:1px solid #888;margin-right:8px;display:inline-block;background-color:#fff;transition:background-color .2s ease,border-color .2s ease;border-radius:4px}.custom-radio-container input[type=radio][name=durationType]:checked+.custom-radio-square{background-color:#000;border-color:#000}.custom-radio-container .radio-label-text{font-weight:500;font-family:"UCity Pro",sans-serif}#quickDurationButtonsContainer,#rangeDurationInputContainer{transition:opacity .3s ease-in-out}ul#accommodationListContainer{display:flex;flex-wrap:wrap;margin-top:0;list-style-type:none;padding-left:0!important;gap:15px;justify-content:flex-start}ul#accommodationListContainer li{display:flex;flex-direction:column;margin:0;flex-basis:calc(50% - 8px);border-radius:12px;background-color:transparent;box-shadow:none;border:none;overflow:hidden;transition:background-color .3s ease;padding:0}ul#accommodationListContainer li:hover{background-color:#f5f5f5}ul#accommodationListContainer li.selected-item{background-color:#e0e0e0}@media (max-width:768px){ul#accommodationListContainer li{flex-basis:calc(100% - 8px)}}input[type=checkbox][id^=acc-myCheckbox]{display:none}ul#accommodationListContainer label{display:block;position:relative;cursor:pointer;text-align:center;padding:10px;background-color:transparent;border:none;height:auto;box-sizing:border-box}ul#accommodationListContainer label img{height:170px;width:100%;border-radius:8px;display:block;margin-left:auto;margin-right:auto;object-fit:cover;transition:transform .3s ease;transform:scale(1)}ul#accommodationListContainer li:hover label img{transform:scale(1.03)}ul#accommodationListContainer label p{font-size:13px;margin-top:8px;text-align:left;padding:0 5px;line-height:1.4;color:#333}.room-counter{margin:0 auto 10px;display:none;justify-content:center;align-items:center;gap:6px;padding-top:5px}input[type=checkbox][id^=acc-myCheckbox]:checked~.room-counter{display:flex}.fieldinput{margin-top:0!important}.custom-calendar{width:100%;margin-top:20px;font-family:"UCity Pro",sans-serif}.calendar-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.calendar-title{font-weight:600;font-size:16px}.calendar-nav{display:flex;gap:10px}.calendar-nav button{background:none;border:none;cursor:pointer;font-size:16px;padding:5px 10px;border-radius:5px}.calendar-nav button:hover{background:#f5f5f5}.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:0}.calendar-day-header{text-align:center;font-weight:500;font-size:12px;color:#666;padding:5px 0}.calendar-day{text-align:center;padding:10px 5px;border-radius:5px;cursor:pointer;font-size:14px}.calendar-day:hover{background:#f5f5f5}.calendar-day.empty{visibility:hidden}.calendar-day.today{font-weight:700}.calendar-day.selected-start,.calendar-day.selected-end{background:#000;color:#fff}.calendar-day.in-range{background:#e0e0e0;border-radius:0}.calendar-day.disabled{color:#ccc;cursor:not-allowed}.date-range-display{margin-top:15px;padding:10px;background:#f5f5f7;border-radius:5px;font-size:14px}.date-range-display span{color:#666}.input-wrapper{position:relative;margin:5px 0}#rangeDurationInputContainer .input-wrapper input[type=number]{border:1px solid gray;border-radius:6px;width:80px!important;margin:0;height:34px;text-align:right;box-sizing:border-box;padding:0 10px}#rangeDurationInputContainer .input-wrapper label{position:absolute;top:-.7em;z-index:1;left:.8em;background-color:#fff;padding:0 5px;font-size:11px;color:#666}b{font-size:13px!important}ul#accommodationListContainer label p b{font-size:inherit}.counter-btn{width:25px;height:25px;border-radius:50%;background:#f5f5f5;border:1px solid #ddd;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px}input[type=checkbox][id^=acc-myCheckbox]:checked~.room-counter .counter-btn{display:flex!important}.counter-btn:hover{background:#e0e0e0}.room-quantity{border:1px solid #ddd;border-radius:5px;padding:5px;text-align:center;width:60px}#accommodation-categories{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:20px}.category-selector{cursor:pointer;padding:15px;border-radius:12px;width:calc(50% - 5px);background-color:#fff;box-sizing:border-box;overflow:hidden;transition:background-color .3s ease}.category-selector:hover{background-color:#f5f5f5}.category-selector img{width:100%;height:220px;border-radius:8px;object-fit:cover;margin-bottom:10px;transition:transform .3s ease}.category-selector:hover img{transform:scale(1.05)}.category-selector h3{margin-top:10px;margin-bottom:5px;font-size:16px;font-weight:400;color:#333;text-align:left;font-family:"UCity Pro",sans-serif}@media (min-width:601px){#accommodation-categories:has(.category-selector:nth-child(1):last-child) .category-selector{width:calc(100% - 30px);margin-left:auto;margin-right:auto}}@media (max-width:600px){.category-selector{width:calc(100% - 20px);margin-left:10px;margin-right:10px}#accommodation-categories{justify-content:center}}.back-to-categories-btn-container{margin-bottom:20px;text-align:left}.back-to-categories-btn{background:none;border:none;padding:5px 0;color:#555;cursor:pointer;font-size:14px;display:inline-flex;align-items:center;font-family:"UCity Pro",sans-serif;text-decoration:none;width:auto;border-radius:0;font-weight:500}.back-to-categories-btn svg{width:1em;height:1em;margin-right:8px;fill:currentColor}.back-to-categories-btn:hover{color:#000;text-decoration:underline;background:none}.step-4>div:nth-child(4){margin-bottom:25px}.step-4>div:nth-child(5){margin-bottom:30px}.step-4 label{display:block;margin-bottom:8px;font-weight:500;text-align:left!important}.step-4 input[type=number],.step-4 textarea{margin-top:0}.step-5>div:nth-child(4){margin-bottom:25px}.step-5>div:nth-child(5){margin-bottom:25px}.step-5 label{display:block;margin-bottom:8px;font-weight:500;text-align:left!important}
            </style>
            <div class="steps" style="display: flex; gap: 30px; justify-content: space-around; width: 100%;">
                <div class="step-indicator step-1"><span class="bord2"></span><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">1</span></div>
                <div class="step-indicator step-2" style="flex: 0!important; padding: 0!important; display: contents!important;"><span class="bord" style="display: contents;"></span></div>
                <div class="step-indicator step-3"><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">2</span></div>
                <div class="step-indicator step-4"><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">3</span></div>
                <div class="step-indicator step-5"><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">4</span></div>
                <div class="step-indicator step-6"><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">5</span></div>
            </div>
            <div class="step-content">
                <div class="step step-1">
                    <h2 style="margin: 0!important;">${T.titleChooseYourStay}</h2>
                    <p style="margin: 7px 0px!important;">${T.undertitleChooseYourStay}</p><br/>
                    <div id="firstSte">
                        <div class="custom-calendar" id="customCalendar"></div>
                        <div class="date-range-display" id="dateRangeDisplay"><span>${T.noDatesSelected}</span></div>
                    </div>
                    <div id="secondSte" style="display: none;">
                        ${T.undertitleChooseYourStay2}
                    </div>
                    <div style="display: flex; justify-content: right; gap: 30px; margin-top: 17px;">
                        <button type="button" class="next">${T.next}</button>
                    </div>
                </div>
                <div class="step step-2" style="display: none;">
                    <h2 style="margin: 0!important;">${T.titleChooseYourStay}</h2>
                    <p style="margin: 7px 0px!important;">${T.undertitleChooseYourStay2}</p><br/>
                    <div id="selectedDateRange" style="margin-bottom: 20px; font-weight: 900; color: #000; font-size: 19px;"></div>
                    <div style="margin-bottom: 20px;">
                        <label class="custom-radio-container"><input type="radio" id="ButtonSelection" name="durationType" value="single" checked><span class="custom-radio-square"></span><span class="radio-label-text">${T.selectDuration}:</span></label>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 5px; padding-left: 22px;" id="quickDurationButtonsContainer">
                            <button type="button" class="duration-btn BtnSimp" data-days="exact">${T.exactlyAsSpecified}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="3">${T.threeDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="4">${T.fourDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="5">${T.fiveDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="6">${T.sixDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="7">${T.sevenDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="8">${T.eightDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="9">${T.nineDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="10">${T.tenDays}</button>
                        </div>
                    </div>
                    <div style="margin-top: 20px;">
                        <label class="custom-radio-container"><input type="radio" id="rangeDuration" name="durationType" value="range"><span class="custom-radio-square"></span><span class="radio-label-text">${T.enterExactDates}:</span></label>
                        <div style="margin-top: 5px; padding-left: 22px;" id="rangeDurationInputContainer">
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <div class="input-wrapper"><label for="fromDay">${T.from}</label><input type="number" id="fromDay" name="fromDay" min="2" value="2"></div>
                                <div class="input-wrapper"><label for="tillDay">${T.until}</label><input type="number" id="tillDay" name="tillDay" min="2" value="2"></div>
                                <span id="maxRangeNote" style="margin-left: 10px; color: #666; font-size: 12px;"></span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 30px;">
                        <button type="button" class="prev">${T.back}</button>
                        <button type="button" class="next">${T.next}</button>
                    </div>
                </div>
                <div class="step step-3" style="display: none;">
                    <style> .vfrc-message--extension-Forms{width: 100%!important;}</style>
                    <h2 style="margin: 0!important;">${T.titlePickAccommodation}</h2>
                    <p style="margin: 7px 0px!important;">${T.undertitlePickAccommodation}</p><br/>
                    <div id="step3-dynamic-content"></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${T.back}</button>
                        <button type="button" class="next">${T.next}</button>
                    </div>
                </div>
                <div class="step step-4" style="display: none;">
                    <h2 style="margin: 0!important;">${T.titleWhoTraveling}</h2>
                    <p style="margin: 7px 0px!important;">${T.undertitleWhoTraveling}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between;">
                        <div style="width: 45%;"><label for="adults">${T.adults14Plus}*</label><input type="number" id="adults" name="adults" min="1" value="1" required/></div>
                        <div style="width: 45%;"><label for="children">${T.children}</label><input type="number" id="children" name="children" min="0" value="0"/></div>
                    </div>
                    <div>
                        <label for="special-requests">${T.specialRequests}</label>
                        <textarea id="special-requests" name="special-requests" rows="4" placeholder="${T.specialRequestsTxt}"></textarea>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${T.back}</button>
                        <button type="button" class="next">${T.next}</button>
                    </div>
                </div>
                <div class="step step-5" style="display: none;">
                    <h2 style="margin: 0!important;">${T.titleContactInformation}</h2>
                    <p style="margin: 7px 0px!important;">${T.undertitleContactInformationBooking}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between;">
                        <div style="width: 45%;"><label for="First">${T.firstName}*</label><input type="text" id="First" name="First" class="FirstName fieldinput" required/></div>
                        <div style="width: 45%;"><label for="LastName">${T.lastName}*</label><input type="text" id="LastName" name="LastName" class="LastName fieldinput" required/></div>
                    </div>
                    <div><label for="Email">${T.emailVF}*</label><input type="email" id="Email" name="Email" class="Email fieldinput" required/></div>
                    <div><label for="Phone">${T.phoneNumber}</label><input type="text" id="Phone" name="Phone" class="Phone fieldinput"/></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${T.back}</button>
                        <button type="button" class="next">${T.next}</button>
                    </div>
                </div>
                <div class="step step-6" style="display: none;">
                    <h2 style="margin: 0!important;">${T.titleReview}</h2>
                    <p style="margin: 7px 0px!important;">${T.undertitleReviewBooking}</p><br/>
                    <div id="review-info"></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${T.edit}</button>
                        <button type="submit" class="next">${T.submit}</button>
                    </div>
                </div>
            </div>
        `;

        const steps = formContainer.querySelectorAll(".step");
        const stepIndicators = formContainer.querySelectorAll(".step-indicator");
        const reviewInfo = formContainer.querySelector("#review-info");

        function createCustomCalendar(){const e=formContainer.querySelector("#customCalendar"),t=formContainer.querySelector("#dateRangeDisplay");if(!e)return;let a=new Date,n=a.getMonth(),l=a.getFullYear();function d(a,r){e.innerHTML="";const o=document.createElement("div");o.className="calendar-header";const i=document.createElement("div");i.className="calendar-title",i.textContent=new Date(r,a).toLocaleDateString(trace.payload.locale||"en-US",{month:"long",year:"numeric"});const c=document.createElement("div");c.className="calendar-nav";const s=document.createElement("button");s.innerHTML="&lt;",s.addEventListener("click",()=>{0===a?(a=11,r--):a--,d(a,r)});const u=document.createElement("button");u.innerHTML="&gt;",u.addEventListener("click",()=>{11===a?(a=0,r++):a++,d(a,r)}),c.appendChild(s),c.appendChild(u),o.appendChild(i),o.appendChild(c),e.appendChild(o);const m=document.createElement("div");m.className="calendar-grid",["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(e=>{const t=document.createElement("div");t.className="calendar-day-header",t.textContent=e,m.appendChild(t)});const p=new Date(r,a,1).getDay(),y=new Date(r,a+1,0).getDate();for(let e=0;e<p;e++){const e=document.createElement("div");e.className="calendar-day empty",m.appendChild(e)}const g=new Date;g.setHours(0,0,0,0);for(let e=1;e<=y;e++){const o=document.createElement("div");o.className="calendar-day",o.textContent=e;const i=new Date(r,a,e);i.setHours(0,0,0,0),e===g.getDate()&&a===g.getMonth()&&r===g.getFullYear()&&o.classList.add("today"),i<g?o.classList.add("disabled"):o.addEventListener("click",()=>h(new Date(r,a,e))),selectedStartDate&&i.getTime()===selectedStartDate.getTime()?o.classList.add("selected-start"):selectedEndDate&&i.getTime()===selectedEndDate.getTime()?o.classList.add("selected-end"):selectedStartDate&&selectedEndDate&&i>selectedStartDate&&i<selectedEndDate&&o.classList.add("in-range"),m.appendChild(o)}e.appendChild(m)}function h(e){const t=new Date;t.setHours(0,0,0,0),e<t||(n=e.getMonth(),l=e.getFullYear(),selectedStartDate&&!selectedEndDate&&e>selectedStartDate?selectedEndDate=e:(selectedStartDate=e,selectedEndDate=null),v(),d(n,l))}function v(){if(!selectedStartDate)return void(t.innerHTML=`<span>${T.noDatesSelected}</span>`);const e=selectedStartDate.toLocaleDateString(trace.payload.locale||"en-US",{month:"short",day:"numeric",year:"numeric"});if(selectedEndDate){const a=selectedEndDate.toLocaleDateString(trace.payload.locale||"en-US",{month:"short",day:"numeric",year:"numeric"});t.innerHTML=`<span>${T.selected}: ${e} - ${a}</span>`}else t.innerHTML=`<span>${T.selected}: ${e}</span>`}d(n,l),v()}
        function setupRoomCounters(e){e.querySelectorAll('input[type="checkbox"][id^="acc-myCheckbox"]').forEach(e=>{const t=e.closest("li"),a=t.querySelector(".room-counter"),n=a.querySelector(".increment"),l=a.querySelector(".decrement"),d=a.querySelector(".room-quantity");e.addEventListener("change",()=>{t&&t.classList.toggle("selected-item",e.checked),a.style.display=e.checked?"flex":"none"}),e.checked?(t&&t.classList.add("selected-item"),a.style.display="flex"):(t&&t.classList.remove("selected-item"),a.style.display="none"),n.addEventListener("click",function(){d.value=parseInt(d.value)+1}),l.addEventListener("click",function(){parseInt(d.value)>1&&(d.value=parseInt(d.value)-1)})})}
        
        function renderStep3DynamicContent() {
            const contentArea = formContainer.querySelector("#step3-dynamic-content");
            if (!contentArea) return;
            contentArea.innerHTML = '';

            if (currentAccommodationViewInStep3 === 'categories') {
                contentArea.innerHTML = `
                    <div id="accommodation-categories">
                        <div class="category-selector" data-category="suites">
                            <img src="${suitesCategoryImageUrl}" alt="${T.FormSuites}">
                            <h3>${T.FormSuites}</h3>
                        </div>
                        <div class="category-selector" data-category="rooms">
                            <img src="${roomsCategoryImageUrl}" alt="${T.FormRooms}">
                            <h3>${T.FormRooms}</h3>
                        </div>
                    </div>
                `;
                contentArea.querySelectorAll('.category-selector').forEach(sel => {
                    sel.addEventListener('click', function() {
                        currentAccommodationViewInStep3 = this.dataset.category;
                        renderStep3DynamicContent();
                    });
                });
            } else {
                const itemsToRender = currentAccommodationViewInStep3 === 'suites' ? suitesData : roomsData;
                let itemsHtml = `<div class="back-to-categories-btn-container">
                                        <button type="button" class="back-to-categories-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>
                                            ${T.accommodationCategories}
                                        </button>
                                     </div>`;
                itemsHtml += `<ul id="accommodationListContainer">`;
                itemsToRender.forEach(item => {
                    itemsHtml += `
                        <li>
                            <input type="checkbox" id="acc-myCheckbox-${item.id}" data-name="${item.displayName}" data-type="${currentAccommodationViewInStep3}"/>
                            <label for="acc-myCheckbox-${item.id}">
                                <img src="${item.image}" alt="${item.displayName}" />
                                <p style="text-align: left;">
                                    <b>${item.displayName}</b><br/>
                                    ${item.displaySize} <br/>
                                    ${item.displayCapacity} <br/>
                                    ${item.displayPrice}
                                </p>
                            </label>
                            <div class="room-counter">
                                <button class="counter-btn decrement" type="button">-</button>
                                <input type="number" class="room-quantity" min="1" value="1" readonly>
                                <button class="counter-btn increment" type="button">+</button>
                            </div>
                        </li>
                    `;
                });
                itemsHtml += `</ul>`;
                contentArea.innerHTML = itemsHtml;

                contentArea.querySelector('.back-to-categories-btn').addEventListener('click', () => {
                    currentAccommodationViewInStep3 = 'categories';
                    renderStep3DynamicContent();
                });
                setupRoomCounters(contentArea);
            }
        }
        
        function showStep(e){steps.forEach((t,a)=>{t.style.display=a===e-1?"block":"none",a<e-1?stepIndicators[a]?.classList.add("visited"):stepIndicators[a]?.classList.remove("visited")}),stepIndicators.forEach((t,a)=>{const n=formContainer.querySelector(`.step-indicator.step-${e}`);stepIndicators.forEach(e=>e.classList.remove("active")),n&&n.classList.add("active")}),1===e&&createCustomCalendar(),2===e&&updateStep2(),3===e&&renderStep3DynamicContent(),6===e&&updateReviewInfo()}
        function updateStep2(){if(2!==currentStep)return;const e=formContainer.querySelector("#selectedDateRange"),t=Array.from(formContainer.querySelectorAll(".duration-btn")),a=formContainer.querySelector("#fromDay"),n=formContainer.querySelector("#tillDay"),l=formContainer.querySelector("#maxRangeNote"),d=formContainer.querySelector("#ButtonSelection"),h=formContainer.querySelector("#rangeDuration"),v=formContainer.querySelector("#quickDurationButtonsContainer"),r=formContainer.querySelector("#rangeDurationInputContainer");if(!selectedStartDate||!selectedEndDate)return e.textContent="Please select travel dates first.",v&&(v.style.opacity="0.5"),r&&(r.style.opacity="0.5"),t.forEach(e=>{e.disabled=!0,e.classList.add("disabled")}),a.disabled=!0,void(n.disabled=!0);const o=Math.max(1,Math.ceil((selectedEndDate.getTime()-selectedStartDate.getTime())/864e5)+1),i=selectedStartDate.toLocaleDateString(trace.payload.locale||"en-US",{month:"short",day:"numeric",year:"numeric"}),c=selectedEndDate.toLocaleDateString(trace.payload.locale||"en-US",{month:"short",day:"numeric",year:"numeric"});e.textContent=`${i} - ${c}`,a.max=o,n.max=o,a.min=2,n.min=2,(h.checked||!d.checked&&!h.checked)&&(isNaN(parseInt(a.value))||parseInt(a.value)<2?a.value=2:parseInt(a.value)>o&&(a.value=o),parseInt(a.value)<2&&(o>=2?a.value=2:a.value=o),isNaN(parseInt(n.value))||parseInt(n.value)<2?n.value=2:parseInt(n.value)>o&&(n.value=o),parseInt(n.value)<2&&(o>=2?n.value=2:n.value=o)),l.textContent=T.maxDaysAllowedText?T.maxDaysAllowedText.replace("{totalDays}",o):`${T.youCanChoose||"Sie können maximal"} ${o} ${T.days||"Tage"}`;const s=()=>{const e=d.checked;v&&(v.style.opacity=e?"1":"0.5"),r&&(r.style.opacity=e?"0.5":"1"),t.forEach(t=>{let a=!1;"exact"!==t.dataset.days&&(a=parseInt(t.dataset.days)>o),t.disabled=!e||a,t.classList.toggle("disabled",!e||a),e||t.classList.remove("activeBtn")}),a.disabled=e,n.disabled=e};d.addEventListener("change",s),h.addEventListener("change",s),t.forEach(e=>{e.addEventListener("click",function(){d.checked?e.disabled||(t.forEach(e=>e.classList.remove("activeBtn")),e.classList.add("activeBtn")):(d.checked=!0,d.dispatchEvent(new Event("change",{bubbles:!0})))})});const u=()=>{h.checked||(h.checked=!0,h.dispatchEvent(new Event("change",{bubbles:!0})))};a.addEventListener("focus",u),n.addEventListener("focus",u),a.addEventListener("input",u),n.addEventListener("input",u),s()}
        function validateStep() {
             if (!steps[currentStep - 1]) return true;
             const currentInputs = steps[currentStep - 1].querySelectorAll("input[required], textarea[required]");
             for (let input of currentInputs) {
                 if (!input.checkValidity()) {
                     alert(`${T.firstName} ${input.labels?.[0]?.textContent || input.name}`);
                     input.focus();
                     return false;
                 }
             }
             if (currentStep === 1 && (!selectedStartDate || !selectedEndDate)) {
                 alert(T.noDatesSelected);
                 return false;
             }
             if (currentStep === 3) {
                 if (currentAccommodationViewInStep3 === 'categories') {
                     alert(T.titlePickAccommodation);
                     return false;
                 }
                 const selectedAccommodations = formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked');
                 if (selectedAccommodations.length === 0) {
                     alert(T.titlePickAccommodation);
                     return false;
                 }
             }
             if (currentStep === 2) {
                 const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
                 const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
                 if (singleDurationRadio.checked) {
                     const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");
                     if (!activeDurationBtn) {
                         alert(T.selectDuration);
                         return false;
                     }
                 } else if (rangeDurationRadio.checked) {
                     const fromDayInputEl = formContainer.querySelector("#fromDay");
                     const tillDayInputEl = formContainer.querySelector("#tillDay");
                     const fromDayVal = parseInt(fromDayInputEl.value);
                     const tillDayVal = parseInt(tillDayInputEl.value);
                     const minDayVal = parseInt(fromDayInputEl.min);
                     const totalDaysForRange = parseInt(fromDayInputEl.max);
                     let errorMessage = "";
                     if (isNaN(fromDayVal) || fromDayVal < minDayVal || fromDayVal > totalDaysForRange) {
                         errorMessage = `${T.from} ${T.day} value is invalid. It must be between ${minDayVal} and ${totalDaysForRange}.`;
                     } else if (isNaN(tillDayVal) || tillDayVal < parseInt(tillDayInputEl.min) || tillDayVal > totalDaysForRange) {
                         errorMessage = `${T.until} ${T.day} value is invalid. It must be between ${parseInt(tillDayInputEl.min)} and ${totalDaysForRange}.`;
                     } else if (fromDayVal >= tillDayVal) {
                         errorMessage = `${T.from} ${T.day} must be less than ${T.until} ${T.day}.`;
                     }
                     if (errorMessage) {
                         alert(errorMessage);
                         return false;
                     }
                 }
             }
             return true;
         }
        function updateReviewInfo(){if(!reviewInfo)return;const e=[];formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked').forEach(t=>{const a=t.closest("li");if(!a)return;const n=a.querySelector(`label[for="${t.id}"]`),l=a.querySelector(".room-quantity");if(n&&l){const t=n.querySelector("b")?.textContent.trim()||"Unknown Room",a=l.value||"1";e.push(`${a}x ${t}`)}});let t="Not selected";selectedStartDate&&selectedEndDate&&(t=`${selectedStartDate.toLocaleDateString(trace.payload.locale||"en-US",{month:"short",day:"numeric",year:"numeric"})} to ${selectedEndDate.toLocaleDateString(trace.payload.locale||"en-US",{month:"short",day:"numeric",year:"numeric"})}`);const a=formContainer.querySelector("#fromDay")?.value,n=formContainer.querySelector("#tillDay")?.value,l=formContainer.querySelector("#ButtonSelection"),d=formContainer.querySelector("#rangeDuration"),h=formContainer.querySelector(".duration-btn.activeBtn");let v="Not specified";if(d?.checked)v=`${T.from||"From"} ${T.day||"day"} ${a||"N/A"} ${T.until||"to"} ${T.day||"day"} ${n||"N/A"}`;else if(h)v=h.textContent;else if(l?.checked){const e=Array.from(formContainer.querySelectorAll(".duration-btn")).find(e=>"exact"===e.dataset.days);v=e?e.textContent:"As specified"}const r=formContainer.querySelector("#First")?.value||"",o=formContainer.querySelector("#LastName")?.value||"",i=formContainer.querySelector("#Email")?.value||"",c=formContainer.querySelector("#Phone")?.value||"";reviewInfo.innerHTML=`\n            <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">\n                <div><h2 style="margin: 0!important;">${T.reviewStayDates}</h2></div>\n                <div><p>${T.reviewTravelDates}<br/> <span style="color: gray;">${t}</span></p></div>\n                <div><p>${T.reviewDurationOFStay}<br/> <span style="color: gray;">${v}</span></p></div>\n            </div>\n            <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">\n                <div><h2 style="margin: 0!important;">${T.reviewAccommodation}</h2></div>\n                <div><p>${T.reviewTypes}<br/> <span style="color: gray;">${e.length>0?e.join("<br/>"):"None selected"}</span></p></div>\n            </div>\n            <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">\n                <div><h2 style="margin: 0!important;">${T.reviewTravelers}</h2></div>\n                <div><p>${T.reviewAdults}<br/> <span style="color: gray;">${formContainer.querySelector("#adults")?.value||""}</span></p></div>\n                <div><p>${T.children}<br/> <span style="color: gray;">${formContainer.querySelector("#children")?.value||""}</span></p></div>\n                <div><p>${T.reviewSpecialRequests}<br/> <span style="color: gray;">${formContainer.querySelector("#special-requests")?.value||"None"}</span></p></div>\n            </div>\n            <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">\n                <div><h2 style="margin: 0!important;">${T.titleContactInformation}</h2></div>\n                <div><p>${T.firstAndLastname}<br/> <span style="color: gray;">${r} ${o}</span></p></div>\n                <div><p>${T.emailVF}<br/> <span style="color: gray;">${i}</span></p></div>\n                <div><p>${T.phoneNumber}<br/> <span style="color: gray;">${c}</span></p></div>\n            </div>\n        `}
        function createChatBox(){const e=document.createElement("div");e.classList.add("chat-box"),e.innerHTML=`\n            <style>\n                .vfrc-message--extension-Forms{ width: 100%; background: #fff; }\n                .chat-box h3, .chat-box p { font-family: "UCity Pro", sans-serif; }\n            </style>\n            <div style="position: relative; display: flex; justify-content: center; align-items: center; height: 500px; width: 100%; flex-direction: column;">\n                <div style="position: relative; color: black; text-align: center;">\n                    <div style="display: flex; justify-content: center; height: 50px;">\n                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 40px; width: 38px; fill: black;"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>\n                    </div>\n                    <h3>${T.thankSubmission}</h3>\n                    <p>${T.formSubmitted}<br/>${T.formTeam}</p>\n                </div>\n            </div>`,formContainer.replaceWith(e)}

        formContainer.addEventListener("click",function(e){if(e.target.classList.contains("next")){if(!validateStep())return;5===currentStep?(updateReviewInfo(),currentStep++,showStep(currentStep)):(currentStep++,showStep(currentStep))}else e.target.classList.contains("prev")&&(currentStep--,showStep(currentStep))});
        formContainer.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!validateStep()) return;
            const accommodationList = [];
            formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked').forEach(checkbox => {
                const listItem = checkbox.closest('li');
                const roomName = checkbox.dataset.name || 'Unknown Room';
                const quantityInput = listItem.querySelector('.room-quantity');
                accommodationList.push({
                    id: checkbox.id.replace('acc-myCheckbox-', ''),
                    type: roomName,
                    category: checkbox.dataset.type,
                    quantity: quantityInput ? parseInt(quantityInput.value) || 1 : 1
                });
            });
            let durationData = {};
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");
            if (singleDurationRadio?.checked && activeDurationBtn?.dataset.days) {
                durationData = { type: 'single', selectedOption: activeDurationBtn.textContent.trim(), days: activeDurationBtn.dataset.days };
            } else if (rangeDurationRadio?.checked) {
                durationData = { type: 'range', fromDay: formContainer.querySelector("#fromDay")?.value || '', tillDay: formContainer.querySelector("#tillDay")?.value || '' };
            }
            const formData = {
                dates: {
                    start: selectedStartDate ? `${selectedStartDate.getFullYear()}-${String(selectedStartDate.getMonth() + 1).padStart(2, '0')}-${String(selectedStartDate.getDate()).padStart(2, '0')}` : '',
                    end: selectedEndDate ? `${selectedEndDate.getFullYear()}-${String(selectedEndDate.getMonth() + 1).padStart(2, '0')}-${String(selectedEndDate.getDate()).padStart(2, '0')}` : ''
                },
                duration: durationData,
                accommodation: accommodationList,
                travelers: {
                    adults: formContainer.querySelector("#adults")?.value || '',
                    children: formContainer.querySelector("#children")?.value || ''
                },
                specialRequests: formContainer.querySelector("#special-requests")?.value || '',
                contact: {
                    firstName: formContainer.querySelector("#First")?.value || '',
                    lastName: formContainer.querySelector("#LastName")?.value || '',
                    email: formContainer.querySelector("#Email")?.value || '',
                    phone: formContainer.querySelector("#Phone")?.value || ''
                }
            };
            if (window.voiceflow && window.voiceflow.chat) {
                window.voiceflow.chat.interact({
                    type: 'complete',
                    payload: formData,
                });
            } else {
                console.warn("Voiceflow chat SDK not available for 'complete' interaction.");
            }
            createChatBox();
        });

        showStep(currentStep);
        element.appendChild(formContainer);
    },
};
