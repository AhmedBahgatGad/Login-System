let userName = document.getElementById("userName")
let signUpEmail = document.getElementById("userEmail")
let signUpPass = document.getElementById("userPass")
let loginEmail = document.getElementById("email")
let loginPass = document.getElementById("pass")
let logIn = document.getElementById("login")
let sign_Up = document.getElementById("signUp")
let home = document.getElementById("home")
let signUpBtn = document.getElementById("signUpBtn")
let goLoginBtn = document.getElementById("goLoginBtn")
let loginBtn = document.getElementById("loginBtn")
let goSignBtn = document.getElementById("goSignBtn")
let logOutBtn = document.getElementById("logOutBtn")
let details;
if (localStorage.getItem("list") == null) {
    details = [];
}
else {
    details = JSON.parse(localStorage.getItem("list"));
}
function signUp() {
    validInputs()
    isExist()
    if (validInputs() == true && isExist() == false) {
        let info = {
            name: userName.value,
            email: signUpEmail.value,
            pass: signUpPass.value
        }
        details.push(info)
        localStorage.setItem("list", JSON.stringify(details))
        sign_Up.classList.replace("d-block", "d-none")
        logIn.classList.replace("d-none", "d-block")
        clr()
    }
    else if (validMail() == false && validPass() == false) {
        signUpEmail.classList.add("is-invalid")
        signUpPass.classList.add("is-invalid")
        document.getElementById("userEmail").placeholder = "Must contain @ and end with .com"
        document.getElementById("userPass").placeholder = "Must start with uppercase letter"
    }
    else if (validMail() == false && validPass() == true) {
        signUpEmail.classList.add("is-invalid")
        document.getElementById("userEmail").placeholder = "Must contain @ and end with .com"
    }
    else if (validPass() == false && validMail() == true) {
        signUpPass.classList.add("is-invalid")
        document.getElementById("userPass").placeholder = "Must start with uppercase letter"
    }
    else {
        let tryAgainMsg = document.getElementById("tryAgainMsg");
        tryAgainMsg.classList.replace("d-none", "d-block");
    }
}
function login() {
    for (var i = 0; i < details.length; i++) {
        if (loginEmail.value == details[i].email && loginPass.value == details[i].pass) {
            home.classList.replace("d-none", "d-block")
            logIn.classList.replace("d-block", "d-none")
            document.getElementById("welcome").innerHTML = "Welcome " + details[i].name
        }
        else {
            console.log("not found")
        }
    }
    clr()
}
function logOut() {
    home.classList.replace("d-block", "d-none")
    sign_Up.classList.replace("d-none", "d-block")
    clr()
}
function goSign() {
    logIn.classList.replace("d-block", "d-none")
    sign_Up.classList.replace("d-none", "d-block")
    clr()
}
function goLogin() {
    sign_Up.classList.replace("d-block", "d-none")
    logIn.classList.replace("d-none", "d-block")
    clr()
}
function clr() {
    userName.value = ""
    signUpEmail.value = ""
    signUpPass.value = ""
    loginEmail.value = ""
    loginPass.value = ""
}
function validMail() {
    let userEmailAlert = document.getElementById("userEmailAlert");
    var regex = /^[a-zA-Z0-9]{2,}(\@[a-zA-Z]{2,})(\.[a-zA-Z]{2,})$/;
    if (regex.test(signUpEmail.value) == true) {
        signUpEmail.classList.add("is-valid");
        signUpEmail.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");
        return true
    }
    else {
        signUpEmail.classList.add("is-invalid");
        signUpEmail.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none", "d-block");
        return false
    }
}
function validPass() {
    let userPasswordAlert = document.getElementById("userPasswordAlert");
    var regex = /^[A-Z]{1}[a-zA-Z0-9]{2,}$/;
    if (regex.test(signUpPass.value) == true) {
        signUpPass.classList.add("is-valid");
        signUpPass.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");
        return true
    }
    else {
        signUpPass.classList.add("is-invalid");
        signUpPass.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");
        return false
    }
}
function validInputs() {
    validMail()
    validPass()
    if (validMail() == true && validPass() == true) {
        return true
    }
    else {
        return false
    }
}
function isExist() {
    let accountExistMsg = document.getElementById("accountExistMsg");
    for (let i = 0; i < details.length; i++) {
        if (details[i].email == signUpEmail.value) {
            accountExistMsg.classList.replace("d-none", "d-block");
            signUpEmail.classList.remove("is-valid");
            return true
        }
    }
    return false
}
signUpBtn.addEventListener("click", signUp)
goLoginBtn.addEventListener("click", goLogin)
loginBtn.addEventListener("click", login)
goSignBtn.addEventListener("click", goSign)
logOutBtn.addEventListener("click", logOut)