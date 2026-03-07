

// login form js functionality
const signinBtn = document.getElementById("signin-btn");
const userNameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");

signinBtn.addEventListener('click', () => {
  // collectUserName 
  const collectUserName = userNameInput.value.trim();
  // collectPassword 
  const collectPassword = passwordInput.value.trim();
  // match username or password
  if(collectUserName === "admin" && collectPassword === "admin123") {
    alert("Sign In success");
    window.location.assign("/home.html");
  }else {
    alert("Invalid username or password");
    return;
  }

});