webpackJsonp([18],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 1051:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var propTypes = {
    type: _propTypes2.default.string,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object
};
var defaultProps = {
    className: '',
    type: ''
};

function Icon(props) {
    var type = props.type,
        className = props.className,
        ret = _objectWithoutProperties(props, ['type', 'className']);

    return _react2.default.createElement('i', _extends({
        className: 'iconfont icon-' + type + ' ' + className
    }, ret));
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
exports.default = Icon;

/***/ }),

/***/ 1262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(8);

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = __webpack_require__(6);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__(1051);

var _index2 = _interopRequireDefault(_index);

__webpack_require__(1295);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* tslint:disable:jsx-no-multiline-js */


var defaultProps = {
  prefixCls: 'lebra-navbar',
  mode: 'dark',
  iconName: '',
  onLeftClick: function onLeftClick() {}
};

var propTypes = {
  prefixCls: _propTypes2.default.string,
  className: _propTypes2.default.string,
  children: _propTypes2.default.any,
  mode: _propTypes2.default.string,
  iconName: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  leftContent: _propTypes2.default.any,
  rightContent: _propTypes2.default.any,
  onLeftClick: _propTypes2.default.func
};

var NavBar = function (_Component) {
  _inherits(NavBar, _Component);

  function NavBar(props, context) {
    _classCallCheck(this, NavBar);

    return _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props, context));
  }

  _createClass(NavBar, [{
    key: 'render',
    value: function render() {
      // console.log(this.props.data,this.props.openComponent)
      var _props = this.props,
          prefixCls = _props.prefixCls,
          className = _props.className,
          children = _props.children,
          mode = _props.mode,
          iconName = _props.iconName,
          leftContent = _props.leftContent,
          rightContent = _props.rightContent,
          onLeftClick = _props.onLeftClick;


      var wrapCls = (0, _classnames2.default)(prefixCls, prefixCls + '-' + mode, className);

      return _react2.default.createElement(
        'div',
        { className: wrapCls },
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-left', role: 'button', onClick: onLeftClick },
          _react2.default.createElement(
            'span',
            { className: prefixCls + '-left-icon', 'aria-hidden': 'true' },
            typeof iconName === 'string' ? _react2.default.createElement(_index2.default, { type: iconName }) : iconName
          ),
          _react2.default.createElement(
            'span',
            { className: prefixCls + '-left-content' },
            leftContent
          )
        ),
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-title' },
          children
        ),
        _react2.default.createElement(
          'div',
          { className: prefixCls + '-right' },
          rightContent
        )
      );
    }
  }]);

  return NavBar;
}(_react.Component);

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

exports.default = NavBar;

/***/ }),

/***/ 1295:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1565:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(177);
module.exports = __webpack_require__(1262);


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


/***/ })

},[1565]);