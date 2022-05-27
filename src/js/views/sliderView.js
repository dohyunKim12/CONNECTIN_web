import { SLIDER_TIMEOUT_SEC } from '../config';

export default class SliderView {
  _btnLeft = document.querySelector('.slider__btn--left');
  _btnRight = document.querySelector('.slider__btn--right');
  _slides = document.querySelectorAll('.slide');
  _dotContainer = document.querySelector('.dots');
  _sv = {
    isPause: false,
    timer: null,
    curSlide: 0,
    maxSlide: this._slides.length,
  };

  constructor() {
    this.goToSlide(0);
    this.createDots();
    this.activateDot(0);
    this.addHandlerMoveSlide();
  }

  goToSlide = function (slide) {
    this._slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  nextSlide = function () {
    if (this._sv.curSlide === this._sv.maxSlide - 1) {
      this._sv.curSlide = 0;
    } else {
      this._sv.curSlide++;
    }

    this.goToSlide(this._sv.curSlide);
    this.activateDot(this._sv.curSlide);
  };

  prevSlide = function () {
    if (this._sv.curSlide === 0) {
      this._sv.curSlide = this._sv.maxSlide - 1;
    } else {
      this._sv.curSlide--;
    }
    this.goToSlide(this._sv.curSlide);
    this.activateDot(this._sv.curSlide);
  };

  slideStart = function () {
    this._sv.isPause = false;
    this._sv.timer = setInterval(
      this.nextSlide.bind(this),
      SLIDER_TIMEOUT_SEC * 1000
    );
  };

  activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  createDots = function () {
    const dotCon = this._dotContainer;
    this._slides.forEach(function (_, i) {
      dotCon.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  addHandlerMoveSlide() {
    this._btnRight.addEventListener('click', this.nextSlide.bind(this));
    this._btnLeft.addEventListener('click', this.prevSlide.bind(this));

    document.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'ArrowLeft') this.prevSlide();
        e.key === 'ArrowRight' && this.nextSlide();
      }.bind(this)
    );

    this._dotContainer.addEventListener(
      'click',
      function (e) {
        if (e.target.classList.contains('dots__dot')) {
          const { slide } = e.target.dataset;
          this.goToSlide(slide);
          this.activateDot(slide);
        }
      }.bind(this)
    );
    this._dotContainer.addEventListener(
      'mouseover',
      function () {
        clearInterval(this._sv.timer);
      }.bind(this)
    );
    this._dotContainer.addEventListener(
      'mouseout',
      function () {
        this.slideStart();
      }.bind(this)
    );
  }
}
