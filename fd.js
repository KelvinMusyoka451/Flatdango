document.addEventListener('DOMContentLoaded', displayFirstMovie);

function displayFirstMovie() {
  fetch('http://localhost:3000/films/1')
      .then(res => res.json())
      .then((films) => {
        const movieContainer = document.querySelector('.movies');
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