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

        // --- Internal state for Step 3: Pick Accommodation ---
        let accommodationStepView = 'categories'; // 'categories', 'suites', 'rooms', etc. (uses categoryKey)
        let selectedAccommodationsData = {}; // Stores { itemId: quantity, ... }

        const {
            titleChooseYourStay, undertitleChooseYourStay, noDatesSelected, selected, undertitleChooseYourStay2,
            selectDuration, exactlyAsSpecified, threeDays, fourDays, fiveDays, sixDays, sevenDays, eightDays, nineDays, tenDays,
            enterExactDates, from, until, youCanChoose, days,
            titlePickAccommodation, undertitlePickAccommodation, /* old accommodationSize/People vars are no longer primary */
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

        formContainer.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap');
                .form-container {
                    font-family: "Host Grotesk", serif;
                    width: 100%;
                    background: #fff;
                    padding: 20px;
                    border-radius: 5px;
                }
                /* ... (all your existing styles from the original code) ... */
                /* Keep all original CSS here, and add/modify as needed */
                
                .steps {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 0;
                    background: #fff;
                    font-family: "Host Grotesk", serif;
                    position: relative; /* For progress bar line */
                    width: 100%;
                }
                .step-indicator {
                    flex: 1;
                    text-align: center;
                    padding: 10px;
                    font-weight: bold;
                    color: #8b8686;
                    background: #fff;
                    border-radius: 5px;
                    font-family: "Host Grotesk", serif;
                }
                .step-indicator.active span:not(.bord):not(.bord2) { /* Target only the number span */
                    background: black !important;
                    color: white;
                }
                 ._1ddzqsn7 { width: 100% !important; }
                .active{ color: black!important;}
                /* This .active span might be too broad, ensure it targets step number span */
                .step-indicator.active span:not(.bord):not(.bord2) { background: black; color: white; }

                input, textarea {
                    width: 100%; padding: 10px; margin: 10px 0;
                    border-radius: 10px; border: 1px solid #ccc; outline: none;
                    font-family: "Host Grotesk", serif;
                }
                input:hover, textarea:hover{ border: 1px solid black; }

                .chat-box { /* For submission thank you message */
                    width: 100%; padding: 20px; background: #fff;
                    border-radius: 5px; margin-top: 20px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
                .chat-box h3, .chat-box p { margin: 10px 0 0; font-size: 16px; font-family: "Host Grotesk", serif; }
                
                h2, label, input, textarea, button { font-family: "Host Grotesk", serif; }

                /* Progress bar lines */
                .step-1 .bord2{ position: absolute; border: 2px solid #e1dada; width: 100%; left: 0; top: 80px;}
                .step-1.active .bord, .step-2.active .bord{position: absolute; border: 2px solid black; width: 20%; left: 0; top: 80px;}
                .step-2.active .bord{ display: block!important; width: 20%;} /* Step 2 active means 20% to 40% range start */
                .step-3.active .bord{ position: absolute; border: 2px solid black; width: 40%; left: 0; top: 80px;}
                .step-4.active .bord{ position: absolute; border: 2px solid black; width: 60%; left: 0; top: 80px;}
                .step-5.active .bord{ position: absolute; border: 2px solid black; width: 80%; left: 0; top: 80px;}
                .step-6.active .bord{ position: absolute; border: 2px solid black; width: 100%; left: 0; top: 80px;}

                .visited span:not(.bord):not(.bord2) { background: black!important; color: white; } /* Target number span */

                .next, .prev {
                    background: transparent; border: 1px solid gray; width: 150px;
                    color: black; padding: 10px 25px; border-radius: 20px; cursor: pointer;
                }
                .next:hover, .prev:hover{ background: #000; color: white; }
                .vfrc-message--extension-Forms{ background: white!important; }
                .step-content{margin-top: 28px;}
                .activeBtn{ color: #fff; background: #000!important; border: 1px solid #000!important; }
                .duration-btn:hover{ color: #fff; background: #000!important; }
                .BtnSimp{ border-radius: 8px; padding: 10px 25px; cursor: pointer; }
                
                /* Styles for Accommodation Item Lists (retained from original) */
                ul {
                    display: flex; flex-wrap: wrap; margin-top: 0;
                    list-style-type: none; padding-left: 10px !important; gap: 8px;
                }
                li { display: inline-block; margin: 0; }
                input[type="checkbox"][id^="${accommodationCategories[0]?.categoryKey || 'item'}_"] { display: none; } /* Adjusted for dynamic IDs */
                
                /* label for accommodation items */
                #step-3-content-area ul label { 
                    display: block; position: relative; cursor: pointer; text-align: center;
                    border-radius: 14px; transition: background-color 0.3s ease;
                    padding: 10px; background-color: transparent;
                }
                #step-3-content-area ul label:hover { background-color: rgba(0, 0, 0, 0.05); }
                #step-3-content-area ul input[type="checkbox"]:checked + label { background-color: rgba(0, 0, 0, 0.08); }
                #step-3-content-area ul label img {
                    height: 150px; width: 170px; border-radius: 11px; display: block;
                    transition: transform 0.3s ease;
                }
                #step-3-content-area ul label:hover img { transform: scale(1.03); }
                #step-3-content-area ul input[type="checkbox"]:checked + label img { transform: none !important; }
                #step-3-content-area ul label p { font-size: 11px; margin-top: 8px; }
                
                .room-counter {
                    margin-top: 8px; display: none; justify-content: center; align-items: center; gap: 6px;
                }
                input[type="checkbox"]:checked ~ .room-counter { display: flex !important; } /* Simplified to work with any checked checkbox sibling */

                .counter-btn {
                    width: 25px; height: 25px; border-radius: 50%; background: #f5f5f5;
                    border: 1px solid #ddd; cursor: pointer; display: flex;
                    align-items: center; justify-content: center; font-size: 14px;
                    /* display: none!important; /* This was original, but counter is shown/hidden by JS/CSS sibling selector */
                }
                .counter-btn:hover { background: #e0e0e0; }
                .room-quantity { border: 1px solid #ddd; border-radius: 5px; padding: 5px; text-align: center; }
                .fieldinput{ margin-top: 0!important; }
                b{ font-size: 13px!important; }

                /* Custom Calendar Styles (retained from original) */
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
                .duration-btn{ border-radius: 30px; background: #fff; }
                .duration-btn.disabled { opacity: 0.5; cursor: not-allowed; background: #f5f5f5 !important; border-color: #ddd !important; color: #999 !important; border:none; outline: none;}
                .duration-btn.disabled:hover { background: #f5f5f5 !important; color: #999 !important; }
                .input-wrapper { position: relative; }
                .input-wrapper input[type="number"] { border: 1px solid gray; border-radius: 6px; position: relative; width: 100px!important; margin: 10px; line-height: 6ex; height: 34px; text-align: right; }
                .input-wrapper label { position: absolute; top: -0.8ex; z-index: 1; left: 1em; background-color: white; padding: 0 5px; }

                /* Styles for New Category Cards in Step 3 */
                .category-card-container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around; 
                    gap: 15px;
                    padding-left: 10px !important;
                }
                .category-card {
                    cursor: pointer;
                    text-align: center;
                    border: 1px solid transparent;
                    border-radius: 14px;
                    padding: 10px;
                    flex-basis: 170px; /* Width of cards */
                    max-width: 250px;
                    background-color: transparent;
                    transition: background-color 0.3s ease;
                    display: flex;
                    flex-direction: column;
                }
                .category-card:hover { background-color: rgba(0, 0, 0, 0.05); }
                .category-card img {
                    width: 100%; height: 150px; object-fit: cover;
                    border-radius: 11px; display: block; transition: transform 0.3s ease;
                }
                .category-card:hover img { transform: scale(1.03); }
                .category-card .category-title {
                    text-align: left; margin-top: 8px; font-size: 11px;
                }
                .category-card .category-title b { font-size: 13px!important; }
            </style>

            <div class="steps" style="display: flex; gap: 30px; justify-content: space-around; width: 100%;">
                <div class="step-indicator step-1"><span class="bord2"></span><span class="bord"></span><span style="background-color: rgb(218 213 213 / 0%); border: 1px solid; width: 34px; text-align: center; display: inline-flex; align-items: center; height: 34px; justify-content: center; border-radius: 50%;">1</span></div>
                <div class="step-indicator step-2" style="flex: 0!important; padding: 0!important; display: contents!important;"><span class="bord" style="display: contents;"></span></div> {/* This step 2 seems to be just a connector line visually */}
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
                    <div style="margin-bottom: 20px;">
                        <input type="radio" id="ButtonSelection" name="durationType" checked value="single" style="width: auto!important">
                        <label for="ButtonSelection"><p style="margin-bottom: 10px; font-weight: 500; display: contents;">${selectDuration}:</p></label>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
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
                    <div>
                        <input type="radio" id="rangeDuration" name="durationType" value="range" style="width: auto!important">
                        <p style="margin-bottom: 10px; font-weight: 500; display: contents;">${enterExactDates}:</p>
                        <div style="margin-bottom: 15px; display: flex; gap: 10px; align-items: center;">
                            <div style="display: flex; gap: 10px; margin-top: 10px; align-items: center;">
                                <div class="input-wrapper">
                                    <label for="fromDay" style="display: block; margin-bottom: 5px; font-size: 12px;">${from}</label>
                                    <input type="number" id="fromDay" name="fromDay" min="2" value="2" style="width: 80px; padding: 8px;">
                                </div>
                                <div class="input-wrapper">
                                    <label for="tillDay" style="display: block; margin-bottom: 5px; font-size: 12px;">${until}</label>
                                    <input type="number" id="tillDay" name="tillDay" min="1" value="1" style="width: 80px; padding: 8px;">
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
                    <h2 style="margin: 0!important;">${titlePickAccommodation}</h2>
                    <p style="margin: 7px 0px!important;" id="accommodation-undertitle">${undertitlePickAccommodation}</p><br/>
                    <div id="step-3-content-area">
                        </div>
                    <div style="margin-top: 20px; display: none;" id="back-to-categories-button-container">
                        <button type="button" class="prev BtnSimp" id="backToCategoriesBtn" style="width: auto; padding: 10px 20px; border-radius: 20px;">Back to Categories</button>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev step-3-main-prev">${back}</button>
                        <button type="button" class="next step-3-main-next">${next}</button>
                    </div>
                </div>

                <div class="step step-4" style="display: none;">
                    <h2 style="margin: 0!important;">${titleWhoTraveling}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleWhoTraveling}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between;">
                        <div style="width: 45%;">
                            <label for="adults" style="text-align: left!important;">${adults14Plus}*</label>
                            <input type="number" id="adults" name="adults" min="1" value="1" required/>
                        </div>
                        <div style="width: 45%;">
                            <label for="children" style="text-align: left!important;">${children}</label>
                            <input type="number" id="children" name="children" min="0" value="0"/>
                        </div>
                    </div>
                    <div>
                        <label for="special-requests" style="text-align: left!important;">${specialRequests}</label>
                        <textarea id="special-requests" name="special-requests" rows="4" placeholder="${specialRequestsTxt}"></textarea>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back}</button>
                        <button type="button" class="next">${next}</button>
                    </div>
                </div>

                <div class="step step-5" style="display: none;">
                    <h2 style="margin: 0!important;">${titleContactInformation}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleContactInformationBooking}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between;">
                        <div style="width: 45%;">
                            <label for="First" style="text-align: left!important;">${firstName}*</label>
                            <input type="text" id="First" name="First" class="FirstName fieldinput" required/>
                        </div>
                        <div style="width: 45%;">
                            <label for="LastName" style="text-align: left!important;">${lastName}*</label>
                            <input type="text" id="LastName" name="LastName" class="LastName fieldinput" required/>
                        </div>
                    </div>
                    <div>
                        <label for="Email" style="text-align: left!important;">${emailVF}*</label>
                        <input type="email" id="Email" name="Email" class="Email fieldinput" required/>
                    </div>
                    <div>
                        <label for="Phone" style="text-align: left!important;">${phoneNumber}</label>
                        <input type="text" id="Phone" name="Phone" class="Phone fieldinput"/>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back}</button>
                        <button type="button" class="next">${next}</button>
                    </div>
                </div>

                <div class="step step-6" style="display: none;">
                    <h2 style="margin: 0!important;">${titleReview}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleReviewBooking}</p><br/>
                    <div id="review-info"></div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${edit}</button>
                        <button type="submit" class="next">${submit}</button>
                    </div>
                </div>
            </div>
        `;

        const steps = Array.from(formContainer.querySelectorAll(".step-content .step"));
        const stepIndicators = Array.from(formContainer.querySelectorAll(".steps .step-indicator"));
        const reviewInfo = formContainer.querySelector("#review-info");

        // --- Query elements for Step 3 dynamic content (AFTER formContainer.innerHTML is set) ---
        const step3ContentArea = formContainer.querySelector("#step-3-content-area");
        const step3AccommodationUndertitle = formContainer.querySelector("#accommodation-undertitle");
        const backToCategoriesButtonContainer = formContainer.querySelector("#back-to-categories-button-container");
        const backToCategoriesBtn = formContainer.querySelector("#backToCategoriesBtn");


        // --- Helper function to generate HTML for accommodation items (suites or rooms) ---
        function generateAccommodationItemsHTML(items, categoryKey) {
            return items.map((item) => `
                <li>
                    <input type="checkbox" id="${categoryKey}_${item.id}" data-item-id="${item.id}" data-category-key="${categoryKey}" class="accommodation-checkbox" />
                    <label for="${categoryKey}_${item.id}">
                        <img src="${item.imageSrc}" alt="${item.name}" />
                        <br/>
                        <p style="text-align: left;">
                            <b>${item.name}</b><br/>
                            ${item.size} <br/>
                            ${item.people}
                        </p>
                    </label>
                    <div class="room-counter">
                        <button class="counter-btn decrement" type="button">-</button>
                        <input type="number" class="room-quantity" min="1" value="1" style="width: 60px; text-align: center;" data-item-id="${item.id}" data-category-key="${categoryKey}">
                        <button class="counter-btn increment" type="button">+</button>
                    </div>
                </li>
            `).join('');
        }

        // --- Helper function to generate HTML for category choices ---
        function generateCategoryChoicesHTML(categories) {
            return `
            <div class="category-card-container">
                ${categories.map(category => `
                    <div class="category-card" data-category-key="${category.categoryKey}">
                        <img src="${category.image}" alt="${category.type}">
                        <div class="category-title"><b>${category.type}</b></div>
                    </div>
                `).join('')}
            </div>`;
        }
        
        // --- Function to render the current view within Step 3 ---
        function renderAccommodationStepView() {
            if (!step3ContentArea || !step3AccommodationUndertitle) return;
            step3ContentArea.innerHTML = '';

            if (accommodationStepView === 'categories') {
                step3AccommodationUndertitle.textContent = undertitlePickAccommodation;
                step3ContentArea.innerHTML = generateCategoryChoicesHTML(accommodationCategories);
                if (backToCategoriesButtonContainer) backToCategoriesButtonContainer.style.display = 'none';

                formContainer.querySelectorAll('.category-card').forEach(card => {
                    card.addEventListener('click', function() {
                        const categoryKey = this.dataset.categoryKey;
                        accommodationStepView = categoryKey;
                        renderAccommodationStepView();
                    });
                });
            } else {
                const currentCategoryData = accommodationCategories.find(cat => cat.categoryKey === accommodationStepView);
                if (currentCategoryData) {
                    step3AccommodationUndertitle.textContent = `Puoi selezionare ${currentCategoryData.type.toLowerCase() === 'suites' ? 'una o più suites' : 'una o più camere'}.`;
                    step3ContentArea.innerHTML = `<ul>${generateAccommodationItemsHTML(currentCategoryData.items, currentCategoryData.categoryKey)}</ul>`;
                    if (backToCategoriesButtonContainer) backToCategoriesButtonContainer.style.display = 'block';

                    currentCategoryData.items.forEach(item => {
                        const checkbox = formContainer.querySelector(`#${currentCategoryData.categoryKey}_${item.id}`);
                        const quantityInput = formContainer.querySelector(`.room-quantity[data-item-id="${item.id}"][data-category-key="${currentCategoryData.categoryKey}"]`);
                        if (!checkbox || !quantityInput) return;
                        const roomCounterDiv = checkbox.closest('li')?.querySelector('.room-counter');

                        if (selectedAccommodationsData[item.id]) {
                            checkbox.checked = true;
                            quantityInput.value = selectedAccommodationsData[item.id];
                        } else {
                            checkbox.checked = false;
                            quantityInput.value = "1";
                        }
                        // CSS :checked selector handles visibility of roomCounterDiv
                    });
                    setupRoomItemInteractions();
                }
            }
        }

        if (backToCategoriesBtn) {
            backToCategoriesBtn.addEventListener('click', () => {
                accommodationStepView = 'categories';
                renderAccommodationStepView();
            });
        }

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

        function handleQuantityUpdate(quantityInput, itemId, isChecked) {
            if (isChecked) {
                selectedAccommodationsData[itemId] = parseInt(quantityInput.value);
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
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            handleQuantityUpdate(quantityInput, itemId, checkbox.checked);
        }
        
        function handleQuantityDecrement(event) {
            const button = event.target;
            const counterDiv = button.closest('.room-counter');
            if (!counterDiv) return;
            const quantityInput = counterDiv.querySelector('.room-quantity');
            const checkbox = counterDiv.closest('li')?.querySelector('.accommodation-checkbox');
            if (!quantityInput || !checkbox) return;
        
            const itemId = quantityInput.dataset.itemId;
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                handleQuantityUpdate(quantityInput, itemId, checkbox.checked);
            }
        }
        
        function handleQuantityInputChange(event) {
            const quantityInput = event.target;
            const checkbox = quantityInput.closest('li')?.querySelector('.accommodation-checkbox');
             if (!checkbox) return;
            const itemId = quantityInput.dataset.itemId;
            let currentValue = parseInt(quantityInput.value);
        
            if (isNaN(currentValue) || currentValue < 1) {
                quantityInput.value = "1";
                currentValue = 1;
            }
            handleQuantityUpdate(quantityInput, itemId, checkbox.checked);
        }

        function setupRoomItemInteractions() {
            const currentItemCheckboxes = step3ContentArea.querySelectorAll('.accommodation-checkbox');
            currentItemCheckboxes.forEach(checkbox => {
                // Clear old listeners to prevent duplicates if re-rendered
                const newCheckbox = checkbox.cloneNode(true);
                checkbox.parentNode.replaceChild(newCheckbox, checkbox);
                newCheckbox.addEventListener('change', handleAccommodationCheckboxChange);

                const listItem = newCheckbox.closest('li');
                if (!listItem) return;
                
                const incrementBtn = listItem.querySelector('.increment');
                const decrementBtn = listItem.querySelector('.decrement');
                const quantityInput = listItem.querySelector('.room-quantity');

                if (incrementBtn) {
                    const newIncBtn = incrementBtn.cloneNode(true);
                    incrementBtn.parentNode.replaceChild(newIncBtn, incrementBtn);
                    newIncBtn.addEventListener('click', handleQuantityIncrement);
                }
                if (decrementBtn) {
                     const newDecBtn = decrementBtn.cloneNode(true);
                    decrementBtn.parentNode.replaceChild(newDecBtn, decrementBtn);
                    newDecBtn.addEventListener('click', handleQuantityDecrement);
                }
                if (quantityInput) {
                    const newQuantInput = quantityInput.cloneNode(true);
                    quantityInput.parentNode.replaceChild(newQuantInput, quantityInput);
                    newQuantInput.addEventListener('change', handleQuantityInputChange);
                    newQuantInput.addEventListener('input', handleQuantityInputChange);
                }
            });
        }

        // --- Custom Calendar Implementation (retained from original) ---
        function createCustomCalendar() {
            const calendarContainer = formContainer.querySelector("#customCalendar");
            const dateRangeDisplay = formContainer.querySelector("#dateRangeDisplay");
            if (!calendarContainer || !dateRangeDisplay) return;

            let calCurrentDate = new Date(); // Use a different var name to avoid conflict
            let calCurrentMonth = calCurrentDate.getMonth();
            let calCurrentYear = calCurrentDate.getFullYear();

            function renderCal(month, year) {
                calendarContainer.innerHTML = '';
                const header = document.createElement('div');
                header.className = 'calendar-header';
                const title = document.createElement('div');
                title.className = 'calendar-title';
                title.textContent = new Date(year, month).toLocaleDateString(navigator.language || 'en-US', { month: 'long', year: 'numeric' });
                const nav = document.createElement('div');
                nav.className = 'calendar-nav';
                const prevBtn = document.createElement('button');
                prevBtn.innerHTML = '&lt;';
                prevBtn.addEventListener('click', () => {
                    if (month === 0) { month = 11; year--; } else { month--; }
                    renderCal(month, year);
                });
                const nextBtn = document.createElement('button');
                nextBtn.innerHTML = '&gt;';
                nextBtn.addEventListener('click', () => {
                    if (month === 11) { month = 0; year++; } else { month++; }
                    renderCal(month, year);
                });
                nav.appendChild(prevBtn); nav.appendChild(nextBtn);
                header.appendChild(title); header.appendChild(nav);
                calendarContainer.appendChild(header);

                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Consider localization
                const grid = document.createElement('div');
                grid.className = 'calendar-grid';
                dayNames.forEach(day => {
                    const dayHeader = document.createElement('div');
                    dayHeader.className = 'calendar-day-header'; dayHeader.textContent = day.substring(0,3); // Shorten
                    grid.appendChild(dayHeader);
                });

                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                for (let i = 0; i < firstDay; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'calendar-day empty'; grid.appendChild(emptyDay);
                }

                const today = new Date(); today.setHours(0,0,0,0);
                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day'; dayElement.textContent = day;
                    const date = new Date(year, month, day); date.setHours(0,0,0,0);

                    if (date.getTime() === today.getTime()) dayElement.classList.add('today');
                    if (date < today) dayElement.classList.add('disabled');
                    else dayElement.addEventListener('click', () => selectDate(date));

                    if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) dayElement.classList.add('selected-start');
                    else if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) dayElement.classList.add('selected-end');
                    else if (selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate) dayElement.classList.add('in-range');
                    grid.appendChild(dayElement);
                }
                calendarContainer.appendChild(grid);
            }

            function selectDate(date) {
                const today = new Date(); today.setHours(0, 0, 0, 0);
                if (date < today) return;
                
                calCurrentMonth = date.getMonth(); // Update calendar's view month/year
                calCurrentYear = date.getFullYear();

                if (!selectedStartDate || (selectedStartDate && selectedEndDate) || date < selectedStartDate) {
                    selectedStartDate = date; selectedEndDate = null;
                } else { selectedEndDate = date; }
                updateDateRangeDisplayCal();
                renderCal(calCurrentMonth, calCurrentYear);
            }

            function updateDateRangeDisplayCal() {
                if (!selectedStartDate) {
                    dateRangeDisplay.innerHTML = `<span>${noDatesSelected}</span>`; return;
                }
                const startDateStr = selectedStartDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                if (!selectedEndDate) {
                    dateRangeDisplay.innerHTML = `<span>${selected}: ${startDateStr}</span>`;
                } else {
                    const endDateStr = selectedEndDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    dateRangeDisplay.innerHTML = `<span>${selected}: ${startDateStr} - ${endDateStr}</span>`;
                }
            }
            renderCal(calCurrentMonth, calCurrentYear);
            updateDateRangeDisplayCal();
        }
        
        function showStep(stepNumber) {
            steps.forEach((s, index) => {
                s.style.display = (index === stepNumber - 1) ? "block" : "none";
            });
            stepIndicators.forEach((si, index) => {
                si.classList.toggle("active", index === stepNumber - 1);
                if (index < stepNumber - 1) si.classList.add("visited");
                else si.classList.remove("visited");
            });
            
            // Update progress bar visualization dynamically based on active step indicator
            const activeIndicator = formContainer.querySelector('.step-indicator.active .bord');
            const baseLine = formContainer.querySelector('.step-1 .bord2'); // The grey baseline
            if (baseLine) baseLine.style.display = 'block'; // Ensure baseline is always visible

            // Reset all progress borders
            stepIndicators.forEach(si => {
                const bord = si.querySelector('.bord');
                if (bord && bord !== activeIndicator) bord.style.display = 'none';
            });
            
            if (activeIndicator) { // Make the active border visible
                 activeIndicator.style.display = 'block';
            }


            if (stepNumber === 3) { // "Pick Accommodation" step
                renderAccommodationStepView();
            } else if (stepNumber === 2) { // Step 2: Duration of Stay
                 updateStep2DurationOptions();
            } else if (stepNumber === 6) { // Review Step
                updateReviewInfo();
            }
        }
        
        function updateStep2DurationOptions() {
            if (currentStep !== 2) return;
            const dateRangeDisplayEl = formContainer.querySelector("#selectedDateRange");
            const durationBtns = formContainer.querySelectorAll(".duration-btn");
            const fromDayInput = formContainer.querySelector("#fromDay");
            const tillDayInput = formContainer.querySelector("#tillDay");
            const maxRangeNote = formContainer.querySelector("#maxRangeNote");
        
            if (!selectedStartDate || !selectedEndDate) return;
        
            const timeDiff = selectedEndDate.getTime() - selectedStartDate.getTime();
            const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        
            const startStr = selectedStartDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const endStr = selectedEndDate.toLocaleDateString(navigator.language || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            if(dateRangeDisplayEl) dateRangeDisplayEl.textContent = `${startStr} - ${endStr}`;
        
            durationBtns.forEach(btn => {
                const btnDays = btn.dataset.days;
                if (btnDays === "exact") {
                    // btn.textContent = `${exactlyAsSpecified} (${totalDays} ${days})`; // Update text if needed
                    btn.dataset.actualDays = totalDays; // Store actual total days
                } else {
                    const daysNum = parseInt(btnDays);
                    btn.disabled = daysNum > totalDays;
                    btn.classList.toggle("disabled", daysNum > totalDays);
                }
            });
        
            if (fromDayInput) fromDayInput.max = totalDays;
            if (tillDayInput) {
                tillDayInput.max = totalDays;
                tillDayInput.value = totalDays; // Default "till" to max possible days
            }
            if (maxRangeNote) maxRangeNote.textContent = `${youCanChoose} ${totalDays} ${days}`;
        
            // Logic for radio buttons and active duration button
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            // const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            
            if (singleDurationRadio?.checked) {
                if(fromDayInput) fromDayInput.disabled = true;
                if(tillDayInput) tillDayInput.disabled = true;
                durationBtns.forEach(b => b.disabled = (parseInt(b.dataset.days) > totalDays && b.dataset.days !== "exact" ));
            } else { // Range selected
                 if(fromDayInput) fromDayInput.disabled = false;
                 if(tillDayInput) tillDayInput.disabled = false;
                 durationBtns.forEach(b => b.disabled = true); // Disable quick buttons if range is active
            }

            durationBtns.forEach(btn => {
                btn.addEventListener("click", function () {
                    if (this.disabled) return;
                    durationBtns.forEach(b => b.classList.remove("activeBtn"));
                    this.classList.add("activeBtn");
                    if (singleDurationRadio) singleDurationRadio.checked = true; // Ensure single selection is active
                     if(fromDayInput) fromDayInput.disabled = true;
                     if(tillDayInput) tillDayInput.disabled = true;

                });
            });
             formContainer.querySelectorAll('input[name="durationType"]').forEach(radio => {
                radio.addEventListener('change', updateStep2DurationOptions); // Re-run to update disabled states
            });
        }


        function validateStep() {
            if (!steps[currentStep - 1]) return true;
            const currentInputs = steps[currentStep - 1].querySelectorAll("input[required], textarea[required]");
            for (let input of currentInputs) {
                if (!input.value.trim()) { // Basic check for empty required fields
                    alert(`Please fill in the ${input.labels?.[0]?.textContent || input.name || 'required'} field.`);
                    input.focus();
                    return false;
                }
                if (input.type === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) {
                     alert(`Please enter a valid email address for ${input.labels?.[0]?.textContent || input.name}.`);
                     input.focus();
                     return false;
                }
            }

            if (currentStep === 1 && (!selectedStartDate || !selectedEndDate)) {
                alert("Please select a valid date range."); return false;
            }
            if (currentStep === 3) { // "Pick Accommodation" step
                const totalSelected = Object.keys(selectedAccommodationsData).length;
                if (totalSelected === 0) {
                    alert("Please select at least one accommodation type."); return false;
                }
            }
            return true;
        }

        function updateReviewInfo() {
            if (!reviewInfo) return;

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
                 const fromDayVal = formContainer.querySelector("#fromDay")?.value || 'N/A';
                 const tillDayVal = formContainer.querySelector("#tillDay")?.value || 'N/A';
                 durationText = `Custom: ${fromDayVal} to ${tillDayVal} days`;
            } else if (activeDurationBtn) {
                durationText = activeDurationBtn.textContent;
                 if (activeDurationBtn.dataset.days === "exact" && activeDurationBtn.dataset.actualDays) {
                    durationText = `${exactlyAsSpecified} (${activeDurationBtn.dataset.actualDays} ${days})`;
                }
            }


            const accommodationReviewItems = [];
            for (const itemId in selectedAccommodationsData) {
                let itemName = "Unknown Item";
                for (const category of accommodationCategories) {
                    const foundItem = category.items.find(i => i.id === itemId);
                    if (foundItem) { itemName = foundItem.name; break; }
                }
                accommodationReviewItems.push(`${selectedAccommodationsData[itemId]}x ${itemName}`);
            }
            const accommodationSummary = accommodationReviewItems.length > 0 ? accommodationReviewItems.join('<br/>') : 'None selected';

            const adultsVal = formContainer.querySelector("#adults")?.value || '0';
            const childrenVal = formContainer.querySelector("#children")?.value || '0';
            const specialRequestsVal = formContainer.querySelector("#special-requests")?.value || 'None';
            const firstNameVal = formContainer.querySelector("#First")?.value || '';
            const lastNameVal = formContainer.querySelector("#LastName")?.value || '';
            const emailVal = formContainer.querySelector("#Email")?.value || '';
            const phoneVal = formContainer.querySelector("#Phone")?.value || 'N/A';

            reviewInfo.innerHTML = `
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h3 style="margin: 0!important; font-size: 1.1em;">${reviewStayDates}</h3></div>
                    <p>${reviewTravelDates}: <span style="color: gray;">${dateRangeStr}</span></p>
                    <p>${reviewDurationOFStay}: <span style="color: gray;">${durationText}</span></p>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h3 style="margin: 0!important; font-size: 1.1em;">${reviewAccommodation}</h3></div>
                    <p>${reviewTypes}: <br/><span style="color: gray;">${accommodationSummary}</span></p>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h3 style="margin: 0!important; font-size: 1.1em;">${reviewTravelers}</h3></div>
                    <p>${reviewAdults}: <span style="color: gray;">${adultsVal}</span></p>
                    <p>${children}: <span style="color: gray;">${childrenVal}</span></p>
                    <p>${reviewSpecialRequests}: <span style="color: gray;">${specialRequestsVal}</span></p>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h3 style="margin: 0!important; font-size: 1.1em;">${titleContactInformation}</h3></div>
                    <p>${firstAndLastname}: <span style="color: gray;">${firstNameVal} ${lastNameVal}</span></p>
                    <p>${emailVF}: <span style="color: gray;">${emailVal}</span></p>
                    <p>${phoneNumber}: <span style="color: gray;">${phoneVal}</span></p>
                </div>
            `;
        }

        formContainer.addEventListener("click", function (event) {
            if (event.target.classList.contains("next")) {
                if (!validateStep()) return;
                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                }
            } else if (event.target.classList.contains("prev")) {
                 // The "Edit" button in the review step (step 6) should go back to step 1
                if (currentStep === 6 && event.target.textContent === edit) {
                    currentStep = 1; // Go back to the first step for editing
                } else if (currentStep > 1) {
                    currentStep--;
                }
                showStep(currentStep);
            }
        });
        
        function createChatBox() {
            const chatBox = document.createElement('div');
            chatBox.classList.add('chat-box');
            chatBox.innerHTML = `
                <div style="position: relative; display: flex; justify-content: center; align-items: center; height: 500px; width: 100%; flex-direction: column;">
                    <div style="display: flex; justify-content: center; height: 50px;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 40px; width: 38px; fill: black;">
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                        </svg>
                    </div>
                    <h3>${thankSubmission}</h3>
                    <p>${formSubmitted}<br/>${formTeam}</p>
                </div>`;
            formContainer.replaceWith(chatBox);
        }

        formContainer.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!validateStep()) return;

            const accommodationDataForSubmission = [];
            for (const itemId in selectedAccommodationsData) {
                let itemDetails = null;
                let itemCategoryType = "Unknown Category";
                for (const category of accommodationCategories) {
                    const foundItem = category.items.find(i => i.id === itemId);
                    if (foundItem) {
                        itemDetails = foundItem;
                        itemCategoryType = category.type;
                        break;
                    }
                }
                if (itemDetails) {
                    accommodationDataForSubmission.push({
                        id: itemDetails.id,
                        name: itemDetails.name,
                        category: itemCategoryType,
                        size: itemDetails.size,
                        people: itemDetails.people,
                        quantity: selectedAccommodationsData[itemId]
                    });
                }
            }
            
            let durationData = {};
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");

            if (rangeDurationRadio?.checked) {
                durationData = {
                    type: 'range',
                    fromDay: formContainer.querySelector("#fromDay")?.value || '',
                    tillDay: formContainer.querySelector("#tillDay")?.value || ''
                };
            } else if (activeDurationBtn) {
                 let selectedOption = activeDurationBtn.dataset.days;
                 if (selectedOption === "exact" && activeDurationBtn.dataset.actualDays) {
                     selectedOption = activeDurationBtn.dataset.actualDays; // Use the actual number of days
                 }
                durationData = { type: 'single', selectedOption: selectedOption };
            } else { // Default if somehow nothing is explicitly active for single selection type
                 durationData = { type: 'single', selectedOption: 'exact' }; // Or based on totalDays if available
            }


            const formData = {
                dates: {
                    start: selectedStartDate ? `${selectedStartDate.getFullYear()}-${String(selectedStartDate.getMonth() + 1).padStart(2, '0')}-${String(selectedStartDate.getDate()).padStart(2, '0')}` : '',
                    end: selectedEndDate ? `${selectedEndDate.getFullYear()}-${String(selectedEndDate.getMonth() + 1).padStart(2, '0')}-${String(selectedEndDate.getDate()).padStart(2, '0')}` : ''
                },
                duration: durationData,
                accommodation: accommodationDataForSubmission,
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
                console.warn("Voiceflow chat interface not found. Form data:", formData);
                // Fallback behavior if Voiceflow is not available
            }
            createChatBox();
        });

        showStep(currentStep);
        element.appendChild(formContainer);
        createCustomCalendar(); // Initialize the calendar for Step 1
    },
};
