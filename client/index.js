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

fetch('/auth')
  .then((res) => res.json())
  .then((resultObj) => {
    if (resultObj.isLoggedIn) {
      loggedInMessage.innerHTML = `logged in as ${resultObj.username}`;
      loginChanges();
    }
  });

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

logoutButton.addEventListener('click', () => {
  logoutChanges();
});
