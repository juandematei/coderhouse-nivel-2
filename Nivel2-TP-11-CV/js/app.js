/*

# Mejorar DE NUEVO el modulo IMDB
​Curriculum Vitae.
- Crear un formulario con los siguientes campos
	o	Nombre (input=text)
	o	Apellido (input=text)
	o	Género (2 radio button: )
	o	Edad (input=number)
	o	Ocupación (select)
	o	Estudios -> (textarea)
	o	Foto -> (input=text solo con la ruta de la imagen)
- La página debe tener un botón que diga “Generar cv”.
- Una vez presionado el botón, El formulario tiene que ocultarse y se mostrará un CV con toda la información ingresada.
- Una vez renderizado el CV abajo debe aparecer 2 botones:
	o	Imprimir” -> imprime el CV generado
	o	“Ingresar otro CV” -> volvemos al formulario

*/

$('#cv-generado').hide();

$('#generar').click(function(event) {
	event.preventDefault();

	var nombre = $('#nombre').val();
	var apellido = $('#apellido').val();
	var genero = $('input[type="radio"]').attr('id');
	var ocupacion = $('#ocupacion').val();
	var estudios = $('#estudios').val();
	var imagen = $('#imagen').val();

	$('<img src="' + imagen + '" class="img-circle centered-block"</img>').appendTo('#cv-generado > article');
	$('<h3 class="text-center text-capitalize bg-primary">' + nombre + ' ' + apellido + '</h3>').appendTo('#cv-generado > article');
	$('<p class="text-capitalize">' + genero + '</p>').appendTo('#cv-generado > article');
	$('<p class="lead">' + ocupacion + '</p>').appendTo('#cv-generado > article');
	$('<p>' + estudios + '</p>').appendTo('#cv-generado > article');

	$('#formulario').fadeOut(500, function() {
		$('#cv-generado').fadeIn(500);
	});

});

$('#imprimir').click(function(event) {
	event.preventDefault();
	window.print();
});

$('#cargar-nuevo').click(function(event) {
	event.preventDefault();
	$('#cv-generado').fadeOut(500, function() {
		$('#formulario').fadeIn(500);
	});
});
