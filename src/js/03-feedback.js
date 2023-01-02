let throttle = require('lodash.throttle');
const formEl = document.querySelector('.feedback-form');
const userData = {};
fillTheForm();

const onInputChange = event => {
  const { name, value } = event.target;
  userData[name] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));

  writeToLocalStorage();
  // console.log(JSON.parse(localStorage.getItem("feedback-form-state")));
};
const writeToLocalStorage = () => {
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
};

function fillTheForm() {
    
    try {
        const userInfoForm = JSON.parse(localStorage.getItem('feedback-form-state'));
        if (userInfoForm === null) {
            return;
        }
        for (field in userInfoForm) {
            formEl.elements[field].value = userInfoForm[field];
        }
        
    } catch (error) {
        console.log(error);
    }
 

}
const onSubmit = event => {
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  formEl.reset();
  localStorage.removeItem('feedback-form-state');
};
formEl.addEventListener('input', throttle(onInputChange, 500));
formEl.addEventListener('submit', onSubmit);
