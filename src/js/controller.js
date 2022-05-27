'use strict';

import mainView from './views/mainView';

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

const controlLoadPage = function () {
  console.log('windo-hash:', window.location.hash);

  if (window.location.hash === '') {
    // mainView create;
  } else if (window.location.hash === '#/about/overview') {
    console.log('another page');
    // second View의 render메서드 호출.
    // mainView, and other views delete

    const el = document.querySelector('.all-section');
    el.innerHTML = '';
  }
};

const init = function () {
  mainView.addHandlerRender(controlLoadPage);
};

init();
