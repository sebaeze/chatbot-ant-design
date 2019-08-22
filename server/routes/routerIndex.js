/*
*
*/
const path              = require('path')    ;
const express           = require('express') ;
const router            = require('express').Router()   ;
//
let opciones = {
  dotfiles: 'ignore',etag: false,extensions: [],index: false,maxAge: '1d' ,redirect: false,
  setHeaders: function (res, path, stat) {
      res.set('Access-Control-Allow-Origin'     , '*'  );
      res.set("Access-Control-Allow-Headers"    , '*'  ) ;
      res.set('Access-Control-Allow-Methods'    , '*'  );
      res.set("Access-Control-Allow-Credentials", true );
      res.set('Connection', 'Keep-Alive') ;
      }
  } ;
/*
*
*/
module.exports = (argConfig,argDb) => {
  //
  router.use('/', express.static( path.join(__dirname,'../../dist') , opciones ) );
  //
  router.get('/', function(req, res) {
    res.set('access-Control-Allow-Origin', '*');
    res.set('access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    res.type('.js');
    res.sendFile( path.join(__dirname,'../../dist/widget.js') );
    //
  });
  //
  router.get('/404', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    //
    res.json({
      error:"404 - url not found",
      code: 404
    }) ;
    //
  });
  //
  return router ;
} ;
//