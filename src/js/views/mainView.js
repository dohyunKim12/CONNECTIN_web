import sliderView from './sliderView.js';

class MainView extends sliderView {
  _btnOpenModal = document.querySelectorAll('.btn--show-modal');
  _btnCloseModal = document.querySelector('.btn--close-modal');
  _modal = document.querySelector('.modal');
  _overlay = document.querySelector('.overlay');
  _nav = document.querySelector('.nav');
  _navMenus = document.querySelectorAll('.level-0');
  _header = document.querySelector('.header');

  constructor() {
    super();
    this._addHandlerShowModal();
    this._addHandlerHideModal();
    this._addHandlerShowNavMenu();
    this._addHandlerStickyNav();
  }

  openModal(e) {
    e.preventDefault();
    this._modal.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  closeModal() {
    this._modal.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  closeModalKey(e) {
    if (e.key === 'Escape' && !this._modal.classList.contains('hidden')) {
      this.closeModal();
    }
  }

  handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      const logo = link.closest('.nav').querySelector('img');

      siblings.forEach(el => {
        if (el !== link) el.style.opacity = this;
      });
      logo.style.opacity = this;
    }
  };

  //////////////////////////////////
  //////////////////////////////////
  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  _addHandlerShowModal() {
    this._btnOpenModal.forEach(btn =>
      btn.addEventListener('click', this.openModal.bind(this))
    );
  }

  _addHandlerHideModal() {
    this._btnCloseModal.addEventListener('click', this.closeModal.bind(this));
    this._overlay.addEventListener('click', this.closeModal.bind(this));
    document.addEventListener('keydown', this.closeModalKey.bind(this));
  }

  _addHandlerShowNavMenu() {
    this._nav.addEventListener('mouseover', this.handleHover.bind(0.5));
    this._nav.addEventListener('mouseout', this.handleHover.bind(1));
    this._nav.addEventListener(
      'mouseover',
      function () {
        this._navMenus.forEach(menu => menu.classList.toggle('hidden'));
      }.bind(this)
    );
    this._nav.addEventListener(
      'mouseout',
      function () {
        this._navMenus.forEach(menu => menu.classList.toggle('hidden'));
      }.bind(this)
    );
  }

  _addHandlerStickyNav() {
    const navHeight = this._nav.getBoundingClientRect().height;
    const stickyNav = function (entries) {
      const [entry] = entries;

      if (!entry.isIntersecting) {
        this._nav.classList.add('sticky');
        this._nav.style.transition = 'all 5s';
        clearInterval(this._sv.timer);
      } else {
        this._nav.classList.remove('sticky');
        this.slideStart();
      }
    }.bind(this);

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `${navHeight + 380}px`,
    });

    headerObserver.observe(this._header);
  }
}
export default new MainView();
