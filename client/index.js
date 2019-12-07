const mainForm = document.getElementById('mainForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const loggedInMessage = document.getElementById('loggedInMessage');
const wrongInputMessage = document.getElementById('wrongInputMessage');
let isLoggedIn = false;

// all changes to happen when logged in
const loginChanges = () => {
  wrongInputMessage.innerHTML = '';
  mainForm.classList.add('hidden');
  logoutButton.classList.remove('hidden');
  isLoggedIn = true;
};

// all changes to happen when logged out
const logoutChanges = () => {
  mainForm.classList.remove('hidden');
  logoutButton.classList.add('hidden');
  loggedInMessage.innerHTML = '';
  document.cookie = 'ssid =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  isLoggedIn = false;
  passwordInput.value = '';
};

// every refresh of page it checks if you have an 'ssid' cookie
// If you do, it takes value and displays, which is the username
// Also sets isLoggedIn to true in back end
fetch('/auth')
  .then((res) => res.json())
  .then((resultObj) => {
    if (resultObj.isLoggedIn) {
      loggedInMessage.innerHTML = `logged in as ${resultObj.username}`;
      loginChanges();
    }
  });

// listener to listen for login button to be triggered
// this works with click or enter key due to being a form in html
// the form data is nullified using onsubmit='return false;'
// if login and password match, isLoggedIn set to true in backend
loginButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  fetch('/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((resultObj) => {
      isLoggedIn = resultObj.isLoggedIn;
      if (!isLoggedIn) {
        wrongInputMessage.innerHTML = 'incorrect username or password';
      } else {
        loggedInMessage.innerHTML = `logged in as ${resultObj.username}`;
        loginChanges();
      }
    });
});

  // runs changes for logout when logout button is pressed
logoutButton.addEventListener('click', () => {
  logoutChanges();
});
