/*
*
*/
const Schema = require('mongoose').Schema     ;
const moment = require('moment-timezone')     ;
//
module.exports = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    name: {type: String,default: '' } ,
    email: {type: String,default: '' },
    subject: {type: String,default:'' },
    message: {type: String,default: '' },
    idProducto: {type: String,default: '' },
    respuesta: {type: String,default: '' },
    ts_consulta: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") }
}) ;
//