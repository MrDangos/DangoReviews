// read in the musicFile
// put songs into list and sort them from highest to loest dango score
// display the top 5 songs with a                 
// <li><a id = '${title}' href='${source}'> {title} by {artist} </a></li>
// in an unorderd list


class music {
    constructor(musicId, title, artist, features, genre, album, length, dangoRating, source) {
        this.musicId = musicId;
        this.title = title;
        this.artist = artist;
        this.features = features;
        this.genre = genre;
        this.album = album;
        this.length = length;
        this.dangoRating = dangoRating;
        this.source = source;
    }
    songTitle(){
        return`<h1>${this.title}</h1>`
    }

    extraSongInfo() {
        return `
        <p>Lenght: ${this.length}</p>
        <p>Album: ${this.album}</p>`;
    }

    dangoScore(){
        return `${this.dangoRating}`;
    }
}
function loadMusicById(musicId) {
    fetch('/json/musicFile.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            const songData = data.music.find(item => item.musicId === musicId);

            if (songData) {
                const song = new music(
                    songData.musicId,
                    songData.title,
                    songData.artist,
                    songData.features,
                    songData.genre,
                    songData.album,
                    songData.length,
                    songData.dangoRating,
                    songData.source
                );

                console.log('Song found:', song.title);
                console.log('Source:', song.source);

                
                const sontTitleElement = document.getElementById('songTitle');
                if (sontTitleElement) {
                    sontTitleElement.innerHTML = song.songTitle();
                } else {
                    console.log('songTitle element not found.');
                }


                const extraSongInfoElement = document.getElementById('extraSongInfo');
                if (extraSongInfoElement) {
                    extraSongInfoElement.innerHTML = song.extraSongInfo();
                } else {
                    console.log('extraSongInfo element not found.');
                }
                
                const dangoScoreElement = document.getElementById('dangoScore');
                if (dangoScoreElement) {
                    dangoScoreElement.textContent = `Dango Score: ${song.dangoScore()}`;
                } else {
                    console.log('dangoScore element not found.');
                }

            } else {
                console.log('Song with musicId', musicId, 'not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}

function loadMusicByScore(){
    fetch('/json/musicFile.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch JSON ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log("File was Found")
            data.music.sort((a, b) => b.dangoRating - a.dangoRating);

            const ol = document.getElementById("topFive");
            for (let i = 0; i < 10 && i < data.music.length; i++){
                const songData = data.music[i];
                const li = document.createElement("li");
                li.innerHTML = `<a id="${songData.title}" href="${songData.source}">${songData.title} by ${songData.artist}</a>`;
                li.classList.add('slide-in');
                
                setTimeout(() => {
                    li.classList.add('active');
                }, 100 * i);
                ol.appendChild(li);

            }
        }).catch(error => {
            console.error('Error fetching JSON:', error);
        });
}
loadMusicByScore()