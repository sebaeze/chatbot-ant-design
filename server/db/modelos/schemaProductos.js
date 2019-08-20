/*
*
*/
const Schema = require('mongoose').Schema     ;
const moment = require('moment-timezone')     ;
//
module.exports = new Schema({
    _id: String ,
    tipo: {type: String,default: 'N/A' } ,
    modelo: {type: String,default: 'N/A' },
    nombre: {type: String,required: true },
    marca: {type: String,default: 'alternativo' },
    descripcion: {type: String,default: '' },
    codigoInterno: {type: String,default: '' },
    codigoProveedor: {type: String,default: '' },
    codigoOem: {type: String,default: '' },
    proveedorId: {type: String,default: '' },
    observaciones: {type: String,default: '' },
    estadoProducto:  {type: String,default: 'ACTIVO' },
    conUSB: {type: Boolean, default: false} ,
    conWIFI: {type: Boolean, default: false} ,
    tipoCompatible: {type: String,default: '' },
    precio:{ type: Number, required: true } ,
    stock:{ type: Number, min: 0, max: 1000000, default: 0 } ,
    idCatalogo: {type: String,default: '' },
    categoriaPrimaria: String,
    categoriaSegunTitulo: String,
    categoriaSuperior: String,
    moneda:  String ,
    flagMercadolibre: {type: Boolean, default: false} ,
    modeloCompatible: String,
    imagenes: {type: Array, default:[{id:"no_disponible_1",url:"/img/images_no_disponible.png",secure_url:"/img/images_no_disponible.png"},{id:"no_disponible_2",url:"/img/images_no_disponible.png",secure_url:"/img/images_no_disponible.png"}] },
    vendidos:{ type: Number, min: 0, default: 0 } ,
    visitasTotal:{ type: Number, min: 0, default: 0 } ,
    visitasPagina:{ type: Number, min: 0, default: 0 } ,
    visitasTotalMercadolibre:{ type: Number, min: 0, default: 0 } ,
    visitasDetalle: [],
    videoYoutubeUrl: String,
    garantia: String,
    urlInterna: String,
    urlExterna: String,
    condicion: {type: String, default: 'Nuevo'},
    mercadolibreDetalle: Schema.Types.Mixed,
    textoBusqueda: {type: String, default: ''},
    atributos: {type: Array,default:[]},
    ts_ingreso: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_ultima_modificacion: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") } ,
    ts_baja: { type: Date, default: null }
}) ;
//