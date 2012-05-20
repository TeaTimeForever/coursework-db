var tame = require('tamejs').runtime;
var __tame_defer_cb = null;
var __tame_fn_0 = function (__tame_k) {
    tame.setActiveCb (__tame_defer_cb);
    var makeCollections = require ( './base.js' )
    , models = require ( './schema.js' )
    , mysql = require ( 'mysql' )
    , _ = require ( 'underscore' )
    , async = require ( 'async' )
    ;
    
    var db = mysql . createClient ( {
    user : 'eq' ,
    password : 'hjvfirf' ,
    host : '127.0.0.1' ,
    port : 3306 ,
    database : 'dossee'
    } ) ;
    
    var all = makeCollections ( db , models ) ;
    function main (autocb) {
        var __tame_defer_cb = tame.findDeferCb ([autocb]);
        tame.setActiveCb (__tame_defer_cb);
        var __tame_this = this;
        var __tame_fn_13 = function (__tame_k) {
            tame.setActiveCb (__tame_defer_cb);
            var err , institutes ;
            var __tame_fn_1 = function (__tame_k) {
                tame.setActiveCb (__tame_defer_cb);
                var __tame_fn_2 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    var __tame_defers = new tame.Deferrals (__tame_k);
                    var __tame_fn_3 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        all . institutes (
                        __tame_defers.defer ( { 
                            assign_fn : 
                                function () {
                                    err = arguments[0];
                                    institutes = arguments[1];
                                }
                                ,
                            func_name : "main",
                            parent_cb : __tame_defer_cb,
                            line : 20,
                            file : "test.tjs"
                        } )
                        ) ;
                        tame.callChain([__tame_k]);
                        tame.setActiveCb (null);
                    };
                    __tame_fn_3(tame.end);
                    __tame_defers._fulfill();
                    tame.setActiveCb (null);
                };
                var __tame_fn_12 = function (__tame_k) {
                    tame.setActiveCb (__tame_defer_cb);
                    _ . each ( institutes ,
                    function  (n) {
                    }
                    ) ;
                    var __tame_fn_4 = function (__tame_k) {
                        tame.setActiveCb (__tame_defer_cb);
                        var __tame_k_implicit = {};
                        var i = 0;
                        var __tame_fn_5 = function (__tame_k) {
                            tame.setActiveCb (__tame_defer_cb);
                            var __tame_fn_6 = function (__tame_k) {
                                tame.setActiveCb (__tame_defer_cb);
                                i ++
                                tame.callChain([__tame_fn_5, __tame_k]);
                                tame.setActiveCb (null);
                            };
                            __tame_k_implicit.k_break = __tame_k;
                            __tame_k_implicit.k_continue = function() { __tame_fn_6(__tame_k); };
                            if (i < institutes . length) {
                                var __tame_fn_11 = function (__tame_k) {
                                    tame.setActiveCb (__tame_defer_cb);
                                    var institute = institutes [ i ]
                                    , err1
                                    , students
                                    ;
                                    console . log ( '~~~~~~~~' ) ;
                                    console . log ( institute . name ) ;
                                    console . log ( '~~~~~~~~' ) ;
                                    var __tame_fn_7 = function (__tame_k) {
                                        tame.setActiveCb (__tame_defer_cb);
                                        var __tame_fn_8 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                            var __tame_defers = new tame.Deferrals (__tame_k);
                                            var __tame_fn_9 = function (__tame_k) {
                                                tame.setActiveCb (__tame_defer_cb);
                                                institute . students (
                                                __tame_defers.defer ( { 
                                                    assign_fn : 
                                                        function () {
                                                            err1 = arguments[0];
                                                            students = arguments[1];
                                                        }
                                                        ,
                                                    func_name : "main",
                                                    parent_cb : __tame_defer_cb,
                                                    line : 33,
                                                    file : "test.tjs"
                                                } )
                                                ) ;
                                                tame.callChain([__tame_k]);
                                                tame.setActiveCb (null);
                                            };
                                            __tame_fn_9(tame.end);
                                            __tame_defers._fulfill();
                                            tame.setActiveCb (null);
                                        };
                                        var __tame_fn_10 = function (__tame_k) {
                                            tame.setActiveCb (__tame_defer_cb);
                                             for (var j = 0 ; j < students . length ; j ++) {
                                                console . log ( students [ j ] . fullname ( ) ) ;
                                            }
                                            tame.callChain([__tame_k]);
                                            tame.setActiveCb (null);
                                        };
                                        tame.callChain([__tame_fn_8, __tame_fn_10, __tame_k]);
                                        tame.setActiveCb (null);
                                    };
                                    tame.callChain([__tame_fn_7, __tame_k]);
                                    tame.setActiveCb (null);
                                };
                                tame.callChain([__tame_fn_11, __tame_fn_6, __tame_k]);
                            } else {
                                tame.callChain([__tame_k]);
                            }
                            tame.setActiveCb (null);
                        };
                        tame.callChain([__tame_fn_5, __tame_k]);
                        tame.setActiveCb (null);
                    };
                    tame.callChain([__tame_fn_4, __tame_k]);
                    tame.setActiveCb (null);
                };
                tame.callChain([__tame_fn_2, __tame_fn_12, __tame_k]);
                tame.setActiveCb (null);
            };
            tame.callChain([__tame_fn_1, __tame_k]);
            tame.setActiveCb (null);
        };
        tame.callChain([__tame_fn_13, autocb, __tame_k]);
        tame.setActiveCb (null);
    }
    main (
    function  () {
        db . end ( ) ;
    }
    ) ;
    tame.callChain([__tame_k]);
    tame.setActiveCb (null);
};
__tame_fn_0 (tame.end);