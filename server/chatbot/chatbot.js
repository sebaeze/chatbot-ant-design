/*
*
*/
const AssistantV2     = require('ibm-watson/assistant/v1');
const cacheAsistente  = {} ;
const cacheSessiones  = {} ;
//
module.exports = (argDb) => {
    //
    //
    const getAsistente = (argIdAgente) => {
        return new Promise(function(respOk,respRech){
            try {
                //
                if ( cacheSessiones[argIdAgente] ){
                    console.dir(cacheSessiones[argIdAgente]) ;
                    let asistenteWatson = cacheAsistente[ cacheSessiones[argIdAgente].iam_apikey ] ;
                    console.dir(asistenteWatson) ;
                    //respOk( asistenteWatson  ) ;
                    //
                    respOk( {
                        idAsistente: cacheSessiones[argIdAgente].idAsistente,
                        asistente: cacheAsistente[ cacheSessiones[argIdAgente].iam_apikey ]
                        } ) ;
                    //
                } else {
                    console.log('....getAsistente::voy a agregar el agente:: '+argIdAgente+';') ;
                    cacheSessiones[argIdAgente] = { idAgente: argIdAgente, idAsistente: 0, iam_apikey: 0, urlApi: '', version: '' } ;
                    //
                    argDb.agentes.find( argIdAgente )
                        .then((respAsis)=>{
                            console.dir(respAsis) ;
                            cacheSessiones[argIdAgente].idAsistente = respAsis.idAsistente ;
                            cacheSessiones[argIdAgente].iam_apikey  = respAsis.iam_apikey ;
                            cacheSessiones[argIdAgente].urlApi      = respAsis.urlApi ;
                            cacheSessiones[argIdAgente].version     = respAsis.version ;
                            if ( !cacheAsistente[ cacheSessiones[argIdAgente].iam_apikey ] ){
                                cacheAsistente[ cacheSessiones[argIdAgente].iam_apikey ] = new AssistantV2 ({
                                    iam_apikey: respAsis.iam_apikey || "jfxLQ5MLCq78QjZMEt8SVo3we5x2cEh96yoCwB_u04rx",
                                    url: respAsis.urlApi || "https://gateway.watsonplatform.net/assistant/api",
                                    version: respAsis.version || "2019-02-28",
                                    disable_ssl_verification: true
                                });
                            }
                            //
                            respOk( {
                                idAsistente: cacheSessiones[argIdAgente].idAsistente,
                                asistente: cacheAsistente[ cacheSessiones[argIdAgente].iam_apikey ]
                                } ) ;
                            //
                        })
                        .catch((respErr)=>{
                            console.dir(respErr) ;
                            respRech(respErr) ;
                        }) ;
                }
                //
            } catch(errGetAs){
                console.dir(errGetAs) ;
                respRech(errGetAs) ;
            }
        }.bind(this)) ;
    } ;
    //
    return {
        get: getAsistente
    } ;
} ;