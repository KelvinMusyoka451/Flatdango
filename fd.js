document.addEventListener('DOMContentLoaded', displayFirstMovie);

function displayFirstMovie() {
  fetch('http://localhost:3000/films/1')
      .then(res => res.json())
      .then((films) => {
        const movieContainer = document.querySelector('.first-movie');
        movieContainer.innerHTML = `
                <img src="${films.poster}" alt="${films.title}">
                <h2>${films.title}</h2>
                <p style='text-align: center;'>${films.description}</p>
                <p>Runtime: ${films.runtime} minutes</p>
                <div class="info">
                    <p>Showtime: ${films.showtime}</p>
                    <p id='tickets'>Tickets: ${(films.capacity - films.tickets_sold)}</p>
                </div>
                <button id='buy-ticket' onclick='updateTickets(${films.id})'>
                    Buy Ticket
                </button>
            `;
        });
}
function displayMoviesOnNav() {
  fetch('http://localhost:3000/films')
      .then(res => res.json())
      .then(films => {
        const filmList = document.querySelector('#nav-list');
        filmList.innerHTML = '';
        films.forEach((film, index) => {
          let listItem = document.createElement('li');
          listItem.dataset.index = index;
          listItem.innerHTML = film.title;
          listItem.addEventListener('click', () => displayMovie(film));
                filmList.appendChild(listItem);
            });
        });
}
displayMoviesOnNav()    

function updateTickets(filmId) {
  fetch(`http://localhost:3000/films/${filmId}`)
      .then(res => res.json())
      .then(film => {
        if (film.tickets_sold < film.capacity) {
            film.tickets_sold++;
            let ticketsAvailable = film.capacity - film.tickets_sold;
            document.querySelector('#tickets').innerText = 'Tickets: ${ticketsAvailable}';
            if (ticketsAvailable === 0) {
              document.getElementById('buy-ticket').disabled = true;
              document.getElementById('buy-ticket').innerText = 'SOLD OUT';
          }
          // Send a PATCH or PUT request to update tickets_sold on the server
          fetch(`http://localhost:3000/films/${filmId}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tickets_sold: film.tickets_sold }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
      });
}
})
}
function displayMovie(movie) {
  const movieContainer = document.querySelector('.first-movie');
  movieContainer.innerHTML = '';
  fetch(`http://localhost:3000/films/${movie.id}`)
        .then(res => res.json())
        .then(films => {
          movieContainer.innerHTML = `
          <img src="${films.poster}" alt="${films.title}">
                <h2>${films.title}</h2>
                <p style='text-align: center;'>${films.description}</p>
                <div class="info">
                <p><span>Runtime:</span> ${films.runtime} minutes</p>
                    <p><span>Showtime:</span> ${films.showtime}</p>
                    <p id='tickets'><span>Tickets:</span> ${(films.capacity - films.tickets_sold)}</p>
                    <button id='buy-ticket' data-film-id='${films.id}'>
                        Buy Ticket
                    </button>
                </div>
            `;
        });
}