//--EJERCICIO A1

1. Las columnas que tendria la tabla anuncios serían = Título, Categoría, Precio, Marca, Modelo, Año, Kilometros, combustible, almacenamiento, batería, talla, genero, material, dimensiones. (14 columnas)

2. La fila de la chaqueta quedaría  Título: Chaqueta vaquera, categoría: Ropa, talla:M, Marca:Levi's, genero:unisex.

Quedarían unas 9 columnas en null.

3. Tendría que añadir 2 columnas mas una con el tipo de bici, y otra con las pulgadas de la rueda


4. Harían falta 4 JOIN, uno para unir la tabla anuncios con cada una de las tablas de categorías (coches, móviles, ropa y muebles). Así podríamos obtener todos los anuncios de Valencia junto con sus datos específicos.

5. titulo: "IPhone 13", categoria: "Moviles", precio: 350,
    atributos: {marca: "Apple", modelo: "Iphone13", alamcenamiento: "128GB", batería: 87%}

    título: "Mesa", categoria: "Muebles", precio: 234,
        atributos: {material: "roble", dimensiones: 89 x 320 cm}

//--EJERCICIO A2

1. 
No es necesario guardar toda la información del usuario dentro de cada anuncio, porque un mismo usuario puede publicar muchos anuncios y estaríamos duplicando sus datos.
Además si el ususario, cambia alguno de sus datos como el email o la ciudad tendriamos que cambiar los datos en todos los anuncios.

2. 
Copiamos el nombre del vendedor mediante el id para poder ir a su perfil y ahi aparecen los datos que necesitamos, aplica la misma logica anterior si el ususario cambia su ciudad o su email nos quedaríamos con una version antigua y que no es actualmente lo que tiene esa persona, en definitiva copiando su usuario tenemos su perfil con toda su informacion relevante sin depender de su ciudad o email.

3. 
Tendríamos que actualizar el nombre en colección usuarios y también en todos los anuncios donde aparezca como vendedor.

4. 
En SQL utilizábamos un JOIN para relacionar la tabla de clases con la tabla de monitores mediante el ID del monitor y así obtener su nombre. En MongoDB guardamos una referencia al usuario y una copia de su nombre dentro del anuncio

//--EJERCICIO A3

1. 
Crearía una colección independiente llamada ofertas, porque un anuncio puede recibir muchas ofertas y estas pueden crecer sin límite.
Mediante anuncio_id <> ofertas <> Comprador ID


2. 
{
comprador {
    id: ObjectId("660000000000000000000005"),
    nombre: "Sara"
},
anuncio {
    id: ObjectId("670000000000000000000003")
},
importe: 340,
estado: "PENDIENTE",
fecha: NEW DATE()
}
3. 



4. 