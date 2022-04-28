"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorResolvers = ColorResolvers;

var _transforms = require("./transforms");

var units = {
  hex: 'hex',
  hsl: 'hsl',
  rgb: 'rgb',
  rgba: 'rgba'
};

function ColorResolvers(tokens) {
  return {
    color(o, _ref) {
      var {
        name,
        unit
      } = _ref;
      var value = tokens[name];
      if (unit) value = (0, _transforms.toColorUnit)(unit, value);
      return {
        name,
        value
      };
    } // colors: (o: any, { unit }: { unit: Units }) => {
    // 	if (unit) {
    // 		return Object.entries(tokens).map(([key, value]) => {
    // 			return { name: key, value: toColorUnit(unit, value) }
    // 		})
    // 	} else {
    // 		return Object.entries(tokens).map(([key, value]) => {
    // 			return { name: key, value }
    // 		})
    // 	}
    // },


  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb2xvci9yZXNvbHZlcnMudHMiXSwibmFtZXMiOlsidW5pdHMiLCJoZXgiLCJoc2wiLCJyZ2IiLCJyZ2JhIiwiQ29sb3JSZXNvbHZlcnMiLCJ0b2tlbnMiLCJjb2xvciIsIm8iLCJuYW1lIiwidW5pdCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBSUEsSUFBTUEsS0FBSyxHQUFHO0FBQ2JDLEVBQUFBLEdBQUcsRUFBRSxLQURRO0FBRWJDLEVBQUFBLEdBQUcsRUFBRSxLQUZRO0FBR2JDLEVBQUFBLEdBQUcsRUFBRSxLQUhRO0FBSWJDLEVBQUFBLElBQUksRUFBRTtBQUpPLENBQWQ7O0FBU08sU0FBU0MsY0FBVCxDQUF3QkMsTUFBeEIsRUFBdUM7QUFDN0MsU0FBTztBQUNOQyxJQUFBQSxLQUFLLENBQUNDLENBQUQsUUFBd0Q7QUFBQSxVQUEvQztBQUFFQyxRQUFBQSxJQUFGO0FBQVFDLFFBQUFBO0FBQVIsT0FBK0M7QUFDNUQsVUFBSUMsS0FBSyxHQUFHTCxNQUFNLENBQUNHLElBQUQsQ0FBbEI7QUFDQSxVQUFJQyxJQUFKLEVBQVVDLEtBQUssR0FBRyw2QkFBWUQsSUFBWixFQUFrQkMsS0FBbEIsQ0FBUjtBQUNWLGFBQU87QUFBRUYsUUFBQUEsSUFBRjtBQUFRRSxRQUFBQTtBQUFSLE9BQVA7QUFDQSxLQUxLLENBTU47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBaEJNLEdBQVA7QUFrQkEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYW1lbGl6ZSB9IGZyb20gJ2h1bXBzJ1xuaW1wb3J0IHsgdG9Db2xvclVuaXQgfSBmcm9tICcuL3RyYW5zZm9ybXMnXG5cbnR5cGUgUGFpcnMgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9XG5cbmNvbnN0IHVuaXRzID0ge1xuXHRoZXg6ICdoZXgnLFxuXHRoc2w6ICdoc2wnLFxuXHRyZ2I6ICdyZ2InLFxuXHRyZ2JhOiAncmdiYScsXG59IGFzIGNvbnN0XG5cbnR5cGUgVW5pdHMgPSBrZXlvZiB0eXBlb2YgdW5pdHNcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yUmVzb2x2ZXJzKHRva2VuczogUGFpcnMpIHtcblx0cmV0dXJuIHtcblx0XHRjb2xvcihvOiBhbnksIHsgbmFtZSwgdW5pdCB9OiB7IG5hbWU6IHN0cmluZzsgdW5pdDogVW5pdHMgfSkge1xuXHRcdFx0bGV0IHZhbHVlID0gdG9rZW5zW25hbWVdXG5cdFx0XHRpZiAodW5pdCkgdmFsdWUgPSB0b0NvbG9yVW5pdCh1bml0LCB2YWx1ZSlcblx0XHRcdHJldHVybiB7IG5hbWUsIHZhbHVlIH1cblx0XHR9LFxuXHRcdC8vIGNvbG9yczogKG86IGFueSwgeyB1bml0IH06IHsgdW5pdDogVW5pdHMgfSkgPT4ge1xuXHRcdC8vIFx0aWYgKHVuaXQpIHtcblx0XHQvLyBcdFx0cmV0dXJuIE9iamVjdC5lbnRyaWVzKHRva2VucykubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcblx0XHQvLyBcdFx0XHRyZXR1cm4geyBuYW1lOiBrZXksIHZhbHVlOiB0b0NvbG9yVW5pdCh1bml0LCB2YWx1ZSkgfVxuXHRcdC8vIFx0XHR9KVxuXHRcdC8vIFx0fSBlbHNlIHtcblx0XHQvLyBcdFx0cmV0dXJuIE9iamVjdC5lbnRyaWVzKHRva2VucykubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcblx0XHQvLyBcdFx0XHRyZXR1cm4geyBuYW1lOiBrZXksIHZhbHVlIH1cblx0XHQvLyBcdFx0fSlcblx0XHQvLyBcdH1cblx0XHQvLyB9LFxuXHR9XG59XG4iXX0=