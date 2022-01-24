const menuButton = document.getElementById('menuButton');

/* Scroll To Top */
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

// eslint-disable-next-line func-names
window.onscroll = function () {
  scrollFunction();
};

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

/* menu-mobile*/

const menuToggle = document.getElementById('menuToggle');
const menuWrapper = document.getElementById('menuWrapper');

function menuMob (){
     menuWrapper.classList.toggle('open-menu');  
}

