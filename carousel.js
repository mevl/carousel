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
      itemsSelector: 'li',
      scrollStep: 3,
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.btnPrev = element.querySelector(this.options.btnPrevSelector);
    this.btnNext = element.querySelector(this.options.btnNextSelector);
    this.container = element.querySelector(this.options.containerSelector);
    this.scrollPosition = 0;
    this.positionOffset = [];

    const items = this.container.querySelectorAll(this.options.itemsSelector);
    Array.prototype.forEach.call(items, (item, i) => {
      this.positionOffset[i] = i
        ? this.positionOffset[i - 1] + items[i - 1].getBoundingClientRect().width
        : 0;
    });

    this.btnPrev.addEventListener('click', this.scroll.bind(this, -1));
    this.btnNext.addEventListener('click', this.scroll.bind(this, 1));
  }

  /**
   * Next/Previous scroll button callback.
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
    if (this.scrollPosition >= this.positionOffset.length - this.options.scrollStep) {
      this.scrollPosition = this.positionOffset.length - this.options.scrollStep;
      this.btnNext.classList.add('hidden');
    } else {
      this.btnNext.classList.remove('hidden');
    }

    this.scrollTo(this.container, this.scrollPosition);
  }

  /**
   * Scrolling the carousel to item position.
   * @param {HTMLElement} element The container HTML element.
   * @param {number} position The destination scroll position.
   */
  scrollTo(element, position) {
    if (element && this.positionOffset[position] !== undefined) {
      element.style.marginLeft = `${this.positionOffset[position] * -1}px`;
    }
  }
}
