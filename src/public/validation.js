let emailMsg = document.getElementById('emailError')
let passError = document.getElementById("passwordError")

// LoginPage Validaation
function passwordValidate() {
    let password = document.getElementById("lPassword").value;
    if (password.length < 8 ) {
        passError.innerHTML = "please enter valied password";
        return false

    } else {
        passError.innerHTML = "";
        return true;
    }
}

function emailValidate() {
    let emailId = document.getElementById("lEmail").value;
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailId) == false) {
        emailMsg.innerHTML = "Please enter valid email ";
        return false;
    } else {
        emailMsg.innerHTML = "";
        return true;
    }
}

function fullyChecking() {
    if (passwordValidate() && emailValidate()) {
        return true
    } else {
        return false
    }
}

// REGISTER VALIDATION
const re_name = document.getElementById("Name");
const re_email = document.getElementById("Email");
const re_number = document.getElementById("Number");
const re_password = document.getElementById("Password")

function nameChecking() {
    let name = document.getElementById("name").value;
    if (name == "") {
        re_name.innerHTML = "please enter name";
        return false
    } else {
        re_name.innerHTML = "";
        return true
    }
}
function emailChecking() {
    let emailId = document.getElementById("email").value;
    console.log("emailId" + emailId);
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(emailId) == false) {
        re_email.innerHTML = "Please enter valid email ";
        return false;
    } else {
        re_email.innerHTML = "";
        return true;
    }
}
function numberChecking() {
    let number = document.getElementById("number").value;
    if (/^[0-9]+$/.test(number) == false) {
        re_number.innerHTML = "please enter a valid number";
        return false
    }
    else if (number.length != 10) {
        re_number.innerHTML = "please enter 10 digits";
        return false
    } else {
        re_number.innerHTML = "";
        return true
    }
}


function passwordChecking() {
    let password = document.getElementById("password").value;
    if (password.length < 8) {
        re_password.innerHTML = "please enter minimum 8 digits";
        return false
    } else {
        re_password.innerHTML = "";
        return true
    }
}
function allChecking() {
    if (nameChecking() && emailChecking() && numberChecking() && passwordChecking()) {
        return true
    } else {
        return false
    }
}


// ADMIN VALIDATION
const ad_email = document.getElementById("AdminEmailErrorMSG");
const ad_password = document.getElementById("AdminpasswordErrorMSG");

function adminEmail() {
    let adminEmail = document.getElementById("adminEmail").value;
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(adminEmail) == false) {
        ad_email.innerHTML = "Please enter valid email ";
        return false;
    } else {
        ad_email.innerHTML = "";
        return true;
    }
}
function adminPassword() {
    let password = document.getElementById("adminPassword").value;
    if (password.length < 8) {
        ad_password.innerHTML = "please enter minimum 8 digits";
        return false
    } else {
        ad_password.innerHTML = "";
        return true
    }
}

function adminFullyValidate() {
    if (adminEmail()&&adminPassword()) {
        return true
    } else {
        return false
    }
}