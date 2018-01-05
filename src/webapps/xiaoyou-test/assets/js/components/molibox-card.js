webpackJsonp([16],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ajax = undefined;
exports.axiosHTTP = axiosHTTP;

var _util = __webpack_require__(939);

var _axios = __webpack_require__(940);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [ajax description] 统一封装 http 请求方案
 * @param  {[type]} paramObj        [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallback   [description]
 * @param  {[type]} haveFunFlag     [description]
 * @return {[type]}                 [description]
 */
var ajax = exports.ajax = function ajax(paramObj, successCallback, errorCallback) {
    var showLoading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    //判断网络连接是否可用
    if ($summer.os != 'pc' && !summer.getNetworkInfo().Type) {
        summer.toast({
            msg: '网络连接不可用'
        });
        summer.refreshFooterLoadDone();
        summer.refreshHeaderLoadDone();
        summer.hideProgress();
        return;
    }
    // 修改 url 为经过拼接处理的 url
    if ($summer.os != 'pc') {
        paramObj.url = getPath(paramObj);
    }
    paramObj.param.deviceType = $summer.os.toUpperCase();

    //ajax请求时 显示loading
    /**
     * window.ajaxLoadState 用以记录ajax的状态
     * init 初始状态 loading数据请求中 服务器还没有相应 success服务器相应请求成功 failed服务器相应请求失败
     * */
    if (window.ajaxLoadState) {
        window.ajaxLoadState = "loading";
        if (showLoading) {
            summer.showProgress();
        }
    } else {
        window.ajaxLoadState = "init";
        window.ajaxLoadState = "loading";
        if (showLoading) {
            summer.showProgress();
        }
    }
    if ((0, _util.browserRedirect)() == "ios") {
        // IOS
        summerHTTP(paramObj, successCallback, errorCallback);
    } else {
        // browser or android
        axiosHTTP(paramObj, successCallback, errorCallback);
    }
};

/**
 * [summerHTTP description]
 * @return {[type]} [description]
 */
function summerHTTP(paramObj, successCallback, errorCallback) {
    //ios设置的超时
    window.cordovaHTTP.settings = { "timeout": 10000 };
    var type = paramObj.type,
        url = paramObj.url,
        param = paramObj.param,
        header = paramObj.header;

    summer.ajax({
        type: type,
        url: url,
        param: param,
        header: header // 考虑接口安全，每个请求都需要将这个公共header带过去
    }, function (response) {
        var data = JSON.parse(response.data);
        var tokenerror = summer.getStorage("G-TOKEN-ERROR");

        if (tokenerror) return false;
        if (data.code == "sys.token.error") {
            return false;
        }
        if (data.flag == 0) {
            window.ajaxLoadState = "success";
            summer.hideProgress();
        } else {
            window.ajaxLoadState = "failed";
        }
        summer.hideProgress();
        successCallback(data);
    }, function (response) {
        httpErrorHandler(response);

        if (response.status && response.status != 200) {
            summer.toast({
                msg: '不好意思，服务器开小差了!'
            });
            summer.refreshFooterLoadDone();
            summer.refreshHeaderLoadDone();
            summer.hideProgress();
            return;
        }

        window.ajaxLoadState = "failed";
        summer.hideProgress();
        errorCallback(response);
    });
}

/**
 * 传contentType 的时候，http请求走 request body
 * @param  {[type]} url    [description]
 * @param  {[type]} header [description]
 * @return {[type]}        [description]
 */
function axiosHTTP(paramObj, successCallback, errorCallback) {
    var type = paramObj.type,
        url = paramObj.url,
        param = paramObj.param,
        header = paramObj.header;

    var reqParam = {
        method: type,
        url: url,
        headers: header,
        timeout: 10000 // 请求超过 10s , 请求将被中断
    };

    if (paramObj.contentType) {
        // `data` is the data to be sent as the request body
        reqParam.data = param;
    } else {
        // `params` are the URL parameters to be sent with the request
        reqParam.params = param;
    }
    (0, _axios2.default)(reqParam).then(function (res) {
        httpErrorHandler(res);

        if (!($summer.os == 'pc')) {
            var tokenerror = summer.getStorage("G-TOKEN-ERROR");

            if (tokenerror) return false;
            if (res.data.code == "sys.token.error") {
                return false;
            } else {
                window.localStorage.removeItem('G-TOKEN-ERROR');
            }
        }
        if (res.data.flag == 0) {
            window.ajaxLoadState = "success";
            summer.hideProgress();
        } else {
            window.ajaxLoadState = "failed";
        }
        summer.hideProgress();
        successCallback(res.data);
    }).catch(function (e) {
        /*首页报错，直接跳转登录页关闭启动页*/
        console.log(e);
        console.log(e.response);
        if (e.response && e.response.status != 200) {
            summer.toast({
                msg: '不好意思，服务器开小差了!'
            });
            summer.refreshFooterLoadDone();
            summer.refreshHeaderLoadDone();
            summer.hideProgress();
            return;
        }

        window.ajaxLoadState = "success";
        summer.hideProgress();
        errorCallback();
    });
}

/**
 * [getPath description]
 * @return {[type]} [description]
 */
function getPath(params) {
    var fullUrl = params.fullUrl,
        url = params.url;


    if (fullUrl) {
        //fullUrl微信登录时调用微信的地址
        return url;
    } else {
        return 'http://10.3.13.7:8091' + url;
    }
}

/**
 * 统一处理 http 请求返回的数据非 JSON 的情况
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function httpErrorHandler(res) {
    if (!(0, _util.isJson)(res)) {
        summer.toast({
            msg: "老板，服务器小哥跑去乘凉了，请稍等哦~"
        });

        return false;
    }
}

/***/ }),

