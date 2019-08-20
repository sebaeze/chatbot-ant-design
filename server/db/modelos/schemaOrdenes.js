/*
*
*/
const mongoose = require('mongoose');
const Schema   = require('mongoose').Schema     ;
const moment   = require('moment-timezone')     ;
//
module.exports = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    /*
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
      },
      */
    email: {type: String,default: '' },
    direccion: {type: String,default:'' },
    numero: {type: Number,default: 0 },
    piso: {type: String,default: '' },
    puerta: {type: String,default: '' },
    ciudad: {type: String,default: '' },
    ciudad: {type: String,default: '' },
    codigoPostal: {type: String,default: '' },
    celular: {type: String,default: '' },
    telefonoFijo: {type: String,default: '' },
    telefonoTrabajo: {type: String,default: '' },
    telefonoTrabajo: {type: String,default: '' },
    ts_creacion: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") },
    ts_ultimo_estado: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") },
    estadoOrden: {type: String,  default: 'INICIAL',enum: ['INICIAL','DEPOSITO','ENVIANDO','FINALIZADO'] },
    productos: {}
}) ;
//