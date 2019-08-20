/*
*
*/
const Db            = require('./db').classDb        ;
const schemaOrdenes = require('./modelos/schemaOrdenes') ;
//
class DbOrdenes extends Db {
    //
    constructor(argConfigDb){
        super(argConfigDb) ;
        this.collectionNombre = 'ordenes' ;
        this.colleccion       = this.coneccion.model(this.collectionNombre,schemaOrdenes) ;
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
module.exports.classDb       = DbOrdenes ;
module.exports.dbUrlInstance = (argConfiguracion) => {
    const objMongoDbMl = new DbOrdenes(argConfiguracion) ;
    return objMongoDbMl ;
}
//