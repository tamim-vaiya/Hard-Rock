const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const result = document.getElementById('fancyResult');


//making search box empty , when clicked;
search.addEventListener('click', () => {
  search.value = '';
})

//working with searchBtn and showing result
searchBtn.addEventListener('click', ()=> {
  const songName = search.value;
  const apiLink = 'https://api.lyrics.ovh';
  fetch(`${apiLink}/suggest/${songName}`)
  .then(res => res.json())
  .then(data => displayFancyResult(data))
})

function displayFancyResult(data){
  console.log(data);
  result.innerHTML = `
    ${data.data.slice(0,10).map(song => `
		<div class="single-result row align-items-center my-3 p-3">
			<div class="col-md-9">
				<h3 class="lyrics-name">${song.title}</h3>
				<p class="author lead">Album by <span>${song.artist.name}</span></p>
			</div>
			<div class="col-md-3 text-md-right text-center">
				<button class="btn btn-success"> <span data-artistName="${song.artist.name}" data-songTitle="${song.title}"> Get Lyrics </span> </button>
			</div>
		</div>
    `).join('')
	}
    `
}

//working with get lyricsBtn
result.addEventListener("click", a=>{
  const clickedElement = a.target;
  if (clickedElement.tagName === "span" || "button") {
      const artist = clickedElement.getAttribute('data-artistName');
      const songTitle = clickedElement.getAttribute('data-songTitle');

      getLyrics(artist, songTitle);
  }
})

// get lyrics for song
async function getLyrics(artist, songTitle) {
  const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
  const data = await response.json(); 

  if (data.error) {
      result.innerHTML = data.error;
 } else {
      const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

      result.innerHTML =
      `
          <div class="single-lyrics text-center">
              <h2 class="text-success mb-4"><strong>${songTitle}</strong> - ${artist}</h2>
              <pre class="lyric text-white">${lyrics}</pre>
          </div>
      `
 }    
}