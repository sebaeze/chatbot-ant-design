/*
*
*/
const Db            = require('./db').classDb        ;
const schemaAgentes = require('./modelos/schemaAgentes') ;
const schemaEstados = require('./modelos/schemaAgentes').estados ;
console.dir(schemaEstados) ;
//
class DbAgentes extends Db {
    //
    constructor(argConfigDb){
        super(argConfigDb) ;
        this.collectionNombre = 'agentes' ;
        this.colleccion       = this.coneccion.model(this.collectionNombre,schemaAgentes) ;
    }
    //
    find(argIdAgente){
        return new Promise(function(respData,respRej){
            try {
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        return argDb ;
                    }.bind(this))
                    .then(function(argDbConn){
                        console.log(new Date().toISOString()+'....voy a hacer Merge de Agente:: argIdAgente: '+argIdAgente) ;
                        return this.utilMongo.promiseFindById( this.colleccion , {_id:argIdAgente} , [], ['productos'] ) ;
                        //
                    }.bind(this))
                    .then(function(resuUpd){
                        console.log('......resultado merge:: _id: '+resuUpd._id+';') ;
                        //console.dir(resuUpd._doc) ;
                        let outResuDoc = resuUpd._doc ? resuUpd._doc : resuUpd ;
                        respData( outResuDoc ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
    merge(argObjProducto){
        return new Promise(function(respData,respRej){
            try {
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        return argDb ;
                    }.bind(this))
                    .then(function(argDbConn){
                        console.log(new Date().toISOString()+'....voy a hacer Merge de orden::') ;
                        return this.utilMongo.promiseFindUpdate( this.colleccion , argObjProducto, [], ['productos'] ) ;
                        //
                    }.bind(this))
                    .then(function(resuUpd){
                        console.log('......resultado merge:: _id: '+resuUpd._id+';') ;
                        //console.dir(resuUpd._doc) ;
                        respData( resuUpd ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
}
//
module.exports.classDb       = DbAgentes ;
module.exports.dbUrlInstance = (argConfiguracion) => {
    const objMongoDbMl = new DbAgentes(argConfiguracion) ;
    return objMongoDbMl ;
}
//