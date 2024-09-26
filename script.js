// targets
const defaultText = document.getElementById('default-text');
const selectedSeat = document.getElementById('selected-seat');
const availableSeats = document.getElementById('available-seats');
const totalBooked = document.getElementById('total-booked');
const totalPrice = document.getElementById('total-price');
const grandTotal = document.getElementById('grand-total');
const couponInput = document.getElementById('coupon-input');
const couponButton = document.getElementById('coupon-button');
const discountField = document.getElementById('discount-field');
const userName = document.getElementById('user-name');
const phoneNumber = document.getElementById('phone-number');
const emailAddress = document.getElementById('email-address');
const submitButton = document.getElementById('submit-button');

// chooseSeat function's targets
const totalBookedSeats = [];
let storePrice = 0;

function chooseSeat(event){
    // validation
    if(totalBookedSeats.includes(event.innerText)){
        return alert('This seat already booked');
    }else if(totalBookedSeats.length > 3){
        return alert('Maximum number of seats booked');
    }

    event.classList.add('bg-primary');
    event.classList.add('hover:bg-primary');
    event.classList.add('text-white');

    // decrease available
    availableSeats.innerText = parseInt(availableSeats.innerText) -1;

    // increase total
    totalBookedSeats.push(event.innerText);
    totalBooked.innerHTML = totalBookedSeats.length;
    
    // add tickets
    defaultText.classList.add('hidden');
    selectedSeat.innerHTML += `
    <li class="flex justify-between items-center py-4">
        <span class="font-semibold text-fourth">${event.innerText}</span>
        <span class="font-semibold text-fourth">Economoy</span>
        <span class="font-semibold text-fourth" id="perSeat">550.00</span>
    </li>`;

    // total price
    storePrice += parseInt(document.getElementById('perSeat').innerText);
    totalPrice.innerText = storePrice.toFixed(2);

    // grand total
    grandTotal.innerText = totalPrice.innerText;

    // apply coupon 
    if(totalBookedSeats.length > 3){
        couponInput.removeAttribute('disabled');
        couponButton.removeAttribute('disabled');
    }

    //enable form inputs
    if(totalBookedSeats.length > 0){
        userName.removeAttribute('disabled');
        phoneNumber.removeAttribute('disabled');
        emailAddress.removeAttribute('disabled');
    }
} 


// apply coupon
let couponSave = 0;

couponButton.addEventListener('click',function(){
    // validation
    if(couponInput.value.toLocaleUpperCase() !== 'new15'.toLocaleUpperCase() && couponInput.value.toLocaleUpperCase() !== 'couple20'.toLocaleUpperCase()){
        return alert('Invalid Coupon')
    }

    // new15
    if(couponInput.value.toLocaleUpperCase() === 'new15'.toLocaleUpperCase()){
        couponSave = totalPrice.innerText * 15 / 100;
    }

    // couple20
    else if(couponInput.value.toLocaleUpperCase() === 'couple20'.toLocaleUpperCase()){
        couponSave = totalPrice.innerText * .20;
    }
    
    discountField.innerHTML = 
    `
        <div class="font-bold">Discount</div>
        <div class="font-bold">- BDT: <span>${couponSave.toFixed(2)}</span></div>
    `

    const totalSave = totalPrice.innerText - couponSave;
    grandTotal.innerText = totalSave.toFixed(2);

})

// submition
phoneNumber.addEventListener('keyup', function(event){
    const inputValue = event.target.value;
    // validation
    if(isNaN(inputValue)){
        return alert('Invalid Input');
    }

    if(inputValue.length == 11){
        submitButton.removeAttribute('disabled');
    }
    else{
        submitButton.setAttribute('disabled', '')
    }
})

submitButton.addEventListener('click', function(event){
    event.preventDefault();
})
