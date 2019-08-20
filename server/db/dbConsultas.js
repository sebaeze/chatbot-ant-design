/*
*
*/
const Db              = require('./db').classDb        ;
const schemaConsultas  = require('./modelos/schemaConsultas') ;
//
class dbConsultas extends Db {
    //
    constructor(argConfigDb){
        super(argConfigDb) ;
        this.collectionNombre = 'consultas' ;
        this.colleccion       = this.coneccion.model(this.collectionNombre,schemaConsultas) ;
    }
    //
    add(argObjConsulta){
        return new Promise(function(respData,respRej){
            try {
                //
                console.dir(argObjConsulta) ;
               let docConsulta = new this.colleccion( argObjConsulta ) ;
               docConsulta.save(function(errSave,docSave){
                    if ( errSave ){
                        console.log('.....error guardndo consult: ') ;
                        console.dir(errSave) ;
                        respRej(errSave) ;
                    } else {
                        respData( docSave ) ;
                    }
                }.bind(this));
                //
                /*
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        return this.coneccion.collection( this.collectionNombre )
                                             .insertOne( argObjConsulta ) ;
                        //
                    }.bind(this))
                    .then(function(consultaInsertada){
                        respData( consultaInsertada ) ;
                    }.bind(this))
                    .catch(respRej) ;
                    */
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
    get(argObjBusqueda){
        return new Promise(function(respData,respRej){
            try {
                //
                console.log('getUsuario::argObjBusqueda: '+JSON.stringify(argObjBusqueda)+';') ;
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        return this.coneccion.collection( this.collectionNombre )
                                             .findOne( argObjBusqueda ) ;
                    }.bind(this))
                    .then(function(resuUser){
                        respData( resuUser ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errGetCli){
                respRej(errGetCli) ;
            }
        }.bind(this)) ;
    }
    //
}
//
module.exports.classDb       = dbConsultas ;
module.exports.dbUrlInstance = (argConfiguracion) => {
    const objMongoDbMl = new dbConsultas(argConfiguracion) ;
    return objMongoDbMl ;
}
//