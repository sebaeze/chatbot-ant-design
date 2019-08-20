/*
*
*/
import React, { Component }               from 'react'  ;
import { Widget, addResponseMessage }     from 'react-chat-widget'  ;
import {opcionesPOST}                     from '../utils/parametros'       ;
//
import 'react-chat-widget/lib/styles.css' ;
import '../../css/estiloChat.css' ;
//
class WidgetChatbot extends Component {
  constructor(props) {
    super(props) ;
    this.state                 = {session_id:false} ;
    this.handleNewUserMessage  = this.handleNewUserMessage.bind(this) ;
    this.mensajePrevio = {
            input: { text: "" },
            context: { conversation_id: "", "system": { "dialog_stack": [ "root" ], "dialog_turn_counter": 1, "dialog_request_counter": 1 } }
        } ;
  }
  //
  componentDidMount(){}
  //
  handleNewUserMessage(newMessage){
    //
    let postOpt = {...opcionesPOST} ;
    console.dir(this.mensajePrevio) ;
    //
    this.mensajePrevio.input.text = newMessage ;
    postOpt.body = JSON.stringify(this.mensajePrevio) ;
    /*
    *   __URL_BACKEND__: Es generada por webpack en momento del Build
    */
    fetch( __URL_BACKEND__+'/chatbot/mensaje?idAgente='+this.props.idAgente ,postOpt)
            .then(function(response){
                if (response.status>=200 & response.status<=400) {
                    return response.json() ;
                } else {
                    throw new Error("ERROR: ADD Productos nuevos. Http Status: "+response.status+'.') ;
                }
            }.bind(this))
            .then(function(watsonResp   ){
              this.mensajePrevio.context.conversation_id = watsonResp.context.conversation_id ;
              addResponseMessage( watsonResp.output.text[0]||'....' ) ;
            }.bind(this))
            .catch((respRechaz ) => { console.dir(respRechaz) ; }) ;
    //
  }
  //
  render() {
    //
    console.dir(this.props) ;
    //
    return (
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title="Soporte"
          subtitle="En linea"
          senderPlaceHolder="Escribe un mensaje"
          showCloseButton={true}
        />
      )
      //
    }
  }
/* */
export default WidgetChatbot ;
/* */