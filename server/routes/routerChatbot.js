/*
*  Agrega dinamicamente Path segun categoria de articulos
*/
const path            = require('path') ;
const router          = require('express').Router()   ;
const asistente       = require( path.join(__dirname,'../chatbot/chatbot') ) ;
const AssistantV2     = require('ibm-watson/assistant/v1');
//
//create newContext variable. still unclear what this is
let newContext = {
    global: {
      system: {
        turn_count: 1
      }
    }
  };
//
let myAssistantId = "faf422ec-553a-4d76-af27-fadaa10da592" ;
const assistant = new AssistantV2 ({
    iam_apikey: "jfxLQ5MLCq78QjZMEt8SVo3we5x2cEh96yoCwB_u04rx",
    url: "https://gateway.watsonplatform.net/assistant/api",
    version: "2019-02-28",
    disable_ssl_verification: true
});
//
assistant.listWorkspaces()
  .then(res => {
    console.dir( res  );
    console.dir( res.workspaces[0].metadata  );
    console.dir( res.workspaces[0].system_settings  );
  })
  .catch(err => {
    console.log(err)
  });
//
//hanler to start a new session
assistant.startNewSession = function (req, res, next) {
    assistant.createSession({
      assistant_id: process.env.ASSISTANT_ID || myAssistantId,
    }, (error, response) => {
      return error ? res.send (error) : res.send (response);
    });
};
//
//handler to send messages to assistant
assistant.sendMessage = function (req, res, next) {
    //
    let assistantId = process.env.ASSISTANT_ID || myAssistantId;
    if (!assistantId) res.send ('sorry, this app has not been configured with an assistant ID environment variable.') // make sure this can catch
    let contextWithAcc = (req.body.context) ? req.body.context : newContext;
    if (req.body.context) contextWithAcc.global.system.turn_count +=1;
    let textInput = req.body.input ? req.body.input.text : '';
    let payload = {
      assistant_id: assistantId,
      session_id: req.body.session_id,
      context: contextWithAcc,
      input: {
        message_type: 'text',
        text: textInput,
        options: {
          return_context: true,
        }
      }
    };
    // Either send assistant text response or send to Watson Discovery handler
    assistant.message(payload)
            .then(response => {
                if ( response.output.user_defined) {
                    res.send( ["no encontre nada para decir","que se yo"]) ;
                } else {
                    res.send(response.output.generic.map ( res => res.text))
                }
            })
            .catch(err => {
            console.log(err);
            });

};
//
module.exports = (argConfig,argDb) => {
    //
    const chatbotAsistente = asistente(argDb) ;
    //
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    router.get('/session',function (req, res) {
        assistant.createSession({
          assistant_id: process.env.ASSISTANT_ID || myAssistantId ,
        }, function (error, response) {
          if (error) {
            return res.send(error);
          } else {
            return res.send(response);
          }
        }) ;
    }) ;
    //
    router.post('/mensaje', function(req,res){
      try {
        //
        res.set('access-Control-Allow-Origin', '*');
        res.set('access-Control-Allow-Methods', '*');
        res.setHeader("Access-Control-Allow-Credentials", true);
        //
        chatbotAsistente.get( req.query.idAgente )
          .then((asistenteChatbot)=>{
            return asistenteChatbot.asistente.message({ workspace_id: asistenteChatbot.idAsistente || process.env.ASSISTANT_ID || myAssistantId , input: {'text': req.body.input.text } }) ;
          })
          .then((resuBot)=>{
            console.log('\n\n segundo then despues de chatbot') ;
            res.json(resuBot) ;
          })
          .catch(err => {
            console.log(err)
            res.status(500) ;
            res.json( err ) ;
          });
        //
      } catch(errMsg){
        res.status(500) ;
        res.json(errMsg) ;
      }
    }) ;
    //
    return router ;
    //
}
//
