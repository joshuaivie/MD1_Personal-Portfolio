/* eslint-disable max-len */

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

window.onscroll = function () {
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
const pdTechnologies = document.getElementById('pdTechnologies'); //pdTechnlogies
const pdLive = document.getElementById('pdLive');
const pdSource = document.getElementById('pdSource');


const hasClass = (element, className) => (` ${element.className} `).indexOf(` ${className} `) > -1;

const renderDetails = (title, company, role, year, imageName, description, technologies, live, github) => {
  pdTitle.innerHTML = title;
  pdCompany.innerHTML = company;
  pdRole.innerHTML = role;
  pdYear.innerHTML = year;
  pdImage.src = `./assets/img/work-details/${imageName}`;
  pdLive.setAttribute("href", live);
  pdSource.setAttribute("href", github);
  pdDescription.innerHTML = description;

 for(let i=0; i < pdTechnologies.children.length; i++ ){
  pdTechnologies.children[i].innerHTML = technologies[i];
 }

}

const openDetails = (id) => {
  if (!hasClass(pdContainer, 'show')) {
    pdContainer.classList.add('show');
  }

  getDetailsList
    .then((list) => list.find((project) => project.id === id) || list[0])
    .then((d) => renderDetails(d.title, d.company, d.role, d.year, d.imageName, d.description, d.technologies, d.liveURL, d.github));
};

const closeDetails = () => {
  if (hasClass(pdContainer, 'show')) {
    pdContainer.classList.remove('show');
  }
};

const func1 = menuMob;
const func2 = topFunction;
const func3 = renderDetails;
const func4 = closeDetails;
// console.log(func1, func2, func3, func4);


