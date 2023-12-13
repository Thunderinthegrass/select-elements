const container = document.querySelector('.container');
const items = document.querySelectorAll('.item');
let selectRect;


let startX;
let endX;
let startY;
let endY;

document.body.addEventListener('mousedown', (e) => {
  console.log('начало:');
  
  console.log(e.pageX);
  console.log(e.pageY);
  console.log('==========================');

  startX = e.pageX;
  startY = e.pageY;

  if (document.querySelector('.select-rect')) {//удаляем при нажатии прямоугольник выбора, если он есть
    let rect = document.querySelector('.select-rect');
    rect.remove();
  }

  items.forEach((elem) => {
    elem.classList.remove('selected')
  })

  selectRect = document.createElement('div');//создаем прямоугольник выбора
  selectRect.classList.add('select-rect');//присваиваем ему класс
  container.append(selectRect);//засовываем его внутрь контейнера
  selectRect.style.left = `${startX}px`;//позиционируем лево
  selectRect.style.top = `${startY}px`;//позиционируем верх
})

document.body.addEventListener('mousemove', (e) => {
  endX = e.pageX;
  endY = e.pageY;

  let widthSelectRect = endX - startX;
  let heightSelectRect = endY - startY;

  selectRect.style.width= `${widthSelectRect}px`;//устанавливаем его ширину
  selectRect.style.height = `${heightSelectRect}px`;//устанавливаем его высоту

  items.forEach((elem) => {
    if (selectRect.getBoundingClientRect().left < elem.getBoundingClientRect().left && 
        selectRect.getBoundingClientRect().right > elem.getBoundingClientRect().right &&
        selectRect.getBoundingClientRect().top < elem.getBoundingClientRect().top &&
        selectRect.getBoundingClientRect().bottom > elem.getBoundingClientRect().bottom) {
      elem.classList.add('selected');
    }
  })
})

document.body.addEventListener('mouseup', (e) => {
  console.log('конец:');
  
  console.log(e.pageX);
  console.log(e.pageY);
  // selectRect.classList.add('transparent');

  console.log(`координаты - ${selectRect.getBoundingClientRect().left}`);
  selectRect.remove();
})