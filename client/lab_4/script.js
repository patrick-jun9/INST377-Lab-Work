let slidePosition = 0;
const slides = document.querySelectorAll('carousel_item');
const totalSlides = slides.length;

console.log(slides);

document.
    querySelectorAll('carousel_button--next');
    .addEventListener("click", function(){
        moveToNextSlide();
    });

document.
    querySelectorAll('carousel_button--next');
    .addEventListener("click", function(){
        moveToPrevSlide();
    });

function updateSlidePosition(){
    for(let slide of slides){
        slide.classList.remove('carousel_item_visible')
        slide.classList.add('carousel_item_hidden')
    }
    slides[slidesPosition].classList.add('carousel_item_visible');
}    

function moveToNextSlide(){
    
    if(slidePosition == totalSlides-1 ){
    slidePosition = 0;
}  else {
    slidePosition++;
}
updateSlidePosition();
}

function moveToPrevSlide(){
if(slidePosition==0){
    slidePosition = totalSlides-1;  
} else {
    slidePosition--;
}
updateSlidePosition()
}