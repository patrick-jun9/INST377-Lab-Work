let slidePosition = 0;
const slides = document.querySelectorAll('.carousel_item');
const totalSlides = slides.length;
const next = document.querySelector('.carousel_button--next');
const prev = document.querySelector('.carousel_button--prev');

function updateSlidePositon() {
  for (let slide of Slides) {
    slide.classList.remove('.carousel_item_visible');
    slide.classList.add('.carousel_item--hidden');
  }
  slides[slidePosition].classList.add('.carousel_item_visible');
}

document.next.addEventListener("click", function () {
  moveToNextSlide();
});

document.prev.addEventListener("click", function () {
  moveToPrevSlide();
});

function moveToNextSlide() {
  if (slidePosition == totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePositon();
}

function moveToPrevSlide() {
  if (slidePosition == 0) {
    slidePosition = totalSlides-1;
  } else {
    slidePosition--;
  }
  updateSlidePositon();
}
