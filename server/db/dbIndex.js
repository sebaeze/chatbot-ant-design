/*
*
*/
//
const dbConnClass    = require('./db').classDb ;
const dbAgentes      = require('./dbAgentes').classDb ;
const dbEstadisticas = require('./dbEstadisticas').classDb ;
const dbProductos    = require('./dbProductos').classDb ;
const dbUsuarios     = require('./dbUsuarios').classDb ;
const dbConsultas    = require('./dbConsultas').classDb ;
const dbOrdenes      = require('./dbOrdenes').classDb ;
//
module.exports.bases = (argConfig) => {
    //
    const dbConn         = new dbConnClass( argConfig ) ;
    return {
        agentes: new dbAgentes(dbConn),
        productos: new dbProductos(dbConn),
        estadisticas: new dbEstadisticas(dbConn),
        usuarios: new dbUsuarios(dbConn),
        consultas: new dbConsultas(dbConn),
        ordenes: new dbOrdenes(dbConn)
    }
} ;
//
