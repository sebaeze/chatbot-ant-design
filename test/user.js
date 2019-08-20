/*
*
*/
const path               = require('path')        ;
const dbClass            = require( path.join(__dirname,'../server/db/dbIndex') ).bases ;
const utiles        = require( path.join(__dirname,'../server/lib/utiles') ).Utilitarios() ;
const configuracionApp   = utiles.parseArchivoJson2Js( path.join(__dirname,'../server/config/general.json') ) ;
//
console.dir(configuracionApp) ;
//const db                = dbClass( configuracionApp.database[process.env.AMBIENTE||'dev'] ) ;
const db                = dbClass( configuracionApp.database[process.env.AMBIENTE||'produccion'] ) ;
//
let usuarioNew = {
    _id:'fidel_fontana@systemrosario.com',
    email:'fidel_fontana@systemrosario.com',
    displayName:'Fidel',
    /*
    _id: 'sebaeze@gmail.com',
    email: 'sebaeze@gmail.com',
    */
    /*
    _id: 'jymallgraphics.ventas@gmail.com',
    email: 'jymallgraphics.ventas@gmail.com',
    */
    seguridad:{administrador:false},
    ts_insert: db.usuarios.fechaPais(),
    provider:{},
    photos:[]
}
//
db.usuarios.get( {email: usuarioNew._id } )
        .then(respSincro=>{
            console.dir(respSincro.seguridad) ;
            if ( respSincro.length>0 ){
                respSincro[0].seguridad = usuarioNew.seguridad ;
                usuarioNew = respSincro[0] ;
            }
            return db.usuarios.add( usuarioNew ) ;
        })
        .then(respMerge=>{
            console.dir(respMerge.seguridad) ;
        })
        .catch(respErr=>{
            console.dir(respErr) ;
        }) ;
//