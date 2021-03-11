const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const submitBtn = form.querySelector('button[type="submit"]');

const toggleError = (element, message = "") => {
  if (message) {
    const formCtrl = element.parentElement;
    const errorMsg = formCtrl.querySelector("small");
    errorMsg.textContent = message;
    formCtrl.classList.add("error");
  } else {
    const formCtrl = element.parentElement;
    formCtrl.classList.remove("error");
  }
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const checkEmailValue = (emailElement) => {
  const result = validateEmail(emailElement.value);
  if (!result) {
    toggleError(emailElement, "Please enter a valid email address");
  } else {
    toggleError(emailElement);
  }
};

const checkEmptyValue = (...elements) => {
  for (const element of elements) {
    if (element.value === "") {
      toggleError(element, "This field cannot be empty");
    } else {
      toggleError(element);
    }
  }
};

const checkPnP = (password1, password2) => {
  const equalityResult = password1.value === password2.value;
  const emptyPasswords = password1.value === "" || password2.value === "";

  if (equalityResult && !emptyPasswords) {
    toggleError(password1);
    toggleError(password2);
  } else {
    toggleError(password1, "Passwords are not matched");
    toggleError(password2, "Passwords are not matched");
  }

  if (password1.value === "") {
    toggleError(password1, "This field cannot be empty");
  }
  if (password2.value === "") {
    toggleError(password2, "This field cannot be empty");
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkEmptyValue(username, email, password, password2);
  checkEmailValue(email);
  checkPnP(password, password2);
});
