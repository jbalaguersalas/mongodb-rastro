// Rastro — MongoDB



// Ejercicio B2 — Dos anuncios nuevos (sin _id)
// Anuncio 1: Bicicleta de montaña Orbea

db.anuncios.insertOne({titulo: "Bicicleta de montaña Orbea", descripcion: "Revisada en el taller", precio: 300, categoria: "Deporte", estado: "DISPONIBLE", ciudad: "Castellón", fechaPublicacion: new Date("2026-10-27"), visitas: 0,
    vendedor: { id: ObjectId("660000000000000000000004"), nombre: "Hugo Sanz" },
    fotos: [ { url: "https://img.rastro.es/bici-1.jpg", orden: 1 }, ],
    atributos: { talla: "L", tipo:"montaña", pulgadas: 29, descripcion: "pulgadas de rueda"} })

// Anuncio 2: Google Pixel 7
db.anuncios.insertOne({ titulo: "Google Pixel 7", descripcion: "Libre, con caja.", precio: 260, categoria: "Móviles", estado: "DISPONIBLE", ciudad: "Valencia", fechaPublicacion: new Date("2026-10-28"), visitas: 0,
    vendedor: { id: ObjectId("660000000000000000000005"), nombre: "Sara López" },
    fotos: [ { url: "https://img.rastro.es/pixel-1.jpg", orden: 1 }, { url: "https://img.rastro.es/pixel-2.jpg", orden: 2 } ],
    atributos: { marca: "Google", modelo: "Pixel 7", almacenamientoGB: 128, bateriaPct: 92 } })


// Ejercicio B3 — Índices
// 1. Índice único sobre email de usuarios


// 2. Índice único sobre autor.id + anuncioId de valoraciones


// 3. Índice sobre categoria y precio de anuncios


// 4. Mostrar los índices de las tres colecciones


// 5. explain() de find({ categoria: "Coches" }).sort({ precio: 1 })



// Ejercicio B4 — Rompe la base de datos
// B4.1


// B4.2


// B4.3


// B4.4


// B4.5


// B4.6


// Borrar los anuncios de prueba



// Ejercicio B5 — Consultas
// 1. DISPONIBLE de Valencia, título y precio, sin _id, del más barato al más caro


// 2. Coches con menos de 100.000 km


// 3. Móviles con 128 GB o más


// 4. Entre 50 y 400 € (ambos incluidos)


// 5. Título que contiene "nike", sin importar mayúsculas


// 6. Anuncios de Luis Martín por su id


// 7. Anuncios sin ninguna foto


// 8. Ofertas PENDIENTE del Seat Ibiza


// 9. Usuarios con la mesa de roble en favoritos (solo nombre)


// 10. Cuántos anuncios están VENDIDO


// 11. Los 3 anuncios más vistos (título y visitas)



// Ejercicio B6 — Agregaciones
// 1. Número de anuncios por categoría, de más a menos


// 2. Precio medio por categoría


// 3. Número de anuncios por ciudad


// 4. Valor total en venta (DISPONIBLE) por vendedor.nombre  -> captura


// 5. Reto: la categoría con más visitas en total



// Ejercicio B7 — Modificar
// 1. Cuarta foto al iPhone


// 2. +1 visita al Xiaomi


// 3. Sara quita el iPhone y añade el Ford Focus (dos veces)


// 4. Luis acepta la oferta de Sara por el Seat


// 5. Rebajas: coches -10 %


// 6. Luis cambia su nombre a "Luis M. Martín" (y arreglarlo donde se copió)

