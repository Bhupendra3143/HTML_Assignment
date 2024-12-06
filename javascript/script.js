function scrollToAnchor(target) {
    document.getElementById(target).scrollIntoView({ behavior: 'smooth' });
}

// Next Button Function to do validation in Employee Section
function nextStep(nextFieldId, inputId) {
    const currentField = document.querySelector('.field.active');
    const nextField = document.getElementById(nextFieldId);
    
    if (!isFieldValid(currentField) && currentField.getElementsByTagName('input')) {
        currentField.querySelector('input').classList.add('myClass');
        return;
    }

    if (inputId === 'name') {
        document.getElementById('nameDisplay').innerText = document.getElementById(inputId).value;
    }

    currentField.classList.remove('active');
    nextField.classList.add('active');
}

// Next Button Function to do validation n Vehicle Section
function nextStep1(nextFieldId, inputId) {
    const currentField = document.getElementById(inputId);
    const nextField = document.getElementById(nextFieldId);

    if (!isFieldValid(currentField)) {
        currentField.querySelector('input').classList.add('myClass');
        return;
    }

    currentField.classList.remove('active');
    nextField.classList.add('active');
}

// Function to check the strength of the password
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strength = document.getElementById('passwordStrength');

    const passwordStrength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    strength.style.width = '100%';
    if (passwordStrength.test(password)) {
        strength.style.backgroundColor = 'green';
    }else{
        strength.style.backgroundColor = 'red';
    }
}

// Function to display employee information
function showInfo(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !gender || !email || !phone) {
        alert("Enter Valid input");
        return;
    }

    const employeeInfo = `
    Name: ${name}\n
    Gender: ${gender}\n
    Email: ${email}\n
    Phone: ${phone}\n
    RegistrationId: ${Math.random()}
    `;
    alert(`Employee Information:\n${employeeInfo}`);

    location.reload();
}

// Function to display vehicle information and pricing
function showVehicleInfo(event) {
    event.preventDefault();
    const vehicleName = document.getElementById('vehicleName').value;
    const vehicleModel = document.getElementById('vehicleModel').value;
    const vehicleNumber = document.getElementById('vehicleNumber').value;
    const employeeId = document.getElementById('emplyeeId').value;
    const vehicleType = document.getElementById('vehicleType').value;

    if (!vehicleName || !vehicleModel || !vehicleNumber || !employeeId || !vehicleType) {
        alert("Please fill out all fields before submitting.");
        return;
    }
    const price = showPricing();
    console.log(price);
    alert(`
    Vehicle Name: ${vehicleName}
    Vehicle Model: ${vehicleModel}
    Vehicle Number: ${vehicleNumber}
    Employee ID: ${employeeId}
    Vehicle Type: ${vehicleType}
    Daily Charge: ${price.daily}
    Monthly Charge: ${price.monthly}
    yearly Charge: ${price.yearly}
    `);

    location.reload();
}

// Function to return pricing based on vehicle type
function showPricing() {
    const type = document.getElementById('vehicleType').value;
    const pricing = {
        Cycle: { daily: "$5", monthly: "$100", yearly: "$500" },
        MotorCycle: { daily: "$10", monthly: "$200", yearly: "$1000" },
        FourWheeler: { daily: "$20", monthly: "$500", yearly: "$3500" },
    };
    return pricing[type];
}


const modal = document.getElementById('currencyModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const getPassBtn = document.getElementById('getPassBtn');
const currencySelect = document.getElementById('currencySelect');


openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});


closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});



// Function to calculate the amount based on selected currency and vehicle type
function calculateAmount(event) {
    event.preventDefault();
    const currency = document.getElementById('currencySelect');
    const vehicleType = document.getElementById('vehiclePriceSelect');
    let conversionRate;

    switch (currency.value) {
        case 'INR':
            conversionRate = {
                Cycle: { daily: 5 / 82.5, monthly: 100 / 82.5, yearly: 500 / 82.5 },
                MotorCycle: { daily: 10 / 82.5, monthly: 200 / 82.5, yearly: 1000 / 82.5 },
                FourWheeler: { daily: 20 / 82.5, monthly: 500 / 82.5, yearly: 3500 / 82.5 },
            };
            break;
        case 'USD':
            conversionRate = {
                Cycle: { daily: 5, monthly: 100, yearly: 500 },
                MotorCycle: { daily: 10, monthly: 200, yearly: 1000 },
                FourWheeler: { daily: 20, monthly: 500, yearly: 3500 },
            };
            break;
        case 'YEN':
            conversionRate = {
                Cycle: { daily: 5 / 150, monthly: 100 / 150, yearly: 500 / 150 },
                MotorCycle: { daily: 10 / 150, monthly: 200 / 150, yearly: 1000 / 150 },
                FourWheeler: { daily: 20 / 150, monthly: 500 / 150, yearly: 3500 / 150 },
            };
            break;
    }

    const rates = conversionRate[vehicleType.value];
    alert(`
        Currency Selected: ${currency.value}
        Vehicle: ${vehicleType.value}
        daily: ${rates.daily}
        monthly: ${rates.monthly}
        yearly: ${rates.yearly}`
    );
    location.reload();
}


// Function to check if a field is valid
function isFieldValid(field) {
    const inputElement = field.querySelector('input, select, textarea');

    if (inputElement && inputElement.required && !inputElement.value.trim()) {
        return false;
    }

    if (inputElement && inputElement.value.trim().length < 3) {
        return false;
    }

    if (inputElement && inputElement.type === 'email' && !validateEmail(inputElement.value)) {
        return false;
    }

    if (inputElement && inputElement.type === 'tel' && !validatePhone(inputElement.value)) {
        return false;
    }

    if (inputElement && inputElement.type === 'password' && !validatePassword(inputElement.value)) {
        return false;
    }

    return true;
}

// Function to validate email format using regex
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Function to validate phone number format (10-digit number)
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// Function to remove a specific CSS class from the current active field
function addcolour(){
    const currentField = document.querySelector('.field.active');
    currentField.querySelector('input').classList.remove('myClass');
}

// Function to validate password format using regex
function validatePassword(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return phoneRegex.test(password);
}