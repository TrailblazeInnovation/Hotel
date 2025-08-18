export const FormExtension = {
  name: 'Forms',
  type: 'response',
  match: ({ trace }) =>
    trace?.type === 'Book_Form' || (trace.payload && trace.payload?.name === 'Book_Form'),
  render: ({ trace, element }) => {
    const formContainer = document.createElement('form')
    formContainer.classList.add('form-container')
    element.appendChild(formContainer)

    let currentStep = 1
    let bookingData = {
      startDate: null,
      endDate: null,
      duration: null,
      accommodation: [],
      adults: 1,
      children: 0,
      requests: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    }

    const LOCALES_BASE = 'https://trailblazeinnovation.github.io/Hotel/locales'
    const DATA_BASE = 'https://trailblazeinnovation.github.io/Hotel/data'
    const localeCode = (trace?.payload?.locale || navigator.language || 'en').split('-')[0]
    const hotelId = trace?.payload?.hotelId || 'hotel-termemerano'

    const loadJSON = async (url) => {
      try {
        const res = await fetch(url, { cache: 'no-cache' })
        return res.ok ? res.json() : {}
      } catch {
        return {}
      }
    }

    const renderStep = (p, hotel) => {
      formContainer.innerHTML = `
        <style>
          .form-container{font-family:sans-serif;width:100%;background:#fff;padding:20px;border-radius:5px}
          .steps{display:flex;justify-content:space-between;padding:10px 0}
          .step-indicator{flex:1;text-align:center;padding:10px;font-weight:bold;color:#888}
          .step-indicator.active{color:#000}
          .buttons{margin-top:20px;display:flex;gap:10px}
          .next,.prev{background:#000;color:#fff;padding:10px 20px;border-radius:5px;cursor:pointer}
        </style>
        <div class="steps">
          <div class="step-indicator ${currentStep===1?'active':''}">1</div>
          <div class="step-indicator ${currentStep===2?'active':''}">2</div>
          <div class="step-indicator ${currentStep===3?'active':''}">3</div>
          <div class="step-indicator ${currentStep===4?'active':''}">4</div>
          <div class="step-indicator ${currentStep===5?'active':''}">5</div>
          <div class="step-indicator ${currentStep===6?'active':''}">6</div>
        </div>
        <div class="step-content">${getStepContent(p, hotel)}</div>
        <div class="buttons">
          ${currentStep>1?`<button type="button" class="prev">${p.back}</button>`:''}
          ${currentStep<6?`<button type="button" class="next">${p.next}</button>`:`<button type="button" class="submit">${p.submit}</button>`}
        </div>
      `

      const nextBtn = formContainer.querySelector(".next")
      const prevBtn = formContainer.querySelector(".prev")
      const submitBtn = formContainer.querySelector(".submit")

      if(nextBtn) nextBtn.addEventListener("click", ()=>{ saveStepData(); currentStep++; renderStep(p, hotel) })
      if(prevBtn) prevBtn.addEventListener("click", ()=>{ currentStep--; renderStep(p, hotel) })
      if(submitBtn) submitBtn.addEventListener("click", ()=>{ saveStepData(); renderConfirmation(p) })
    }

    const getStepContent = (p, hotel) => {
      switch(currentStep){
        case 1:
          return `
            <h3>${p.chooseStayDates}</h3>
            <p>${p.selectPeriod}</p>
            <input type="date" id="startDate" value="${bookingData.startDate||''}">
            <input type="date" id="endDate" value="${bookingData.endDate||''}">
          `
        case 2:
          return `
            <h3>${p.duration}</h3>
            <input type="number" id="duration" min="1" value="${bookingData.duration||''}" placeholder="${p.days}">
          `
        case 3:
          return `
            <h3>${p.accommodation}</h3>
            <div>
              ${hotel.rooms.map(r=>`
                <label>
                  <input type="checkbox" value="${r.id}" ${bookingData.accommodation.includes(r.id)?'checked':''}>
                  ${r.name?.[localeCode]||r.name?.default||r.code} - ${r.sizeSqm} m² - ${r.priceFromPerPerson}€
                </label><br>
              `).join("")}
            </div>
          `
        case 4:
          return `
            <h3>${p.travelers}</h3>
            <label>${p.adults}<input type="number" id="adults" value="${bookingData.adults}" min="1"></label>
            <label>${p.children}<input type="number" id="children" value="${bookingData.children}" min="0"></label>
            <textarea id="requests" placeholder="${p.specialRequests}">${bookingData.requests}</textarea>
          `
        case 5:
          return `
            <h3>${p.contactInfo}</h3>
            <input id="firstName" value="${bookingData.firstName}" placeholder="${p.firstName}">
            <input id="lastName" value="${bookingData.lastName}" placeholder="${p.lastName}">
            <input id="email" value="${bookingData.email}" placeholder="${p.email}">
            <input id="phone" value="${bookingData.phone}" placeholder="${p.phone}">
          `
        case 6:
          return `
            <h3>${p.reviewSubmit}</h3>
            <p>${p.stayDates}: ${bookingData.startDate} → ${bookingData.endDate}</p>
            <p>${p.duration}: ${bookingData.duration} ${p.days}</p>
            <p>${p.accommodation}: ${bookingData.accommodation.join(", ")}</p>
            <p>${p.travelers}: ${bookingData.adults} ${p.adults}, ${bookingData.children} ${p.children}</p>
            <p>${p.contactInfo}: ${bookingData.firstName} ${bookingData.lastName}, ${bookingData.email}, ${bookingData.phone}</p>
          `
      }
    }

    const saveStepData = () => {
      if(currentStep===1){
        bookingData.startDate = formContainer.querySelector("#startDate")?.value
        bookingData.endDate = formContainer.querySelector("#endDate")?.value
      }
      if(currentStep===2){
        bookingData.duration = formContainer.querySelector("#duration")?.value
      }
      if(currentStep===3){
        bookingData.accommodation = [...formContainer.querySelectorAll("input[type=checkbox]:checked")].map(el=>el.value)
      }
      if(currentStep===4){
        bookingData.adults = formContainer.querySelector("#adults")?.value
        bookingData.children = formContainer.querySelector("#children")?.value
        bookingData.requests = formContainer.querySelector("#requests")?.value
      }
      if(currentStep===5){
        bookingData.firstName = formContainer.querySelector("#firstName")?.value
        bookingData.lastName = formContainer.querySelector("#lastName")?.value
        bookingData.email = formContainer.querySelector("#email")?.value
        bookingData.phone = formContainer.querySelector("#phone")?.value
      }
    }

    const renderConfirmation = (p) => {
      formContainer.innerHTML = `
        <h3>${p.thankYou}</h3>
        <p>${p.submitted}</p>
        <p>${p.teamBack}</p>
      `
      console.log("Booking submitted:", bookingData)
    }

    Promise.all([
      loadJSON(`${LOCALES_BASE}/${localeCode}.json`),
      loadJSON(`${DATA_BASE}/${hotelId}.json`)
    ]).then(([dict, hotel]) => {
      renderStep(dict, hotel)
    })
  }
}
export default FormExtension
