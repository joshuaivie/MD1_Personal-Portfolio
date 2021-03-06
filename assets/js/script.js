// 1. Scroll To Top
const scrollButton = document.getElementById('scrollToTop');

const scrollFunction = () => {
  if (
    document.body.scrollTop > 300
    || document.documentElement.scrollTop > 300
  ) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
};

window.onscroll = () => {
  scrollFunction();
};

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// 2. Mobile Menu
const menuWrapper = document.getElementById('menuWrapper');

const menuMob = () => {
  menuWrapper.classList.toggle('open-menu');
};

// 3. Project Details PopUp
const getDetailsList = fetch('./assets/data/data.json').then((result) => result.json());

const pdContainer = document.getElementById('pdContainer');
const pdTitle = document.getElementById('pdTitle');
const pdCompany = document.getElementById('pdCompany');
const pdRole = document.getElementById('pdRole');
const pdYear = document.getElementById('pdYear');
const pdImage = document.getElementById('pdImage');
const pdDescription = document.getElementById('pdDescription');
const pdTechnologies = document.getElementById('pdTechnologies');
const pdLive = document.getElementById('pdLive');
const pdSource = document.getElementById('pdSource');

const hasClass = (element, className) => ` ${element.className} `.indexOf(` ${className} `) > -1;

const renderDetails = (
  title,
  company,
  role,
  year,
  imageName,
  description,
  technologies,
  live,
  github,
) => {
  pdTitle.innerHTML = title;
  pdCompany.innerHTML = company;
  pdRole.innerHTML = role;
  pdYear.innerHTML = year;
  pdImage.src = `./assets/img/work-details/${imageName}`;
  pdLive.setAttribute('href', live);
  pdSource.setAttribute('href', github);
  pdDescription.innerHTML = description;

  for (let i = 0; i < pdTechnologies.children.length; i += 1) {
    pdTechnologies.children[i].innerHTML = technologies[i];
  }
};

const portfolio = document.getElementById('portfolio');

getDetailsList.then((workItems) => {
  workItems.forEach((item) => {
    let technologies = '';
    for (let i = 0; i < item.technologies.length; i += 1) {
      technologies += `<li class="technology-tag">${item.technologies[i]}</li>`;
    }
    portfolio.innerHTML += `
    <div class="work-item" onclick="openDetails(${item.id})">
    <img alt="work-item-img" src="./assets/img/work-details/${item.imageName}">
    <div class="work-item-content">
      <h3 class="work-title">${item.title}</h3>
      <div class="work-subtitle">
        <span>${item.company}</span>
        <span class="font-weight-normal">${item.role}</span>
        <span class="font-weight-normal">${item.year}</span>
      </div>
      <p class="work-details">
        ${item.description.substring(0, 200)}
      </p>
      <ul class="work-technologies">
        ${technologies}
      </ul>
      <button class="view-work-btn">See Project</button>
    </div>
  </div>`;
  });
});

const openDetails = (id) => {
  if (!hasClass(pdContainer, 'show')) {
    pdContainer.classList.add('show');
  }

  getDetailsList
    .then((list) => list.find((project) => project.id === id) || list[0])
    .then((d) => renderDetails(
      d.title,
      d.company,
      d.role,
      d.year,
      d.imageName,
      d.description,
      d.technologies,
      d.liveURL,
      d.github,
    ));
};

const closeDetails = () => {
  if (hasClass(pdContainer, 'show')) {
    pdContainer.classList.remove('show');
  }
};

// 4. form-validation
const inputName = document.getElementById('userName');
const inputEmail = document.getElementById('userEmail');
const form = document.getElementById('form-contact');
const textArea = document.getElementById('contactMessage');

const isRequired = (value) => value !== '';
const isBetween = (length, min, max) => !(length < min || length > max);
const isEmailValid = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove('success');
  formField.classList.add('error');

  const error = formField.querySelector('small');
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove('error');
  formField.classList.add('success');

  const error = formField.querySelector('small');
  error.textContent = '';
};

const checkName = () => {
  const username = inputName.value.trim();
  let valid = false;
  const min = 3;
  const max = 30;
  if (!isRequired(username)) {
    showError(inputName, 'Username cannot be blank');
  } else if (!isBetween(username.length, min, max)) {
    showError(inputName, 'User name must be between 3 and 30 characters');
  } else {
    showSuccess(inputName);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = inputEmail.value.trim();

  const pattern = /[A-Z]/;
  if (pattern.test(inputEmail.value)) {
    showError(inputEmail, 'Email has to lower case');
  } else if (!isRequired(email)) {
    showError(inputEmail, 'Please fill email');
  } else if (!isEmailValid(email)) {
    showError(inputEmail, 'Please provide a valid email');
  } else {
    showSuccess(inputEmail);
    valid = true;
  }
  return valid;
};

const checkMessage = () => {
  let valid = false;
  const min = 15;
  const max = 500;
  const textMessage = textArea.value.trim();

  if (!isRequired(textMessage)) {
    showError(textArea, 'Please enter message');
  } else if (!isBetween(textMessage.length, min, max)) {
    showError(textArea, 'Message should at least 15 - 500 characters');
  } else {
    showSuccess(textArea);
    valid = true;
  }
  return valid;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isUsernameValid = checkName();
  const isEmailValid = checkEmail();
  const isTextFieldValid = checkMessage();
  const isFormValid = isUsernameValid && isEmailValid && isTextFieldValid;

  if (isFormValid) {
    form.submit();
  }
});

// 5. Local Storage
const formModel = {
  userName: 'Isaac',
  userEmail: '',
  contactMessage: '',
};

const currentFormData = localStorage.getItem('formData');
if (currentFormData) {
  const formData = JSON.parse(currentFormData);
  inputName.value = formData.userName;
  inputEmail.value = formData.userEmail;
  textArea.value = formData.contactMessage;
} else {
  localStorage.setItem('formData', JSON.stringify(formModel));
}

const updateLocalStorage = (field, value) => {
  const formData = JSON.parse(localStorage.getItem('formData'));
  formData[`${field}`] = value;
  localStorage.setItem('formData', JSON.stringify(formData));
};

form.addEventListener('input', (e) => {
  updateLocalStorage(e.target.id, e.target.value);
  switch (e.target.id) {
    case 'userName':
      checkName();
      break;
    case 'userEmail':
      checkEmail();
      break;
    case 'contact-message':
      checkMessage();
      break;
    default:
      checkName();
  }
});

console.log(topFunction, menuMob, openDetails, closeDetails);
