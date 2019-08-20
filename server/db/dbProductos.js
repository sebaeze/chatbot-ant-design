/*
*
*/
const Db               = require('./db').classDb        ;
const schemaProductos  = require('./modelos/schemaProductos') ;
//
class DbProductos extends Db {
    //
    constructor(argConfigDb){
        super(argConfigDb) ;
        this.collectionNombre = 'productos' ;
        this.colleccion       = this.coneccion.model(this.collectionNombre,schemaProductos) ;
    }
    //
    add(argObjProducto){
        return new Promise(function(respData,respRej){
            try {
                //
                let arraydocs = Array.isArray(argObjProducto) ? argObjProducto : new Array(argObjProducto) ;
                for(let posProd=0;posProd<arraydocs.length;posProd++){
                    if ( !arraydocs[posProd]._id && arraydocs[posProd].id ){ arraydocs[posProd]._id = arraydocs[posProd].id ; }
                    if ( !arraydocs[posProd].id && arraydocs[posProd]._id ){ arraydocs[posProd].id = arraydocs[posProd]._id ; }
                    if ( !arraydocs[posProd].id && arraydocs[posProd]._id ){ arraydocs[posProd].id = arraydocs[posProd]._id ; }
                    if ( !arraydocs[posProd].imagenes ){ arraydocs[posProd].imagenes=arraydocs[posProd].pictures || [{id:"no_disponible_1",url:"/img/images_no_disponible.png",secure_url:"/img/images_no_disponible.png"},{id:"no_disponible_2",url:"/img/images_no_disponible.png",secure_url:"/img/images_no_disponible.png"}] ; }
                    if ( !arraydocs[posProd].title && arraydocs[posProd].titulo ){ arraydocs[posProd].title = arraydocs[posProd].titulo || arraydocs[posProd].descripcion || '***FALTA_TITULO****' ; }
                    if ( !arraydocs[posProd].nombre ){ arraydocs[posProd].nombre = arraydocs[posProd].titulo || arraydocs[posProd].titulo || arraydocs[posProd].descripcion || '***FALTA_TITULO****' ; }
                    if ( !arraydocs[posProd].vendidos   ){ arraydocs[posProd].vendidos = 0 ; }
                    if ( !arraydocs[posProd].visitasTotal ){ arraydocs[posProd].visitasTotal = 0 ; }
                    if ( !arraydocs[posProd].marca        ){ arraydocs[posProd].marca = "" ; }
                    if ( !arraydocs[posProd].categoriaPrimaria    ){ arraydocs[posProd].categoriaPrimaria = "N/A" ; }
                    if ( !arraydocs[posProd].categoriaSegunTitulo ){ arraydocs[posProd].categoriaSegunTitulo = "N/A" ; }
                }
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        return argDb ;
                    }.bind(this))
                    .then(function(argDbConn){
                        console.log(new Date().toISOString()+'....voy a hacer update de productos:: cantidad: '+arraydocs.length) ;
                        let arrayPromises = [] ;
                        arraydocs.forEach(elemProducto => {
                            arrayPromises.push( this.utilMongo.promiseFindUpdate( this.colleccion , elemProducto ) ) ;
                        }) ;
                        if ( arrayPromises.length>0 ){
                            return Promise.all( arrayPromises ) ;
                        } else {
                            return [] ;
                        }
                        //
                    }.bind(this))
                    .then(function(resuUpd){
                        respData( arraydocs ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
    delete(argObjProducto){
        return new Promise(function(respData,respRej){
            try {
                //
                let arraydocs = Array.isArray(argObjProducto) ? argObjProducto : new Array(argObjProducto) ;
                for(let posProd=0;posProd<arraydocs.length;posProd++){
                    if ( !arraydocs[posProd]._id && arraydocs[posProd].id ){ arraydocs[posProd]._id = arraydocs[posProd].id ; }
                    if ( !arraydocs[posProd].id && arraydocs[posProd]._id ){ arraydocs[posProd].id = arraydocs[posProd]._id ; }
                    if ( !arraydocs[posProd].id && arraydocs[posProd]._id ){ arraydocs[posProd].id = arraydocs[posProd]._id ; }
                }
                //
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        return argDb ;
                    }.bind(this))
                    .then(function(argDbConn){
                        console.log(new Date().toISOString()+'....voy a hacer update de productos:: cantidad: '+arraydocs.length) ;
                        let arrayPromises = [] ;
                        arraydocs.forEach(elemProducto => {
                            arrayPromises.push( this.utilMongo.promiseFindDelete( this.colleccion , elemProducto ) ) ;
                        }) ;
                        if ( arrayPromises.length>0 ){
                            return Promise.all( arrayPromises ) ;
                        } else {
                            return [] ;
                        }
                        //
                    }.bind(this))
                    .then(function(resuUpd){
                        respData( arraydocs ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errAddUrl){
                respRej(errAddUrl) ;
            }
        }.bind(this))
    }
    //
    get(argSelector){
        return new Promise(function(respPromiseGet,respRej){
            try {
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        if ( argSelector.textoBusqueda ){
                            let tempText = argSelector.textoBusqueda.trim() ;
                            if ( argSelector.textoBusqueda.split(" ").length>1 ){
                               let tempSelectorText = argSelector.textoBusqueda.split(" ") ;
                               argSelector["$and"] = [] ;
                               tempSelectorText.forEach(function(elemText){
                                  let tempObjAnd = {textoBusqueda:{'$regex': elemText }} ;
                                  argSelector["$and"].push( tempObjAnd ) ;
                               }.bind(argSelector)) ;
                               delete argSelector.textoBusqueda ;
                            } else {
                                argSelector.textoBusqueda = {'$regex': tempText } ;
                            }
                        }
                        if ( argSelector.estadoProducto ){
                            if ( argSelector.estadoProducto=="TODOS" ){
                                delete argSelector.estadoProducto ;
                            }
                        } else {
                            argSelector.estadoProducto='ACTIVO' ;
                        }
                        //
                        return this.promiseFindSortLimit(this.colleccion, argSelector) ;
                        //
                    }.bind(this))
                    .then(function(resulFind){
                        respPromiseGet(resulFind);
                    }.bind(this))
                    .catch(respRej) ;
            } catch(errget){ respRej(errget); }
        }.bind(this)) ;
    }
    //
    getCategorias(){
        return new Promise(function(respPromiseGet,respRej){
            try {
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        this.colleccion.distinct( 'categoriaSegunTitulo',
                            function(err, distinctResu) {
                                if ( err ){
                                    respRej( err ) ;
                                } else {
                                    respPromiseGet(distinctResu);
                                }
                            }.bind(this)
                        ) ;
                        //
                    }.bind(this))
                    .catch(respRej) ;
            } catch(errget){ respRej(errget); }
        }.bind(this)) ;
    }
    //
    getMarcasCantidad(){
        return new Promise(function(respPromiseGet,respRej){
            try {
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        this.colleccion.aggregate(
                            [{"$group" : {_id:"$marca", cantidad:{$sum:1}}}],
                            function(err, marcas) {
                                respPromiseGet(marcas);
                            }
                         ) ;
                    }.bind(this))
                    .catch(respRej) ;
            } catch(errget){ respRej(errget); }
        }.bind(this)) ;
    }
    //
    getCategoriasCantidad(){
        return new Promise(function(respPromiseGet,respRej){
            try {
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        this.colleccion.aggregate(
                            [{"$group" : {_id:"$categoriaSegunTitulo", cantidad:{$sum:1}}}],
                            function(err, marcas) {
                                respPromiseGet(marcas);
                            }
                         ) ;
                        //
                    }.bind(this))
                    .catch(respRej) ;
            } catch(errget){ respRej(errget); }
        }.bind(this)) ;
    }
    //
    getMarcas(){
        return new Promise(function(respPromiseGet,respRej){
            try {
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        //
                        this.colleccion.distinct( 'marca',
                            function(err, distinctResu) {
                                if ( err ){
                                    respRej( err ) ;
                                } else {
                                    respPromiseGet(distinctResu);
                                }
                            }.bind(this)
                        ) ;
                        //
                    }.bind(this))
                    .catch(respRej) ;
            } catch(errget){ respRej(errget); }
        }.bind(this)) ;
    }
    //
    getVisitasProductos(argSellerId){
        return new Promise(function(respData,respRej){
            try {
                //
                let tempIdSeller = (typeof argSellerId=='object') ? argSellerId.id||argSellerId._id : argSellerId||false ;
                let tempLimite   = argSellerId.limit || 10 ; // Default por que sino usa mucha memoria
                this.conectarBase( this.dbName )
                    .then(function(argDb){
                        let selector = {} ;
                        if ( tempIdSeller ){
                            selector = {seller_id: parseInt(tempIdSeller)} ;
                        }
                        console.dir(selector) ;
                        return this.coneccion.collection( this.collectionNombre )
                                            .find( selector, {projection:{_id:1, seller_id:1, title:1, totalVisitas:1, visitas:1, urlExterna:1 }} )
                                            .sort( {totalVisitas:-1} )
                                            .limit( tempLimite )
                                            .toArray() ;
                    }.bind(this))
                    .then(function(arrayClientes){
                        respData( arrayClientes ) ;
                    }.bind(this))
                    .catch(respRej) ;
                //
            } catch(errGetCli){
                respRej(errGetCli) ;
            }
        }.bind(this)) ;
    }
    //
    getMarcasCategoriasCantidades(){
        return new Promise(function(respData,respRej){
            try {
                //
                let objCategoriasMarcas = {categorias:{},marcas:{}};
                //
                this.getMarcasCantidad()
                 .then(function(arrayMarcas){
                    var keys = {} ;
                    for( let posMarca=0;posMarca<arrayMarcas.length;posMarca++){
                        let objMarca  = arrayMarcas[posMarca] ;
                        let tempMarca = String(objMarca._id).trim().toLowerCase()
                                                            .replace(/\//g,'-').replace(/ /g,'-').replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u').replace(/\//g,'-').replace(/--/g,'-').replace(/--/g,'-') ;
                        if ( !keys[tempMarca]){
                            objCategoriasMarcas.marcas[tempMarca] = {id:tempMarca,marca:tempMarca,cantidad:objMarca.cantidad,url:'/marca/'+tempMarca+'/'} ;
                        }
                    }
                    return this.getCategoriasCantidad() ;
                 }.bind(this))
                 .then( function(arrayCategorias){
                     var keys = {} ;
                      for( let posCategoria=0;posCategoria<arrayCategorias.length;posCategoria++){
                        let categoria = arrayCategorias[posCategoria] ;
                        let tempId    = String(categoria._id).trim().toLowerCase().replace(/ /g,'-').replace('á','a').replace('é','e').replace('í','i').replace('ó','o').replace('ú','u').replace(/\//g,'-').replace(/--/g,'-').replace(/--/g,'-') ;
                        if ( !keys[tempId ]){
                            keys[tempId]=tempId ;
                            objCategoriasMarcas.categorias[tempId] = {id:tempId,categoria:tempId,cantidad:categoria.cantidad,url:'/catalogo/'+tempId+'/'} ;
                        }
                      }
                      return objCategoriasMarcas ;
                  }.bind(this))
                  .then( function(finObjCategoriaMarcas){
                    respData( objCategoriasMarcas ) ;
                  }.bind(this))
                  .catch((respErr)=>{
                      console.dir(respErr) ;
                      throw respErr ;
                  }) ;
                //
            } catch(errGetCli){
                respRej(errGetCli) ;
            }
        }.bind(this)) ;
    }
    //
}
//
module.exports.classDb       = DbProductos ;
module.exports.dbUrlInstance = (argConfiguracion) => {
    const objMongoDbMl = new DbProductos(argConfiguracion) ;
    return objMongoDbMl ;
}
//