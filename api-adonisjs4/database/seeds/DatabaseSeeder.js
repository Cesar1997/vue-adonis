'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    //creando cinco clientes
    const customersArray = await Factory
    .model('App/Models/Customer')
    .createMany(5);
    //creando 10 cines
    const cinemasArray = await Factory
    .model("App/Models/Cinema")
    .createMany(10);

    //creando un genero accion
    const genreAction = await Factory
    .model("App/Models/Genre")
    .create({genre_name : 'Accion'});

    
    //crando un genero comedia
    const genreComedy = await Factory
    .model("App/Models/Genre")
    .create({genre_name : 'Comedia'});


    cinemasArray.forEach(async (cinema) => {
      for(let i = 1; i <= 5; i++){
        //creando salas de cines 
        const room = await Factory
        .model("App/Models/Room")
        .create({cinema_id : cinema.id})

        //creando pelicula 
        const movie = await Factory 
              .model('App/Models/Movie').create();
        
        //accedemos a relaciond e genero por pelicula y creamos una relacion . Cada pelicula tendra dos generos
        await movie.genres().attach([genreAction.id,genreComedy.id]);
        
        //se crean cinco fechas para las peliculas que se generan
        const movie_showing = await Factory
          .model('App/Models/MovieShowing').create({
            cinema_id: cinema.id,
            room_id: room.id,
            movie_id: movie.id,
          });
        
          //la hora en la que se vera la pelicula
        const movie_showing_time = await Factory
        .model('App/Models/MovieShowingTime').create({
          movie_showing_id: movie_showing.id,
        });

        
        customersArray.forEach(async (customer) => {
          const booking = await Factory
            .model('App/Models/Booking').create({
              customer_id: customer.id,
              movie_showing_time_id: movie_showing_time.id,
            });

          await Factory
            .model('App/Models/Seat').create({
              booking_id: booking.id,
            });
        })
      }
    })
  }
}

module.exports = DatabaseSeeder
