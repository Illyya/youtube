const results = document.querySelector("#results");
const form = document.querySelector("#form");
const input = document.querySelector("#input");

form.onsubmit = function (e) {
  e.preventDefault();

  // удаляем предыдущие результаты
  while (results.firstChild) {
    results.firstChild.remove();
  }

  // если в инпуте ничего не введено ничего не делаем
  if (!input.value) return;

  // добавляем строку со значением поиска
  const title1 = `<h1 class="title-1" style="margin-bottom: 20px; text-align: center;">Результат поиска по запросу: ${input.value}</h1>`;
  results.insertAdjacentHTML("beforeend", title1);

  const API_KEY = "AIzaSyCk922WOi3VGGw6F9F0pBnpfdn_CY7zT5I";
  const search = input.value;
  const maxResults = 10;
  const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=${maxResults}&q=${search}&order=date`;


  fetch(URL)
    .then(response => response.json())
    .then((data) => plottingResults(data.items))
    .catch(err => alert(err));
};

// функция построения карточек с видео
function plottingResults(items) {
  items.forEach((el) => {
    const date = new Date(el.snippet.publishTime);

    function addZero(time) {
      return ('0' + time).slice(-2)
    }
    
    const formattedDate = `Дата: ${addZero(date.getFullYear())}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())} Время: ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}`

    const videoCard = `
          <div class="results__video-card video-card">            
            <div class="video-card__descriptions descriptions">
              <h2 class="descriptions__title-2">${el.snippet.title}</h2>
              <p class="descriptions__author">${el.snippet.channelTitle}</p>
              <p class="descriptions__date">${formattedDate}</p>
            </div>

            <iframe class="video-card__video" width="420" height="315" src="https://www.youtube.com/embed/${el.id.videoId}" frameborder="0" allowfullscreen></iframe>          
          </div>
          `;

    results.insertAdjacentHTML("beforeend", videoCard);
  });

  const title2 = document.querySelectorAll(".descriptions__title-2");

  title2.forEach(el => {
    el.onclick = function () {
      const elVideo = this.parentElement.nextElementSibling;

      elVideo.style.display == 'block' ? elVideo.style.display = 'none' : elVideo.style.display = 'block';
    };
  });
}