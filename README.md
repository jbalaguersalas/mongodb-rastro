# mongodb-rastro

Práctica de MongoDB del bootcamp de Full Stack de The Bridge.

## Qué he hecho

Rastro es una app inventada para comprar y vender cosas de segunda mano, parecida a Wallapop. En esta práctica no hay API ni web. Solo la base de datos.

Primero tuve que pensar cómo guardar los datos: usuarios, anuncios, ofertas, valoraciones y favoritos. Venía de hacer el gimnasio con PostgreSQL, así que la primera parte es comparar. En SQL, si cada categoría tiene atributos distintos (km para los coches, batería para los móviles, talla para la ropa), la tabla de anuncios se llena de columnas vacías. En MongoDB cada anuncio lleva sus propios `atributos` y ya está.

Después escribí las consultas en la consola de MongoDB: meter anuncios, crear índices, buscar, agrupar y modificar.

## Qué hay en el repo

- [`respuestas.md`](respuestas.md): las respuestas de la parte de diseño (A1 a A6) y las explicaciones de la parte práctica. Ahí está por qué embebo unas cosas y referencio otras.
- [`rastro.js`](rastro.js): todas las consultas, ordenadas por ejercicio (B2 a B7).
- [`compose.yaml`](compose.yaml): el contenedor de MongoDB 8 que uso en mi ordenador.

## Los ejercicios

- **B2**: meter dos anuncios nuevos, una bici Orbea y un Google Pixel 7. La bici es de una categoría nueva (Deporte) y MongoDB la guardó sin tocar nada.
- **B3**: índices. Uno único para el email de los usuarios, otro único para que nadie valore dos veces la misma compra y otro para buscar por categoría y precio. Con `explain()` miré si la búsqueda usaba el índice.
- **B4**: romper la base de datos a propósito. Antes de cada prueba apuntaba qué creía que iba a pasar y luego lo comparaba con lo que pasó de verdad.
- **B5**: consultas con filtros: por ciudad, por atributos, por rango de precio, por texto en el título.
- **B6**: agregaciones con `$group`: anuncios por categoría, precio medio, valor en venta de cada vendedor.
- **B7**: modificar datos con `$push`, `$inc`, `$pull`, `$addToSet`, `$set` y `$mul`.

## Cómo probarlo

```bash
docker compose up -d
```

Arranca MongoDB en el puerto 27017 con el usuario `admin`. Me conecto con mongosh o con la extensión de VS Code y voy lanzando las consultas de `rastro.js` sobre la base de datos `rastro`. Ojo: los datos de partida (usuarios, anuncios, ofertas y valoraciones) no están en este repo. Hay que tenerlos cargados antes.

## He aprendido

**Que MongoDB guarda casi todo.** Un anuncio de un vendedor que no existe se guardó sin problema. En el gimnasio, PostgreSQL lo habría parado por la clave ajena. Aquí lo tiene que comprobar mi código.

**Que un número entre comillas es texto.** Guardé una lámpara con precio `"75"` y luego no salía al buscar anuncios de menos de 100 €.

**Que copiar datos tiene un precio.** Guardo el nombre del vendedor dentro de cada anuncio para no tener que buscarlo aparte. Cuando Luis cambió su nombre, tuve que arreglarlo en sus anuncios y en sus ofertas.

**Cuándo embeber y cuándo referenciar.** Las fotos van dentro del anuncio porque son pocas y siempre se ven con él. Las ofertas van en su propia colección porque pueden ser muchas y el comprador las quiere ver todas juntas en "mis ofertas".

## Con qué lo he hecho

- **MongoDB 8**: la base de datos.
- **Docker**: para tenerla funcionando en mi ordenador.
