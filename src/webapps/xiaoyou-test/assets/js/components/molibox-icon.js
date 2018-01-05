webpackJsonp([20],{

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

/***/ 1563:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(177);
module.exports = __webpack_require__(1051);


/***/ })

},[1563]);