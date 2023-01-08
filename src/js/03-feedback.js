let throttle = require('lodash.throttle');
const formEl = document.querySelector('.feedback-form');
let userData = {};
fillTheForm();

const onInputChange = event => {
  const { name, value } = event.target;
  userData[name] = value;
  writeToLocalStorage();
};
const writeToLocalStorage = () => {
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
};

function fillTheForm() {
  try {
    const userInfoForm = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    if (userInfoForm === null) {
      return;
    }

    Object.entries(userInfoForm).forEach(([name, value]) => {
      userData[name] = value;
      formEl.elements[name].value = value;
    });
  } catch (error) {
    console.log(error);
  }
}

const onSubmit = event => {
  event.preventDefault();
  console.log(userData);
  formEl.reset();
  userData = {};
  localStorage.removeItem('feedback-form-state');
};

formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onSubmit);
