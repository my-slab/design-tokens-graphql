"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineTypes = defineTypes;

var _apolloServer = require("apollo-server");

var _os = require("os");

var _humps = require("humps");

var _tokens2 = _interopRequireDefault(require("../tokens.json"));

var _resolvers = require("./color/resolvers");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function defineEnum(name, values) {
  return "enum ".concat(name, " { \n\t").concat(values.join(_os.EOL + '\t'), "\n}");
}

var ColorFields = "\ncolor(name: ColorName!, unit: ColorUnit): Color\ncolors(unit: ColorUnit): [Color]\n";
var ColorUnits = "enum ColorUnit {\n    hex\n    rgb\n    rgba\n    hsl\n}";
var Schema = "\n\"\"\"\nDesign decision associated with a name, at minimum a name/value pair.\n\"\"\"\ninterface Token {\n\t\"\"\"\n\tToken's name, often used as an enumeration argument.\n\t\"\"\"\n\tname: String!\n\t\"\"\"\n\tToken's value like '#FFFFF' or '14px'.\n\t\"\"\"\n\tvalue: String!\n}\n\ntype Color implements Token {\n\t\"\"\"\n\tToken's name, often used as an enumeration argument.\n\t\"\"\"\n\tname: String!\n\t\"\"\"\n\tRepresents a 24bit RGB or 24+8bit RGBA color in the sRGB color space.\n\t\"\"\"\n\tvalue: String!\n}\n\ntype Dimension implements Token {\n\t\"\"\"\n\tToken's name, often used as an enumeration argument.\n\t\"\"\"\n\tname: String!\n\t\"\"\"\n\tRepresents an amount of distance in a single dimension in the UI, such as a position, width, height, radius, or thickness.\n\t\"\"\"\n\tvalue: String!\n}\n";
/**
 * @name
 * defineTypes
 *
 * @example
 * defineTypes({
 *   black: { $type: 'color', $value: '#fff' },
 *   white: { $type: 'color', $value: '#000' },
 *   medium: { $type: 'dimension', $value: '16px' },
 * })
 */