/***/ 1261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Row = exports.Col = undefined;

var _col = __webpack_require__(1266);

var _col2 = _interopRequireDefault(_col);

var _row = __webpack_require__(1267);

var _row2 = _interopRequireDefault(_row);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by XYC on 2017/11/21.
 */
exports.Col = _col2.default;
exports.Row = _row2.default;

/***/ }),

/***/ 1266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by XYC on 2017/11/21.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
  componentClass: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),

  /**
   * xs显示列数
   */
  xs: _propTypes2.default.number,
  /**
   * sm显示列数
   */
  sm: _propTypes2.default.number,
  /**
   * md显示列数
   */
  md: _propTypes2.default.number,
  /**
   * lg显示列数
   */
  lg: _propTypes2.default.number,
  /**
   * xs偏移列数
   */
  xsOffset: _propTypes2.default.number,
  /**
   * sm偏移列数
   */
  smOffset: _propTypes2.default.number,
  /**
   * md偏移列数
   */
  mdOffset: _propTypes2.default.number,
  /**
   * lg偏移列数
   */
  lgOffset: _propTypes2.default.number,
  /**
   * xs右偏移列数
   */
  xsPush: _propTypes2.default.number,
  /**
   * sm右偏移列数
   */
  smPush: _propTypes2.default.number,
  /**
   * md右偏移列数
   */
  mdPush: _propTypes2.default.number,
  /**
   * lg右偏移列数
   */
  lgPush: _propTypes2.default.number,
  /**
   * xs左偏移列数
   */
  xsPull: _propTypes2.default.number,
  /**
   * sm左偏移列数
   */
  smPull: _propTypes2.default.number,
  /**
   * md左偏移列数
   */
  mdPull: _propTypes2.default.number,
  /**
   * lg左偏移列数
   */
  lgPull: _propTypes2.default.number
};

var defaultProps = {
  componentClass: 'div',
  clsPrefix: 'um'
};

var DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];

var Col = function (_Component) {
  _inherits(Col, _Component);

  function Col() {
    _classCallCheck(this, Col);

    return _possibleConstructorReturn(this, (Col.__proto__ || Object.getPrototypeOf(Col)).apply(this, arguments));
  }

  _createClass(Col, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          Component = _props.componentClass,
          className = _props.className,
          clsPrefix = _props.clsPrefix,
          others = _objectWithoutProperties(_props, ['componentClass', 'className', 'clsPrefix']);

      var tbClass = [];
      /**
       * 对传入props做样式转化
       * @type {[type]}
       */
      DEVICE_SIZES.forEach(function (size) {
        function popProp(propSuffix, modifier) {
          var propName = '' + size + propSuffix;
          var propValue = others[propName];

          if (propValue != undefined && propValue != null) {
            tbClass.push(clsPrefix + '-' + size + modifier + '-' + propValue);
          }

          delete others[propName];
        }

        popProp('', '');
        popProp('Offset', '-offset');
        popProp('Push', '-push');
        popProp('Pull', '-pull');
      });

      return _react2.default.createElement(
        Component,
        _extends({
          className: (0, _classnames2.default)(tbClass, className)
        }, others),
        this.props.children
      );
    }
  }]);

  return Col;
}(_react.Component);

Col.defaultProps = defaultProps;
Col.propTypes = propTypes;

exports.default = Col;

/***/ }),

