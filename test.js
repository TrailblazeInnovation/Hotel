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
          .steps {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              background: #fff;
              font-family: "Host Grotesk", serif;
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
          .step-indicator.active span {
              background: black !important;
              color: white;
              font-family: "Host Grotesk", serif;
          }
          ._1ddzqsn7 {
              width: 100% !important;
          }
              .active{
              color: black!important;}
          .active span {
              background: black;
              color: white;
          }
          input, textarea {
              width: 100%;
              padding: 10px;
              margin: 10px 0;
              border-radius: 10px;
              border: 1px solid #ccc;
              outline: none;
              font-family: "Host Grotesk", serif;
          }
              input:hover, textarea:hover{
              border: 1px solid black;}
          .chat-box {
              width: 100%;
              padding: 20px;
              background: #fff;
              border-radius: 5px;
              margin-top: 20px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          }
          .chat-box h3 {
              margin: 0;
              font-size: 20px;
          }
          .chat-box p {
              margin: 10px 0 0;
              font-size: 16px;
          }
              h2, label, input, textarea, button {
              font-family: "Host Grotesk", serif;
          }
          .steps {
              position: relative;
              width: 100%;
          }
    
          .step-1 .bord2{
              position: absolute;
              border: 2px solid #e1dada;
              width: 100%;
              left: 0;
              top: 80px;
          }
         .step-1.active .bord, .step-2.active .bord{
          position: absolute;
          border: 2px solid black;
          width: 20%;
          left: 0;
          top: 80px;
         }

          .step-2.active .bord{
           display: block!important;
         }
    
          .step-3.active .bord{
          position: absolute;
          border: 2px solid black;
          width: 40%;
          left: 0;
          top: 80px;
         }
    
          .step-4.active .bord{
          position: absolute;
          border: 2px solid black;
          width: 60%;
          left: 0;
          top: 80px;
         }
          .step-5.active .bord{
          position: absolute;
          border: 2px solid black;
          width: 80%;
          left: 0;
          top: 80px;
         }

         .step-6.active .bord{
          position: absolute;
          border: 2px solid black;
          width: 100%;
          left: 0;
          top: 80px;
         }
          .visited span{
              background: black!important;
              color: white;
          } 
          .next, .prev{
              background: transparent;
              border: 1px solid gray; 
              width: 150px; 
              color: black; 
              padding: 10px 25px; 
              border-radius: 20px;
              cursor: pointer;
          }
          .next:hover, .prev:hover{
              background: #000; 
              color: white;
          }
              .vfrc-message--extension-Forms{
                background: white!important;
              }
                .step-content{margin-top: 28px;}
          .activeBtn{
              color: #fff;
              background: #000!important;
              border: 1px solid #000!important;
          }
              .duration-btn:hover{
              color: #fff;
              background: #000!important;
            }
          .BtnSimp{
              border-radius: 8px;
              padding: 10px 25px;
              cursor: pointer;
          }
              
                ul {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0;
        list-style-type: none;
        padding-left: 10px !important;
        gap: 8px;
        }
      
          li {
        display: inline-block;
        margin: 0;
        }
      
          input[type="checkbox"][id^="myCheckbox"] {
        display: none;
        }
      
          label {
        display: block;
        position: relative;
        cursor: pointer;
        text-align: center;
        border-radius: 14px;
        transition: background-color 0.3s ease;
        padding: 10px;
        background-color: transparent;
        }
      
          label:hover {
        background-color: rgba(0, 0, 0, 0.05);
        }
          
          input[type="checkbox"]:checked + label {
        background-color: rgba(0, 0, 0, 0.08);
        }            
          
          label img {
        height: 150px;
        width: 170px;
        border-radius: 11px;
        display: block;
        transition: transform 0.3s ease;
        }
      
          label:hover img {
        transform: scale(1.03);
        }
          
          input[type="checkbox"]:checked + label img {
        transform: none !important;
        }
          
          label p {
        font-size: 11px;
        margin-top: 8px;
        }
          
          .room-counter {
        margin-top: 8px;
        display: none;
        }
          
          input[type="checkbox"]:checked ~ .room-counter {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
        }

        
        .fieldinput{
        margin-top: 0!important;
        }
        
        /* Custom Calendar Styles */
        .custom-calendar {
            width: 100%;
            margin-top: 20px;
            font-family: "Host Grotesk", serif;
        }
        
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .calendar-title {
            font-weight: 600;
            font-size: 16px;
        }
        
        .calendar-nav {
            display: flex;
            gap: 10px;
        }
        
        .calendar-nav button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
            padding: 5px 10px;
            border-radius: 5px;
        }
        
        .calendar-nav button:hover {
            background: #f5f5f5;
        }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 0px;
        }
        
        .calendar-day-header {
            text-align: center;
            font-weight: 500;
            font-size: 12px;
            color: #666;
            padding: 5px 0;
        }
        
        .calendar-day {
            text-align: center;
            padding: 10px 5px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .calendar-day:hover {
            background: #f5f5f5;
        }
        
        .calendar-day.empty {
            visibility: hidden;
        }
        
        .calendar-day.today {
            font-weight: bold;
        }
        
        .calendar-day.selected-start, 
        .calendar-day.selected-end {
            background: black;
            color: white;
        }
        
        .calendar-day.in-range {
            background: #e0e0e0;
            border-radius: 0px;
        }
        
        .calendar-day.disabled {
            color: #ccc;
            cursor: not-allowed;
        }
        
        .date-range-display {
            margin-top: 15px;
            padding: 10px;
            background: #f5f5f7;
            border-radius: 5px;
            font-size: 14px;
        }
        
        .date-range-display span {
            color: #666;
        }
        .duration-btn{
            border-radius: 30px;
            background: #fff;
        }
        .duration-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background: #f5f5f5 !important;
            border-color: #ddd !important;
            color: #999 !important;
            border:none;
            outline: none;
        }

        .duration-btn.disabled:hover {
            background: #f5f5f5 !important;
            color: #999 !important;
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper input[type="number"] {
            border: 1px solid gray;
            border-radius: 6px;
            position: relative;
            width: 100px!important;
            margin: 10px;
            line-height: 6ex;
            height: 34px;
    text-align: right;
        }

        .input-wrapper label {
            position: absolute;
            top: -0.8ex;
            z-index: 1;
            left: 1em;
            background-color: white;
            padding: 0 5px;
        }
            b{
            font-size: 13px!important;
            }


            .room-counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.counter-btn {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #f5f5f5;
    border: 1px solid #ddd;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    display: none!important;
}

.counter-btn:hover {
    background: #e0e0e0;
}

.room-quantity {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
}
      </style>
      <div class="steps" style="display: flex; gap: 30px; justify-content: space-around; width: 100%;">
        <style>.vfrc-message--extension-Forms{
                background: white!important;
              }</style>
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
        
                <!-- Display selected date range -->
                <div id="selectedDateRange" style="margin-bottom: 20px; font-weight: 900; color: #000; font-size: 19px;"></div>
                
                <!-- Quick duration buttons -->
                <div style="margin-bottom: 20px;">
                    <input type="radio" id="ButtonSelection" name="durationType" checked value="single" style="width: auto!important">
                    <lable for="ButtonSelection"><p style="margin-bottom: 10px; font-weight: 500; display: contents;">${selectDuration}:</p></label>
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
    
                <!-- Manual duration selection -->
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
  <p style="margin: 7px 0!important;">${undertitlePickAccommodation}</p>

  <!-- 3A: Category selector -->
  <div
    id="categorySelector"
    style="display:flex; gap:20px; justify-content:center; margin-top:20px;"
  >
    <!-- Suites card -->
    <div
      class="category-card"
      data-category="suites"
      style="flex:1; cursor:pointer; text-align:center;"
    >
      <img
        src="https://your-url.com/big-suite.jpg"
        alt="Suites"
        style="width:100%; border-radius:8px;"
      />
      <p style="margin-top:8px; font-weight:600;">Suites</p>
    </div>

    <!-- Rooms card -->
    <div
      class="category-card"
      data-category="rooms"
      style="flex:1; cursor:pointer; text-align:center;"
    >
      <img
        src="https://your-url.com/big-room.jpg"
        alt="Rooms"
        style="width:100%; border-radius:8px;"
      />
      <p style="margin-top:8px; font-weight:600;">Rooms</p>
    </div>
  </div>

  <!-- 3B: Filtered list -->
  <div
    id="accommodationList"
    style="display:none; margin-top:20px;"
  >
    <!-- ← Back to category chooser -->
    <button
      type="button"
      id="backToCategories"
      class="prev"
      style="margin-bottom:10px;"
    >
      ← Back
    </button>

    <!-- ——— Suites ——— -->
    <ul
      id="suiteItems"
      style="display:none; flex-wrap:wrap; gap:8px; list-style:none; padding:0;"
    >
      <li>
        <input type="checkbox" id="myCheckbox1" />
        <label for="suiteCheckbox1">
          <img
            src="https://your-url.com/suite1.jpg"
            alt="Presidential Suite"
            style="height:150px; width:170px; border-radius:11px;"
          />
          <p style="text-align:left; font-size:11px; margin-top:8px;">
            <b>Presidential Suite</b><br/>
            60 mq<br/>
            Fino a 4 persone
          </p>
        </label>
        <div class="room-counter" style="display:none; margin-top:5px;">
          <button class="counter-btn decrement" type="button">-</button>
          <input
            type="number"
            class="room-quantity"
            min="1"
            value="1"
            style="width:60px; text-align:center;"
          />
          <button class="counter-btn increment" type="button">+</button>
        </div>
      </li>
      <li>
        <input type="checkbox" id="suiteCheckbox2" />
        <label for="suiteCheckbox2">
          <img
            src="https://your-url.com/suite2.jpg"
            alt="Garden Suite"
            style="height:150px; width:170px; border-radius:11px;"
          />
          <p style="text-align:left; font-size:11px; margin-top:8px;">
            <b>Garden Suite</b><br/>
            45 mq<br/>
            Fino a 3 persone
          </p>
        </label>
        <div class="room-counter" style="display:none; margin-top:5px;">
          <button class="counter-btn decrement" type="button">-</button>
          <input
            type="number"
            class="room-quantity"
            min="1"
            value="1"
            style="width:60px; text-align:center;"
          />
          <button class="counter-btn increment" type="button">+</button>
        </div>
      </li>
      <li>
        <input type="checkbox" id="suiteCheckbox3" />
        <label for="suiteCheckbox3">
          <img
            src="https://your-url.com/suite3.jpg"
            alt="Penthouse Suite"
            style="height:150px; width:170px; border-radius:11px;"
          />
          <p style="text-align:left; font-size:11px; margin-top:8px;">
            <b>Penthouse Suite</b><br/>
            70 mq<br/>
            Fino a 5 persone
          </p>
        </label>
        <div class="room-counter" style="display:none; margin-top:5px;">
          <button class="counter-btn decrement" type="button">-</button>
          <input
            type="number"
            class="room-quantity"
            min="1"
            value="1"
            style="width:60px; text-align:center;"
          />
          <button class="counter-btn increment" type="button">+</button>
        </div>
      </li>
    </ul>

    <!-- ——— Rooms ——— -->
    <ul
      id="roomItems"
      style="display:none; flex-wrap:wrap; gap:8px; list-style:none; padding:0;"
    >
      <li>
        <input type="checkbox" id="myCheckbox1" />
        <label for="roomCheckbox1">
          <img
            src="https://your-url.com/room1.jpg"
            alt="Deluxe Room"
            style="height:150px; width:170px; border-radius:11px;"
          />
          <p style="text-align:left; font-size:11px; margin-top:8px;">
            <b>Deluxe Room</b><br/>
            25 mq<br/>
            Ideale per 1–2 persone
          </p>
        </label>
        <div class="room-counter" style="display:none; margin-top:5px;">
          <button class="counter-btn decrement" type="button">-</button>
          <input
            type="number"
            class="room-quantity"
            min="1"
            value="1"
            style="width:60px; text-align:center;"
          />
          <button class="counter-btn increment" type="button">+</button>
        </div>
      </li>
      <li>
        <input type="checkbox" id="roomCheckbox2" />
        <label for="roomCheckbox2">
          <img
            src="https://your-url.com/room2.jpg"
            alt="Executive Room"
            style="height:150px; width:170px; border-radius:11px;"
          />
          <p style="text-align:left; font-size:11px; margin-top:8px;">
            <b>Executive Room</b><br/>
            30 mq<br/>
            Ideale per 1–3 persone
          </p>
        </label>
        <div class="room-counter" style="display:none; margin-top:5px;">
          <button class="counter-btn decrement" type="button">-</button>
          <input
            type="number"
            class="room-quantity"
            min="1"
            value="1"
            style="width:60px; text-align:center;"
          />
          <button class="counter-btn increment" type="button">+</button>
        </div>
      </li>
      <li>
        <input type="checkbox" id="roomCheckbox3" />
        <label for="roomCheckbox3">
          <img
            src="https://your-url.com/room3.jpg"
            alt="Family Room"
            style="height:150px; width:170px; border-radius:11px;"
          />
          <p style="text-align:left; font-size:11px; margin-top:8px;">
            <b>Family Room</b><br/>
            35 mq<br/>
            Ideale per 2–4 persone
          </p>
        </label>
        <div class="room-counter" style="display:none; margin-top:5px;">
          <button class="counter-btn decrement" type="button">-</button>
          <input
            type="number"
            class="room-quantity"
            min="1"
            value="1"
            style="width:60px; text-align:center;"
          />
          <button class="counter-btn increment" type="button">+</button>
        </div>
      </li>
      <li>
        <input type="checkbox" id="roomCheckbox4" />
        <label for="roomCheckbox4">
          <img
            src="https://your-url.com/room4.jpg"
            alt="Standard Room"
            style="height:150px; width:170px; border-radius:11px;"
          />
          <p style="text-align:left; font-size:11px; margin-top:8px;">
            <b>Standard Room</b><br/>
            20 mq<br/>
            Ideale per 1–2 persone
          </p>
        </label>
        <div class="room-counter" style="display:none; margin-top:5px;">
          <button class="counter-btn decrement" type="button">-</button>
          <input
            type="number"
            class="room-quantity"
            min="1"
            value="1"
            style="width:60px; text-align:center;"
          />
          <button class="counter-btn increment" type="button">+</button>
        </div>
      </li>
    </ul>

    <!-- Next/Prev buttons -->
    <div style="text-align:right; margin-top:20px;">
      <button type="button" class="prev">${back}</button>
      <button type="button" class="next">${next}</button>
    </div>
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

            // Function to toggle between Travel Date and Duration of Stay
            // function toggleDateOptions() {
            //     const firstSte = formContainer.querySelector("#firstSte");
            //     const secondSte = formContainer.querySelector("#secondSte");
            //     const bt1 = formContainer.querySelector("#bt1");
            //     const bt2 = formContainer.querySelector("#bt2");

            //     if (!firstSte || !secondSte || !bt1 || !bt2) return;

            //     if (firstSte.style.display !== "none") {
            //         // Switching to Duration of Stay
            //         firstSte.style.display = "none";
            //         secondSte.style.display = "block";
            //         bt1.classList.remove("activeBtn");
            //         bt2.classList.add("activeBtn");
            //     } else {
            //         // Switching to Travel Date
            //         firstSte.style.display = "block";
            //         secondSte.style.display = "none";
            //         bt1.classList.add("activeBtn");
            //         bt2.classList.remove("activeBtn");
            //     }
            // }

            // Set up event listeners for the toggle buttons
            const bt1 = formContainer.querySelector("#bt1");
            const bt2 = formContainer.querySelector("#bt2");

            // if (bt1 && bt2) {
            //     bt1.addEventListener("click", toggleDateOptions);
            //     bt2.addEventListener("click", toggleDateOptions);
            // }

            const steps = formContainer.querySelectorAll(".step");
            const stepIndicators = formContainer.querySelectorAll(".step-indicator");
            const reviewInfo = formContainer.querySelector("#review-info");

            // Custom Calendar Implementation
            function createCustomCalendar() {
                const calendarContainer = formContainer.querySelector("#customCalendar");
                const dateRangeDisplay = formContainer.querySelector("#dateRangeDisplay");

                if (!calendarContainer) return;

                let currentDate = new Date();
                let currentMonth = currentDate.getMonth();
                let currentYear = currentDate.getFullYear();

                function renderCalendar(month, year) {
                    // Clear previous calendar
                    calendarContainer.innerHTML = '';

                    // Create calendar header
                    const header = document.createElement('div');
                    header.className = 'calendar-header';

                    const title = document.createElement('div');
                    title.className = 'calendar-title';
                    title.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

                    const nav = document.createElement('div');
                    nav.className = 'calendar-nav';

                    const prevBtn = document.createElement('button');
                    prevBtn.innerHTML = '&lt;';
                    prevBtn.addEventListener('click', () => {
                        if (month === 0) {
                            month = 11;
                            year--;
                        } else {
                            month--;
                        }
                        renderCalendar(month, year);
                    });

                    const nextBtn = document.createElement('button');
                    nextBtn.innerHTML = '&gt;';
                    nextBtn.addEventListener('click', () => {
                        if (month === 11) {
                            month = 0;
                            year++;
                        } else {
                            month++;
                        }
                        renderCalendar(month, year);
                    });

                    nav.appendChild(prevBtn);
                    nav.appendChild(nextBtn);
                    header.appendChild(title);
                    header.appendChild(nav);
                    calendarContainer.appendChild(header);

                    // Create day headers
                    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    const grid = document.createElement('div');
                    grid.className = 'calendar-grid';

                    dayNames.forEach(day => {
                        const dayHeader = document.createElement('div');
                        dayHeader.className = 'calendar-day-header';
                        dayHeader.textContent = day;
                        grid.appendChild(dayHeader);
                    });

                    // Get first day of month and total days
                    const firstDay = new Date(year, month, 1).getDay();
                    const daysInMonth = new Date(year, month + 1, 0).getDate();

                    // Add empty cells for days before the first day of the month
                    for (let i = 0; i < firstDay; i++) {
                        const emptyDay = document.createElement('div');
                        emptyDay.className = 'calendar-day empty';
                        grid.appendChild(emptyDay);
                    }

                    // Add days of the month
                    const today = new Date();
                    for (let day = 1; day <= daysInMonth; day++) {
                        const dayElement = document.createElement('div');
                        dayElement.className = 'calendar-day';
                        dayElement.textContent = day;

                        const date = new Date(year, month, day);

                        // Check if today
                        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                            dayElement.classList.add('today');
                        }

                        // Check if disabled (past dates)
                        if (date < today && !(date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear())) {
                            dayElement.classList.add('disabled');
                        } else {
                            // Only add click event for non-disabled dates
                            dayElement.addEventListener('click', () => selectDate(date));
                        }

                        // Check if selected
                        if (selectedStartDate && date.getTime() === selectedStartDate.getTime()) {
                            dayElement.classList.add('selected-start');
                        } else if (selectedEndDate && date.getTime() === selectedEndDate.getTime()) {
                            dayElement.classList.add('selected-end');
                        } else if (selectedStartDate && selectedEndDate &&
                            date > selectedStartDate && date < selectedEndDate) {
                            dayElement.classList.add('in-range');
                        }

                        grid.appendChild(dayElement);
                    }

                    calendarContainer.appendChild(grid);
                }

                function selectDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Don't allow selecting past dates
  if (date < today) return;

  // Update currentMonth and currentYear to the selected date's month and year
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();

  // If no start date selected, or if start date is after the clicked date, set as new start date
  if (!selectedStartDate || (selectedStartDate && selectedEndDate) || date < selectedStartDate) {
    selectedStartDate = date;
    selectedEndDate = null;
  } else {
    // Set end date
    selectedEndDate = date;
  }

                    // Update display
                    updateDateRangeDisplay(selected);
                    // Re-render calendar to show new selections
                    renderCalendar(currentMonth, currentYear);
                }

                function updateDateRangeDisplay() {
                    if (!selectedStartDate) {
                        dateRangeDisplay.innerHTML = `<span>${noDatesSelected}</span>`;
                        return;
                    }

                    const startDateStr = selectedStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                    if (!selectedEndDate) {
                        dateRangeDisplay.innerHTML = `
                            <span>${selected}: ${startDateStr}</span>
                        `;
                    } else {
                        const endDateStr = selectedEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        dateRangeDisplay.innerHTML = `
                            <span>${selected}: ${startDateStr} - ${endDateStr}</span>
                        `;
                    }
                }

                // Initialize calendar
                renderCalendar(currentMonth, currentYear);
                updateDateRangeDisplay();
            }


            function showStep(step) {
                steps.forEach((el, index) => {
                    el.style.display = index === step - 1 ? "block" : "none";

                    // Mark previous steps as visited
                    if (index < step - 1) {
                        stepIndicators[index].classList.add("visited");
                    }
                });

                stepIndicators.forEach((el, index) => el.classList.toggle("active", index === step - 1));

                const progressBar = formContainer.querySelector(".steps::after");
                if (progressBar) {
                    if (step === 1) progressBar.style.width = "20%";
                    else if (step === 2) progressBar.style.width = "20%";
                    else if (step === 3) progressBar.style.width = "40%";
                    else if (step === 4) progressBar.style.width = "60%";
                    else if (step === 5) progressBar.style.width = "80%";
                    else if (step === 6) progressBar.style.width = "100%";
                }
                // Add this to your render function, after creating the formContainer
                function setupRoomCounters() {
                    const checkboxes = formContainer.querySelectorAll('input[type="checkbox"][id^="myCheckbox"]');

                    checkboxes.forEach(checkbox => {
                        // Get the counter element for this checkbox
                        const counter = checkbox.closest('li').querySelector('.room-counter');

                        // Show/hide counter when checkbox is toggled
                        checkbox.addEventListener('change', function () {
                            counter.style.display = this.checked ? 'flex' : 'none';
                        });

                        // Handle increment button
                        const incrementBtn = counter.querySelector('.increment');
                        const decrementBtn = counter.querySelector('.decrement');
                        const quantityInput = counter.querySelector('.room-quantity');

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

                // Call this function after appending the formContainer to the element
                setupRoomCounters();
                if (step === 5) updateReviewInfo();
                // Add this to your existing script
                function updateStep2() {
                    if (currentStep !== 2) return;

                    const dateRangeDisplay = formContainer.querySelector("#selectedDateRange");
                    const durationBtns = formContainer.querySelectorAll(".duration-btn");
                    const fromDayInput = formContainer.querySelector("#fromDay");
                    const tillDayInput = formContainer.querySelector("#tillDay");
                    const maxDaysNote = formContainer.querySelector("#maxDaysNote");
                    const maxRangeNote = formContainer.querySelector("#maxRangeNote");
                    const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
                    const rangeDurationRadio = formContainer.querySelector("#rangeDuration");


                    // if(singleDurationRadio.checked){
                    //     fromDayInput.disabled = true;
                    //     tillDayInput.disabled = true;
                    // }
                    // if(rangeDurationRadio.checked){
                    //     fromDayInput.disabled = false;
                    //     tillDayInput.disabled = false;
                    // }
                    if (!selectedStartDate || !selectedEndDate) return;

                    // Calculate total days in selected range
                    const timeDiff = selectedEndDate - selectedStartDate;
                    const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days

                    // Update date range display
                    const startStr = selectedStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const endStr = selectedEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    dateRangeDisplay.textContent = `${startStr} - ${endStr}`;

                    // Update duration buttons
                    durationBtns.forEach(btn => {
                        const days = btn.dataset.days;

                        if (days === "exact") {
                            btn.textContent = `${exactlyAsSpecified}`;
                            btn.dataset.days = totalDays;
                        } else {
                            const daysNum = parseInt(days);
                            btn.disabled = daysNum > totalDays;
                            btn.classList.toggle("disabled", daysNum > totalDays);
                        }
                    });

                    // // Update single duration input
                    // exactDaysInput.max = totalDays;
                    // exactDaysInput.value = Math.min(totalDays, parseInt(exactDaysInput.value) || 1);
                    // maxDaysNote.textContent = `${youCanChoose} ${totalDays} ${days}`;

                    // Update range inputs
                    fromDayInput.max = totalDays;
                    tillDayInput.max = totalDays;
                    tillDayInput.value = totalDays;
                    maxRangeNote.textContent = `${youCanChoose} ${totalDays} ${days}`;

                    // Handle radio button changes
                    // singleDurationRadio.addEventListener("change", function () {
                    //     exactDaysInput.disabled = false;
                    //     fromDayInput.disabled = true;
                    //     tillDayInput.disabled = true;
                    // });

                    // rangeDurationRadio.addEventListener("change", function () {
                    //     exactDaysInput.disabled = true;
                    //     fromDayInput.disabled = false;
                    //     tillDayInput.disabled = false;
                    // });

                    // Handle duration button clicks
                    durationBtns.forEach(btn => {
                        btn.addEventListener("click", function () {
                            if (btn.disabled) return;

                            // Remove active class from all buttons
                            durationBtns.forEach(b => b.classList.remove("activeBtn"));

                            // Add active class to clicked button
                            btn.classList.add("activeBtn");

                            // Update inputs based on selection
                            const days = btn.dataset.days;
                            if (days === "exact") {
                                exactDaysInput.value = totalDays;
                            } else {
                                exactDaysInput.value = days;
                            }
                        });
                    });
                }

                // Add this to your showStep function
                if (step === 2) {
                    updateStep2();
                }
            }


            function validateStep() {
                if (!steps[currentStep - 1]) return true;
                const currentInputs = steps[currentStep - 1].querySelectorAll("input, textarea");
                for (let input of currentInputs) {
                    if (!input.checkValidity()) {
                        alert(`Invalid input: ${input.name}`);
                        return false;
                    }
                }

                // Validate date selection for step 1
                if (currentStep === 1 && (!selectedStartDate || !selectedEndDate)) {
                    alert("Please select a valid date range");
                    return false;
                }

                if (currentStep === 3) {
                    const selectedAccommodations = formContainer.querySelectorAll('input[type="checkbox"][id^="myCheckbox"]:checked');
                    if (selectedAccommodations.length === 0) {
                        alert("Please select at least one accommodation type."); // Messaggio di avviso per l'utente
                        return false; // Impedisce di proseguire
                    }
                }
                
                return true;
            }

            function updateReviewInfo() {
                if (!reviewInfo) return;

                 // Get selected accommodation types with quantities
    const accommodationTypes = [];
    const checkboxes = formContainer.querySelectorAll('input[type="checkbox"][id^="myCheckbox"]:checked');
    checkboxes.forEach(checkbox => {
        const label = formContainer.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            const typeText = label.querySelector('p')?.textContent.trim().split('\n')[0] || ''; // Get just the room type
            const quantity = checkbox.closest('li').querySelector('.room-quantity')?.value || '1';
            accommodationTypes.push(`${quantity}x ${typeText}`);
        }
    });

                // Format date range
                let dateRangeStr = "Not selected";
                if (selectedStartDate && selectedEndDate) {
                    const startStr = selectedStartDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const endStr = selectedEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    dateRangeStr = `${startStr} to ${endStr}`;
                }

                // Get duration information from step 2
                const fromDayInput = formContainer.querySelector("#fromDay");
                const tillDayInput = formContainer.querySelector("#tillDay");
                const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
                const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
                const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");

                let durationText = "Not specified";
                let durationType = "Quick selection";

                // Check which option is currently selected
                if (rangeDurationRadio?.checked) {
                    // Range duration selected
                    durationText = `From day ${fromDayInput?.value || '1'} to day ${tillDayInput?.value || '1'}`;
                    durationType = "Custom duration range";
                } else if (activeDurationBtn) {
                    // Button selection is active
                    durationText = activeDurationBtn.textContent;
                } else if (singleDurationRadio?.checked) {
                    // Default to "Exactly as specified" if nothing else is selected
                    durationText = "Exactly as specified";
                }

                // Get the active form container (works even when going back/forward)
                const activeForm = steps[currentStep - 1]?.parentElement || formContainer;

                // Get contact info using more reliable selectors
                const firstName = activeForm.querySelector("#First")?.value || '';
                const lastName = activeForm.querySelector("#LastName")?.value || '';
                const email = activeForm.querySelector("#Email")?.value || '';
                const phone = activeForm.querySelector("#Phone")?.value || '';
                reviewInfo.innerHTML = `
         <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
            <div>
                <h2 style="margin: 0!important;">${reviewStayDates}</h2>
            </div>
            <div>
                <p style="font-family: 'Host Grotesk', serif;">${reviewTravelDates}<br/> <span style="color: gray;">${dateRangeStr}</span></p>
            </div>
            <div>
                <p style="font-family: 'Host Grotesk', serif;">${reviewDurationOFStay}<br/> <span style="color: gray;">${durationText}</span></p>
            </div>
        </div>

        <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
          <div>
              <h2 style="margin: 0!important;">${reviewAccommodation}</h2>
          </div>
          <div>
              <p style="font-family: 'Host Grotesk', serif;">${reviewTypes}<br/> <span style="color: gray;">${accommodationTypes.length > 0 ? accommodationTypes.join('<br/>') : 'None selected'}</span></p>
          </div>
        </div>

        <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
          <div>
              <h2 style="margin: 0!important;">${reviewTravelers}</h2>
          </div>
          <div>
              <p style="font-family: 'Host Grotesk', serif;">${reviewAdults}<br/> <span style="color: gray;">${formContainer.querySelector("#adults")?.value || ''}</span></p>
          </div>
          <div>
              <p style="font-family: 'Host Grotesk', serif;">${children}<br/> <span style="color: gray;">${formContainer.querySelector("#children")?.value || ''}</span></p>
          </div>
          <div>
              <p style="font-family: 'Host Grotesk', serif;">${reviewSpecialRequests}<br/> <span style="color: gray;">${formContainer.querySelector("#special-requests")?.value || 'None'}</span></p>
          </div>
        </div>

         <div style="background: #F5F5F7; padding: 10px; border-radius: 5px; margin-top: 20px;">
          <div>
              <h2 style="margin: 0!important;">${titleContactInformation}</h2>
          </div>
          <div>
              <p style="font-family: 'Host Grotesk', serif;">${firstAndLastname}<br/> <span style="color: gray;">${firstName} ${lastName}</span></p>
          </div>
          <div>
              <p style="font-family: 'Host Grotesk', serif;">${emailVF}<br/> <span style="color: gray;">${email}</span></p>
          </div>
          <div>
              <p style="font-family: 'Host Grotesk', serif;">${phoneNumber}<br/> <span style="color: gray;">${phone}</span></p>
          </div>
        </div>
    `;
            }
            formContainer.addEventListener("click", function (event) {
                if (event.target.classList.contains("next")) {
                    if (!validateStep()) return;

                    // Special handling when moving from contact info (step 5) to review (step 6)
                    if (currentStep === 5) {
                        // Force update of contact info before showing review
                        updateReviewInfo();
                        setTimeout(() => {
                            currentStep++;
                            showStep(currentStep);
                        }, 50);
                    } else {
                        currentStep++;
                        showStep(currentStep);
                    }
                } else if (event.target.classList.contains("prev")) {
                    currentStep--;
                    showStep(currentStep);
                }
            });


            function createChatBox() {
                const chatBox = document.createElement('div');
                chatBox.classList.add('chat-box');
                chatBox.innerHTML = `
                    <style>
                        .vfrc-message--extension-Forms{
                        width: 100%; background: #fff;}
                        h3, p{
                        font-family: "Host Grotesk", serif;}
                      </style>
                   <div style="position: relative; display: flex; justify-content: center; align-items: center; height: 500px; width: 100%; flex-direction: column;">
      
                    
                      <!-- Content -->
                      <div style="position: relative; color: black; text-align: center;">
                        <div style="display: flex; justify-content: center; height: 50px;">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 40px; width: 38px; fill: black;">
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                          </svg>
                        </div>
                        <h3>${thankSubmission}</h3>
                        <p>${formSubmitted}<br/>${formTeam}</p>
                      </div>

                    </div>

                `;
                formContainer.replaceWith(chatBox);
            }
            formContainer.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!validateStep()) return;

  // Initialize accommodation as an array
  const accommodation = [];
  const checkboxes = formContainer.querySelectorAll('input[type="checkbox"][id^="myCheckbox"]:checked');
  checkboxes.forEach(checkbox => {
    const listItem = checkbox.closest('li');
    const label = listItem.querySelector('label[for="' + checkbox.id + '"]');
    const quantityInput = listItem.querySelector('.room-quantity');
    const roomName = label.querySelector('b')?.textContent.trim() || 'Unknown Room';
    const roomDetails = label.querySelector('p')?.textContent.trim() || '';
    accommodation.push({ id: checkbox.id, type: roomName, details: roomDetails, quantity: quantityInput ? parseInt(quantityInput.value) || 1 : 1 });
  });

  let durationData = {};
  const singleDurationRadio = formContainer.querySelector("#ButtonSelection");
  const rangeDurationRadio = formContainer.querySelector("#rangeDuration");
  const activeDurationBtn = formContainer.querySelector(".duration-btn.activeBtn");
  const fromDayInput = formContainer.querySelector("#fromDay");
  const tillDayInput = formContainer.querySelector("#tillDay");

  if (singleDurationRadio?.checked && activeDurationBtn?.dataset.days) {
    durationData = {
      type: 'single',
      selectedOption: activeDurationBtn.dataset.days
    };
  } else if (rangeDurationRadio?.checked) {
    durationData = {
      type: 'range',
      fromDay: fromDayInput?.value || '',
      tillDay: tillDayInput?.value || ''
    };
  } else {
    durationData = { type: 'single', selectedOption: 'exact' }; // Default if no explicit selection
  }

  const formData = {
    dates: {
      start: selectedStartDate ? `${selectedStartDate.getFullYear()}-${String(selectedStartDate.getMonth() + 1).padStart(2, '0')}-${String(selectedStartDate.getDate()).padStart(2, '0')}` : '',
      end: selectedEndDate ? `${selectedEndDate.getFullYear()}-${String(selectedEndDate.getMonth() + 1).padStart(2, '0')}-${String(selectedEndDate.getDate()).padStart(2, '0')}` : ''
    },
    duration: durationData, // Use the conditionally created durationData
    accommodation: accommodation,
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

  window.voiceflow.chat.interact({
    type: 'complete',
    payload: formData,
  });

    createChatBox();
});

            showStep(currentStep);
            element.appendChild(formContainer);

            // —— Category chooser logic ——
const catSel  = formContainer.querySelector('#categorySelector');
const listBox = formContainer.querySelector('#accommodationList');
const suites  = formContainer.querySelector('#suiteItems');
const rooms   = formContainer.querySelector('#roomItems');
const backBtn = formContainer.querySelector('#backToCategories');

catSel.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.dataset.category;       // "suites" or "rooms"
    catSel.style.display  = 'none';          // hide the two big images
    listBox.style.display = 'block';         // show the list view
    suites.style.display  = (cat === 'suites') ? 'flex' : 'none';
    rooms.style.display   = (cat === 'rooms')  ? 'flex' : 'none';
  });
});

backBtn.addEventListener('click', () => {
  listBox.style.display = 'none';  // hide the list
  catSel.style.display  = 'flex';  // show the two big images again
});


            // Initialize the custom calendar
            createCustomCalendar();
        },
    };
