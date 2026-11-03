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
  comprador: {
    id: ObjectId("660000000000000000000005"),
    nombre: "Sara López"
  },
  anuncio: {
    id: ObjectId("670000000000000000000003")
  },
  importe: 340,
  estado: "PENDIENTE",
  fecha: new Date()
}

3. 
anuncio: {
    id: objectId ("670000000000000000000003"),
    titulo: "Iphone 13 128GB"
    precio: 380
}


4. 
No cambiaría el precio guardado en la oferta. Mantendría los 380 € porque es el precio que tenía el anuncio cuando Sara realizó su oferta. Si Ana baja después el precio a 350 €, la oferta debe conservar el precio original para mantener el historial.

//-- EJERCICIO A4

1. 


2. 


3. 


4. 


//-- EJERCICIO A5

1. 


2. 


3. 


4. 


5. 


//-- EJERCICIO A6

1. Mensajes de chat:

2. Dirección de envío de una compra:

3. Etiquetas de un anuncio:

4. Categorías (nombre, icono, atributos obligatorios):

5. Historial de cambios de precio:

6. Los anuncios de un usuario, dentro del usuario:

7. Furniro, líneas de un pedido:

8. Furniro, reseñas de un producto:


//-- APARTADO 9: diferencias con mi diseño




//-- EJERCICIO B2.3




//-- EJERCICIO B4

B4.1 Usuario con el email de Ana
- Predicción:
- Resultado:
- Explicación:

B4.2 Hugo valora otra vez a Marta por el mismo anuncio
- Predicción:
- Resultado:
- Explicación:

B4.3 Anuncio de un vendedor que no existe
- Predicción:
- Resultado:
- Explicación:

B4.4 Precio escrito como texto
- Predicción:
- Resultado:
- Explicación:

B4.5 Cambiar el precio del Xiaomi sin operador
- Predicción:
- Resultado:
- Explicación:

B4.6 Buscar el iPhone por su id como texto
- Predicción:
- Resultado:
- Explicación:

B4.7 


B4.8 


B4.9 


//-- EJERCICIO B5.12




//-- EJERCICIO B7 (preguntas)

B7.3 (¿Se ha duplicado el Ford Focus?):

B7.4 (¿Cuántas instrucciones? ¿Y si se corta la luz?):

B7.6 (¿Qué nombre aparece en sus anuncios? ¿Dónde hay que arreglarlo?):


//-- EJERCICIO B8

1. 

2. 

3. 

4. 

5. 

6. 
