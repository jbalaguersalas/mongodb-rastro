//-- EJERCICIO A1

1. Si cada atributo es una columna, la tabla anuncios quedaría con estas: título, categoría, precio, marca, modelo, año, km, combustible, almacenamiento, batería, talla, género, material y dimensiones. En total me salen 14 columnas.

2. La fila de la chaqueta sería: título "Chaqueta vaquera", categoría "Ropa", precio 25, talla M, marca Levi's y género unisex. El resto (modelo, año, km, combustible, almacenamiento, batería, material y dimensiones) se quedarían en NULL, o sea 8 columnas vacías. Casi la mitad de la fila sin usar.

3. Tendría que cambiar la tabla con un ALTER TABLE y añadir columnas nuevas para el tipo de bici y las pulgadas de la rueda (la talla ya estaba por la ropa). Y cada vez que saliera una categoría nueva habría que volver a tocar la tabla.

4. Harían falta 4 JOIN, uno por cada tabla de categoría (coches, móviles, ropa y muebles), para juntarlas con la tabla anuncios y sacar todos los de Valencia con sus datos. Y si mañana hay más categorías, más JOIN.

5. Los documentos que escribí:

{ titulo: "iPhone 13", categoria: "Móviles", precio: 380,
  atributos: { marca: "Apple", modelo: "iPhone 13", almacenamiento: "128GB", bateria: "87%" } }

{ titulo: "Mesa de comedor", categoria: "Muebles", precio: 120,
  atributos: { material: "roble", dimensiones: "160 x 90 x 75 cm" } }


//-- EJERCICIO A2

1. Por dos cosas. La primera, que un usuario puede tener muchos anuncios y estaríamos repitiendo todos sus datos en cada uno. La segunda, que si cambia algo como el email o la ciudad, habría que ir cambiándolo en todos sus anuncios uno por uno.

2. Copiamos el nombre porque es lo único que se ve en la ficha ("Vendido por Luis Martín") y casi nunca cambia. El email o la ciudad no hacen falta para pintar la ficha y pueden cambiar más, así que si los copiáramos nos quedaríamos con datos viejos. Si alguien quiere ver más, con el id se va al perfil.

3. Hay que cambiarlo en su documento de la colección usuarios y también en todos los anuncios donde sale como vendedor (vendedor.nombre). Y si ha hecho ofertas, también en esas ofertas.

4. En el gimnasio se hacía con un JOIN entre la tabla clases y la de monitores usando el id del monitor. Aquí no hace falta el JOIN, porque el anuncio ya lleva el id del vendedor y una copia de su nombre. Se gana velocidad, pero hay que acordarse de actualizar la copia.


//-- EJERCICIO A3

1. Las pondría en una colección aparte, ofertas. Un anuncio popular puede recibir muchas ofertas y la lista no para de crecer. Además, el comprador quiere ver "mis ofertas" sin tener que abrir anuncio por anuncio. Cada oferta guarda el id del anuncio y el id del comprador.

2.
{
  importe: 340,
  estado: "PENDIENTE",
  fecha: new Date(),
  anuncio: { id: ObjectId("670000000000000000000003") },
  comprador: { id: ObjectId("660000000000000000000005"), nombre: "Sara López" }
}

3. Dentro de la oferta copiaría el título y el precio del anuncio:

anuncio: {
  id: ObjectId("670000000000000000000003"),
  titulo: "iPhone 13 128 GB",
  precio: 380
}

4. No, yo lo dejaría en 380 €. Es el precio que tenía el anuncio cuando Sara hizo la oferta, igual que en Furniro el precio de la línea de pedido se queda como estaba el día de la compra aunque luego cambie el producto. Si lo cambiáramos perderíamos el historial.


//-- EJERCICIO A4

1. Colección aparte, valoraciones. Un usuario que vende mucho puede acabar con cientos de valoraciones y no quiero que su documento se haga enorme. Además así se pueden buscar las valoraciones por anuncio o por autor.

2.
{
  anuncioId: ObjectId("670000000000000000000004"),
  autor: { id: ObjectId("660000000000000000000004"), nombre: "Hugo Sanz" },
  valoradoId: ObjectId("660000000000000000000003"),
  estrellas: 5,
  comentario: "Todo perfecto",
  fecha: new Date()
}

3. Sobre autor.id y anuncioId juntos. Así la misma persona no puede valorar dos veces la misma compra.

4. Guardaría valoracionMedia y numValoraciones dentro del usuario, por ejemplo valoracionMedia: 4.6 y numValoraciones: 65. Así el perfil enseña la nota al momento sin tener que recorrer todas las valoraciones. Y con numValoraciones puedo recalcular la media cuando llega una nueva.


