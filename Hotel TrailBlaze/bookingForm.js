export const FormExtension = {
    name: 'Forms',
    type: 'response',
    match: ({ trace }) =>
        trace?.type === 'Book_Form' || (trace.payload && trace.payload?.name === 'Book_Form'),
    render: ({ trace, element }) => {
        const formContainer = document.createElement('form');
        formContainer.classList.add('form-container');
        let currentStep = 1;
        let selectedStartDate = null;
        let selectedEndDate = null;
        const {
            titleChooseYourStay, undertitleChooseYourStay, noDatesSelected, selected,
            undertitleChooseYourStay2, selectDuration, exactlyAsSpecified, threeDays, fourDays,
            fiveDays, sixDays, sevenDays, eightDays, nineDays, tenDays, enterExactDates,
            from, until, youCanChoose, days, day, maxDaysAllowedText, titlePickAccommodation, undertitlePickAccommodation, FormSuites, FormRooms,
            accommodationPeople1_2, accommodationPeople1_3, accommodationPeople1_4, accommodationSize28, accommodationSize30,
            accommodationSize60, accommodationSize72, priceAcqua, priceMeranO, priceLoggia, priceVitaSuite, priceSuite, priceCallaSuite, priceCedro, priceDoppelzimmerSuperior, priceDoppelzimmerStandard, priceDoppelzimmerStandardJunior,
            titleWhoTraveling, undertitleWhoTraveling, adults14Plus, children, specialRequests,
            specialRequestsTxt, titleContactInformation, undertitleContactInformationBooking,
            firstName, lastName, emailVF, phoneNumber, next, back, titleReview,
            undertitleReviewBooking, reviewStayDates, reviewTravelDates, reviewDurationOFStay,
            reviewAccommodation, reviewTypes, reviewTravelers, reviewAdults, reviewSpecialRequests,
            edit, submit, firstAndLastname, thankSubmission, formSubmitted, formTeam,
            accommodationCategories
        } = trace.payload;

        const suitesCategoryImageUrl = 'https://cm4-production-assets.s3.amazonaws.com/1743412467586-suite-1.png';
        const roomsCategoryImageUrl = 'https://cm4-production-assets.s3.amazonaws.com/1743412426951-screenshot-2025-01-12-212108.png';

        const suitesData = [
            { id: 'suite_01', name: 'Presidential Suite', imageSrc: 'https://cm4-production-assets.s3.amazonaws.com/1743412467586-suite-1.png', description1: accommodationSize60, description2: accommodationPeople1_4, description3: priceVitaSuite },
            { id: 'suite_02', name: 'Royal Suite', imageSrc: 'https://cm4-production-assets.s3.amazonaws.com/1743412475967-suite-2.png', description1: accommodationSize60, description2: accommodationPeople1_4, description3: priceSuite },
            { id: 'suite_03', name: 'Panorama Suite', imageSrc: 'https://cm4-production-assets.s3.amazonaws.com/1743412482837-suite.png', description1: accommodationSize72, description2: accommodationPeople1_4, description3: priceCallaSuite },
        ];

        const roomsData = [
            { id: 'room_01', name: 'Premium Room', imageSrc: 'https://cm4-production-assets.s3.amazonaws.com/1743412426951-screenshot-2025-01-12-212108.png', description1: accommodationSize30, description2: accommodationPeople1_3, description3: priceAcqua },
            { id: 'room_02', name: 'Deluxe Room', imageSrc: 'https://cm4-production-assets.s3.amazonaws.com/1743412436301-screenshot-2025-01-12-212321.png', description1: accommodationSize30, description2: accommodationPeople1_3, description3: priceMeranO },
            { id: 'room_03', name: 'Superior Room', imageSrc: 'https://cm4-production-assets.s3.amazonaws.com/1743412443481-screenshot-2025-01-12-213453.png', description1: accommodationSize30, description2: accommodationPeople1_3, description3: priceLoggia },
            { id: 'room_04', name: 'Signature Room', imageSrc: 'https://cm4-production-assets.s3.amazonaws.com/1743412450111-screenshot-2025-01-12-214111.png', description1: accommodationSize28, description2: accommodationPeople1_2, description3: priceCedro },
            { id: 'room_05', name: 'Executive Room', imageSrc: 'https://i.postimg.cc/d1Sbjqym/6ca0df66-b4f3-415d-b3b8-c8d1552859a7.png', description1: accommodationSize30, description2: accommodationPeople1_3, description3: priceDoppelzimmerSuperior },
            { id: 'room_06', name: 'Alpine Room', imageSrc: 'https://i.postimg.cc/hPbqHqWg/7e2e5cf4-f790-42e3-af82-4d57ab5bb414.png', description1: accommodationSize30, description2: accommodationPeople1_3, description3: priceDoppelzimmerStandard },
            { id: 'room_07', name: 'Classic Room', imageSrc: 'https://i.postimg.cc/zGX46bFS/03360da3-4f10-4cd5-9bd0-dc128263bca7.png', description1: accommodationSize28, description2: accommodationPeople1_2, description3: priceDoppelzimmerStandardJunior },
        ];

        let currentAccommodationViewInStep3 = 'categories';

        formContainer.innerHTML = `
            <style>
            .form-container {
                font-family: "UCity Pro", sans-serif; width: 100%; background: #fff; padding: 20px; border-radius: 5px;
            }
            .steps {
                display: flex; justify-content: space-between; padding: 10px 0; background: #fff; font-family: "UCity Pro", sans-serif;
            }
            .step-indicator {
                flex: 1; text-align: center; padding: 10px; font-weight: bold; color: #8b8686; background: #fff; border-radius: 5px; font-family: "UCity Pro", sans-serif;
            }
            .step-indicator.active span { background: black !important; color: white; font-family: "UCity Pro", sans-serif; }
            ._1ddzqsn7 { width: 100% !important; }
            .active{ color: black!important; }
            .active span { background: black; color: white; }
            input, textarea {
                width: 100%; padding: 10px; margin: 10px 0; border-radius: 10px; border: 1px solid #ccc; outline: none; font-family: "UCity Pro", sans-serif; box-sizing: border-box;
            }
            input:hover, textarea:hover{ border: 1px solid black; }
            h2, label, input, textarea, button { font-family: "UCity Pro", sans-serif; }
            .steps { position: relative; width: 100%; }

            .step-1 .bord2{
                position: absolute; border: 2px solid #e1dada; width: 100%; left: 0; top: 80px;
            }
            .step-1.active .bord, .step-2.active .bord{
                position: absolute; border: 2px solid black; width: 20%; left: 0; top: 80px;
            }
            .step-2.active .bord{
                display: block!important;
            }
            .step-3.active .bord{
                position: absolute; border: 2px solid black; width: 40%; left: 0; top: 80px;
            }
            .step-4.active .bord{
                position: absolute; border: 2px solid black; width: 60%; left: 0; top: 80px;
            }
            .step-5.active .bord{
                position: absolute; border: 2px solid black; width: 80%; left: 0; top: 80px;
            }
            .step-6.active .bord{
                position: absolute; border: 2px solid black; width: 100%; left: 0; top: 80px;
            }
            .visited span{ background: black!important; color: white; }
            .next, .prev {
                background: transparent; border: 1px solid gray; width: 150px; color: black; padding: 10px 25px; border-radius: 20px; cursor: pointer;
            }
            .next:hover, .prev:hover { background: #000; color: white; }
            .vfrc-message--extension-Forms{ background: white!important; }
            .step-content{margin-top: 28px;}
            .duration-btn { border: 1px solid gray; background-color: #fff; color: black; }
            .BtnSimp { border-radius: 8px; padding: 10px 25px; cursor: pointer; }
            .duration-btn.activeBtn { color: #fff; background: #000 !important; border-color: #000 !important; }
            .duration-btn:not(.disabled):hover { color: #fff; background: #000 !important; border-color: #000 !important; }
            .duration-btn.disabled {
                opacity: 0.5; cursor: not-allowed; background: #f5f5f5 !important; border: 1px solid #ddd !important; color: #999 !important;
            }
            .custom-radio-container {
                display: flex; align-items: center; cursor: pointer; padding: 5px 0; margin-bottom: 5px;
            }
            .custom-radio-container input[type="radio"][name="durationType"] {
                opacity: 0; position: absolute; width: 1px; height: 1px;
            }
            .custom-radio-square {
                width: 14px; height: 14px; border: 1px solid #888; margin-right: 8px; display: inline-block; background-color: #fff;
                transition: background-color 0.2s ease, border-color 0.2s ease; border-radius: 4px;
            }
            .custom-radio-container input[type="radio"][name="durationType"]:checked + .custom-radio-square {
                background-color: black; border-color: black;
            }
            .custom-radio-container .radio-label-text { font-weight: 500; font-family: "UCity Pro", sans-serif; }
            #quickDurationButtonsContainer, #rangeDurationInputContainer { transition: opacity 0.3s ease-in-out; }

            ul#accommodationListContainer {
                display: flex; flex-wrap: wrap; margin-top: 0; list-style-type: none;
                padding-left: 0px !important; gap: 15px;
                justify-content: flex-start;
            }
            ul#accommodationListContainer li {
                display: flex;
                flex-direction: column;
                margin: 0;
                flex-basis: calc(50% - 8px);
                border-radius: 12px;
                background-color: transparent;
                box-shadow: none;
                border: none;
                overflow: hidden;
                transition: background-color 0.3s ease;
                padding: 0;
            }
            ul#accommodationListContainer li:hover {
                background-color: #f5f5f5;
            }
            ul#accommodationListContainer li.selected-item {
                background-color: #e0e0e0;
            }
            @media (max-width: 768px) { ul#accommodationListContainer li { flex-basis: calc(100% - 8px); } }

            input[type="checkbox"][id^="acc-myCheckbox"] { display: none; }

            ul#accommodationListContainer label {
                display: block;
                position: relative;
                cursor: pointer;
                text-align: center;
                padding: 10px;
                background-color: transparent;
                border: none;
                height: auto;
                box-sizing: border-box;
            }

            ul#accommodationListContainer label img {
                height: 170px;
                width: 100%;
                border-radius: 8px;
                display: block;
                margin-left: auto; margin-right: auto;
                object-fit: cover;
                transition: transform 0.3s ease;
                transform: scale(1);
            }
            ul#accommodationListContainer li:hover label img {
                transform: scale(1.03);
            }
            ul#accommodationListContainer label p {
                font-size: 13px;
                margin-top: 8px;
                text-align: left;
                padding: 0 5px;
                line-height: 1.4;
                color: #333;
            }

            .room-counter {
                margin: 0px auto 10px auto;
                display: none;
                justify-content: center;
                align-items: center;
                gap: 6px;
                padding-top: 5px;
            }
            input[type="checkbox"][id^="acc-myCheckbox"]:checked ~ .room-counter { display: flex; }

            .fieldinput{ margin-top: 0!important; }
            .custom-calendar { width: 100%; margin-top: 20px; font-family: "UCity Pro", sans-serif; }
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
            .input-wrapper { position: relative; margin: 5px 0; }
            #rangeDurationInputContainer .input-wrapper input[type="number"] {
                border: 1px solid gray; border-radius: 6px; width: 80px !important; margin: 0;
                height: 34px; text-align: right; box-sizing: border-box; padding: 0 10px;
            }
             #rangeDurationInputContainer .input-wrapper label {
                position: absolute; top: -0.7em; z-index: 1; left: 0.8em;
                background-color: white; padding: 0 5px; font-size: 11px; color: #666;
            }
            b{ font-size: 13px!important; }
            ul#accommodationListContainer label p b { font-size: inherit; }

            .counter-btn {
                width: 25px; height: 25px; border-radius: 50%; background: #f5f5f5; border: 1px solid #ddd;
                cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px;
            }
            input[type="checkbox"][id^="acc-myCheckbox"]:checked ~ .room-counter .counter-btn { display: flex !important; }
            .counter-btn:hover { background: #e0e0e0; }
            .room-quantity { border: 1px solid #ddd; border-radius: 5px; padding: 5px; text-align: center; width: 60px; }

            #accommodation-categories {
                display: flex; justify-content: space-between;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 20px;
            }
            .category-selector {
                cursor: pointer; padding: 15px; border-radius: 12px;
                width: calc(50% - 5px);
                background-color: #fff; box-sizing: border-box; overflow: hidden;
                transition: background-color 0.3s ease;
            }
            .category-selector:hover {
                background-color: #f5f5f5;
            }
            .category-selector img {
                width: 100%;
                height: 220px;
                border-radius: 8px; object-fit: cover; margin-bottom: 10px;
                transition: transform 0.3s ease;
            }
            .category-selector:hover img {
                transform: scale(1.05);
            }
            .category-selector h3 {
                margin-top: 10px; margin-bottom: 5px;
                font-size: 16px;
                font-weight: normal; color: #333;
                text-align: left; font-family: "UCity Pro", sans-serif;
            }
            @media (min-width: 601px) {
                 #accommodation-categories:has(.category-selector:nth-child(1):last-child) .category-selector {
                    width: calc(100% - 30px);
                    margin-left: auto;
                    margin-right: auto;
                 }
            }
            @media (max-width: 600px) {
                .category-selector {
                    width: calc(100% - 20px);
                    margin-left: 10px; margin-right: 10px;
                }
                #accommodation-categories {
                    justify-content: center;
                }
            }
            .back-to-categories-btn-container {
                margin-bottom: 20px; text-align: left;
            }
            .back-to-categories-btn {
                background: none; border: none; padding: 5px 0; color: #555; cursor: pointer;
                font-size: 14px; display: inline-flex; align-items: center;
                font-family: "UCity Pro", sans-serif; text-decoration: none; width: auto;
                border-radius: 0; font-weight: 500;
            }
            .back-to-categories-btn svg {
                width: 1em; height: 1em; margin-right: 8px; fill: currentColor;
            }
            .back-to-categories-btn:hover {
                color: #000; text-decoration: underline; background: none;
            }

            .step-4 > div:nth-child(4) {
                margin-bottom: 25px;
            }
            .step-4 > div:nth-child(5) {
                margin-bottom: 30px;
            }
            .step-4 label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                text-align: left !important;
            }
            .step-4 input[type="number"],
            .step-4 textarea {
                margin-top: 0;
            }

            .step-5 > div:nth-child(4) {
                margin-bottom: 25px;
            }
            .step-5 > div:nth-child(5) {
                margin-bottom: 25px;
            }
            .step-5 label {
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                text-align: left !important;
            }

            </style>
            <div class="steps" style="display: flex; gap: 30px; justify-content: space-around; width: 100%;">
                <style>.vfrc-message--extension-Forms{ background: white!important; }</style>
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

                    <div style="margin-bottom: 20px;">
                        <label class="custom-radio-container">
                            <input type="radio" id="ButtonSelection" name="durationType" value="single" checked>
                            <span class="custom-radio-square"></span>
                            <span class="radio-label-text">${selectDuration}:</span>
                        </label>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 5px; padding-left: 22px;" id="quickDurationButtonsContainer">
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

                    <div style="margin-top: 20px;">
                        <label class="custom-radio-container">
                            <input type="radio" id="rangeDuration" name="durationType" value="range">
                            <span class="custom-radio-square"></span>
                            <span class="radio-label-text">${enterExactDates}:</span>
                        </label>
                        <div style="margin-top: 5px; padding-left: 22px;" id="rangeDurationInputContainer">
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <div class="input-wrapper">
                                    <label for="fromDay">${from}</label>
                                    <input type="number" id="fromDay" name="fromDay" min="2" value="2">
                                </div>
                                <div class="input-wrapper">
                                    <label for="tillDay">${until}</label>
                                    <input type="number" id="tillDay" name="tillDay" min="2" value="2">
                                </div>
                                <span id="maxRangeNote" style="margin-left: 10px; color: #666; font-size: 12px;"></span>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 30px;">
                        <button type="button" class="prev">${back}</button>
                        <button type="button" class="next">${next}</button>
                    </div>
                </div>
                <div class="step step-3" style="display: none;">
                    <style> .vfrc-message--extension-Forms{width: 100%!important;}</style>
                    <h2 style="margin: 0!important;">${titlePickAccommodation}</h2>
                    <p style="margin: 7px 0px!important;">${undertitlePickAccommodation}</p><br/>
                    <div id="step3-dynamic-content">
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 30px; margin-top: 17px;">
                        <button type="button" class="prev">${back}</button>
                        <button type="button" class="next">${next}</button>
                    </div>
                </div>
                <div class="step step-4" style="display: none;">
                    <h2 style="margin: 0!important;">${titleWhoTraveling}</h2>
                    <p style="margin: 7px 0px!important;">${undertitleWhoTraveling}</p><br/>
                    <div style="display: flex; gap: 30px; justify-content: space-between;">
                        <div style="width: 45%;">
                            <label for="adults">${adults14Plus}*</label>
                            <input type="number" id="adults" name="adults" min="1" value="1" required/>
                        </div>
                        <div style="width: 45%;">
                            <label for="children">${children}</label>
                            <input type="number" id="children" name="children" min="0" value="0"/>
                        </div>
                    </div>
                    <div>
                        <label for="special-requests">${specialRequests}</label>
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
                            <label for="First">${firstName}*</label>
                            <input type="text" id="First" name="First" class="FirstName fieldinput" required/>
                        </div>
                        <div style="width: 45%;">
                            <label for="LastName">${lastName}*</label>
                            <input type="text" id="LastName" name="LastName" class="LastName fieldinput" required/>
                        </div>
                    </div>
                    <div>
                        <label for="Email">${emailVF}*</label>
                        <input type="email" id="Email" name="Email" class="Email fieldinput" required/>
                    </div>
                    <div>
                        <label for="Phone">${phoneNumber}</label>
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
                const header = document.createElement('div');
                header.className = 'calendar-header';
                const titleEl = document.createElement('div');
                titleEl.className = 'calendar-title';
                titleEl.textContent = new Date(year, month).toLocaleDateString(trace.payload.locale || 'en-US', { month: 'long', year: 'numeric' });
                const nav = document.createElement('div');
                nav.className = 'calendar-nav';
                const prevBtn = document.createElement('button');
                prevBtn.innerHTML = '&lt;';
                prevBtn.addEventListener('click', () => {
                    if (month === 0) { month = 11; year--; } else { month--; }
                    renderCalendar(month, year);
                });
                const nextBtn = document.createElement('button');
                nextBtn.innerHTML = '&gt;';
                nextBtn.addEventListener('click', () => {
                    if (month === 11) { month = 0; year++; } else { month++; }
                    renderCalendar(month, year);
                });
                nav.appendChild(prevBtn); nav.appendChild(nextBtn);
                header.appendChild(titleEl); header.appendChild(nav);
                calendarContainer.appendChild(header);
                const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const grid = document.createElement('div');
                grid.className = 'calendar-grid';
                dayNames.forEach(day => {
                    const dayHeader = document.createElement('div');
                    dayHeader.className = 'calendar-day-header'; dayHeader.textContent = day;
                    grid.appendChild(dayHeader);
                });
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                for (let i = 0; i < firstDay; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'calendar-day empty'; grid.appendChild(emptyDay);
                }
                const today = new Date();
                today.setHours(0,0,0,0);

                for (let day = 1; day <= daysInMonth; day++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day'; dayElement.textContent = day;
                    const date = new Date(year, month, day);
                     date.setHours(0,0,0,0);

                    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                        dayElement.classList.add('today');
                    }
                    if (date < today) {
                        dayElement.classList.add('disabled');
                    } else {
                        dayElement.addEventListener('click', () => selectDate(new Date(year, month, day)));
                    }
                    if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) {
                        dayElement.classList.add('selected-start');
                    } else if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) {
                        dayElement.classList.add('selected-end');
                    } else if (selectedStartDate && selectedEndDate && date > selectedStartDate && date < selectedEndDate) {
                        dayElement.classList.add('in-range');
                    }
                    grid.appendChild(dayElement);
                }
                calendarContainer.appendChild(grid);
            }

            function selectDate(date) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (date < today) return;

                currentMonth = date.getMonth();
                currentYear = date.getFullYear();

                if (!selectedStartDate || (selectedStartDate && selectedEndDate) || date < selectedStartDate) {
                    selectedStartDate = date;
                    selectedEndDate = null;
                } else {
                    selectedEndDate = date;
                }
                updateDateRangeDisplay();
                renderCalendar(currentMonth, currentYear);
            }

            function updateDateRangeDisplay() {
                if (!selectedStartDate) {
                    dateRangeDisplay.innerHTML = `<span>${noDatesSelected}</span>`; return;
                }
                const startDateStr = selectedStartDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                if (!selectedEndDate) {
                    dateRangeDisplay.innerHTML = `<span>${selected}: ${startDateStr}</span>`;
                } else {
                    const endDateStr = selectedEndDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    dateRangeDisplay.innerHTML = `<span>${selected}: ${startDateStr} - ${endDateStr}</span>`;
                }
            }
            renderCalendar(currentMonth, currentYear);
            updateDateRangeDisplay();
        }
        function setupRoomCounters(containerElement) {
            const checkboxes = containerElement.querySelectorAll('input[type="checkbox"][id^="acc-myCheckbox"]');
            checkboxes.forEach(checkbox => {
                const listItem = checkbox.closest('li');
                const counter = listItem.querySelector('.room-counter');
                const incrementBtn = counter.querySelector('.increment');
                const decrementBtn = counter.querySelector('.decrement');
                const quantityInput = counter.querySelector('.room-quantity');

                const updateItemSelection = () => {
                    if (listItem) {
                        listItem.classList.toggle('selected-item', checkbox.checked);
                    }
                    counter.style.display = checkbox.checked ? 'flex' : 'none';
                };

                checkbox.addEventListener('change', updateItemSelection);

                if (checkbox.checked) {
                    if (listItem) listItem.classList.add('selected-item');
                    counter.style.display = 'flex';
                } else {
                    if (listItem) listItem.classList.remove('selected-item');
                    counter.style.display = 'none';
                }

                incrementBtn.addEventListener('click', function () {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                });
                decrementBtn.addEventListener('click', function () {
                    if (parseInt(quantityInput.value) > 1) {
                        quantityInput.value = parseInt(quantityInput.value) - 1;
                    }
                });
            });
        }
        function renderStep3DynamicContent() {
            const contentArea = formContainer.querySelector("#step3-dynamic-content");
            if (!contentArea) return;
            contentArea.innerHTML = '';

            if (currentAccommodationViewInStep3 === 'categories') {
                contentArea.innerHTML = `
                    <div id="accommodation-categories">
                        <div class="category-selector" data-category="suites">
                            <img src="${suitesCategoryImageUrl}" alt="${FormSuites || 'Suites'}">
                            <h3>${FormSuites || 'Suites'}</h3>
                        </div>
                        <div class="category-selector" data-category="rooms">
                            <img src="${roomsCategoryImageUrl}" alt="${FormRooms || 'Rooms'}">
                            <h3>${FormRooms || 'Rooms'}</h3>
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
                                            ${accommodationCategories || 'Accommodation categories'}
                                        </button>
                                     </div>`;
                itemsHtml += `<ul id="accommodationListContainer">`;
                itemsToRender.forEach(item => {
                    const checkboxId = `acc-myCheckbox-${item.id}`;
                    itemsHtml += `
                        <li>
                            <input type="checkbox" id="${checkboxId}" data-name="${item.name}" data-type="${currentAccommodationViewInStep3}"/>
                            <label for="${checkboxId}">
                                <img src="${item.imageSrc}" alt="${item.name}" />
                                <p style="text-align: left;">
                                    <b>${item.name}</b><br/>
                                    ${item.description1 || ''} <br/>
                                    ${item.description2 || ''} <br/>
                                    ${item.description3 || ''}
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
        function showStep(step) {
             steps.forEach((el, index) => {
                el.style.display = index === step - 1 ? "block" : "none";
                if (index < step - 1) {
                    stepIndicators[index]?.classList.add("visited");
                } else {
                    stepIndicators[index]?.classList.remove("visited");
                }
            });

            stepIndicators.forEach((el, index) => {
                 const targetIndicator = formContainer.querySelector(`.step-indicator.step-${step}`);
                 stepIndicators.forEach(ind => ind.classList.remove("active"));
                 if(targetIndicator) targetIndicator.classList.add("active");
            });

            if (step === 1) createCustomCalendar();
            if (step === 2) updateStep2();
            if (step === 3) renderStep3DynamicContent();
            if (step === 6) updateReviewInfo();
        }
        function updateStep2() {
            if (currentStep !== 2) return;
            const dateRangeDisplay = formContainer.querySelector("#selectedDateRange");
            const durationBtns = Array.from(formContainer.querySelectorAll(".duration-btn"));
            const fromDayInput = formContainer.querySelector("#fromDay");
            const tillDayInput = formContainer.querySelector("#tillDay");
            const maxRangeNote = formContainer.querySelector("#maxRangeNote");

            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            const quickButtonsContainer = formContainer.querySelector('#quickDurationButtonsContainer');
            const rangeInputContainer = formContainer.querySelector('#rangeDurationInputContainer');

            if (!selectedStartDate || !selectedEndDate) {
                dateRangeDisplay.textContent = "Please select travel dates first.";
                if (quickButtonsContainer) quickButtonsContainer.style.opacity = '0.5';
                if (rangeInputContainer) rangeInputContainer.style.opacity = '0.5';
                durationBtns.forEach(btn => { btn.disabled = true; btn.classList.add("disabled"); });
                fromDayInput.disabled = true;
                tillDayInput.disabled = true;
                return;
            }

            const timeDiff = selectedEndDate.getTime() - selectedStartDate.getTime();
            const totalDays = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1);

            const startStr = selectedStartDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const endStr = selectedEndDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            dateRangeDisplay.textContent = `${startStr} - ${endStr}`;

            fromDayInput.max = totalDays;
            tillDayInput.max = totalDays;
            fromDayInput.min = 2;
            tillDayInput.min = 2;

            if (rangeDurationRadio.checked || (!singleDurationRadio.checked && !rangeDurationRadio.checked)) {
                let currentFrom = parseInt(fromDayInput.value);
                if (isNaN(currentFrom) || currentFrom < 2) { 
                    fromDayInput.value = 2; 
                }
                if (parseInt(fromDayInput.value) > totalDays) { 
                    fromDayInput.value = totalDays; 
                }
                if (parseInt(fromDayInput.value) < 2 && totalDays >=2 ) { // If totalDays brought it below 2, but totalDays allows 2
                    fromDayInput.value = 2;
                } else if (parseInt(fromDayInput.value) < 2 && totalDays < 2) { // if totalDays is 1, fromDay value must be 1
                     fromDayInput.value = totalDays; // This will make it 1 if totalDays is 1
                }


                let currentTill = parseInt(tillDayInput.value);
                if (isNaN(currentTill) || currentTill < 2) { 
                    tillDayInput.value = 2;
                }
                if (parseInt(tillDayInput.value) > totalDays) { 
                    tillDayInput.value = totalDays; 
                }
                 if (parseInt(tillDayInput.value) < 2 && totalDays >=2) {
                    tillDayInput.value = 2;
                } else if (parseInt(tillDayInput.value) < 2 && totalDays < 2) {
                    tillDayInput.value = totalDays;
                }
            }
            
            if (maxDaysAllowedText) {
                maxRangeNote.textContent = maxDaysAllowedText.replace('{totalDays}', totalDays);
            } else {
                maxRangeNote.textContent = `${youCanChoose || "Sie können maximal"} ${totalDays} ${days || "Tage"}`;
            }

            const updateInputStates = () => {
                const isSingleActive = singleDurationRadio.checked;

                if (quickButtonsContainer) quickButtonsContainer.style.opacity = isSingleActive ? '1' : '0.5';
                if (rangeInputContainer) rangeInputContainer.style.opacity = isSingleActive ? '0.5' : '1';

                durationBtns.forEach(btn => {
                    let isDisabledByTotalDays = false;
                    if (btn.dataset.days !== "exact") {
                        const daysNum = parseInt(btn.dataset.days);
                        isDisabledByTotalDays = daysNum > totalDays;
                    }
                    btn.disabled = !isSingleActive || isDisabledByTotalDays;
                    btn.classList.toggle("disabled", !isSingleActive || isDisabledByTotalDays);
                    if (!isSingleActive) {
                        btn.classList.remove("activeBtn");
                    }
                });

                fromDayInput.disabled = isSingleActive;
                tillDayInput.disabled = isSingleActive;
            };

            singleDurationRadio.addEventListener("change", updateInputStates);
            rangeDurationRadio.addEventListener("change", updateInputStates);

            durationBtns.forEach(btn => {
                btn.addEventListener("click", function () {
                    if (!singleDurationRadio.checked) {
                        singleDurationRadio.checked = true;
                        singleDurationRadio.dispatchEvent(new Event('change', { bubbles: true }));
                    } else if (btn.disabled) {
                        return;
                    }
                    durationBtns.forEach(b => b.classList.remove("activeBtn"));
                    btn.classList.add("activeBtn");
                });
            });

            const autoSwitchToRange = () => {
                if (!rangeDurationRadio.checked) {
                    rangeDurationRadio.checked = true;
                    rangeDurationRadio.dispatchEvent(new Event('change', { bubbles: true }));
                }
            };
            fromDayInput.addEventListener('focus', autoSwitchToRange);
            tillDayInput.addEventListener('focus', autoSwitchToRange);
            fromDayInput.addEventListener('input', autoSwitchToRange);
            tillDayInput.addEventListener('input', autoSwitchToRange);

            updateInputStates();
        }
        function validateStep() {
             if (!steps[currentStep - 1]) return true;
            const currentInputs = steps[currentStep - 1].querySelectorAll("input[required], textarea[required]");
            for (let input of currentInputs) {
                if (!input.checkValidity()) {
                    alert(`Please fill in the required field: ${input.labels?.[0]?.textContent || input.name}`);
                    input.focus();
                    return false;
                }
            }

            if (currentStep === 1 && (!selectedStartDate || !selectedEndDate)) {
                alert("Please select a valid date range.");
                return false;
            }
            if (currentStep === 3) {
                if (currentAccommodationViewInStep3 === 'categories') {
                    alert("Please select a category (Suites or Rooms) and then choose an accommodation.");
                    return false;
                }
                const selectedAccommodations = formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked');
                if (selectedAccommodations.length === 0) {
                    alert("Please select at least one accommodation type.");
                    return false;
                }
            }
           if (currentStep === 2) {
                const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
                const rangeDurationRadio = formContainer.querySelector("#rangeDuration");

                if (singleDurationRadio.checked) {
                    const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");
                    if (!activeDurationBtn) {
                        alert("Please select a duration option.");
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
                        errorMessage = `${from || 'From'} ${day || 'day'} value is invalid. It must be between ${minDayVal} and ${totalDaysForRange}.`;
                    } else if (isNaN(tillDayVal) || tillDayVal < parseInt(tillDayInputEl.min) || tillDayVal > totalDaysForRange) {
                        errorMessage = `${until || 'Until'} ${day || 'day'} value is invalid. It must be between ${parseInt(tillDayInputEl.min)} and ${totalDaysForRange}.`;
                    } else if (fromDayVal >= tillDayVal) { 
                        errorMessage = `${from || 'From'} ${day || 'day'} must be less than ${until || 'Until'} ${day || 'day'}.`;
                    }
    
                    if (errorMessage) {
                        alert(errorMessage);
                        return false;
                    }
                }
            }
            return true;
        }
        function updateReviewInfo() {
            if (!reviewInfo) return;
            const accommodationTypes = [];
            const checkboxes = formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked');
            checkboxes.forEach(checkbox => {
                const listItem = checkbox.closest('li');
                if (!listItem) return;
                const label = listItem.querySelector(`label[for="${checkbox.id}"]`);
                const quantityInput = listItem.querySelector('.room-quantity');
                if (label && quantityInput) {
                    const typeName = label.querySelector('b')?.textContent.trim() || 'Unknown Room';
                    const quantity = quantityInput.value || '1';
                    accommodationTypes.push(`${quantity}x ${typeName}`);
                }
            });
            let dateRangeStr = "Not selected";
            if (selectedStartDate && selectedEndDate) {
                const startStr = selectedStartDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const endStr = selectedEndDate.toLocaleDateString(trace.payload.locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                dateRangeStr = `${startStr} to ${endStr}`;
            }
            const fromDayInputVal = formContainer.querySelector("#fromDay")?.value;
            const tillDayInputVal = formContainer.querySelector("#tillDay")?.value;
            const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
            const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
            const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");
            let durationText = "Not specified";
            if (rangeDurationRadio?.checked) {
                durationText = `${from || 'From'} ${day || 'day'} ${fromDayInputVal || 'N/A'} ${until || 'to'} ${day || 'day'} ${tillDayInputVal || 'N/A'}`;
            } else if (activeDurationBtn) {
                durationText = activeDurationBtn.textContent;
            } else if (singleDurationRadio?.checked) {
                 const exactBtn = Array.from(formContainer.querySelectorAll(".duration-btn")).find(b => b.dataset.days === "exact");
                 durationText = exactBtn ? exactBtn.textContent : "As specified";
            }
            const reviewFirstName = formContainer.querySelector("#First")?.value || '';
            const reviewLastName = formContainer.querySelector("#LastName")?.value || '';
            const reviewEmail = formContainer.querySelector("#Email")?.value || '';
            const reviewPhone = formContainer.querySelector("#Phone")?.value || '';
            reviewInfo.innerHTML = `
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h2 style="margin: 0!important;">${reviewStayDates}</h2></div>
                    <div><p>${reviewTravelDates}<br/> <span style="color: gray;">${dateRangeStr}</span></p></div>
                    <div><p>${reviewDurationOFStay}<br/> <span style="color: gray;">${durationText}</span></p></div>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h2 style="margin: 0!important;">${reviewAccommodation}</h2></div>
                    <div><p>${reviewTypes}<br/> <span style="color: gray;">${accommodationTypes.length > 0 ? accommodationTypes.join('<br/>') : 'None selected'}</span></p></div>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h2 style="margin: 0!important;">${reviewTravelers}</h2></div>
                    <div><p>${reviewAdults}<br/> <span style="color: gray;">${formContainer.querySelector("#adults")?.value || ''}</span></p></div>
                    <div><p>${children}<br/> <span style="color: gray;">${formContainer.querySelector("#children")?.value || ''}</span></p></div>
                    <div><p>${reviewSpecialRequests}<br/> <span style="color: gray;">${formContainer.querySelector("#special-requests")?.value || 'None'}</span></p></div>
                </div>
                <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
                    <div><h2 style="margin: 0!important;">${titleContactInformation}</h2></div>
                    <div><p>${firstAndLastname}<br/> <span style="color: gray;">${reviewFirstName} ${reviewLastName}</span></p></div>
                    <div><p>${emailVF}<br/> <span style="color: gray;">${reviewEmail}</span></p></div>
                    <div><p>${phoneNumber}<br/> <span style="color: gray;">${reviewPhone}</span></p></div>
                </div>
            `;
        }
        function createChatBox() {
            const chatBox = document.createElement('div');
            chatBox.classList.add('chat-box');
            chatBox.innerHTML = `
                <style>
                    .vfrc-message--extension-Forms{ width: 100%; background: #fff; }
                    .chat-box h3, .chat-box p { font-family: "UCity Pro", sans-serif; }
                </style>
                <div style="position: relative; display: flex; justify-content: center; align-items: center; height: 500px; width: 100%; flex-direction: column;">
                    <div style="position: relative; color: black; text-align: center;">
                        <div style="display: flex; justify-content: center; height: 50px;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 40px; width: 38px; fill: black;">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                            </svg>
                        </div>
                        <h3>${thankSubmission}</h3>
                        <p>${formSubmitted}<br/>${formTeam}</p>
                    </div>
                </div>`;
            formContainer.replaceWith(chatBox);
        }

        formContainer.addEventListener("click", function (event) {
             if (event.target.classList.contains("next")) {
                if (!validateStep()) return;
                if (currentStep === 5) {
                    updateReviewInfo();
                    currentStep++;
                    showStep(currentStep);
                } else {
                    currentStep++;
                    showStep(currentStep);
                }
            } else if (event.target.classList.contains("prev")) {
                currentStep--;
                showStep(currentStep);
            }
        });
        formContainer.addEventListener('submit', function (event) {
            event.preventDefault();
            if (!validateStep()) return;
            const accommodationList = [];
            const checkboxes = formContainer.querySelectorAll('#step3-dynamic-content input[type="checkbox"][id^="acc-myCheckbox"]:checked');
            checkboxes.forEach(checkbox => {
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
            const fromDayInput = formContainer.querySelector("#fromDay");
            const tillDayInput = formContainer.querySelector("#tillDay");
            if (singleDurationRadio?.checked && activeDurationBtn?.dataset.days) {
                durationData = { type: 'single', selectedOption: activeDurationBtn.textContent.trim(), days: activeDurationBtn.dataset.days };
            } else if (rangeDurationRadio?.checked) {
                durationData = { type: 'range', fromDay: fromDayInput?.value || '', tillDay: tillDayInput?.value || '' };
            } else if (singleDurationRadio?.checked) {
                const exactBtn = Array.from(formContainer.querySelectorAll(".duration-btn")).find(b => b.dataset.days === "exact");
                if(exactBtn && selectedStartDate && selectedEndDate) {
                    const timeDiff = selectedEndDate.getTime() - selectedStartDate.getTime();
                    const totalDaysInRange = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1);
                    durationData = { type: 'single', selectedOption: exactBtn.textContent.trim(), days: totalDaysInRange.toString() };
                } else {
                     durationData = { type: 'single', selectedOption: (exactBtn ? exactBtn.textContent.trim() : 'As specified'), days: ''};
                }
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
