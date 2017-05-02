'use strict';

class Carousel {
  /**
   * The constructor. Initialize carousel, add events.
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
    this.container = element.querySelector(this.options.containerSelector);
    this.positionOffset = [];
    const items = this.container.querySelectorAll(this.options.itemsSelector);
    Array.prototype.forEach.call(items, (item, i) => {
      this.positionOffset[i] = i
        ? this.positionOffset[i - 1] + items[i - 1].getBoundingClientRect().width
        : 0;
    });
    this.scrollPosition = 0;
    this.scrollMaxPosition = this.positionOffset.length - this.options.scrollStep;
    this.btnPrev = element.querySelector(this.options.btnPrevSelector);
    this.btnNext = element.querySelector(this.options.btnNextSelector);

    this.setButtonsAttributes();
    element.addEventListener('click', this.scroll.bind(this));
  }

  /**
   * Next/Previous scroll button callback.
   * @param {event} event
   */
  scroll(event) {
    if (event.target === this.btnPrev) {
      this.scrollPosition -= this.options.scrollStep;
    } else if (event.target === this.btnNext) {
      this.scrollPosition += this.options.scrollStep;
    } else {
      return;
    }
    if (this.scrollPosition <= 0) {
      this.scrollPosition = 0;
    } else if (this.scrollPosition >= this.scrollMaxPosition) {
      this.scrollPosition = this.scrollMaxPosition;
    }

    this.setButtonsAttributes();
    this.scrollTo(this.container, this.scrollPosition);
  }

  /**
   * Set the buttons visibility depends of the current scroll posotion.
   */
  setButtonsAttributes() {
    if (this.scrollPosition <= 0) {
      this.btnPrev.classList.add('hidden');
    } else if (this.btnPrev.classList.contains('hidden')) {
      this.btnPrev.classList.remove('hidden');
    }

    if (this.scrollPosition >= this.scrollMaxPosition) {
      this.btnNext.classList.add('hidden');
    } else if (this.btnNext.classList.contains('hidden')) {
      this.btnNext.classList.remove('hidden');
    }
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
