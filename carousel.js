'use strict';

class Carousel {
  /**
   * The constructor. Initialize carousetl, add events.
   * @param {HTMLElement} element
   * @param {object} options
   */
  constructor(element, options = {}) {
    const defaultOptions = {
      btnPrevSelector: '.arrow.prev',
      btnNextSelector: '.arrow.next',
      containerSelector: '.images',
      imagesSelector: '.images li',
      scrollStep: 3,
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.btnPrev = element.querySelector(this.options.btnPrevSelector);
    this.btnNext = element.querySelector(this.options.btnNextSelector);
    this.container = element.querySelector(this.options.containerSelector);
    this.images = element.querySelectorAll(this.options.imagesSelector);
    this.scrollPosition = 0;

    this.btnPrev.addEventListener('click', this.scroll.bind(this, -1));
    this.btnNext.addEventListener('click', this.scroll.bind(this, 1));
  }

  /**
   * Scrolling the carousel.
   * @param {number} direction The direction (1 - next, -1 - previous)
   */
  scroll(direction = 1) {
    this.scrollPosition += this.options.scrollStep * direction;
    if (this.scrollPosition < 0) {
      this.scrollPosition = 0;
      this.btnPrev.classList.add('hidden');
    } else {
      this.btnPrev.classList.remove('hidden');
    }
    if (this.scrollPosition >= this.images.length - this.options.scrollStep) {
      this.scrollPosition = this.images.length - this.options.scrollStep;
      this.btnNext.classList.add('hidden');
    } else {
      this.btnNext.classList.remove('hidden');
    }

    let offset = 0;
    for (let i = 0; i < this.scrollPosition; i += 1) {
      offset += this.images[i].getBoundingClientRect().width;
    }
    this.container.style.marginLeft = `${offset * -1}px`;
  }
}
