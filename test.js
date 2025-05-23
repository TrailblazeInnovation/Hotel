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

        // --- Form State Variables ---
        let currentStep = 1;
        let selectedStartDate = null;
        let selectedEndDate = null;

        // --- State for Step 3: Pick Accommodation ---
        let accommodationStepView = 'categories'; // 'categories', or a categoryKey (e.g., 'suites', 'rooms')
        let selectedAccommodationsData = {}; // Stores { itemId: quantity, ... }

        // --- Destructure Payload ---
        const {
            titleChooseYourStay, undertitleChooseYourStay, noDatesSelected, selected, undertitleChooseYourStay2,
            selectDuration, exactlyAsSpecified, threeDays, fourDays, fiveDays, sixDays, sevenDays, eightDays, nineDays, tenDays,
            enterExactDates, from, until, youCanChoose, days,
            titlePickAccommodation, undertitlePickAccommodation,
            titleWhoTraveling, undertitleWhoTraveling, adults14Plus, children, specialRequests, specialRequestsTxt,
            titleContactInformation, undertitleContactInformationBooking, firstName, lastName, emailVF, phoneNumber,
            next, back,
            titleReview, undertitleReviewBooking, reviewStayDates, reviewTravelDates, reviewDurationOFStay,
            reviewAccommodation, reviewTypes, reviewTravelers, reviewAdults, reviewSpecialRequests, edit, submit,
            firstAndLastname, thankSubmission, formSubmitted, formTeam
        } = trace.payload;

        // --- Data for Accommodation Categories (Suites & Rooms) ---
        // IMPORTANT: This mock data should ideally come from trace.payload.accommodationCategories
        const mockAccommodationCategories = [
            {
                type: "Suites",
                categoryKey: "suites",
                image: "https://via.placeholder.com/170x150/FFA07A/000000?Text=Suites", // Replace with actual image URL
                items: [
                    { id: "suite_01", name: "Grand Suite", imageSrc: "https://i.postimg.cc/15VVqdtX/Screenshot-2025-01-12-212108.png", size: "70 mq", people: "Fino a 3 persone" },
                    { id: "suite_02", name: "Luxury Suite", imageSrc: "https://i.postimg.cc/fRx3H0Yh/Screenshot-2025-01-12-212321.png", size: "80 mq", people: "Fino a 4 persone" },
                    { id: "suite_03", name: "Panoramic Suite", imageSrc: "https://i.postimg.cc/LXsn6CwH/Screenshot-2025-01-12-213453.png", size: "90 mq", people: "Fino a 3 persone" }
                ]
            },
            {
                type: "Rooms",
                categoryKey: "rooms",
                image: "https://via.placeholder.com/170x150/ADD8E6/000000?Text=Rooms", // Replace with actual image URL
                items: [
                    { id: "room_01", name: "Standard Room", imageSrc: "https://i.postimg.cc/15VVqdtX/Screenshot-2025-01-12-212108.png", size: "20 mq", people: "Ideale per: 1-2 persone" },
                    { id: "room_02", name: "Classic Room", imageSrc: "https://i.postimg.cc/fRx3H0Yh/Screenshot-2025-01-12-212321.png", size: "25 mq", people: "Ideale per: 1-2 persone" },
                    { id: "room_03", name: "Comfort Room", imageSrc: "https://i.postimg.cc/LXsn6CwH/Screenshot-2025-01-12-213453.png", size: "30 mq", people: "Ideale per: Fino a 3 persone" },
                    { id: "room_04", name: "Plus Room", imageSrc: "https://i.postimg.cc/6q2qC7Bg/Screenshot-2025-01-12-214111.png", size: "35 mq", people: "Ideale per: Fino a 3 persone" },
                    { id: "room_05", name: "Family Room", imageSrc: "https://via.placeholder.com/170x150.png/DCDCDC/000000?text=Family", size: "40 mq", people: "Ideale per: Fino a 4 persone" },
                    { id: "room_06", name: "Economy Room", imageSrc: "https://via.placeholder.com/170x150.png/DCDCDC/000000?text=Economy", size: "18 mq", people: "Ideale per: 1 persona" },
                    { id: "room_07", name: "Superior Room", imageSrc: "https://via.placeholder.com/170x150.png/DCDCDC/000000?text=Superior", size: "32 mq", people: "Ideale per: Fino a 2 persone" }
                ]
            }
        ];
        const accommodationCategories = trace.payload.accommodationCategories || mockAccommodationCategories;

        // --- HTML Structure ---
        formContainer.innerHTML = `
            <style>
                /* --- Base & Original Styles --- */
                @import url('https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap');
                .form-container { font-family: "Host Grotesk", serif; width: 100%; background: #fff; padding: 20px; border-radius: 5px; }
                .steps { display: flex; justify-content: space-between; padding: 10px 0; background: #fff; font-family: "Host Grotesk", serif; position: relative; width: 100%;}
                .step-indicator { flex: 1; text-align: center; padding: 10px; font-weight: bold; color: #8b8686; background: #fff; border-radius: 5px; font-family: "Host Grotesk", serif; }
                .step-indicator.active span:not(.bord):not(.bord2) { background: black !important; color: white; }
                ._1ddzqsn7 { width: 100% !important; }
                .active { color: black!important; }
                input, textarea { width: 100%; padding: 10px; margin: 10px 0; border-radius: 10px; border: 1px solid #ccc; outline: none; font-family: "Host Grotesk", serif; box-sizing: border-box; }
                input:hover, textarea:hover { border: 1px solid black; }
                .chat-box { width: 100%; padding: 20px; background: #fff; border-radius: 5px; margin-top: 20px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); }
                .chat-box h3, .chat-box p { margin: 10px 0 0; font-size: 16px; font-family: "Host Grotesk", serif; }
                h2, label, input, textarea, button { font-family: "Host Grotesk", serif; }
                .step-1 .bord2{ position: absolute; border: 2px solid #e1dada; width: 100%; left: 0; top: 80px;}
                .step-1.active .bord, .step-2.active .bord{position: absolute; border: 2px solid black; width: 20%; left: 0; top: 80px;}
                .step-2.active .bord{ display: block!important; width: 20%;}
                .step-3.active .bord{ position: absolute; border: 2px solid black; width: 40%; left: 0; top: 80px;}
                .step-4.active .bord{ position: absolute; border: 2px solid black; width: 60%; left: 0; top: 80px;}
                .step-5.active .bord{ position: absolute; border: 2px solid black; width: 80%; left: 0; top: 80px;}
                .step-6.active .bord{ position: absolute; border: 2px solid black; width: 100%; left: 0; top: 80px;}
                .visited span:not(.bord):not(.bord2) { background: black!important; color: white; }
                .next, .prev { background: transparent; border: 1px solid gray; width: 150px; color: black; padding: 10px 25px; border-radius: 20px; cursor: pointer; }
                .next:hover, .prev:hover { background: #000; color: white; }
                .vfrc-message--extension-Forms { background: white!important; }
                .step-content { margin-top: 28px; }
                .activeBtn { color: #fff; background: #000!important; border: 1px solid #000!important; }
                .duration-btn:hover { color: #fff; background: #000!important; }
                .BtnSimp { border-radius: 8px; padding: 10px 25px; cursor: pointer; }
                b { font-size: 13px!important; }
                .fieldinput { margin-top: 0!important; }

                /* --- Styles for Accommodation Item Lists (Step 3 Items) --- */
                #step-3-content-area ul { display: flex; flex-wrap: wrap; margin-top: 0; list-style-type: none; padding-left: 10px !important; gap: 8px; }
                #step-3-content-area li { display: inline-block; margin: 0; }
                #step-3-content-area input[type="checkbox"] { display: none; } /* General for checkboxes in this area */
                #step-3-content-area ul label { display: block; position: relative; cursor: pointer; text-align: center; border-radius: 14px; transition: background-color 0.3s ease; padding: 10px; background-color: transparent; }
                #step-3-content-area ul label:hover { background-color: rgba(0, 0, 0, 0.05); }
                #step-3-content-area ul input[type="checkbox"]:checked + label { background-color: rgba(0, 0, 0, 0.08); }
                #step-3-content-area ul label img { height: 150px; width: 170px; border-radius: 11px; display: block; transition: transform 0.3s ease; object-fit: cover; }
                #step-3-content-area ul label:hover img { transform: scale(1.03); }
                #step-3-content-area ul input[type="checkbox"]:checked + label img { transform: none !important; }
                #step-3-content-area ul label p { font-size: 11px; margin-top: 8px; text-align: left; }
                .room-counter { margin-top: 8px; display: none; justify-content: center; align-items: center; gap: 6px; }
                #step-3-content-area input[type="checkbox"]:checked ~ .room-counter { display: flex !important; }
                .counter-btn { width: 25px; height: 25px; border-radius: 50%; background: #f5f5f5; border: 1px solid #ddd; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; }
                .counter-btn:hover { background: #e0e0e0; }
                .room-quantity { border: 1px solid #ddd; border-radius: 5px; padding: 5px; text-align: center; width: 60px !important; margin:0 5px !important;} /* Specific width and margin for quantity input */

                /* --- Calendar Styles (Retained) --- */
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
                .duration-btn { border-radius: 30px; background: #fff; border: 1px solid gray; } /* Added border for consistency */
                .duration-btn.disabled { opacity: 0.5; cursor: not-allowed; background: #f5f5f5 !important; border-color: #ddd !important; color: #999 !important; outline: none;}
                .duration-btn.disabled:hover { background: #f5f5f5 !important; color: #999 !important; }
                .input-wrapper { position: relative; margin-bottom: 10px; /* Added margin for better spacing */}
                .input-wrapper input[type="number"] { border: 1px solid gray; border-radius: 6px; width: 80px!important; padding: 8px; margin:0 !important; line-height: normal; height: auto; text-align: right; } /* Adjusted for duration inputs */
                .input-wrapper label { position: absolute; top: -0.8ex; z-index: 1; left: 1em; background-color: white; padding: 0 5px; font-size:12px; }

                /* --- Styles for New Category Cards (Step 3 Categories) --- */
                .category-card-container { display: flex; flex-wrap: wrap; justify-content: space-around; gap: 15px; padding-left: 10px !important; }
                .category-card { cursor: pointer; text-align: center; border: 1px solid transparent; border-radius: 14px; padding: 10px; flex-basis: 170px; max-width: 250px; background-color: transparent; transition: background-color 0.3s ease; display: flex; flex-direction: column; }
                .category-card:hover { background-color: rgba(0, 0, 0, 0.05); }
                .category-card img { width: 100%; height: 150px; object-fit: cover; border-radius: 11px; display: block; transition: transform 0.3s ease; }
                .category-card:hover img { transform: scale(1.03); }
                .category-card .category-title { text-align: left; margin-top: 8px; font-size: 11px; }
                .category-card .category-title b { font-size: 13px!important; }
            </style>

            <div class="steps">
                <div class="step-indicator step-1"><span class="bord2"></span><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">1</span></div>
                <div class="step-indicator step-2"><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">2</span></div>
                <div class="step-indicator step-3"><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">3</span></div>
                <div class="step-indicator step-4"><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">4</span></div>
                <div class="step-indicator step-5"><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">5</span></div>
                 </div>

            <div class="step-content">
                <div class="step step-1">
                    <h2 style="margin: 0!important;">${titleChooseYourStay || 'Choose Your Stay Dates'}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleChooseYourStay || 'Select your check-in and check-out dates.'}</p><br/>
                    <div class="custom-calendar" id="customCalendar"></div>
                    <div class="date-range-display" id="dateRangeDisplay">
                        <span>${noDatesSelected || 'No dates selected'}</span>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 30px; margin-top: 17px;">
                        <button type="button" class="next">${next || 'Next'}</button>
                    </div>
                </div>

                <div class="step step-2" style="display: none;">
                    <h2 style="margin: 0!important;">${titleChooseYourStay || 'Refine Your Stay Duration'}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleChooseYourStay2 || 'Confirm or adjust the duration of your stay.'}</p><br/>
                    <div id="selectedDateRange" style="margin-bottom: 20px; font-weight: 900; color: #000; font-size: 19px;"></div>
                    <div style="margin-bottom: 20px;">
                        <input type="radio" id="ButtonSelection" name="durationType" checked value="single" style="width: auto!important; margin-right: 5px;">
                        <label for="ButtonSelection" style="font-weight: 500; display: inline;">${selectDuration || 'Select preferred duration'}:</label>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top:10px;">
                            <button type="button" class="duration-btn BtnSimp" data-days="exact">${exactlyAsSpecified || 'Exactly as selected'}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="3">${threeDays || '3 Days'}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="4">${fourDays || '4 Days'}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="5">${fiveDays || '5 Days'}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="6">${sixDays || '6 Days'}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="7">${sevenDays || '7 Days'}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="8">${eightDays || '8 Days'}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="9">${nineDays || '9 Days'}</button>
                            <button type="button" class="duration-btn BtnSimp" data-days="10">${tenDays || '10 Days'}</button>
                        </div>
                    </div>
                    <div style="margin-top: 20px;">
                        <input type="radio" id="rangeDuration" name="durationType" value="range" style="width: auto!important; margin-right: 5px;">
                        <label for="rangeDuration" style="font-weight: 500; display: inline;">${enterExactDates || 'Or enter a specific range of nights'}:</label>
                        <div style="margin-top:10px; display: flex; gap: 15px; align-items: center; flex-wrap:wrap;">
                            <div class="input-wrapper">
                                <label for="fromDay">${from || 'Min. Nights'}</label>
                                <input type="number" id="fromDay" name="fromDay" min="1" value="2">
                            </div>
                            <div class="input-wrapper">
                                <label for="tillDay">${until || 'Max. Nights'}</label>
                                <input type="number" id="tillDay" name="tillDay" min="1" value="3">
                            </div>
                            <span id="maxRangeNote" style="color: #666; font-size: 12px;"></span>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back || 'Back'}</button>
                        <button type="button" class="next">${next || 'Next'}</button>
                    </div>
                </div>

                <div class="step step-3" style="display: none;">
                    <h2 style="margin: 0!important;">${titlePickAccommodation || 'Pick Your Accommodation'}</h2>
                    <p style="margin: 7px 0px!important;" id="accommodation-undertitle">${undertitlePickAccommodation || 'Select one or more accommodation types.'}</p><br/>
                    <div id="step-3-content-area">
                        </div>
                    <div style="margin-top: 20px; display: none; text-align:left;" id="back-to-categories-button-container">
                        <button type="button" class="prev BtnSimp" id="backToCategoriesBtn" style="width: auto; padding: 10px 20px; border-radius: 20px;">Back to Categories</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back || 'Back'}</button>
                        <button type="button" class="next">${next || 'Next'}</button>
                    </div>
                </div>

                <div class="step step-4" style="display: none;">
                    <h2 style="margin: 0!important;">${titleWhoTraveling || 'Who is Traveling?'}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleWhoTraveling || 'Specify the number of adults and children.'}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between; flex-wrap: wrap;">
                        <div style="flex-basis: calc(50% - 15px); min-width:150px;">
                            <label for="adults" style="text-align: left!important; display:block; margin-bottom:5px;">${adults14Plus || 'Adults (14+)'}*</label>
                            <input type="number" id="adults" name="adults" min="1" value="1" required/>
                        </div>
                        <div style="flex-basis: calc(50% - 15px); min-width:150px;">
                            <label for="children" style="text-align: left!important; display:block; margin-bottom:5px;">${children || 'Children (0-13)'}</label>
                            <input type="number" id="children" name="children" min="0" value="0"/>
                        </div>
                    </div>
                    <div>
                        <label for="special-requests" style="text-align: left!important; display:block; margin-bottom:5px;">${specialRequests || 'Special Requests'}</label>
                        <textarea id="special-requests" name="special-requests" rows="4" placeholder="${specialRequestsTxt || 'Any special needs or preferences?'}"></textarea>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back || 'Back'}</button>
                        <button type="button" class="next">${next || 'Next'}</button>
                    </div>
                </div>

                <div class="step step-5" style="display: none;">
                    <h2 style="margin: 0!important;">${titleContactInformation || 'Contact Information'}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleContactInformationBooking || 'Please provide your contact details.'}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between; flex-wrap: wrap;">
                        <div style="flex-basis: calc(50% - 15px); min-width:150px;">
                            <label for="First" style="text-align: left!important; display:block; margin-bottom:5px;">${firstName || 'First Name'}*</label>
                            <input type="text" id="First" name="First" class="FirstName fieldinput" required/>
                        </div>
                        <div style="flex-basis: calc(50% - 15px); min-width:150px;">
                            <label for="LastName" style="text-align: left!important; display:block; margin-bottom:5px;">${lastName || 'Last Name'}*</label>
                            <input type="text" id="LastName" name="LastName" class="LastName fieldinput" required/>
                        </div>
                    </div>
                    <div>
                        <label for="Email" style="text-align: left!important; display:block; margin-bottom:5px;">${emailVF || 'Email Address'}*</label>
                        <input type="email" id="Email" name="Email" class="Email fieldinput" required/>
                    </div>
                    <div>
                        <label for="Phone" style="text-align: left!important; display:block; margin-bottom:5px;">${phoneNumber || 'Phone Number'}</label>
                        <input type="tel" id="Phone" name="Phone" class="Phone fieldinput"/>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back || 'Back'}</button>
                        <button type="button" class="next">${next || 'Next'}</button>
                    </div>
                </div>

                <div class="step step-6" style="display: none;">
                    <h2 style="margin: 0!important;">${titleReview || 'Review Your Booking'}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleReviewBooking || 'Please review your details before submitting.'}</p><br/>
                    <div id="review-info"></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${edit || 'Edit'}</button>
                        <button type="submit" class="next">${submit || 'Submit'}</button>
                    </div>
                </div>
            </div>
        `;

        // --- Query DOM Elements (after innerHTML is set) ---
        const steps = Array.from(formContainer.querySelectorAll(".step-content .step"));
        const stepIndicators = Array.from(formContainer.querySelectorAll(".steps .step-indicator"));
        const reviewInfo = formContainer.querySelector("#review-info");

        const step3ContentArea = formContainer.querySelector("#step-3-content-area");
        const step3AccommodationUndertitle = formContainer.querySelector("#accommodation-undertitle");
        const backToCategoriesButtonContainer = formContainer.querySelector("#back-to-categories-button-container");
        const backToCategoriesBtn = formContainer.querySelector("#backToCategoriesBtn");

        // --- Helper Functions for Step 3 Accommodation ---
        function generateAccommodationItemsHTML(items, categoryKey) {
            return items.map((item) => `
                <li>
                    <input type="checkbox" id="${categoryKey}_${item.id}" data-item-id="${item.id}" data-category-key="${categoryKey}" class="accommodation-checkbox" />
                    <label for="${categoryKey}_${item.id}">
                        <img src="${item.imageSrc}" alt="${item.name}" />
                        <br/>
                        <p><b>${item.name}</b><br/>${item.size}<br/>${item.people}</p>
                    </label>
                    <div class="room-counter">
                        <button class="counter-btn decrement" type="button">-</button>
                        <input type="number" class="room-quantity" min="1" value="1" data-item-id="${item.id}" data-category-key="${categoryKey}">
                        <button class="counter-btn increment" type="button">+</button>
                    </div>
                </li>`).join('');
        }

        function generateCategoryChoicesHTML(categories) {
            return `
            <div class="category-card-container">
                ${categories.map(category => `
                    <div class="category-card" data-category-key="${category.categoryKey}">
                        <img src="${category.image}" alt="${category.type}">
                        <div class="category-title"><b>${category.type}</b></div>
                    </div>`).join('')}
            </div>`;
        }

        // --- Logic for Step 3 Accommodation View ---
        function renderAccommodationStepView() {
            if (!step3ContentArea || !step3AccommodationUndertitle) return;
            step3ContentArea.innerHTML = ''; // Clear previous content to avoid duplicate listeners on re-render

            if (accommodationStepView === 'categories') {
                step3AccommodationUndertitle.textContent = undertitlePickAccommodation || 'Select one or more accommodation types.';
                step3ContentArea.innerHTML = generateCategoryChoicesHTML(accommodationCategories);
                if (backToCategoriesButtonContainer) backToCategoriesButtonContainer.style.display = 'none';

                formContainer.querySelectorAll('.category-card').forEach(card => {
                    card.addEventListener('click', function() {
                        accommodationStepView = this.dataset.categoryKey;
                        renderAccommodationStepView();
                    });
                });
            } else {
                const currentCategoryData = accommodationCategories.find(cat => cat.categoryKey === accommodationStepView);
                if (currentCategoryData) {
                    step3AccommodationUndertitle.textContent = `Puoi selezionare ${currentCategoryData.type.toLowerCase() === 'suites' ? 'una o più suites' : 'una o più camere'}.`;
                    step3ContentArea.innerHTML = `<ul>${generateAccommodationItemsHTML(currentCategoryData.items, currentCategoryData.categoryKey)}</ul>`;
                    if (backToCategoriesButtonContainer) backToCategoriesButtonContainer.style.display = 'block';

                    currentCategoryData.items.forEach(item => { // Restore checkbox and quantity states
                        const checkbox = formContainer.querySelector(`#${currentCategoryData.categoryKey}_${item.id}`);
                        const quantityInput = formContainer.querySelector(`.room-quantity[data-item-id="${item.id}"]`);
                        if (checkbox && quantityInput) {
                            if (selectedAccommodationsData[item.id]) {
                                checkbox.checked = true;
                                quantityInput.value = selectedAccommodationsData[item.id];
                            } else {
                                checkbox.checked = false;
                                quantityInput.value = "1";
                            }
                        }
                    });
                    setupRoomItemInteractions(); // Attach listeners to newly created items
                }
            }
        }

        if (backToCategoriesBtn) {
            backToCategoriesBtn.addEventListener('click', () => {
                accommodationStepView = 'categories';
                renderAccommodationStepView();
            });
        }

        // --- Event Handlers for Accommodation Item Interactions ---
        function handleAccommodationCheckboxChange(event) {
            const checkbox = event.target;
            const listItem = checkbox.closest('li');
            if (!listItem) return;
            const quantityInput = listItem.querySelector('.room-quantity');
            const itemId = checkbox.dataset.itemId;
            if(!itemId || !quantityInput) return;

            if (checkbox.checked) {
                selectedAccommodationsData[itemId] = parseInt(quantityInput.value) || 1;
            } else {
                delete selectedAccommodationsData[itemId];
                quantityInput.value = "1";
            }
        }
        
        function updateSelectedAccommodationQuantity(itemId, quantity, isChecked) {
            if (isChecked) {
                selectedAccommodationsData[itemId] = parseInt(quantity);
            }
        }
        
        function handleQuantityIncrement(event) {
            const button = event.target;
            const counterDiv = button.closest('.room-counter');
            if (!counterDiv) return;
            const quantityInput = counterDiv.querySelector('.room-quantity');
            const checkbox = counterDiv.closest('li')?.querySelector('.accommodation-checkbox');
            if (!quantityInput || !checkbox) return;
        
            const itemId = quantityInput.dataset.itemId;
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateSelectedAccommodationQuantity(itemId, quantityInput.value, checkbox.checked);
        }
        
        function handleQuantityDecrement(event) {
            const button = event.target;
            const counterDiv = button.closest('.room-counter');
            if (!counterDiv) return;
            const quantityInput = counterDiv.querySelector('.room-quantity');
            const checkbox = counterDiv.closest('li')?.querySelector('.accommodation-checkbox');
            if (!quantityInput || !checkbox) return;
        
            const itemId = quantityInput.dataset.itemId;
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateSelectedAccommodationQuantity(itemId, quantityInput.value, checkbox.checked);
            }
        }
        
        function handleQuantityInputChange(event) {
            const quantityInput = event.target;
            const checkbox = quantityInput.closest('li')?.querySelector('.accommodation-checkbox');
            if (!checkbox) return;
            const itemId = quantityInput.dataset.itemId;
            let currentValue = parseInt(quantityInput.value);
        
            if (isNaN(currentValue) || currentValue < 1) {
                quantityInput.value = "1"; // Correct invalid input
                currentValue = 1;
            }
            updateSelectedAccommodationQuantity(itemId, currentValue, checkbox.checked);
        }

        function setupRoomItemInteractions() {
            const currentItemCheckboxes = step3ContentArea.querySelectorAll('.accommodation-checkbox');
            currentItemCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', handleAccommodationCheckboxChange);
                const listItem = checkbox.closest('li');
                if (!listItem) return;
                
                const incrementBtn = listItem.querySelector('.increment');
                const decrementBtn = listItem.querySelector('.decrement');
                const quantityInput = listItem.querySelector('.room-quantity');

                if (incrementBtn) incrementBtn.addEventListener('click', handleQuantityIncrement);
                if (decrementBtn) decrementBtn.addEventListener('click', handleQuantityDecrement);
                if (quantityInput) {
                    quantityInput.addEventListener('change', handleQuantityInputChange);
                    quantityInput.addEventListener('input', handleQuantityInputChange); // Handles direct typing
                }
            });
        }
        
        // --- Custom Calendar (Retained and slightly cleaned) ---
        function createCustomCalendar() {
            const calendarContainer = formContainer.querySelector("#customCalendar");
            const dateRangeDisplay = formContainer.querySelector("#dateRangeDisplay");
            if (!calendarContainer || !dateRangeDisplay) return;

            let calViewDate = new Date(); 
            
            function renderCal(dateForMonthYear) {
                const month = dateForMonthYear.getMonth();
                const year = dateForMonthYear.getFullYear();
                calendarContainer.innerHTML = '';

                const header = document.createElement('div'); header.className = 'calendar-header';
                const title = document.createElement('div'); title.className = 'calendar-title';
                title.textContent = dateForMonthYear.toLocaleDateString(navigator.language || 'en-US', { month: 'long', year: 'numeric' });
                const nav = document.createElement('div'); nav.className = 'calendar-nav';
                
                const prevBtn = document.createElement('button'); prevBtn.innerHTML = '&lt;';
                prevBtn.addEventListener('click', () => { calViewDate.setMonth(calViewDate.getMonth() - 1); renderCal(calViewDate); });
                
                const nextBtn = document.createElement('button'); nextBtn.innerHTML = '&gt;';
                nextBtn.addEventListener('click', () => { calViewDate.setMonth(calViewDate.getMonth() + 1); renderCal(calViewDate); });
                
                nav.appendChild(prevBtn); nav.appendChild(nextBtn);
                header.appendChild(title); header.appendChild(nav);
                calendarContainer.appendChild(header);

                const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Consider localization
                const grid = document.createElement('div'); grid.className = 'calendar-grid';
                dayNames.forEach(day => { const dayHeader = document.createElement('div'); dayHeader.className = 'calendar-day-header'; dayHeader.textContent = day.substring(0,3); grid.appendChild(dayHeader); });

                const firstDayOfMonth = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                for (let i = 0; i < firstDayOfMonth; i++) { const emptyDay = document.createElement('div'); emptyDay.className = 'calendar-day empty'; grid.appendChild(emptyDay); }

                const today = new Date(); today.setHours(0,0,0,0);
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div'); dayElement.className = 'calendar-day'; dayElement.textContent = day;
                    const currentDate = new Date(year, month, day); currentDate.setHours(0,0,0,0);

                    if (currentDate.getTime() === today.getTime()) dayElement.classList.add('today');
                    if (currentDate < today) dayElement.classList.add('disabled');
                    else dayElement.addEventListener('click', () => selectDateForCalendar(currentDate));

                    if (selectedStartDate && currentDate.getTime() === selectedStartDate.getTime()) dayElement.classList.add('selected-start');
                    else if (selectedEndDate && currentDate.getTime() === selectedEndDate.getTime()) dayElement.classList.add('selected-end');
                    else if (selectedStartDate && selectedEndDate && currentDate > selectedStartDate && currentDate < selectedEndDate) dayElement.classList.add('in-range');
                    grid.appendChild(dayElement);
                }
                calendarContainer.appendChild(grid);
            }

            function selectDateForCalendar(date) { // Renamed to avoid conflict
                const today = new Date(); today.setHours(0, 0, 0, 0);
                if (date < today && date.getTime() !== today.getTime()) return; // Allow selecting today even if it's "past" by milliseconds

                if (!selectedStartDate || (selectedStartDate && selectedEndDate) || date < selectedStartDate) {
                    selectedStartDate = date; selectedEndDate = null;
                } else { selectedEndDate = date; }
                calViewDate = new Date(date); // Center calendar on the last selected date's month/year
                updateDateRangeDisplayCal();
                renderCal(calViewDate);
            }

            function updateDateRangeDisplayCal() {
                if (!selectedStartDate) { dateRangeDisplay.innerHTML = `<span>${noDatesSelected || 'No dates selected'}</span>`; return; }
                const startDateStr = selectedStartDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                if (!selectedEndDate) { dateRangeDisplay.innerHTML = `<span>${selected || 'Selected'}: ${startDateStr}</span>`; }
                else { const endDateStr = selectedEndDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }); dateRangeDisplay.innerHTML = `<span>${selected || 'Selected'}: ${startDateStr} - ${endDateStr}</span>`; }
            }
            renderCal(calViewDate);
            updateDateRangeDisplayCal();
        }
        
        // --- Core Form Logic: Step Navigation, Validation, Review, Submission ---
        function showStep(stepNumber) {
            steps.forEach((s, index) => { s.style.display = (index === stepNumber - 1) ? "block" : "none"; });
            stepIndicators.forEach((si, index) => { // Assumes stepIndicators match steps array length
                si.classList.toggle("active", index === stepNumber - 1);
                if (index < stepNumber - 1) si.classList.add("visited");
                else si.classList.remove("visited");
            });
            
            // Progress bar visualization
            const activeStepIndicatorDiv = stepIndicators[stepNumber - 1];
            if (activeStepIndicatorDiv) {
                const activeBorder = activeStepIndicatorDiv.querySelector('.bord');
                stepIndicators.forEach(si => { // Hide all borders first
                    const bord = si.querySelector('.bord');
                    if (bord) bord.style.display = 'none';
                });
                if (activeBorder) activeBorder.style.display = 'block'; // Show active border
            }


            if (stepNumber === 1) { /* No special action needed beyond display */ }
            else if (stepNumber === 2) { updateStep2DurationOptions(); }
            else if (stepNumber === 3) { renderAccommodationStepView(); }
            else if (stepNumber === 6) { updateReviewInfo(); } // Assuming 6th content div is review
        }
        
        function updateStep2DurationOptions() {
            // (Logic from previous complete code for step 2)
            const dateRangeDisplayEl = formContainer.querySelector("#selectedDateRange");
            const durationBtns = formContainer.querySelectorAll(".duration-btn");
            const fromDayInput = formContainer.querySelector("#fromDay");
            const tillDayInput = formContainer.querySelector("#tillDay");
            const maxRangeNote = formContainer.querySelector("#maxRangeNote");
        
            if (!selectedStartDate || !selectedEndDate) return;
        
            const timeDiff = selectedEndDate.getTime() - selectedStartDate.getTime();
            const totalDays = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1); // Ensure at least 1 day
        
            const startStr = selectedStartDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const endStr = selectedEndDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            if(dateRangeDisplayEl) dateRangeDisplayEl.textContent = `${startStr} - ${endStr}`;
        
            durationBtns.forEach(btn => {
                const btnDays = btn.dataset.days;
                if (btnDays === "exact") {
                    btn.textContent = `${exactlyAsSpecified || 'Exactly as selected'} (${totalDays} ${days || 'days'})`;
                    btn.dataset.actualDays = totalDays; 
                } else {
                    const daysNum = parseInt(btnDays);
                    btn.disabled = daysNum > totalDays;
                    btn.classList.toggle("disabled", daysNum > totalDays);
                }
            });
        
            if (fromDayInput) {fromDayInput.max = totalDays; if (parseInt(fromDayInput.value) > totalDays) fromDayInput.value = totalDays > 1 ? 2 : 1;}
            if (tillDayInput) {tillDayInput.max = totalDays; tillDayInput.value = totalDays;} // Default "till" to max
            if (maxRangeNote && days) maxRangeNote.textContent = `${youCanChoose || 'You can choose up to'} ${totalDays} ${days}`;
        
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            
            const updateInputsState = () => {
                if (singleDurationRadio?.checked) {
                    if(fromDayInput) fromDayInput.disabled = true;
                    if(tillDayInput) tillDayInput.disabled = true;
                    durationBtns.forEach(b => {
                         const bDays = b.dataset.days;
                         b.disabled = (bDays !== "exact" && parseInt(bDays) > totalDays)
                    });
                } else if (rangeDurationRadio?.checked) {
                     if(fromDayInput) fromDayInput.disabled = false;
                     if(tillDayInput) tillDayInput.disabled = false;
                     durationBtns.forEach(b => b.disabled = true);
                }
            };
            updateInputsState(); // Initial state

            durationBtns.forEach(btn => {
                btn.addEventListener("click", function () {
                    if (this.disabled) return;
                    durationBtns.forEach(b => b.classList.remove("activeBtn"));
                    this.classList.add("activeBtn");
                    if (singleDurationRadio) singleDurationRadio.checked = true;
                    updateInputsState(); 
                });
            });
             formContainer.querySelectorAll('input[name="durationType"]').forEach(radio => {
                radio.addEventListener('change', updateInputsState);
            });
        }

        function validateStep() {
            // (Logic from previous complete code)
            if (!steps[currentStep - 1]) return true; // Should not happen
            const currentStepDiv = steps[currentStep - 1];
            const currentInputs = currentStepDiv.querySelectorAll("input[required], textarea[required]");

            for (let input of currentInputs) {
                if (!input.value.trim()) {
                    alert(`Please fill in the '${input.labels?.[0]?.textContent || input.name || 'required field'}'.`);
                    input.focus(); return false;
                }
                if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) {
                     alert(`Please enter a valid email address for '${input.labels?.[0]?.textContent || input.name}'.`);
                     input.focus(); return false;
                }
            }
            if (currentStep === 1 && (!selectedStartDate || !selectedEndDate)) { alert("Please select a valid date range."); return false; }
            if (currentStep === 3 && Object.keys(selectedAccommodationsData).length === 0) { alert("Please select at least one accommodation type."); return false; }
            return true;
        }

        function updateReviewInfo() {
            // (Logic from previous complete code, ensuring payload fallbacks)
            if (!reviewInfo) return;

            const getVal = (selector, defaultVal = 'N/A') => formContainer.querySelector(selector)?.value || defaultVal;

            let dateRangeStr = "Not selected";
            if (selectedStartDate && selectedEndDate) {
                const startStr = selectedStartDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const endStr = selectedEndDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                dateRangeStr = `${startStr} to ${endStr}`;
            }

            let durationText = "Not specified";
            const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            if (rangeDurationRadio?.checked) {
                 durationText = `Custom: ${getVal("#fromDay")} to ${getVal("#tillDay")} ${days || 'days'}`;
            } else if (activeDurationBtn) {
                durationText = activeDurationBtn.textContent;
                if (activeDurationBtn.dataset.days === "exact" && activeDurationBtn.dataset.actualDays) {
                    durationText = `${exactlyAsSpecified || 'Exactly as selected'} (${activeDurationBtn.dataset.actualDays} ${days || 'days'})`;
                }
            }

            const accommodationReviewItems = [];
            for (const itemId in selectedAccommodationsData) {
                let itemName = "Unknown Item";
                for (const category of accommodationCategories) { const foundItem = category.items.find(i => i.id === itemId); if (foundItem) { itemName = foundItem.name; break; } }
                accommodationReviewItems.push(`${selectedAccommodationsData[itemId]}x ${itemName}`);
            }
            const accommodationSummary = accommodationReviewItems.length > 0 ? accommodationReviewItems.join('<br/>') : 'None selected';

            reviewInfo.innerHTML = `
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h3 style="margin: 0!important; font-size: 1.1em;">${reviewStayDates || 'Stay Dates'}</h3></div>
                    <p>${reviewTravelDates || 'Travel Dates'}: <span style="color: gray;">${dateRangeStr}</span></p>
                    <p>${reviewDurationOFStay || 'Duration of Stay'}: <span style="color: gray;">${durationText}</span></p>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h3 style="margin: 0!important; font-size: 1.1em;">${reviewAccommodation || 'Accommodation'}</h3></div>
                    <p>${reviewTypes || 'Types'}: <br/><span style="color: gray;">${accommodationSummary}</span></p>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h3 style="margin: 0!important; font-size: 1.1em;">${reviewTravelers || 'Travelers'}</h3></div>
                    <p>${reviewAdults || 'Adults'}: <span style="color: gray;">${getVal("#adults", "0")}</span></p>
                    <p>${children || 'Children'}: <span style="color: gray;">${getVal("#children", "0")}</span></p>
                    <p>${reviewSpecialRequests || 'Special Requests'}: <span style="color: gray;">${getVal("#special-requests", "None")}</span></p>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h3 style="margin: 0!important; font-size: 1.1em;">${titleContactInformation || 'Contact Information'}</h3></div>
                    <p>${firstAndLastname || 'Name'}: <span style="color: gray;">${getVal("#First")} ${getVal("#LastName")}</span></p>
                    <p>${emailVF || 'Email'}: <span style="color: gray;">${getVal("#Email")}</span></p>
                    <p>${phoneNumber || 'Phone'}: <span style="color: gray;">${getVal("#Phone", "N/A")}</span></p>
                </div>`;
        }
        
        function createChatBoxAfterSubmission() {
            // (Logic from previous complete code)
            const chatBox = document.createElement('div');
            chatBox.classList.add('chat-box');
            chatBox.innerHTML = `
                <div style="position: relative; display: flex; justify-content: center; align-items: center; height: 500px; width: 100%; flex-direction: column;">
                    <div style="display: flex; justify-content: center; height: 50px;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 40px; width: 38px; fill: black;">
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                        </svg>
                    </div>
                    <h3>${thankSubmission || 'Thank You!'}</h3>
                    <p>${formSubmitted || 'Your request has been submitted.'}<br/>${formTeam || 'Our team will contact you shortly.'}</p>
                </div>`;
            formContainer.replaceWith(chatBox);
        }

        // --- Event Listeners for Form Navigation and Submission ---
        formContainer.addEventListener("click", function (event) {
            const target = event.target;
            if (target.classList.contains("next")) {
                if (!validateStep()) return;
                if (currentStep < steps.length) { currentStep++; showStep(currentStep); }
            } else if (target.classList.contains("prev")) {
                if (currentStep === steps.length && target.textContent === (edit || 'Edit')) { currentStep = 1; } // If on review step and "Edit" is clicked
                else if (currentStep > 1) { currentStep--; }
                showStep(currentStep);
            }
        });

        formContainer.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!validateStep()) return;

            const accommodationDataForSubmission = [];
            for (const itemId in selectedAccommodationsData) {
                let itemDetails = null; let itemCategoryType = "Unknown Category";
                for (const category of accommodationCategories) { const foundItem = category.items.find(i => i.id === itemId); if (foundItem) { itemDetails = foundItem; itemCategoryType = category.type; break; } }
                if (itemDetails) { accommodationDataForSubmission.push({ id: itemDetails.id, name: itemDetails.name, category: itemCategoryType, size: itemDetails.size, people: itemDetails.people, quantity: selectedAccommodationsData[itemId] }); }
            }
            
            let durationData = {};
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");
            if (rangeDurationRadio?.checked) { durationData = { type: 'range', fromDay: formContainer.querySelector("#fromDay")?.value || '', tillDay: formContainer.querySelector("#tillDay")?.value || '' };}
            else if (activeDurationBtn) { let selectedOpt = activeDurationBtn.dataset.days; if (selectedOpt === "exact" && activeDurationBtn.dataset.actualDays) { selectedOpt = activeDurationBtn.dataset.actualDays; } durationData = { type: 'single', selectedOption: selectedOpt };}
            else { durationData = { type: 'single', selectedOption: 'exact' };} // Default

            const formData = {
                dates: { start: selectedStartDate ? selectedStartDate.toISOString().split('T')[0] : '', end: selectedEndDate ? selectedEndDate.toISOString().split('T')[0] : '' },
                duration: durationData,
                accommodation: accommodationDataForSubmission,
                travelers: { adults: formContainer.querySelector("#adults")?.value || '', children: formContainer.querySelector("#children")?.value || '' },
                specialRequests: formContainer.querySelector("#special-requests")?.value || '',
                contact: { firstName: formContainer.querySelector("#First")?.value || '', lastName: formContainer.querySelector("#LastName")?.value || '', email: formContainer.querySelector("#Email")?.value || '', phone: formContainer.querySelector("#Phone")?.value || '' }
            };

            if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.interact === 'function') {
                window.voiceflow.chat.interact({ type: 'complete', payload: formData });
            } else { console.warn("Voiceflow chat interface not found or interact is not a function. Form data:", formData); }
            createChatBoxAfterSubmission();
        });

        // --- Initial Setup ---
        showStep(currentStep);
        element.appendChild(formContainer);
        createCustomCalendar(); // Initialize calendar for Step 1
    },
};