function defineTypes(tokens) {
  var tokenTypes = {
    color: 'color',
    dimension: 'dimension'
  };
  var colorTokens = {};
  var dimensionTokens = {};

  for (var t in tokens) {
    var token = tokens[t];
    if (token.$type === tokenTypes.color) colorTokens[t] = token.$value;
    if (token.$type === tokenTypes.dimension) dimensionTokens[t] = token.$value;
  }

  colorTokens = (0, _humps.camelizeKeys)(colorTokens); // dimensionTokens = camelizeKeys(dimensionTokens) as Pairs

  return (0, _apolloServer.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n\t\t", "\n\t\t", "\n\t\t", "\n\n\t\ttype Query {\n\t\t\t", "\n\t\t}\n\t"])), Schema, defineEnum('ColorName', Object.keys(colorTokens)), ColorUnits, ColorFields);
}
/**
 * @name
 * defineResolvers
 *
 * @example
 * defineResolvers({
 *   black: { $type: 'color', $value: '#fff' },
 *   white: { $type: 'color', $value: '#000' },
 *   medium: { $type: 'dimension', $value: '16px' },
 * }, { color, colors })
 */


function defineResolvers(tokens) {
  var tokenTypes = {
    color: 'color',
    dimension: 'dimension'
  };
  var colorTokens = {};
  var dimensionTokens = {};

  for (var t in tokens) {
    var token = tokens[t];
    if (token.$type === tokenTypes.color) colorTokens[t] = token.$value;
    if (token.$type === tokenTypes.dimension) dimensionTokens[t] = token.$value;
  }

  colorTokens = (0, _humps.camelizeKeys)(colorTokens);
  dimensionTokens = (0, _humps.camelizeKeys)(dimensionTokens);
  return _objectSpread({}, (0, _resolvers.ColorResolvers)(colorTokens));
}

function defineServer(tokens) {
  var typeDefs = defineTypes(tokens);
  var resolvers = defineResolvers(tokens);
  return {
    typeDefs,
    resolvers: {
      Query: _objectSpread({}, resolvers)
    }
  };
}

var server = new _apolloServer.ApolloServer(defineServer(_tokens2.default));
server.listen().then(_ref => {
  var {
    url
  } = _ref;
  console.log("\uD83D\uDE80  Server ready at ".concat(url));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJkZWZpbmVFbnVtIiwibmFtZSIsInZhbHVlcyIsImpvaW4iLCJFT0wiLCJDb2xvckZpZWxkcyIsIkNvbG9yVW5pdHMiLCJTY2hlbWEiLCJkZWZpbmVUeXBlcyIsInRva2VucyIsInRva2VuVHlwZXMiLCJjb2xvciIsImRpbWVuc2lvbiIsImNvbG9yVG9rZW5zIiwiZGltZW5zaW9uVG9rZW5zIiwidCIsInRva2VuIiwiJHR5cGUiLCIkdmFsdWUiLCJncWwiLCJPYmplY3QiLCJrZXlzIiwiZGVmaW5lUmVzb2x2ZXJzIiwiZGVmaW5lU2VydmVyIiwidHlwZURlZnMiLCJyZXNvbHZlcnMiLCJRdWVyeSIsInNlcnZlciIsIkFwb2xsb1NlcnZlciIsIl90b2tlbnMiLCJsaXN0ZW4iLCJ0aGVuIiwidXJsIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFTQSxVQUFULENBQW9CQyxJQUFwQixFQUFrQ0MsTUFBbEMsRUFBb0Q7QUFDbkQsd0JBQWVELElBQWYsb0JBQ0VDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZQyxVQUFNLElBQWxCLENBREY7QUFHQTs7QUFFRCxJQUFNQyxXQUFXLDBGQUFqQjtBQUtBLElBQU1DLFVBQVUsNkRBQWhCO0FBT0EsSUFBTUMsTUFBTSwwekJBQVo7QUFzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDTyxTQUFTQyxXQUFULENBQXFCQyxNQUFyQixFQUFxQztBQUMzQyxNQUFNQyxVQUFVLEdBQUc7QUFDbEJDLElBQUFBLEtBQUssRUFBRSxPQURXO0FBRWxCQyxJQUFBQSxTQUFTLEVBQUU7QUFGTyxHQUFuQjtBQUtBLE1BQUlDLFdBQWtCLEdBQUcsRUFBekI7QUFDQSxNQUFJQyxlQUFzQixHQUFHLEVBQTdCOztBQUVBLE9BQUssSUFBSUMsQ0FBVCxJQUFjTixNQUFkLEVBQXNCO0FBQ3JCLFFBQUlPLEtBQUssR0FBR1AsTUFBTSxDQUFDTSxDQUFELENBQWxCO0FBRUEsUUFBSUMsS0FBSyxDQUFDQyxLQUFOLEtBQWdCUCxVQUFVLENBQUNDLEtBQS9CLEVBQXNDRSxXQUFXLENBQUNFLENBQUQsQ0FBWCxHQUFpQkMsS0FBSyxDQUFDRSxNQUF2QjtBQUN0QyxRQUFJRixLQUFLLENBQUNDLEtBQU4sS0FBZ0JQLFVBQVUsQ0FBQ0UsU0FBL0IsRUFBMENFLGVBQWUsQ0FBQ0MsQ0FBRCxDQUFmLEdBQXFCQyxLQUFLLENBQUNFLE1BQTNCO0FBQzFDOztBQUVETCxFQUFBQSxXQUFXLEdBQUcseUJBQWFBLFdBQWIsQ0FBZCxDQWhCMkMsQ0FpQjNDOztBQUVBLGFBQU9NLGlCQUFQLGdKQUNHWixNQURILEVBRUdQLFVBQVUsQ0FBQyxXQUFELEVBQWNvQixNQUFNLENBQUNDLElBQVAsQ0FBWVIsV0FBWixDQUFkLENBRmIsRUFHR1AsVUFISCxFQU1JRCxXQU5KO0FBU0E7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSxTQUFTaUIsZUFBVCxDQUF5QmIsTUFBekIsRUFBeUM7QUFDeEMsTUFBTUMsVUFBVSxHQUFHO0FBQ2xCQyxJQUFBQSxLQUFLLEVBQUUsT0FEVztBQUVsQkMsSUFBQUEsU0FBUyxFQUFFO0FBRk8sR0FBbkI7QUFLQSxNQUFJQyxXQUFrQixHQUFHLEVBQXpCO0FBQ0EsTUFBSUMsZUFBc0IsR0FBRyxFQUE3Qjs7QUFFQSxPQUFLLElBQUlDLENBQVQsSUFBY04sTUFBZCxFQUFzQjtBQUNyQixRQUFJTyxLQUFLLEdBQUdQLE1BQU0sQ0FBQ00sQ0FBRCxDQUFsQjtBQUNBLFFBQUlDLEtBQUssQ0FBQ0MsS0FBTixLQUFnQlAsVUFBVSxDQUFDQyxLQUEvQixFQUFzQ0UsV0FBVyxDQUFDRSxDQUFELENBQVgsR0FBaUJDLEtBQUssQ0FBQ0UsTUFBdkI7QUFDdEMsUUFBSUYsS0FBSyxDQUFDQyxLQUFOLEtBQWdCUCxVQUFVLENBQUNFLFNBQS9CLEVBQTBDRSxlQUFlLENBQUNDLENBQUQsQ0FBZixHQUFxQkMsS0FBSyxDQUFDRSxNQUEzQjtBQUMxQzs7QUFFREwsRUFBQUEsV0FBVyxHQUFHLHlCQUFhQSxXQUFiLENBQWQ7QUFDQUMsRUFBQUEsZUFBZSxHQUFHLHlCQUFhQSxlQUFiLENBQWxCO0FBQ0EsMkJBQVksK0JBQWVELFdBQWYsQ0FBWjtBQUNBOztBQUVELFNBQVNVLFlBQVQsQ0FBc0JkLE1BQXRCLEVBQXNDO0FBQ3JDLE1BQUllLFFBQVEsR0FBR2hCLFdBQVcsQ0FBQ0MsTUFBRCxDQUExQjtBQUNBLE1BQUlnQixTQUFTLEdBQUdILGVBQWUsQ0FBQ2IsTUFBRCxDQUEvQjtBQUVBLFNBQU87QUFDTmUsSUFBQUEsUUFETTtBQUVOQyxJQUFBQSxTQUFTLEVBQUU7QUFDVkMsTUFBQUEsS0FBSyxvQkFDREQsU0FEQztBQURLO0FBRkwsR0FBUDtBQVFBOztBQUVELElBQU1FLE1BQU0sR0FBRyxJQUFJQywwQkFBSixDQUFpQkwsWUFBWSxDQUFDTSxnQkFBRCxDQUE3QixDQUFmO0FBRUFGLE1BQU0sQ0FBQ0csTUFBUCxHQUFnQkMsSUFBaEIsQ0FBcUIsUUFBYTtBQUFBLE1BQVo7QUFBRUMsSUFBQUE7QUFBRixHQUFZO0FBQ2pDQyxFQUFBQSxPQUFPLENBQUNDLEdBQVIseUNBQW1DRixHQUFuQztBQUNBLENBRkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcG9sbG9TZXJ2ZXIsIGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXInXG5pbXBvcnQgeyBFT0wgfSBmcm9tICdvcydcbmltcG9ydCB7IGNhbWVsaXplS2V5cyB9IGZyb20gJ2h1bXBzJ1xuXG5pbXBvcnQgX3Rva2VucyBmcm9tICcuLi90b2tlbnMuanNvbidcbmltcG9ydCB7IENvbG9yUmVzb2x2ZXJzIH0gZnJvbSAnLi9jb2xvci9yZXNvbHZlcnMnXG5cbnR5cGUgQ29sb3IgPSB7XG5cdCR0eXBlOiAnY29sb3InXG5cdCR2YWx1ZTogc3RyaW5nXG59XG5cbnR5cGUgRGltZW5zaW9uID0ge1xuXHQkdHlwZTogJ2RpbWVuc2lvbidcblx0JHZhbHVlOiBzdHJpbmdcbn1cblxudHlwZSBUb2tlbnMgPSB7XG5cdFtrZXk6IHN0cmluZ106IENvbG9yIHwgRGltZW5zaW9uXG59XG5cbnR5cGUgUGFpcnMgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9XG5cbmZ1bmN0aW9uIGRlZmluZUVudW0obmFtZTogc3RyaW5nLCB2YWx1ZXM6IHN0cmluZ1tdKSB7XG5cdHJldHVybiBgZW51bSAke25hbWV9IHsgXG5cdCR7dmFsdWVzLmpvaW4oRU9MICsgJ1xcdCcpfVxufWBcbn1cblxuY29uc3QgQ29sb3JGaWVsZHMgPSBgXG5jb2xvcihuYW1lOiBDb2xvck5hbWUhLCB1bml0OiBDb2xvclVuaXQpOiBDb2xvclxuY29sb3JzKHVuaXQ6IENvbG9yVW5pdCk6IFtDb2xvcl1cbmBcblxuY29uc3QgQ29sb3JVbml0cyA9IGBlbnVtIENvbG9yVW5pdCB7XG4gICAgaGV4XG4gICAgcmdiXG4gICAgcmdiYVxuICAgIGhzbFxufWBcblxuY29uc3QgU2NoZW1hID0gYFxuXCJcIlwiXG5EZXNpZ24gZGVjaXNpb24gYXNzb2NpYXRlZCB3aXRoIGEgbmFtZSwgYXQgbWluaW11bSBhIG5hbWUvdmFsdWUgcGFpci5cblwiXCJcIlxuaW50ZXJmYWNlIFRva2VuIHtcblx0XCJcIlwiXG5cdFRva2VuJ3MgbmFtZSwgb2Z0ZW4gdXNlZCBhcyBhbiBlbnVtZXJhdGlvbiBhcmd1bWVudC5cblx0XCJcIlwiXG5cdG5hbWU6IFN0cmluZyFcblx0XCJcIlwiXG5cdFRva2VuJ3MgdmFsdWUgbGlrZSAnI0ZGRkZGJyBvciAnMTRweCcuXG5cdFwiXCJcIlxuXHR2YWx1ZTogU3RyaW5nIVxufVxuXG50eXBlIENvbG9yIGltcGxlbWVudHMgVG9rZW4ge1xuXHRcIlwiXCJcblx0VG9rZW4ncyBuYW1lLCBvZnRlbiB1c2VkIGFzIGFuIGVudW1lcmF0aW9uIGFyZ3VtZW50LlxuXHRcIlwiXCJcblx0bmFtZTogU3RyaW5nIVxuXHRcIlwiXCJcblx0UmVwcmVzZW50cyBhIDI0Yml0IFJHQiBvciAyNCs4Yml0IFJHQkEgY29sb3IgaW4gdGhlIHNSR0IgY29sb3Igc3BhY2UuXG5cdFwiXCJcIlxuXHR2YWx1ZTogU3RyaW5nIVxufVxuXG50eXBlIERpbWVuc2lvbiBpbXBsZW1lbnRzIFRva2VuIHtcblx0XCJcIlwiXG5cdFRva2VuJ3MgbmFtZSwgb2Z0ZW4gdXNlZCBhcyBhbiBlbnVtZXJhdGlvbiBhcmd1bWVudC5cblx0XCJcIlwiXG5cdG5hbWU6IFN0cmluZyFcblx0XCJcIlwiXG5cdFJlcHJlc2VudHMgYW4gYW1vdW50IG9mIGRpc3RhbmNlIGluIGEgc2luZ2xlIGRpbWVuc2lvbiBpbiB0aGUgVUksIHN1Y2ggYXMgYSBwb3NpdGlvbiwgd2lkdGgsIGhlaWdodCwgcmFkaXVzLCBvciB0aGlja25lc3MuXG5cdFwiXCJcIlxuXHR2YWx1ZTogU3RyaW5nIVxufVxuYFxuXG4vKipcbiAqIEBuYW1lXG4gKiBkZWZpbmVUeXBlc1xuICpcbiAqIEBleGFtcGxlXG4gKiBkZWZpbmVUeXBlcyh7XG4gKiAgIGJsYWNrOiB7ICR0eXBlOiAnY29sb3InLCAkdmFsdWU6ICcjZmZmJyB9LFxuICogICB3aGl0ZTogeyAkdHlwZTogJ2NvbG9yJywgJHZhbHVlOiAnIzAwMCcgfSxcbiAqICAgbWVkaXVtOiB7ICR0eXBlOiAnZGltZW5zaW9uJywgJHZhbHVlOiAnMTZweCcgfSxcbiAqIH0pXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVUeXBlcyh0b2tlbnM6IFRva2Vucykge1xuXHRjb25zdCB0b2tlblR5cGVzID0ge1xuXHRcdGNvbG9yOiAnY29sb3InLFxuXHRcdGRpbWVuc2lvbjogJ2RpbWVuc2lvbicsXG5cdH1cblxuXHRsZXQgY29sb3JUb2tlbnM6IFBhaXJzID0ge31cblx0bGV0IGRpbWVuc2lvblRva2VuczogUGFpcnMgPSB7fVxuXG5cdGZvciAobGV0IHQgaW4gdG9rZW5zKSB7XG5cdFx0bGV0IHRva2VuID0gdG9rZW5zW3RdXG5cblx0XHRpZiAodG9rZW4uJHR5cGUgPT09IHRva2VuVHlwZXMuY29sb3IpIGNvbG9yVG9rZW5zW3RdID0gdG9rZW4uJHZhbHVlXG5cdFx0aWYgKHRva2VuLiR0eXBlID09PSB0b2tlblR5cGVzLmRpbWVuc2lvbikgZGltZW5zaW9uVG9rZW5zW3RdID0gdG9rZW4uJHZhbHVlXG5cdH1cblxuXHRjb2xvclRva2VucyA9IGNhbWVsaXplS2V5cyhjb2xvclRva2VucykgYXMgUGFpcnNcblx0Ly8gZGltZW5zaW9uVG9rZW5zID0gY2FtZWxpemVLZXlzKGRpbWVuc2lvblRva2VucykgYXMgUGFpcnNcblxuXHRyZXR1cm4gZ3FsYFxuXHRcdCR7U2NoZW1hfVxuXHRcdCR7ZGVmaW5lRW51bSgnQ29sb3JOYW1lJywgT2JqZWN0LmtleXMoY29sb3JUb2tlbnMpKX1cblx0XHQke0NvbG9yVW5pdHN9XG5cblx0XHR0eXBlIFF1ZXJ5IHtcblx0XHRcdCR7Q29sb3JGaWVsZHN9XG5cdFx0fVxuXHRgXG59XG5cbi8qKlxuICogQG5hbWVcbiAqIGRlZmluZVJlc29sdmVyc1xuICpcbiAqIEBleGFtcGxlXG4gKiBkZWZpbmVSZXNvbHZlcnMoe1xuICogICBibGFjazogeyAkdHlwZTogJ2NvbG9yJywgJHZhbHVlOiAnI2ZmZicgfSxcbiAqICAgd2hpdGU6IHsgJHR5cGU6ICdjb2xvcicsICR2YWx1ZTogJyMwMDAnIH0sXG4gKiAgIG1lZGl1bTogeyAkdHlwZTogJ2RpbWVuc2lvbicsICR2YWx1ZTogJzE2cHgnIH0sXG4gKiB9LCB7IGNvbG9yLCBjb2xvcnMgfSlcbiAqL1xuZnVuY3Rpb24gZGVmaW5lUmVzb2x2ZXJzKHRva2VuczogVG9rZW5zKSB7XG5cdGNvbnN0IHRva2VuVHlwZXMgPSB7XG5cdFx0Y29sb3I6ICdjb2xvcicsXG5cdFx0ZGltZW5zaW9uOiAnZGltZW5zaW9uJyxcblx0fVxuXG5cdGxldCBjb2xvclRva2VuczogUGFpcnMgPSB7fVxuXHRsZXQgZGltZW5zaW9uVG9rZW5zOiBQYWlycyA9IHt9XG5cblx0Zm9yIChsZXQgdCBpbiB0b2tlbnMpIHtcblx0XHRsZXQgdG9rZW4gPSB0b2tlbnNbdF1cblx0XHRpZiAodG9rZW4uJHR5cGUgPT09IHRva2VuVHlwZXMuY29sb3IpIGNvbG9yVG9rZW5zW3RdID0gdG9rZW4uJHZhbHVlXG5cdFx0aWYgKHRva2VuLiR0eXBlID09PSB0b2tlblR5cGVzLmRpbWVuc2lvbikgZGltZW5zaW9uVG9rZW5zW3RdID0gdG9rZW4uJHZhbHVlXG5cdH1cblxuXHRjb2xvclRva2VucyA9IGNhbWVsaXplS2V5cyhjb2xvclRva2VucykgYXMgUGFpcnNcblx0ZGltZW5zaW9uVG9rZW5zID0gY2FtZWxpemVLZXlzKGRpbWVuc2lvblRva2VucykgYXMgUGFpcnNcblx0cmV0dXJuIHsgLi4uQ29sb3JSZXNvbHZlcnMoY29sb3JUb2tlbnMpIH1cbn1cblxuZnVuY3Rpb24gZGVmaW5lU2VydmVyKHRva2VuczogVG9rZW5zKSB7XG5cdGxldCB0eXBlRGVmcyA9IGRlZmluZVR5cGVzKHRva2Vucylcblx0bGV0IHJlc29sdmVycyA9IGRlZmluZVJlc29sdmVycyh0b2tlbnMpXG5cblx0cmV0dXJuIHtcblx0XHR0eXBlRGVmcyxcblx0XHRyZXNvbHZlcnM6IHtcblx0XHRcdFF1ZXJ5OiB7XG5cdFx0XHRcdC4uLnJlc29sdmVycyxcblx0XHRcdH0sXG5cdFx0fSxcblx0fVxufVxuXG5jb25zdCBzZXJ2ZXIgPSBuZXcgQXBvbGxvU2VydmVyKGRlZmluZVNlcnZlcihfdG9rZW5zIGFzIFRva2VucykpXG5cbnNlcnZlci5saXN0ZW4oKS50aGVuKCh7IHVybCB9KSA9PiB7XG5cdGNvbnNvbGUubG9nKGDwn5qAICBTZXJ2ZXIgcmVhZHkgYXQgJHt1cmx9YClcbn0pXG4iXX0=