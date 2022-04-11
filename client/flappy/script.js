document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');

  let birdLeft = 220;
  let birdBottom = 100;
  let gravity = 2;

  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
  }
  let timerID = setInterval(startGame , 20);
  clearInterval(timerId);

  function jump() {
    if (birdBottom < 480) birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
  }

  function control(e) {
    if (e.keycode === 32) {
      jump();
    }
  }
  document.addEventListener('keyup', jump);

  function generateObstacle(){
      const obstacle = document.createElement()
  }
});
