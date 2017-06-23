/*

TRABAJO PRACTICO FINAL: NETFLIX ROULETTE

En el siguiente trabajo practico utilizaremos la api de Netflix Roulette para traer información peliculas o series sugeridas de un director.

Consignas:

HEADER:
- La página debe contar con un header con una imagen que al clickearla nos recargue la página.

BODY
- Debemos contar con un input en donde el usuario pueda ingresar el nombre del director.
- Tambien habrá un boton de "Buscar" o una lupa, el cual al presionarlo realizará nuestra busqueda de peliculas del director en la api de netflix.
- Cuando estemos buscando, deberemos mostrar un icono de "Cargando resultados..." en la pagina, el cual desaparecera cuando aparezca el resultado.
- Por cada resultado obtenido deberemos renderizar:
	- Nombre de la pelicula o serie
	- Imagen
	- Sinopsis
	- Si es pelicula o serie
	- Ranking de netflix
	- Año


FOOTER
- En el footer debemos tener informacion relevante con respecto al: autor, año, links a redes sociales
- El footer tambien debe contar con un ancla que nos lleve hacia arriba de todo de la página.


URLS de ejemplo para hacer Ajax Requests:
http://netflixroulette.net/api/api.php?director=quentin%20tarantino
http://netflixroulette.net/api/api.php?director=George%20Lucas

BONUS: crear 1 input mas donde pueda ingresar el nombre del actor.
Este input funcionara como filtro para nuestra busqueda ajax:
Ej: http://netflixroulette.net/api/api.php?director=quentin%20tarantino&actor=waltz

*/

(function() {

  $(document).ready(function() {

    //Botones de selección para tipo de búsqueda.
    $('#radioBtn a').on('click', function() {
      var sel = $(this).data('title');
      var tog = $(this).data('toggle');
      $('#' + tog).prop('value', sel);

      $('a[data-toggle="' + tog + '"]').not('[data-title="' + sel + '"]').removeClass('active');
      $('a[data-toggle="' + tog + '"][data-title="' + sel + '"]').addClass('active');
    });

    //Buscador
    $(':submit').click(function(event) {
      event.preventDefault();

      var searchData = $('#searchData').val();
      var searchType = $('#searchType').val();

      //Resetea los resultados y valores de la búsqueda previa.
      $('.show-result').html('');
      $('#searchData').val('');
      $('.alert-warning').hide();

      //Muestra alerta mientas se buscan los resultados.
      $('.alert-info').show();

      $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'http://netflixroulette.net/api/api.php?' + searchType + '=' + searchData,
        success: function(data) {
          console.log(data);

          $('.alert-info').hide();

          var searchMovies = data;

          for (var i = 0; i < searchMovies.length; i++) {

            var poster = searchMovies[i].poster;
            var title = searchMovies[i].show_title;
            var summary = searchMovies[i].summary;
            var rating = searchMovies[i].rating;
            var ratingNumber = parseInt(rating);
            var releaseYear = searchMovies[i].release_year;
            var mediatype = searchMovies[i].mediatype;

            var moviePoster = '<div class="col-md-12 col-sm-12"><img class="movie-poster-img poster-container" src="' + poster + '"';
            var movieTitle = '<div class="col-md-12 col-sm-12"><h2 class="movie-title">' + title + '</h2></div>';
            var movieSummary = '<div class="col-md-12 col-sm-12"><p class="movie-summary text-justify">' + summary + '</p></div>';
            var movieRating = '<div class="col-md-4 col-sm-4 text-center"><h4><span class="label label-warning"><i class="fa fa-star" aria-hidden="true" ></i> ' + rating + '</span></h4></div>';
            var movieYear = '<div class="col-md-4 col-sm-4 text-right"><h4><span class="label label-default"><i class="fa fa-calendar" aria-hidden="true"></i> ' + releaseYear + '</span></h4></div>';
            var mediaType = '';
            if (mediatype == '0') {
              mediaType = '<div class="col-md-4 col-sm-4 text-left"><h4><span class="label label-default"><i class="fa fa-film" aria-hidden="true"></i> Cine</span></h4></div>';
            } else {
              mediaType = '<div class="col-md-4 col-sm-4 text-left"><h4><span class="label label-default"><i class="fa fa-television" aria-hidden="true"></i> TV</p></h4></span>';
            }

            //Crea el bloque html por cada resultado.
            $('.show-result').append('<div class="movie col-md-4 col-sm-6">' + moviePoster + movieTitle + mediaType + movieRating + movieYear + movieSummary + '</div>');
          }

        },
        error: function(data) {
          console.log(data);
          console.log('No se encontró el archivo');
          $('.alert-info').hide();
          //Muestra alerta cuando no hay resultados.
          $('.alert-warning').show();
        }
      });

    });

    //Botón en footer para ir arriba.
    $('#to-top').click(function() {
      $('body').animate({
        scrollTop: 0
      }, "slow");
    });

  });

})();
