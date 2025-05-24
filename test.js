export const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }) =>
        trace?.type === 'Book_Form' || (trace.payload && trace.payload?.name === 'Book_Form'),
    render: ({ trace, element }) => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const formContainer = document.createElement('form');
        formContainer.classList.add('form-container');
        let currentStep = 1;
        let selectedStartDate = null;
        let selectedEndDate = null;
        const { titleChooseYourStay, undertitleChooseYourStay, noDatesSelected, selected, undertitleChooseYourStay2, selectDuration, exactlyAsSpecified, threeDays, fourDays, fiveDays, sixDays, sevenDays, eightDays, nineDays, tenDays, enterExactDates, from, until, youCanChoose, days, titlePickAccommodation, undertitlePickAccommodation, accommodationSize1, accommodationPeople1, accommodationSize2, accommodationPeople2, accommodationSize3, accommodationPeople3, accommodationSize4, accommodationPeople4, titleWhoTraveling, undertitleWhoTraveling, adults14Plus, children, specialRequests, specialRequestsTxt, titleContactInformation, undertitleContactInformationBooking, firstName, lastName, emailVF, phoneNumber, next, back, titleReview, undertitleReviewBooking, reviewStayDates, reviewTravelDates, reviewDurationOFStay, reviewAccommodation, reviewTypes, reviewTravelers, reviewAdults, reviewSpecialRequests, edit, submit, firstAndLastname, thankSubmission, formSubmitted, formTeam } = trace.payload;

        const suitesCategoryImageUrl = 'https://www.hoteltermemerano.it/img/sales-content/3d92a810-b199-4492-b49b-09f406eafb58/426/426/crop/wisthaler.com%2D24%2D02%2Dhtm%2Dhw96182%2Dweb.JPG';
        const roomsCategoryImageUrl = 'https://i.postimg.cc/RZm5g7sW/rooms-category-placeholder.png';

        const suitesData = [
            { id: 'suite_01', name: 'Grand Suite', imageSrc: 'https://www.hoteltermemerano.it/img/sales-content/3d92a810-b199-4492-b49b-09f406eafb58/426/426/crop/wisthaler.com%2D24%2D02%2Dhtm%2Dhw96182%2Dweb.JPG', description1: 'Dimensione: 120 mq', description2: 'Ideale per: 2-4 persone' },
            { id: 'suite_02', name: 'Executive Suite', imageSrc: 'https://www.hoteltermemerano.it/img/sales-content/c9c5a713-8d8e-4f21-b7d9-110c82164c9f/426/426/crop/3205%2D316460.webp', description1: 'Dimensione: 85 mq', description2: 'Ideale per: 2 persone' },
            { id: 'suite_03', name: 'Junior Suite', imageSrc: 'https://www.hoteltermemerano.it/img/sales-content/8bc77ab5-3167-4783-a8ed-7d42b453bebc/426/426/crop/3205%2D316408.webp', description1: 'Dimensione: 65 mq', description2: 'Ideale per: 1-2 persone' },
        ];
        const roomsData = [
            { id: 'room_01', name: 'Standard Room', imageSrc: 'https://i.postimg.cc/15VVqdtX/Screenshot-2025-01-12-212108.png', description1: accommodationSize1, description2: accommodationPeople1 },
            { id: 'room_02', name: 'Classic Room', imageSrc: 'https://i.postimg.cc/fRx3H0Yh/Screenshot-2025-01-12-212321.png', description1: accommodationSize2, description2: accommodationPeople2 },
            { id: 'room_03', name: 'Comfort Room', imageSrc: 'https://i.postimg.cc/LXsn6CwH/Screenshot-2025-01-12-213453.png', description1: accommodationSize3, description2: accommodationPeople3 },
            { id: 'room_04', name: 'Plus Room', imageSrc: 'https://i.postimg.cc/6q2qC7Bg/Screenshot-2025-01-12-214111.png', description1: accommodationSize4, description2: accommodationPeople4 },
            { id: 'room_05', name: 'Deluxe Garden View', imageSrc: 'https://i.postimg.cc/Kz4B3gfC/room-placeholder-1.png', description1: 'Dimensione: 40 mq', description2: 'Ideale per: 2 persone' },
            { id: 'room_06', name: 'Superior Balcony', imageSrc: 'https://i.postimg.cc/Y0qRzqP7/room-placeholder-2.png', description1: 'Dimensione: 35 mq', description2: 'Ideale per: 2 persone' },
            { id: 'room_07', name: 'Single Economy', imageSrc: 'https://i.postimg.cc/sggGjC5k/room-placeholder-3.png', description1: 'Dimensione: 20 mq', description2: 'Ideale per: 1 persona' },
        ];
        let currentAccommodationViewInStep3 = 'categories';

        formContainer.innerHTML = `
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap');
            .form-container { font-family: "Host Grotesk", serif; width: 100%; background: #fff; padding: 20px; border-radius: 5px; }
            .steps { display: flex; justify-content: space-between; padding: 10px 0; background: #fff; font-family: "Host Grotesk", serif; position: relative; width: 100%; }
            .step-indicator { flex: 1; text-align: center; padding: 10px; font-weight: bold; color: #8b8686; background: #fff; border-radius: 5px; font-family: "Host Grotesk", serif; }
            .step-indicator.active span { background: black !important; color: white; }
            ._1ddzqsn7 { width: 100% !important; }
            .active{ color: black!important; }
            .active span { background: black; color: white; }
            input, textarea { width: 100%; padding: 10px; margin: 10px 0; border-radius: 10px; border: 1px solid #ccc; outline: none; font-family: "Host Grotesk", serif; box-sizing: border-box; }
            input:hover, textarea:hover{ border: 1px solid black; }
            h2, label, input, textarea, button { font-family: "Host Grotesk", serif; }

            .step-1 .bord2{ position: absolute; border: 2px solid #e1dada; width: 100%; left: 0; top: 80px; }
            .step-1.active .bord, .step-2.active .bord{ position: absolute; border: 2px solid black; width: 20%; left: 0; top: 80px; }
            .step-3.active .bord{ position: absolute; border: 2px solid black; width: 40%; left: 0; top: 80px; }
            .step-4.active .bord{ position: absolute; border: 2px solid black; width: 60%; left: 0; top: 80px; }
            .step-5.active .bord{ position: absolute; border: 2px solid black; width: 80%; left: 0; top: 80px; }
            .step-6.active .bord{ position: absolute; border: 2px solid black; width: 100%; left: 0; top: 80px; }
            .visited span{ background: black!important; color: white; }

            .next, .prev, .back-to-categories-btn { background: transparent; border: 1px solid gray; width: 150px; color: black; padding: 10px 25px; border-radius: 20px; cursor: pointer; font-family: "Host Grotesk", serif; }
            .next:hover, .prev:hover, .back-to-categories-btn:hover { background: #000; color: white; }
            .vfrc-message--extension-Forms{ background: white!important; }
            .step-content{ margin-top: 28px; }
            .activeBtn{ color: #fff; background: #000!important; border: 1px solid #000!important; }
            
            /* Styling for Duration Buttons (Request 2) */
            .duration-btn {
                border-radius: 8px; /* Consistent with BtnSimp and image */
                background: #fff;
                border: 1px solid gray; /* Matching Next/Back buttons */
                color: #333;
                /* padding is inherited from .BtnSimp (10px 25px) */
            }
            .duration-btn:hover:not(.disabled) { /* Hover for enabled buttons */
                color: #fff;
                background: #000 !important;
                border-color: #000 !important;
            }
            .duration-btn.activeBtn { /* Already styled for active state */
                color: #fff;
                background: #000 !important;
                border: 1px solid #000 !important;
            }
            .duration-btn.disabled { /* Existing disabled style */
                opacity: 0.5;
                cursor: not-allowed;
                background: #f5f5f5 !important;
                border-color: #ddd !important; 
                color: #999 !important;
                outline: none;
            }

            .BtnSimp{ border-radius: 8px; padding: 10px 25px; cursor: pointer; }

            ul#accommodationListContainer { display: flex; flex-wrap: wrap; margin-top: 0; list-style-type: none; padding-left: 0px !important; gap: 8px; justify-content: flex-start; }
            ul#accommodationListContainer li { display: inline-block; margin: 0; flex-basis: calc(50% - 4px); }
            @media (max-width: 768px) { ul#accommodationListContainer li { flex-basis: calc(100% - 4px); } }
            input[type="checkbox"][id^="acc-myCheckbox"] { display: none; }
            ul#accommodationListContainer label { display: block; position: relative; cursor: pointer; text-align: center; border-radius: 14px; transition: background-color 0.3s ease; padding: 10px; background-color: transparent; border: 1px solid transparent; height: 100%; box-sizing: border-box; }
            ul#accommodationListContainer label:hover { background-color: rgba(0, 0, 0, 0.05); border-color: #ccc; }
            input[type="checkbox"][id^="acc-myCheckbox"]:checked + label { background-color: rgba(0, 0, 0, 0.08); border-color: #000; }
            ul#accommodationListContainer label img { height: 150px; width: 100%; max-width: 170px; border-radius: 11px; display: block; margin-left: auto; margin-right: auto; transition: transform 0.3s ease; object-fit: cover; }
            ul#accommodationListContainer label:hover img { transform: scale(1.03); }
            input[type="checkbox"][id^="acc-myCheckbox"]:checked + label img { transform: none !important; }
            ul#accommodationListContainer label p { font-size: 11px; margin-top: 8px; text-align: left; }
            .room-counter { margin-top: 8px; display: none; justify-content: center; align-items: center; gap: 6px; }
            input[type="checkbox"][id^="acc-myCheckbox"]:checked ~ .room-counter { display: flex; }
            .counter-btn { width: 25px; height: 25px; border-radius: 50%; background: #f5f5f5; border: 1px solid #ddd; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; }
            input[type="checkbox"][id^="acc-myCheckbox"]:checked ~ .room-counter .counter-btn { display: flex !important; }
            .counter-btn:hover { background: #e0e0e0; }
            .room-quantity { border: 1px solid #ddd; border-radius: 5px; padding: 5px; text-align: center; width: 60px; background-color: white; /* Ensure it's not transparent */ color: black; }
            .fieldinput{ margin-top: 0!important; }

            .custom-calendar { width: 100%; margin-top: 20px; font-family: "Host Grotesk", serif; }
            .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
            .calendar-title { font-weight: 600; font-size: 16px; }
            .calendar-nav { display: flex; gap: 10px; }
            .calendar-nav button { background: none; border: none; cursor: pointer; font-size: 16px; padding: 5px 10px; border-radius: 5px; }
            .calendar-nav button:hover { background: #f5f5f5; }
            .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0px; }
            .calendar-day-header { text-align: center; font-weight: 500; font-size: 12px; color: #666; padding: 5px 0; }
            .calendar-day { text-align: center; padding: 10px 5px; border-radius: 5px; cursor: pointer; font-size: 14px; }
            .calendar-day:hover { background: #f5f5f5; }
            .calendar-day.empty { visibility: hidden; }
            .calendar-day.today { font-weight: bold; }
            .calendar-day.selected-start, .calendar-day.selected-end { background: black; color: white; }
            .calendar-day.in-range { background: #e0e0e0; border-radius: 0px; }
            .calendar-day.disabled { color: #ccc; cursor: not-allowed; }
            .date-range-display { margin-top: 15px; padding: 10px; background: #f5f5f7; border-radius: 5px; font-size: 14px; }
            .date-range-display span { color: #666; }
            
            .input-wrapper { position: relative; }
            .input-wrapper input[type="number"] { border: 1px solid gray; border-radius: 6px; position: relative; width: 100px!important; margin: 10px; line-height: normal; height: 34px; text-align: right; padding: 5px; box-sizing: border-box; }
            .input-wrapper label { position: absolute; top: -0.8ex; z-index: 1; left: 1em; background-color: white; padding: 0 5px; font-size: 12px; color: #333 }
            b{ font-size: 13px!important; }

            #accommodation-categories { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; margin-bottom: 20px; }
            .category-selector { cursor: pointer; text-align: center; border: 1px solid #e0e0e0; padding: 15px; border-radius: 12px; width: calc(50% - 30px); background-color: #fff; transition: box-shadow 0.3s ease, border-color 0.3s ease; box-sizing: border-box; }
            .category-selector:hover { border-color: #000; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .category-selector img { width: 100%; height: 180px; border-radius: 8px; object-fit: cover; margin-bottom: 10px; }
            .category-selector h3 { margin-top: 10px; margin-bottom: 5px; font-size: 18px; font-weight: 600; color: #333; }
            @media (max-width: 600px) { .category-selector { width: 100%; } }
            .back-to-categories-btn-container { margin-bottom: 20px; text-align: left; }

            /* Styling for mutually exclusive duration sections (Request 1) */
            .duration-method-section-disabled {
                opacity: 0.5;
                pointer-events: none; /* Disables interaction with children */
            }
            .duration-method-section-disabled label, /* Ensure labels also look disabled */
            .duration-method-section-disabled p {
                 color: #999 !important; /* Example: lighter text color */
            }
            .duration-method-section-enabled {
                opacity: 1;
                pointer-events: auto;
            }
            /* Ensure radio button labels are clear */
            label[for="ButtonSelection"], label[for="rangeDuration"] {
                cursor: pointer;
            }
            label[for="ButtonSelection"] p, label[for="rangeDuration"] p {
                 display: inline !important; /* Ensure text next to radio is on same line and clickable */
                 margin-left: 5px;
                 font-weight: 500;
            }
            input[type="radio"][name="durationType"] {
                width: auto !important;
                margin-right: 5px;
                vertical-align: middle;
            }
            /* Container for quick duration buttons */
            #quickDurationButtonsContainer { margin-top: 10px; }
             /* Container for Von/Bis inputs */
            #rangeDurationInputsContainer { margin-top: 10px; }


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
                    <h2 style="margin: 0!important;">${titleChooseYourStay}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleChooseYourStay}</p><br/>
                    <div id="firstSte">
                        <div class="custom-calendar" id="customCalendar"></div>
                        <div class="date-range-display" id="dateRangeDisplay">
                            <span>${noDatesSelected}</span>
                        </div>
                    </div>
                    <div id="secondSte" style="display: none;">
                        ${undertitleChooseYourStay2}
                    </div>
                    <div style="display: flex; justify-content: right; gap: 30px; margin-top: 17px;">
                        <button type="button" class="next">${next}</button>
                    </div>
                </div>
                <div class="step step-2" style="display: none;">
                    <h2 style="margin: 0!important;">${titleChooseYourStay}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleChooseYourStay2}</p><br/>
                    <div id="selectedDateRange" style="margin-bottom: 20px; font-weight: 900; color: #000; font-size: 19px;"></div>
                    
                    <div id="durationMethod1"> <input type="radio" id="ButtonSelection" name="durationType" checked value="single">
                        <label for="ButtonSelection"><p>${selectDuration}</p></label>
                        <div id="quickDurationButtonsContainer" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top:10px;">
                            <button type="button" class="duration-btn BtnSimp" data-days="exact">${exactlyAsSpecified}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="3">${threeDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="4">${fourDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="5">${fiveDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="6">${sixDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="7">${sevenDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="8">${eightDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="9">${nineDays}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="10">${tenDays}</button>
                        </div>
                    </div>
                    
                    <div id="durationMethod2" style="margin-top: 20px;"> <input type="radio" id="rangeDuration" name="durationType" value="range">
                        <label for="rangeDuration"><p>${enterExactDates}</p></label>
                        <div id="rangeDurationInputsContainer" style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center; margin-top:10px;">
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <div class="input-wrapper">
                                    <label for="fromDay">${from}</label>
                                    <input type="number" id="fromDay" name="fromDay" min="1" value="2">
                                </div>
                                <div class="input-wrapper">
                                    <label for="tillDay">${until}</label>
                                    <input type="number" id="tillDay" name="tillDay" min="1" value="1">
                                </div>
                                <span id="maxRangeNote" style="margin-left: 10px; color: #666; font-size: 12px;"></span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back}</button>
                        <button type="button" class="next">${next}</button>
                    </div>
                </div>
                <div class="step step-3" style="display: none;">
                    <style> .vfrc-message--extension-Forms{width: 100%!important;}</style>
                    <h2 style="margin: 0!important;">${titlePickAccommodation}</h2>
                    <p style="margin: 7px 0px!important;">${undertitlePickAccommodation}</p><br/>
                    <div id="step3-dynamic-content"></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back}</button>
                        <button type="button" class="next">${next}</button>
                    </div>
                </div>
                <div class="step step-4" style="display: none;">
                    <h2 style="margin: 0!important;">${titleWhoTraveling}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleWhoTraveling}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between;">
                        <div style="width: 45%;"><label for="adults" style="text-align: left!important;">${adults14Plus}*</label><input type="number" id="adults" name="adults" min="1" value="1" required/></div>
                        <div style="width: 45%;"><label for="children" style="text-align: left!important;">${children}</label><input type="number" id="children" name="children" min="0" value="0"/></div>
                    </div>
                    <div><label for="special-requests" style="text-align: left!important;">${specialRequests}</label><textarea id="special-requests" name="special-requests" rows="4" placeholder="${specialRequestsTxt}"></textarea></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;"><button type="button" class="prev">${back}</button><button type="button" class="next">${next}</button></div>
                </div>
                <div class="step step-5" style="display: none;">
                    <h2 style="margin: 0!important;">${titleContactInformation}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleContactInformationBooking}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between;">
                        <div style="width: 45%;"><label for="First" style="text-align: left!important;">${firstName}*</label><input type="text" id="First" name="First" class="FirstName fieldinput" required/></div>
                        <div style="width: 45%;"><label for="LastName" style="text-align: left!important;">${lastName}*</label><input type="text" id="LastName" name="LastName" class="LastName fieldinput" required/></div>
                    </div>
                    <div><label for="Email" style="text-align: left!important;">${emailVF}*</label><input type="email" id="Email" name="Email" class="Email fieldinput" required/></div>
                    <div><label for="Phone" style="text-align: left!important;">${phoneNumber}</label><input type="text" id="Phone" name="Phone" class="Phone fieldinput"/></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;"><button type="button" class="prev">${back}</button><button type="button" class="next">${next}</button></div>
                </div>
                <div class="step step-6" style="display: none;">
                    <h2 style="margin: 0!important;">${titleReview}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleReviewBooking}</p><br/>
                    <div id="review-info"></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;"><button type="button" class="prev">${edit}</button><button type="submit" class="next">${submit}</button></div>
                </div>
            </div>
        `;

        const steps = formContainer.querySelectorAll(".step");
        const stepIndicators = formContainer.querySelectorAll(".step-indicator");
        const reviewInfo = formContainer.querySelector("#review-info");

        function createCustomCalendar() {
            const calendarContainer = formContainer.querySelector("#customCalendar");
            const dateRangeDisplay = formContainer.querySelector("#dateRangeDisplay");
            if (!calendarContainer) return;
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();

            function renderCalendar(month, year) {
                calendarContainer.innerHTML = '';
                const header = document.createElement('div'); header.className = 'calendar-header';
                const Rtitle = document.createElement('div'); Rtitle.className = 'calendar-title'; // Renamed to avoid conflict
                Rtitle.textContent = new Date(year, month).toLocaleDateString(trace.payload.locale || 'en-US', { month: 'long', year: 'numeric' });
                const nav = document.createElement('div'); nav.className = 'calendar-nav';
                const prevBtn = document.createElement('button'); prevBtn.innerHTML = '&lt;';
                prevBtn.addEventListener('click', () => { if (month === 0) { month = 11; year--; } else { month--; } renderCalendar(month, year); });
                const nextBtn = document.createElement('button'); nextBtn.innerHTML = '&gt;';
                nextBtn.addEventListener('click', () => { if (month === 11) { month = 0; year++; } else { month++; } renderCalendar(month, year); });
                nav.appendChild(prevBtn); nav.appendChild(nextBtn);
                header.appendChild(Rtitle); header.appendChild(nav);
                calendarContainer.appendChild(header);
                const dayNames = ((trace.payload.locale && trace.payload.locale.startsWith('de')) ? 
                    ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'] : 
                    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
                const grid = document.createElement('div'); grid.className = 'calendar-grid';
                dayNames.forEach(day => { const dayHeader = document.createElement('div'); dayHeader.className = 'calendar-day-header'; dayHeader.textContent = day; grid.appendChild(dayHeader); });
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                for (let i = 0; i < firstDay; i++) { const emptyDay = document.createElement('div'); emptyDay.className = 'calendar-day empty'; grid.appendChild(emptyDay); }
                const today = new Date(); today.setHours(0,0,0,0);
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div'); dayElement.className = 'calendar-day'; dayElement.textContent = day;
                    const date = new Date(year, month, day); date.setHours(0,0,0,0);
                    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) { dayElement.classList.add('today'); }
                    if (date < today) { dayElement.classList.add('disabled'); } else { dayElement.addEventListener('click', () => selectDate(new Date(year, month, day))); }
                    if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) { dayElement.classList.add('selected-start'); }
                    else if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) { dayElement.classList.add('selected-end'); }
                    else if (selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate) { dayElement.classList.add('in-range'); }
                    grid.appendChild(dayElement);
                }
                calendarContainer.appendChild(grid);
            }
            function selectDate(date) {
                const today = new Date(); today.setHours(0, 0, 0, 0);
                if (date < today && !(date.getTime() === today.getTime())) return; // Allow selecting today
                currentMonth = date.getMonth(); currentYear = date.getFullYear();
                if (!selectedStartDate || (selectedStartDate && selectedEndDate) || date < selectedStartDate) { selectedStartDate = date; selectedEndDate = null; }
                else { selectedEndDate = date; }
                updateDateRangeDisplay(); renderCalendar(currentMonth, currentYear);
            }
            function updateDateRangeDisplay() {
                if (!selectedStartDate) { dateRangeDisplay.innerHTML = `<span>${noDatesSelected}</span>`; return; }
                const startDateStr = selectedStartDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                if (!selectedEndDate) { dateRangeDisplay.innerHTML = `<span>${selected}: ${startDateStr}</span>`; }
                else { const endDateStr = selectedEndDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }); dateRangeDisplay.innerHTML = `<span>${selected}: ${startDateStr} - ${endDateStr}</span>`; }
            }
            renderCalendar(currentMonth, currentYear); updateDateRangeDisplay();
        }

        function setupRoomCounters(containerElement) {
            const checkboxes = containerElement.querySelectorAll('input[type="checkbox"][id^="acc-myCheckbox"]');
            checkboxes.forEach(checkbox => {
                const counter = checkbox.closest('li').querySelector('.room-counter');
                const incrementBtn = counter.querySelector('.increment');
                const decrementBtn = counter.querySelector('.decrement');
                const quantityInput = counter.querySelector('.room-quantity');
                checkbox.addEventListener('change', function () { counter.style.display = this.checked ? 'flex' : 'none'; });
                counter.style.display = checkbox.checked ? 'flex' : 'none';
                incrementBtn.addEventListener('click', function () { quantityInput.value = parseInt(quantityInput.value) + 1; });
                decrementBtn.addEventListener('click', function () { if (parseInt(quantityInput.value) > 1) { quantityInput.value = parseInt(quantityInput.value) - 1; } });
            });
        }

        function renderStep3DynamicContent() {
            const contentArea = formContainer.querySelector("#step3-dynamic-content");
            if (!contentArea) return;
            contentArea.innerHTML = '';
            if (currentAccommodationViewInStep3 === 'categories') {
                contentArea.innerHTML = `<div id="accommodation-categories"><div class="category-selector" data-category="suites"><img src="${suitesCategoryImageUrl}" alt="Suites"><h3>Suites</h3></div><div class="category-selector" data-category="rooms"><img src="${roomsCategoryImageUrl}" alt="Rooms"><h3>Rooms</h3></div></div>`;
                contentArea.querySelectorAll('.category-selector').forEach(sel => { sel.addEventListener('click', function() { currentAccommodationViewInStep3 = this.dataset.category; renderStep3DynamicContent(); }); });
            } else {
                const itemsToRender = currentAccommodationViewInStep3 === 'suites' ? suitesData : roomsData;
                let itemsHtml = `<div class="back-to-categories-btn-container"><button type="button" class="back-to-categories-btn">${back}</button></div><ul id="accommodationListContainer">`;
                itemsToRender.forEach(item => {
                    const checkboxId = `acc-myCheckbox-${item.id}`;
                    itemsHtml += `<li><input type="checkbox" id="${checkboxId}" data-name="${item.name}" data-type="${currentAccommodationViewInStep3}"/><label for="${checkboxId}"><img src="${item.imageSrc}" alt="${item.name}" /><br/><p><b>${item.name}</b><br/>${item.description1 || ''} <br/>${item.description2 || ''}</p></label><div class="room-counter"><button class="counter-btn decrement" type="button">-</button><input type="number" class="room-quantity" min="1" value="1" readonly><button class="counter-btn increment" type="button">+</button></div></li>`;
                });
                itemsHtml += `</ul>`; contentArea.innerHTML = itemsHtml;
                contentArea.querySelector('.back-to-categories-btn').addEventListener('click', () => { currentAccommodationViewInStep3 = 'categories'; renderStep3DynamicContent(); });
                setupRoomCounters(contentArea);
            }
        }

        function showStep(step) {
            steps.forEach((el, index) => {
                el.style.display = index === step - 1 ? "block" : "none";
                if (stepIndicators[index]) { // Check if indicator exists
                    if (index < step - 1) { stepIndicators[index].classList.add("visited"); } 
                    else { stepIndicators[index].classList.remove("visited"); }
                }
            });
            stepIndicators.forEach(ind => ind.classList.remove("active"));
            const targetIndicator = formContainer.querySelector(`.step-indicator.step-${step}`);
            if(targetIndicator) targetIndicator.classList.add("active");

            if (step === 1 && !formContainer.querySelector("#customCalendar").innerHTML.trim()) createCustomCalendar();
            if (step === 2) updateStep2();
            if (step === 3) renderStep3DynamicContent();
            if (step === 6) updateReviewInfo();
        }
        
        // MODIFIED updateStep2 for mutually exclusive duration options
        function updateStep2() {
            if (currentStep !== 2) return;
        
            const dateRangeDisplay = formContainer.querySelector("#selectedDateRange");
            const allDurationButtons = formContainer.querySelectorAll(".duration-btn");
            const fromDayInput = formContainer.querySelector("#fromDay");
            const tillDayInput = formContainer.querySelector("#tillDay");
            const maxRangeNote = formContainer.querySelector("#maxRangeNote");
        
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
        
            const quickButtonsContainer = formContainer.querySelector("#quickDurationButtonsContainer");
            const rangeInputsContainer = formContainer.querySelector("#rangeDurationInputsContainer");
            const durationMethod1Div = formContainer.querySelector("#durationMethod1");
            const durationMethod2Div = formContainer.querySelector("#durationMethod2");

        
            if (!selectedStartDate || !selectedEndDate) {
                // Potentially hide or disable this step's content if no valid date range
                // For now, proceed assuming it might become valid
                dateRangeDisplay.textContent = "Please select a valid date range first."; // Placeholder
                //return; // Or disable controls if no valid date range
            } else {
                 const timeDiff = selectedEndDate.getTime() - selectedStartDate.getTime();
                 const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
                 const startStr = selectedStartDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                 const endStr = selectedEndDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                 dateRangeDisplay.textContent = `${startStr} - ${endStr}`;
        
                 maxRangeNote.textContent = `${youCanChoose} ${totalDays} ${days}`;
                 fromDayInput.max = totalDays;
                 tillDayInput.max = totalDays;
                 // Ensure fromDay is at least 1 and tillDay reflects totalDays initially for range
                 if (parseInt(fromDayInput.value) < 1 || parseInt(fromDayInput.value) > totalDays) fromDayInput.value = Math.max(1, Math.min(2,totalDays));
                 if (parseInt(tillDayInput.value) < parseInt(fromDayInput.value) || parseInt(tillDayInput.value) > totalDays) tillDayInput.value = totalDays;


                const exactBtn = Array.from(allDurationButtons).find(b => b.dataset.days === "exact");
                if (exactBtn) {
                    exactBtn.textContent = `${exactlyAsSpecified}`; // This only sets text
                    // exactBtn.dataset.actualDays = totalDays; // Store actual days for "exact"
                }

                allDurationButtons.forEach(btn => { // Only for intrinsic disabling based on totalDays
                    const btnDaysValue = btn.dataset.days;
                    if (btnDaysValue !== "exact") {
                        const daysNum = parseInt(btnDaysValue);
                        const intrinsicallyDisabled = daysNum > totalDays;
                        // This state will be combined with radio selection
                        btn.setAttribute('data-intrinsically-disabled', intrinsicallyDisabled.toString());
                    } else {
                        btn.setAttribute('data-intrinsically-disabled', 'false');
                    }
                });

            }


            const updateDurationElementsState = () => {
                const isSingleMethodSelected = singleDurationRadio.checked;
        
                // Update state of quick duration buttons section
                if (isSingleMethodSelected) {
                    durationMethod1Div.classList.add('duration-method-section-enabled');
                    durationMethod1Div.classList.remove('duration-method-section-disabled');
                    quickButtonsContainer.classList.remove('duration-method-section-disabled');

                    allDurationButtons.forEach(btn => {
                        const intrinsicallyDisabled = btn.getAttribute('data-intrinsically-disabled') === 'true';
                        btn.disabled = intrinsicallyDisabled;
                        btn.classList.toggle("disabled", intrinsicallyDisabled);
                    });
                } else {
                    durationMethod1Div.classList.add('duration-method-section-disabled');
                    durationMethod1Div.classList.remove('duration-method-section-enabled');
                    quickButtonsContainer.classList.add('duration-method-section-disabled');

                    allDurationButtons.forEach(btn => {
                        btn.disabled = true;
                        btn.classList.add("disabled");
                        btn.classList.remove("activeBtn");
                    });
                }
        
                // Update state of "Von" and "Bis" input fields section
                if (!isSingleMethodSelected) { // i.e. rangeDurationRadio is checked
                    durationMethod2Div.classList.add('duration-method-section-enabled');
                    durationMethod2Div.classList.remove('duration-method-section-disabled');
                    rangeInputsContainer.classList.remove('duration-method-section-disabled');

                    fromDayInput.disabled = false;
                    tillDayInput.disabled = false;
                } else {
                    durationMethod2Div.classList.add('duration-method-section-disabled');
                    durationMethod2Div.classList.remove('duration-method-section-enabled');
                    rangeInputsContainer.classList.add('duration-method-section-disabled');

                    fromDayInput.disabled = true;
                    tillDayInput.disabled = true;
                }
            };
        
            // Event listeners for radio buttons
            [singleDurationRadio, rangeDurationRadio].forEach(radio => {
                radio.removeEventListener('change', updateDurationElementsState); // Prevent multiple listeners
                radio.addEventListener('change', updateDurationElementsState);
            });
        
            updateDurationElementsState(); // Initial call
        
            // Handle clicks on individual duration buttons
            allDurationButtons.forEach(btn => {
                // A more robust way to handle event listeners if updateStep2 is called multiple times
                const newBtn = btn.cloneNode(true); // Clone to remove old listeners
                btn.parentNode.replaceChild(newBtn, btn); // Replace old button with clone

                newBtn.addEventListener("click", function () {
                    if (newBtn.disabled) return;
        
                    if (!singleDurationRadio.checked) { // If user clicks a button, switch to single method
                        singleDurationRadio.checked = true;
                        // Manually trigger change for state update, as radio.click() might not fire 'change' consistently
                        const event = new Event('change', { bubbles: true });
                        singleDurationRadio.dispatchEvent(event);
                    } else {
                        // If singleDurationRadio was already checked, ensure UI consistency
                         updateDurationElementsState(); // Re-apply states in case something was missed
                    }
                    
                    // Remove active class from all buttons in this group then add to current
                    formContainer.querySelectorAll(".duration-btn").forEach(b => b.classList.remove("activeBtn")); // Query again for the potentially new buttons
                    newBtn.classList.add("activeBtn");
                });
            });
        }


        function validateStep() {
            if (!steps[currentStep - 1]) return true;
            const currentInputs = steps[currentStep - 1].querySelectorAll("input[required]:not(:disabled), textarea[required]:not(:disabled)"); // Only check enabled required inputs
            for (let input of currentInputs) {
                if (!input.checkValidity()) {
                    alert(`Please fill in the required field: ${input.labels?.[0]?.textContent || input.name}`);
                    input.focus(); return false;
                }
            }
            if (currentStep === 1 && (!selectedStartDate || !selectedEndDate)) { alert("Please select a valid date range."); return false; }
            if (currentStep === 2) { // Validation for duration step
                const singleRadio = formContainer.querySelector("#ButtonSelection");
                const rangeRadio = formContainer.querySelector("#rangeDuration");
                if (singleRadio.checked) {
                    const activeButton = formContainer.querySelector(".duration-btn.activeBtn:not(.disabled)");
                    if (!activeButton) { alert("Please select a duration option."); return false; }
                } else if (rangeRadio.checked) {
                    const fromDay = formContainer.querySelector("#fromDay");
                    const tillDay = formContainer.querySelector("#tillDay");
                    if (!fromDay.checkValidity() || !tillDay.checkValidity() || parseInt(fromDay.value) > parseInt(tillDay.value) ) {
                         alert("Please enter a valid day range for the duration."); return false;
                    }
                     if (parseInt(fromDay.value) < 1 || parseInt(tillDay.value) < 1) {
                        alert("Day values must be positive."); return false;
                    }
                } else { // Should not happen if one is always checked
                    alert("Please choose a duration method."); return false;
                }
            }
            if (currentStep === 3) {
                if (currentAccommodationViewInStep3 === 'categories') { alert("Please select a category (Suites or Rooms) and then choose an accommodation."); return false; }
                const selectedAccommodations = formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked');
                if (selectedAccommodations.length === 0) { alert("Please select at least one accommodation type."); return false; }
            }
            return true;
        }

        function updateReviewInfo() {
            if (!reviewInfo) return;
            const accommodationTypesList = [];
            const checkboxes = formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked');
            checkboxes.forEach(checkbox => {
                const listItem = checkbox.closest('li'); if (!listItem) return;
                const label = listItem.querySelector(`label[for="${checkbox.id}"]`); const quantityInput = listItem.querySelector('.room-quantity');
                if (label && quantityInput) { const typeName = label.querySelector('b')?.textContent.trim() || 'Unknown Room'; const quantity = quantityInput.value || '1'; accommodationTypesList.push(`${quantity}x ${typeName}`); }
            });
            let dateRangeStr = "Not selected";
            if (selectedStartDate && selectedEndDate) { const startStr = selectedStartDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }); const endStr = selectedEndDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }); dateRangeStr = `${startStr} to ${endStr}`; }
            
            const fromDayInputVal = formContainer.querySelector("#fromDay")?.value;
            const tillDayInputVal = formContainer.querySelector("#tillDay")?.value;
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn:not(.disabled)"); // Ensure it's not disabled
            let durationText = "Not specified";
            if (rangeDurationRadio?.checked && !fromDayInput.disabled) { durationText = `From day ${fromDayInputVal || 'N/A'} to day ${tillDayInputVal || 'N/A'}`; }
            else if (singleDurationRadio?.checked && activeDurationBtn) { durationText = activeDurationBtn.textContent; }
            else if (singleDurationRadio?.checked) { // Fallback if single radio is checked but no button somehow
                const exactButton = formContainer.querySelector(".duration-btn[data-days='exact']");
                if (exactButton) durationText = exactButton.textContent;
            }

            const reviewFirstName = formContainer.querySelector("#First")?.value || ''; const reviewLastName = formContainer.querySelector("#LastName")?.value || '';
            const reviewEmail = formContainer.querySelector("#Email")?.value || ''; const reviewPhone = formContainer.querySelector("#Phone")?.value || '';
            reviewInfo.innerHTML = `<div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;"><div><h2 style="margin: 0!important;">${reviewStayDates}</h2></div><div><p>${reviewTravelDates}<br/> <span style="color: gray;">${dateRangeStr}</span></p></div><div><p>${reviewDurationOFStay}<br/> <span style="color: gray;">${durationText}</span></p></div></div><div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;"><div><h2 style="margin: 0!important;">${reviewAccommodation}</h2></div><div><p>${reviewTypes}<br/> <span style="color: gray;">${accommodationTypesList.length > 0 ? accommodationTypesList.join('<br/>') : 'None selected'}</span></p></div></div><div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;"><div><h2 style="margin: 0!important;">${reviewTravelers}</h2></div><div><p>${reviewAdults}<br/> <span style="color: gray;">${formContainer.querySelector("#adults")?.value || ''}</span></p></div><div><p>${children}<br/> <span style="color: gray;">${formContainer.querySelector("#children")?.value || ''}</span></p></div><div><p>${reviewSpecialRequests}<br/> <span style="color: gray;">${formContainer.querySelector("#special-requests")?.value || 'None'}</span></p></div></div><div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;"><div><h2 style="margin: 0!important;">${titleContactInformation}</h2></div><div><p>${firstAndLastname}<br/> <span style="color: gray;">${reviewFirstName} ${reviewLastName}</span></p></div><div><p>${emailVF}<br/> <span style="color: gray;">${reviewEmail}</span></p></div><div><p>${phoneNumber}<br/> <span style="color: gray;">${reviewPhone}</span></p></div></div>`;
        }

        formContainer.addEventListener("click", function (event) {
            if (event.target.classList.contains("next")) { if (!validateStep()) return; if (currentStep === 5) { updateReviewInfo(); } currentStep++; showStep(currentStep); }
            else if (event.target.classList.contains("prev")) { currentStep--; showStep(currentStep); }
        });

        function createChatBox() { /* ... same as before ... */ }

        formContainer.addEventListener('submit', function (event) {
            event.preventDefault(); if (!validateStep()) return;
            const accommodationListResult = [];
            const checkboxes = formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked');
            checkboxes.forEach(checkbox => { const listItem = checkbox.closest('li'); const roomName = checkbox.dataset.name || 'Unknown Room'; const quantityInput = listItem.querySelector('.room-quantity'); accommodationListResult.push({ id: checkbox.id.replace('acc-myCheckbox-', ''), type: roomName, category: checkbox.dataset.type, quantity: quantityInput ? parseInt(quantityInput.value) || 1 : 1 }); });
            let durationDataResult = {};
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection"); const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn:not(.disabled)");
            const fromDayInput = formContainer.querySelector("#fromDay"); const tillDayInput = formContainer.querySelector("#tillDay");
            if (singleDurationRadio?.checked && activeDurationBtn) { durationDataResult = { type: 'single', selectedOption: activeDurationBtn.textContent.trim(), days: activeDurationBtn.dataset.days }; }
            else if (rangeDurationRadio?.checked && !fromDayInput.disabled) { durationDataResult = { type: 'range', fromDay: fromDayInput?.value || '', tillDay: tillDayInput?.value || '' }; }
            else if (singleDurationRadio?.checked) { // Fallback for "exactly as specified" if no other button active
                 const exactBtnSubmit = Array.from(formContainer.querySelectorAll(".duration-btn")).find(b => b.dataset.days === "exact");
                 if (exactBtnSubmit && selectedStartDate && selectedEndDate) {
                    const timeDiff = selectedEndDate.getTime() - selectedStartDate.getTime();
                    const totalDaysInRange = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
                    durationDataResult = { type: 'single', selectedOption: exactBtnSubmit.textContent.trim(), days: totalDaysInRange.toString() };
                 } else {
                    durationDataResult = { type: 'single', selectedOption: 'As specified', days: 'N/A' };
                 }
            }
            const formData = {
                dates: { start: selectedStartDate ? `${selectedStartDate.getFullYear()}-${String(selectedStartDate.getMonth() + 1).padStart(2, '0')}-${String(selectedStartDate.getDate()).padStart(2, '0')}` : '', end: selectedEndDate ? `${selectedEndDate.getFullYear()}-${String(selectedEndDate.getMonth() + 1).padStart(2, '0')}-${String(selectedEndDate.getDate()).padStart(2, '0')}` : '' },
                duration: durationDataResult, accommodation: accommodationListResult,
                travelers: { adults: formContainer.querySelector("#adults")?.value || '', children: formContainer.querySelector("#children")?.value || '' },
                specialRequests: formContainer.querySelector("#special-requests")?.value || '',
                contact: { firstName: formContainer.querySelector("#First")?.value || '', lastName: formContainer.querySelector("#LastName")?.value || '', email: formContainer.querySelector("#Email")?.value || '', phone: formContainer.querySelector("#Phone")?.value || '' }
            };
            if (window.voiceflow && window.voiceflow.chat) { window.voiceflow.chat.interact({ type: 'complete', payload: formData, }); }
            else { console.warn("Voiceflow chat SDK not available."); }
            createChatBox(); // createChatBox needs to be defined or re-pasted if it was removed for brevity
        });
        
        // Definition for createChatBox (assuming it was removed for brevity in previous snippets)
        function createChatBox() {
            const chatBox = document.createElement('div');
            chatBox.classList.add('chat-box'); // Ensure .chat-box styles apply
            chatBox.style.fontFamily = '"Host Grotesk", serif'; // Apply font directly
            chatBox.innerHTML = `
                <style>
                    .vfrc-message--extension-Forms{ width: 100%; background: #fff !important; } /* Ensure background */
                    .submission-chat-box h3, .submission-chat-box p { font-family: "Host Grotesk", serif; margin: 10px 0; }
                </style>
                <div class="submission-chat-box" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height:300px; text-align: center; padding: 20px;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 50px; width: 50px; fill: black; margin-bottom: 20px;">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                    </svg>
                    <h3>${thankSubmission}</h3>
                    <p>${formSubmitted}<br/>${formTeam}</p>
                </div>`;
            formContainer.parentNode.replaceChild(chatBox, formContainer); // Replace form with chatBox
        }


        showStep(currentStep);
        element.appendChild(formContainer);
    },
};
