"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorUnits = exports.ColorNames = exports.ColorFields = void 0;
var ColorUnits = "enum ColorUnit {\n    hex\n    rgb\n    rgba\n    hsl\n}";
exports.ColorUnits = ColorUnits;
var ColorFields = "\ncolor(color: ColorName!, unit: ColorUnit): Color\ncolors(unit: ColorUnit): [Color]\n";
exports.ColorFields = ColorFields;
var ColorNames = "enum ColorName {\n    gray100\n    gray200\n    gray300\n}";
exports.ColorNames = ColorNames;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb2xvci9zY2hlbWEudHMiXSwibmFtZXMiOlsiQ29sb3JVbml0cyIsIkNvbG9yRmllbGRzIiwiQ29sb3JOYW1lcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQU8sSUFBTUEsVUFBVSw2REFBaEI7O0FBT0EsSUFBTUMsV0FBVywyRkFBakI7O0FBS0EsSUFBTUMsVUFBVSwrREFBaEIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQ29sb3JVbml0cyA9IGBlbnVtIENvbG9yVW5pdCB7XG4gICAgaGV4XG4gICAgcmdiXG4gICAgcmdiYVxuICAgIGhzbFxufWBcblxuZXhwb3J0IGNvbnN0IENvbG9yRmllbGRzID0gYFxuY29sb3IoY29sb3I6IENvbG9yTmFtZSEsIHVuaXQ6IENvbG9yVW5pdCk6IENvbG9yXG5jb2xvcnModW5pdDogQ29sb3JVbml0KTogW0NvbG9yXVxuYFxuXG5leHBvcnQgY29uc3QgQ29sb3JOYW1lcyA9IGBlbnVtIENvbG9yTmFtZSB7XG4gICAgZ3JheTEwMFxuICAgIGdyYXkyMDBcbiAgICBncmF5MzAwXG59YFxuIl19