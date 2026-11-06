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
db.usuarios.createIndex({ email: 1}, {unique:true})

// 2. Índice único sobre autor.id + anuncioId de valoraciones
db.valoraciones.createIndex({"autor.id": 1, anuncioId: 1},{unique:true})

// 3. Índice sobre categoria y precio de anuncios
db.anuncios.createIndex({categoria: 1, precio: 1,})

// 4. Mostrar los índices de las tres colecciones
db.usuarios.getIndexes()
db.valoraciones.getIndexes()
db.anuncios.getIndexes()

// 5. explain() de find({ categoria: "Coches" }).sort({ precio: 1 })

db.anuncios.find({ categoria: "Coches" }).sort({ precio: 1 }).explain()


// Ejercicio B4 — Rompe la base de datos
// B4.1
db.usuarios.insertOne({ nombre: "Ana Copia", email: "ana@rastro.es", ciudad: "Valencia", fechaAlta: new Date(), favoritos: [], valoracionMedia: 0, numValoraciones: 0 })


// B4.2
db.valoraciones.insertOne({ anuncioId: ObjectId("670000000000000000000004"), autor: { id: ObjectId("660000000000000000000004"), nombre: "Hugo Sanz" }, valoradoId: ObjectId("660000000000000000000003"), estrellas: 1, comentario: "Cambio de opinión", fecha: new Date() })

// B4.3
db.anuncios.insertOne({ titulo: "Prueba fantasma", precio: 10, categoria: "Libros", estado: "DISPONIBLE", ciudad: "Valencia", fechaPublicacion: new Date(), visitas: 0, vendedor: { id: ObjectId("660000000000000000000099"), nombre: "Nadie" }, fotos: [], atributos: {} })

// B4.4
db.anuncios.insertOne({ titulo: "Prueba lámpara", precio: "75", categoria: "Muebles", estado: "DISPONIBLE", ciudad: "Valencia", fechaPublicacion: new Date(), visitas: 0, vendedor: { id: ObjectId("660000000000000000000001"), nombre: "Ana García" }, fotos: [], atributos: { material: "metal" } })
db.anuncios.find({ precio: { $lt: 100 } }, { titulo: 1, precio: 1, _id: 0 })

// B4.5
db.anuncios.updateOne({ _id: ObjectId("670000000000000000000005") }, { precio: 80 })

// B4.6
db.anuncios.findOne({ _id: "670000000000000000000003" })

// Ejercicio B5 — Consultas
// 1. DISPONIBLE de Valencia, título y precio, sin _id, del más barato al más caro
db.anuncios.find({ estado: "DISPONIBLE", ciudad: "Valencia" }, { titulo: 1, precio: 1, _id: 0 }).sort({ precio: 1 })


// 2. Coches con menos de 100.000 km
db.anuncios.find({ categoria: "Coches", "atributos.km": { $lt: 100000 } })


// 3. Móviles con 128 GB o más

db.anuncios.find({ categoria: "Móviles","atributos.almacenamientoGB": {$gte: 128}})
// 4. Entre 50 y 400 € (ambos incluidos)
db.anuncios.find({precio: {$gte: 50, $lte: 400}})

// 5. Título que contiene "nike", sin importar mayúsculas

db.anuncios.find({titulo: /nike/i})

// 6. Anuncios de Luis Martín por su id

db.anuncios.find({"vendedor.id":ObjectId("660000000000000000000002")})

// 7. Anuncios sin ninguna foto

db.anuncios.find({fotos:{$size:0}})

// 8. Ofertas PENDIENTE del Seat Ibiza

db.ofertas.find({"anuncio.id":ObjectId("670000000000000000000001"), estado: "PENDIENTE"})

// 9. Usuarios con la mesa de roble en favoritos (solo nombre)

db.usuarios.find({favoritos: ObjectId("670000000000000000000008")},{nombre:1, _id: 0})

// 10. Cuántos anuncios están VENDIDO

db.anuncios.countDocuments({estado: "VENDIDO"})

// 11. Los 3 anuncios más vistos (título y visitas)

db.anuncios.find({},{titulo: 1, visitas: 1, _id: 0}).sort({visitas:-1}).limit(3)

// Ejercicio B6 — Agregaciones
// 1. Número de anuncios por categoría, de más a menos

db.anuncios.aggregate([
  { $group: { _id: "$categoria", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])


// 2. Precio medio por categoría

db.anuncios.aggregate([
    {$group: {_id:"$categoria", precioMedio: {$avg: "$precio"}}}
])

// 3. Número de anuncios por ciudad

db.anuncios.aggregate([
    { $group: {_id: "$ciudad", total: { $sum: 1}}}
])

// 4. Valor total en venta (DISPONIBLE) por vendedor.nombre  -> captura

db.anuncios.aggregate([
  { $match: { estado: "DISPONIBLE" } },
  { $group: { _id: "$vendedor.nombre", valorEnVenta: { $sum: "$precio" } } },
  { $sort: { valorEnVenta: -1 } }
])


// 5. Reto: la categoría con más visitas en total

db.anuncios.aggregate([
{$group: {_id: "$categoría", visitasTotales: {$sum: "$visitas"}}},
{$sort: {visitasTotales: -1}},
{$limit:1}
])

// Ejercicio B7 — Modificar
// 1. Cuarta foto al iPhone


// 2. +1 visita al Xiaomi


// 3. Sara quita el iPhone y añade el Ford Focus (dos veces)


// 4. Luis acepta la oferta de Sara por el Seat


// 5. Rebajas: coches -10 %


// 6. Luis cambia su nombre a "Luis M. Martín" (y arreglarlo donde se copió)

