/*
*
*/
const mongoose = require('mongoose');
const Schema   = require('mongoose').Schema     ;
const moment   = require('moment-timezone')     ;
//
const estadosAgente    = {
    autogenerado: 'AUTOGENERADO',
    activo: 'ACTIVO',
    invalido: 'INVALIDO',
    desudo: 'DESUSO'
} ;
//
module.exports.estados = estadosAgente ;
module.exports = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    idAgente: {type: String,default: '' },
    proveedorChatbot: {type: String,default: 'IBM' },
    idAsistente: {type: String,default: '' },
    idWorkspace: {type: String,default:'' },
    urlApi: {type: String,default: '' },
    iam_apikey: {type: String,default: '' },
    version: {type: String,default: '' },
    descripcion: {type: String,default: '' },
    empresa: {type: String,default: '' },
    emailUsuarioFinal: {type: String,default: '' },
    telefonoUsuarioFinal: {type: String,default: '' },
    ts_creacion: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") },
    ts_ultimo_estado: { type: Date, default: moment( new Date() ).tz("America/Argentina/Buenos_Aires") },
    estado: {type: String,  default: 'AUTOGENERADO',enum: Object.values(estadosAgente) }
}) ;
//