/************
 xiaoyouClient的立即执行函数可以默认没有参数，即在window上声明全局对象xiaoyouClient
 如果需要给xiaoyouClient增加命名空间，则可以给立即执行函数加命名空间的参数，例如
 (function(ns){
	.....
 })(xxx.yyy)
 *************/
(function (ns) {
    console.log("<xiaoyouClient> >>> the ns is " + (typeof ns == "undefined" ? "window default" : ns));
    var EventMgr = function () {
        this._events = {};
    };

    EventMgr.prototype.on = function (evtName, handler) {
        if (this._events[evtName] == undefined) {
            this._events[evtName] = [];
        }
        this._events[evtName].push(handler);
    };

    EventMgr.prototype.off = function (evtName, handler) {
        var handlers = this._events[evtName];
        if (typeof handler == "undefined") {
            //delete handlers;
        } else {
            var index = -1;
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handler == handlers[i]) {
                    index = i;
                    break;
                }
            }
            if (index > 0) {
                handlers.remove(index);
            }
        }
    };

    EventMgr.prototype.trigger = function (evtName, args) {
        try {
            var handlers = this._events[evtName];
            if (!handlers) return;
            var handler;
            args = args || {};
            for (var i = 0, len = handlers.length; i < len; i++) {
                handler = handlers[i];
                handler(args);
            }
        } catch (e) {
            alert(e);
        }
    };

    var xiaoyouClient = {
		"wakeuper" : new EventMgr()
    };

    // CMD
    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
    	console.log("<xiaoyouClient> >>> module.exports is exist!");
        module.exports = xiaoyouClient;
    } else {
    // AMD
        if ( typeof define === "function" && define.amd ) {
        	console.log("<xiaoyouClient> >>> define.amd is exist!")
            define( "xiaoyouClient", [], function () { return xiaoyouClient; } );
        }
    }
    
    // 挂载全局或指定命名空间变量
    if ( typeof window === "object" && typeof window.document === "object" ) {
    	if(typeof ns == "undefined"){
			window.xiaoyouClient = xiaoyouClient;
    	}else{
    		ns.xiaoyouClient = xiaoyouClient;
    	}
    }
})();