//-- EJERCICIO A5

1. Un usuario normal tendrá pocos favoritos, unas decenas como mucho. En cambio un anuncio muy popular lo pueden tener en favoritos miles de usuarios.

2. Descarto la opción b). Si guardo la lista de usuarios dentro del anuncio, en uno popular ese array crecería sin parar y el documento se haría enorme (hay un límite de 16 MB). Encima es la ficha que más se abre, así que cargaríamos miles de ids para nada.

3. La opción a). Con leer solo el documento del usuario ya tengo su lista de favoritos, no hace falta mirar en ningún otro sitio.

4. Buscaría en la colección usuarios los que tienen ese anuncio dentro de su array de favoritos y los contaría:
db.usuarios.countDocuments({ favoritos: ObjectId("670000000000000000000008") })

5. $addToSet. Solo añade el anuncio si no está ya en la lista. Con $push, si el usuario le da dos veces al corazón, se guardaría repetido.


//-- EJERCICIO A6

1. Mensajes de chat: referenciar, en una colección mensajes. Una conversación puede tener muchísimos mensajes y no para de crecer.

2. Dirección de envío de una compra: embeber, dentro de la compra. Es pequeña y tiene que quedarse como estaba el día de la compra aunque el usuario se mude.

3. Etiquetas de un anuncio: embeber, como un array dentro del anuncio. Son cuatro palabras y siempre se enseñan con el anuncio.

4. Categorías (nombre, icono, atributos obligatorios): referenciar, en una colección categorias. Muchos anuncios comparten la misma categoría, así que mejor guardarla una vez y no repetir el icono en cada anuncio.

5. Historial de cambios de precio: embeber, dentro del anuncio (array con fecha y precio). Un anuncio cambia de precio pocas veces y ese historial solo tiene sentido con ese anuncio.

6. Los anuncios de un usuario, dentro del usuario: referenciar. Un usuario puede tener muchos anuncios y cada anuncio se abre por separado, así que mejor que sea el anuncio el que guarde el id del vendedor.

7. Furniro, líneas de un pedido: embeber, dentro del pedido. Son parte del pedido, se leen siempre con él y solas no tienen sentido.

8. Furniro, reseñas de un producto: referenciar, en una colección reseñas. Un producto que se vende mucho puede tener miles de reseñas.


//-- APARTADO 9: diferencias con mi diseño

En general mi diseño se parece bastante al del modelo: fotos dentro del anuncio, vendedor con id y nombre, ofertas y valoraciones en colecciones aparte y favoritos como array en el usuario.

Las diferencias que he visto están en los atributos del A1:
- En el iPhone puse el almacenamiento y la batería como texto ("128GB", "87%"). El modelo los pone como números (almacenamientoGB: 128, bateriaPct: 87). Es mejor así, porque con texto no puedes buscar "móviles de 128 GB o más".
- En la mesa puse las medidas todas juntas en un texto ("160 x 90 x 75 cm"). El modelo las separa en ancho, fondo y alto, y así se puede filtrar por cada medida.

Me quedo con el modelo del profe, porque el mío no deja comparar bien esos datos.


//-- EJERCICIO B2.3

No tuve que cambiar nada. Inserté la bici con la categoría "Deporte" y sus propios atributos (talla, tipo y pulgadas) y MongoDB la guardó sin quejarse.
En PostgreSQL primero habría tenido que modificar la tabla (ALTER TABLE para añadir columnas o crear una tabla nueva para deporte). Si no, el INSERT habría dado error.


//-- EJERCICIO B4

B4.1 Usuario con el email de Ana
- Predicción:
Creo que va a fallar porque el email ya existe y hemos puesto un índice único.
- Resultado:
MongoServerError: E11000 duplicate key error collection: rastro.usuarios index: email_1 dup key: { email: "ana@rastro.es" }
- Explicación:
Lo ha parado el índice único del email que creé en el B3. No deja meter dos usuarios con el mismo email.

B4.2 Hugo valora otra vez a Marta por el mismo anuncio
- Predicción:
No le va a dejar, porque ya la valoró por esa compra.
- Resultado:
MongoServerError: E11000 duplicate key error collection: rastro.valoraciones index: autor.id_1_anuncioId_1 dup key: { autor.id: ObjectId('660000000000000000000004'), anuncioId: ObjectId('670000000000000000000004') }
- Explicación:
Lo ha frenado el índice único de autor.id + anuncioId del B3.2. La misma persona no puede valorar dos veces la misma compra.

