/*
*   Definicion de todos los eventos de la app
*/
const emisorEventos    = require('./emisorEventos') ;
const eventos          = require('./NombreEventos') ;
//
module.exports = (argDb,argConfig) => {
    //
    emisorEventos.on(eventos.LOGIN, function(argUsr){
        //
        argDb.usuarios.get( {email:argUsr.email} )
            .then(function(respGet){
                if ( respGet.length>0 ){
                    respGet=respGet[0];
                } else {
                    respGet={
                        _id:argUsr.email,
                        ts_insert: argDb.usuarios.fechaPais()
                    };
                }
                if ( !respGet.provider   ){ respGet.provider={}; }
                if ( !respGet.accesos    ){ respGet.accesos=[]; }
                if ( !respGet.seguridad  ){ respGet.seguridad={}; }
                if ( !respGet.provider[argUsr.provider] && argUsr.provider){
                    respGet.provider[argUsr.provider]=argUsr;
                    delete argUsr.provider ;
                    delete argUsr._raw ;
                    delete argUsr._json ;
                }
                respGet.accesos.push({ tipo:'login',timestamp:argDb.usuarios.fechaPais() }) ;
                let tempUserMerge    = Object.assign(respGet,argUsr) ;
                return argDb.usuarios.merge ( tempUserMerge )
            }.bind(this))
            .catch(function(respErr){
                console.log('....termine el merge') ;
            }.bind(this)) ;
        //
    }.bind(this))  ;
    //
}
//