/***/ 1267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by XYC on 2017/11/21.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var propTypes = {
    componentClass: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string])
};

var defaultProps = {
    componentClass: 'div',
    clsPrefix: 'um-row'
};

var Row = function (_Component) {
    _inherits(Row, _Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                Component = _props.componentClass,
                clsPrefix = _props.clsPrefix,
                className = _props.className,
                others = _objectWithoutProperties(_props, ['componentClass', 'clsPrefix', 'className']);

            var bsclass = '' + clsPrefix;

            return _react2.default.createElement(
                Component,
                _extends({}, others, {
                    className: (0, _classnames2.default)(bsclass, className)
                }),
                this.props.children
            );
        }
    }]);

    return Row;
}(_react.Component);

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

exports.default = Row;

/***/ }),

/***/ 1334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(10);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ajax = __webpack_require__(121);

var _index = __webpack_require__(1261);

__webpack_require__(1547);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultProps = {
    metaData: {},
    data: {},
    changeFn: function changeFn() {}
};

var Card = function (_Component) {
    _inherits(Card, _Component);

    function Card(props, context) {
        _classCallCheck(this, Card);

        var _this2 = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props, context));

        _this2.handleChange = function (e, key) {
            var _this2$props = _this2.props,
                data = _this2$props.data,
                changeFn = _this2$props.changeFn;

            data[key] = e.target.value;
            changeFn(data);
        };

        _this2.processMetaData = function (key, val) {
            var _this2$props2 = _this2.props,
                data = _this2$props2.data,
                metaData = _this2$props2.metaData;

            if (metaData.card && metaData.card.properties && metaData.card.properties[key] && metaData.card.properties[key][val]) {
                return metaData.card.properties[key][val];
            } else {
                return null;
            }
        };

        _this2.renderCard = function () {
            var _this = _this2;
            var list = [];
            var _this2$props3 = _this2.props,
                data = _this2$props3.data,
                metaData = _this2$props3.metaData;

            var _loop = function _loop(item) {
                list.push(_react2.default.createElement(
                    _index.Col,
                    { lg: 4, md: 4, sm: 6, xs: 12 },
                    _react2.default.createElement(
                        'div',
                        { className: 'um-list-item-inner um-box' },
                        _react2.default.createElement(
                            'div',
                            { className: 'um-list-item-left' },
                            _this2.processMetaData(item, 'title')
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'um-list-item-right um-bf1' },
                            _react2.default.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: data[item],
                                onChange: function onChange(e) {
                                    _this2.handleChange(e, item);
                                },
                                disabled: _this2.processMetaData(item, 'disabled'),
                                style: _this2.processMetaData(item, 'style')
                            })
                        )
                    )
                ));
            };

            for (var item in data) {
                _loop(item);
            }
            return list;
        };

        _this2.state = {
            defaultData: {},
            allData: {},
            metaData: {}
        };
        return _this2;
    }

    _createClass(Card, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                data = _props.data,
                metaData = _props.metaData;

            return _react2.default.createElement(
                'div',
                { className: 'mt20' },
                _react2.default.createElement(
                    _index.Row,
                    null,
                    this.renderCard()
                )
            );
        }
    }]);

    return Card;
}(_react.Component);

Card.defaultProps = defaultProps;
exports.default = Card;

/***/ }),

/***/ 1547:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1562:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(177);
module.exports = __webpack_require__(1334);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 939:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.browserRedirect = browserRedirect;
exports.isJson = isJson;
/**
 * 基于 UA 判断设备情况
 * @return {[type]} [description]
 */
function browserRedirect() {
    var browser = {
        info: function () {
            var ua = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                //trident: ua.indexOf('Trident') > -1, //IE内核
                //presto: ua.indexOf('Presto') > -1, //opera内核
                webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                //gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
                mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: ua.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: ua.indexOf('iPad') > -1, //是否iPad
                //webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                platform: navigator.platform
            };
        }(),
        lang: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    if (browser.info.platform.toLowerCase().indexOf("win") >= 0 || browser.info.platform.toLowerCase().indexOf("mac") >= 0) {
        return "pc";
    } else if (browser.info.android) {
        return "android";
    } else if (browser.info.ios || browser.info.iPhone || browser.info.iPad) {
        return "ios";
    } else {
        return "";
    }
}

/**
 * 判断数据是否为json对象
 * @param  {[type]}  obj [description]
 * @return {Boolean}     [description]
 */
function isJson(obj) {
    var isjson = (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;

    return isjson;
}

/***/ }),

/***/ 940:
/***/ (function(module, exports) {

module.exports = axios;

/***/ })

},[1562]);