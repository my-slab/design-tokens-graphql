"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toColorUnit = toColorUnit;

var _chromaJs = _interopRequireDefault(require("chroma-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var units = {
  hex: 'hex',
  hsl: 'hsl',
  rgb: 'rgb',
  rgba: 'rgba'
};

function toColorUnit(unit, value) {
  var transformedValue = (0, _chromaJs.default)(value)[unit]();
  if (Array.isArray(transformedValue)) return "".concat(unit, "(").concat(transformedValue.join(','), ")");
  return value;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb2xvci90cmFuc2Zvcm1zLnRzIl0sIm5hbWVzIjpbInVuaXRzIiwiaGV4IiwiaHNsIiwicmdiIiwicmdiYSIsInRvQ29sb3JVbml0IiwidW5pdCIsInZhbHVlIiwidHJhbnNmb3JtZWRWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLEtBQUssR0FBRztBQUNiQyxFQUFBQSxHQUFHLEVBQUUsS0FEUTtBQUViQyxFQUFBQSxHQUFHLEVBQUUsS0FGUTtBQUdiQyxFQUFBQSxHQUFHLEVBQUUsS0FIUTtBQUliQyxFQUFBQSxJQUFJLEVBQUU7QUFKTyxDQUFkOztBQVNPLFNBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQWtDQyxLQUFsQyxFQUFpRDtBQUN2RCxNQUFJQyxnQkFBZ0IsR0FBRyx1QkFBT0QsS0FBUCxFQUFjRCxJQUFkLEdBQXZCO0FBQ0EsTUFBSUcsS0FBSyxDQUFDQyxPQUFOLENBQWNGLGdCQUFkLENBQUosRUFBcUMsaUJBQVVGLElBQVYsY0FBa0JFLGdCQUFnQixDQUFDRyxJQUFqQixDQUFzQixHQUF0QixDQUFsQjtBQUNyQyxTQUFPSixLQUFQO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hyb21hIGZyb20gJ2Nocm9tYS1qcydcblxuY29uc3QgdW5pdHMgPSB7XG5cdGhleDogJ2hleCcsXG5cdGhzbDogJ2hzbCcsXG5cdHJnYjogJ3JnYicsXG5cdHJnYmE6ICdyZ2JhJyxcbn0gYXMgY29uc3RcblxudHlwZSBVbml0cyA9IGtleW9mIHR5cGVvZiB1bml0c1xuXG5leHBvcnQgZnVuY3Rpb24gdG9Db2xvclVuaXQodW5pdDogVW5pdHMsIHZhbHVlOiBzdHJpbmcpIHtcblx0bGV0IHRyYW5zZm9ybWVkVmFsdWUgPSBjaHJvbWEodmFsdWUpW3VuaXRdKClcblx0aWYgKEFycmF5LmlzQXJyYXkodHJhbnNmb3JtZWRWYWx1ZSkpIHJldHVybiBgJHt1bml0fSgke3RyYW5zZm9ybWVkVmFsdWUuam9pbignLCcpfSlgXG5cdHJldHVybiB2YWx1ZVxufVxuIl19