B4.3 Anuncio de un vendedor que no existe
- Predicción:
No lo tenía muy claro, pero creo que se guarda sin error porque Mongo no tiene claves ajenas.
- Resultado:
acknowledged: true, insertedId: ObjectId('6aec96d13b7fbd70cad70bc1')
- Explicación:
Se guarda, pero es un problema: el anuncio apunta a un usuario que no existe, y si alguien pulsa en el vendedor no va a encontrar nada.

B4.4 Precio escrito como texto
- Predicción:
Se va a guardar, pero el precio será un texto en vez de un número.
- Resultado:
Se guarda sin error, pero al buscar los anuncios de menos de 100 € la lámpara no aparece.
- Explicación:
Como "75" va entre comillas es texto, y Mongo no lo compara con números. Sí es un problema, porque el anuncio no sale en las búsquedas por precio.

B4.5 Cambiar el precio del Xiaomi sin operador
- Predicción:
Creo que dará error porque falta el $set.
- Resultado:
MongoInvalidArgumentError: Update document requires atomic operators
- Explicación:
Sin un operador como $set no te deja hacer el update, así que el Xiaomi sigue costando 90.

B4.6 Buscar el iPhone por su id como texto
- Predicción:
No lo va a encontrar.
- Resultado:
null
- Explicación:
El _id está guardado como ObjectId y yo lo busco como texto normal, así que no coincide. Hay que poner ObjectId("...").

B4.7
En el gimnasio, con PostgreSQL, un plan_id que no existía daba error por la clave ajena y no se guardaba. Aquí, en el B4.3, el anuncio fantasma se guardó sin problema. En Rastro lo tiene que comprobar la aplicación (el código del programa) antes de guardar el anuncio.

B4.8
Porque el precio de la lámpara es "75" entre comillas, o sea texto, y no un número. Al buscar precio < 100 Mongo solo compara con números, así que la lámpara no entra. En la búsqueda salieron el Xiaomi, la chaqueta, las zapatillas y la Prueba fantasma, pero la lámpara no.

B4.9
Que los dos se guardaron aunque estaban mal (los dos dieron acknowledged: true). MongoDB no comprueba si el vendedor existe ni si el precio es un número; eso lo tenemos que controlar nosotros.


//-- EJERCICIO B5.12

No dan error, simplemente no salen. Al buscar por atributos.km solo me salió el Seat Ibiza. Los anuncios que no tienen ese campo (móviles, ropa, muebles...) no cumplen el filtro y Mongo se los salta sin decir nada.


//-- EJERCICIO B7 (preguntas)

B7.3 (¿Se ha duplicado el Ford Focus?):

No. Como usé $addToSet, la segunda vez no hizo nada porque el Ford Focus ya estaba en la lista (salió modifiedCount: 0).

B7.4 (¿Cuántas instrucciones? ¿Y si se corta la luz?):

Me han hecho falta 2 instrucciones: una para poner la oferta en ACEPTADA y otra para poner el Seat en RESERVADO.
Si se va la luz justo entre las dos, la oferta queda aceptada pero el Seat sigue DISPONIBLE. Los datos no cuadran y otra persona podría intentar comprar el coche.

B7.6 (¿Qué nombre aparece en sus anuncios? ¿Dónde hay que arreglarlo?):

En sus anuncios seguía saliendo "Luis Martín", el nombre viejo, porque era una copia y no se cambia sola.
Lo he tenido que arreglar en anuncios (vendedor.nombre) y en ofertas (comprador.nombre), porque Luis también había hecho una oferta por las zapatillas.


//-- EJERCICIO B8

1. Porque cada categoría tiene atributos distintos y puedo meter categorías nuevas (como Deporte) sin tocar nada. Y porque la ficha del anuncio la saco de una vez en un solo documento, sin hacer JOIN.

2. Los pagos, las facturas y los saldos. Ahí los datos siempre tienen la misma forma, están muy relacionados y no puede colarse ni un error, y eso SQL lo controla mejor.

3. Las fotos son pocas (máximo 10), son del anuncio y siempre se ven con él. Las ofertas pueden ser muchas, el comprador las quiere ver por su cuenta en "mis ofertas" y tienen vida propia, así que van aparte.

4. Para saber cuánto pedían en el momento en que se hizo la oferta. Si luego el vendedor cambia el precio, la oferta tiene que seguir mostrando el precio de ese día.

5. Desnormalizar es copiar un dato de un documento a otro, como el nombre del vendedor dentro del anuncio.
Ventaja: la ficha enseña el nombre sin hacer otra consulta.
Inconveniente: cuando Luis cambió su nombre tuve que actualizarlo también en anuncios y en ofertas.

6. La aplicación, o sea, nosotros con nuestro código. MongoDB no mira si el id existe, como se vio en el B4.3 con el vendedor fantasma.
