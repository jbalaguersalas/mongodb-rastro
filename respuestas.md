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
Crearía una colección independiente llamada valoraciones, porque un usuario puede recibir muchas valoraciones y estas pueden crecer con el tiempo. Así evitamos que el documento del usuario tenga un array demasiado grande.


2. 
{
    anuncioId: ObjectId("670000000000000000000004"),
    autor: {
        id: ObjectId("660000000000000000000004"),
        nombre: "Hugo Sanz"
    },
    valoradoId: ObjectId("660000000000000000000003"),
    estrellas: 5,
    comentario: "Todo perfecto",
    fecha: new Date()
}

3. 
Crearía un índice único sobre autor.id y anuncioId, para evitar que un mismo usuario valore dos veces la misma compra.

4. valoracionMedia: 6
    numValoraciones: 65
    
    Guardaría los campos valoracionMedia y numValoraciones dentro del documento del usuario. Así podemos mostrar su nota media directamente, sin tener que recorrer todas sus valoraciones cada vez.


//-- EJERCICIO A5

1. Un usuario normal podrá tener decenas, como mucho algún centenar, pero un anuncio popular lo tendran en favoritos miles de usuarios.


2. Se descarta la opción b, porque ese array crece sin limite en un anuncio popular, y ocuparia más de la cuenta.


3. La lista de favoritos del usuario, no hace falta consultar ningun sitio más.


4. Buscamos en la colección usuarios los que tienen ese anuncio en su lista de favoritos, y los contamos:
db.usuarios.countDocuments({ favoritos: ObjectId("670000000000000000000008") })


5. $addToSet, porque solo añade el anuncio si no está ya en la lista. Con $push se repetiría si el usuario pulsa dos veces.


//-- EJERCICIO A6

1. Mensajes de chat: Referenciar (ej:mensajes).Pueden ser muchisimos y no paran.

2. Dirección de envío de una compra:embeber, dentro de la compra.Es pequeña.

3. Etiquetas de un anuncio:embeber, (un array) dentro del anuncio.Son pocas palabras y se muestran con el anuncio.

4. Categorías (nombre, icono, atributos obligatorios):Referenciar, en una colección categorías, por que muchos anuncios utilizan y van por categorías.

5. Historial de cambios de precio:embeber,dentro del anuncio(array con fecha y precio), solo cambia cada pocas veces y se trata de ese articulo.

6. Los anuncios de un usuario, dentro del usuario:Referenciar, por que un usuario puede tener muchos anuncios.

7. Furniro, líneas de un pedido:Embeber,dentro del pedido.Son parte del pedido, se leen con el pedido, solas no tendrían sentido.

8. Furniro, reseñas de un producto:Referenciar, en una colección reseñas.Un producto popular podría tener miles y ocuparía mucho.


//-- APARTADO 9: diferencias con mi diseño
Diferencias:
- En el iPhone guardé el almacenamiento y la batería como texto ("128GB", "87%"). El modelo usa
  números (almacenamientoGB: 128, bateriaPct: 87), que es mejor porque así se puede buscar con
  mayor que / menor que.
En la mesa puse las medidas juntas (dimensiones: "89 x 320 cm"). El modelo las separa en ancho,
  fondo y alto, así se puede filtrar por cada medida.

Me gusta mas el modelo del profe, ya que el mio tiene ciertos parametros que cuando vas a comparar no van a dejar.Además de añladir mas informacion por ejemplo a la mesa donde especifica bien las dimensiones ancho, fondo y alto.

//-- EJERCICIO B2.3




//-- EJERCICIO B4

B4.1 Usuario con el email de Ana
- Predicción:
Fallará por valores repetidos.
- Resultado:
MongoServerError: E11000 duplicate key error collection: rastro.usuarios index: email_1 dup key: { email: "ana@rastro.es" }
- Explicación:
MongoDB no deja guardar dos usuarios con el mismo email por el unique.

B4.2 Hugo valora otra vez a Marta por el mismo anuncio
- Predicción:
No dejará valorar la misma compra dos veces por la misma persona.
- Resultado:
MongoServerError: E11000 duplicate key error collection: rastro.valoraciones index: autor.id_1_anuncioId_1 dup key: { autor.id: ObjectId('660000000000000000000004'), anuncioId: ObjectId('670000000000000000000004') }
- Explicación:
La misma persona no puede valorar dos veces la misma compra, lo para el índice del B3.2.

B4.3 Anuncio de un vendedor que no existe
- Predicción:
No tengo mucha idea de lo que pasa, pero creo que se guarda sin error.
- Resultado:
acknowledged: true, insertedId: ObjectId('6aec96d13b7fbd70cad70bc1')
- Explicación:
Se guarda, pero está mal: el anuncio apunta a un usuario que no existe y si alguien pulsa en el vendedor no encontrará nada.

B4.4 Precio escrito como texto
- Predicción:
Se guardará pero el precio en vez de number será un texto.
- Resultado:
Se guarda bien, pero al buscar los de menos de 100 € la lámpara no sale.
- Explicación:
Al ir entre comillas "75" es texto y no lo compara con números.

B4.5 Cambiar el precio del Xiaomi sin operador
- Predicción:
Creo que dará error porque falta el $set.
- Resultado:
MongoInvalidArgumentError: Update document requires atomic operators
- Explicación:
Sin $set no te deja, y el Xiaomi sigue a 90.

B4.6 Buscar el iPhone por su id como texto
- Predicción:
No lo va a encontrar.
- Resultado:
null
- Explicación:
El id está guardado como ObjectId y yo lo busco como texto, así que no coincide.

B4.7 ¿Qué pasaba en el gimnasio con un plan_id que no existe? ¿Quién lo comprueba en Rastro?
- Predicción:
En el gimnasio no se guardaba, aquí creo que sí.
- Resultado:
En el B4.3 el anuncio fantasma se guardó sin error.
- Explicación:
En PostgreSQL saltaba el error de la clave ajena. Aquí lo tiene que comprobar la aplicación antes de guardar el anuncio.

B4.8 ¿Por qué la lámpara de 75 € no sale en la búsqueda de menos de 100 €?
- Predicción:
Por el precio entre comillas.
- Resultado:
Salen el Xiaomi, la chaqueta, las zapatillas y la Prueba fantasma, pero la lámpara no.
- Explicación:
"75" es texto y no un número, así que al buscar precio < 100 Mongo no lo tiene en cuenta.

B4.9 ¿Qué tienen en común B4.3 y B4.4?
- Predicción:
Que los dos se guardan aunque estén mal.
- Resultado:
Los dos dieron acknowledged: true, sin ningún error.
- Explicación:
MongoDB no mira si el vendedor existe ni si el precio es un número, eso lo tenemos que controlar nosotros.


//-- EJERCICIO B5.12
¿Qué pasa con los anuncios que no tienen atributos.km, como el iPhone? ¿Dan error?
- Predicción:
Creo que no da error, simplemente no salen.
- Resultado:
Solo sale el Seat Ibiza, sin ningún error.
- Explicación:
Los que no tienen km (móviles, ropa...) no cumplen el filtro y Mongo los salta.



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
