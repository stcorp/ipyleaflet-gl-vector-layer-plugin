var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
import * as L$1 from "leaflet";
import { Layer, setOptions, Browser, DomUtil, LatLng, Point, Bounds } from "leaflet";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var chroma$1 = { exports: {} };
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    var limit$2 = function(x2, min2, max2) {
      if (min2 === void 0)
        min2 = 0;
      if (max2 === void 0)
        max2 = 1;
      return x2 < min2 ? min2 : x2 > max2 ? max2 : x2;
    };
    var limit$1 = limit$2;
    var clip_rgb$3 = function(rgb2) {
      rgb2._clipped = false;
      rgb2._unclipped = rgb2.slice(0);
      for (var i3 = 0; i3 <= 3; i3++) {
        if (i3 < 3) {
          if (rgb2[i3] < 0 || rgb2[i3] > 255) {
            rgb2._clipped = true;
          }
          rgb2[i3] = limit$1(rgb2[i3], 0, 255);
        } else if (i3 === 3) {
          rgb2[i3] = limit$1(rgb2[i3], 0, 1);
        }
      }
      return rgb2;
    };
    var classToType = {};
    for (var i$1 = 0, list$1 = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Undefined", "Null"]; i$1 < list$1.length; i$1 += 1) {
      var name = list$1[i$1];
      classToType["[object " + name + "]"] = name.toLowerCase();
    }
    var type$p = function(obj) {
      return classToType[Object.prototype.toString.call(obj)] || "object";
    };
    var type$o = type$p;
    var unpack$B = function(args, keyOrder) {
      if (keyOrder === void 0)
        keyOrder = null;
      if (args.length >= 3) {
        return Array.prototype.slice.call(args);
      }
      if (type$o(args[0]) == "object" && keyOrder) {
        return keyOrder.split("").filter(function(k2) {
          return args[0][k2] !== void 0;
        }).map(function(k2) {
          return args[0][k2];
        });
      }
      return args[0];
    };
    var type$n = type$p;
    var last$4 = function(args) {
      if (args.length < 2) {
        return null;
      }
      var l = args.length - 1;
      if (type$n(args[l]) == "string") {
        return args[l].toLowerCase();
      }
      return null;
    };
    var PI$2 = Math.PI;
    var utils = {
      clip_rgb: clip_rgb$3,
      limit: limit$2,
      type: type$p,
      unpack: unpack$B,
      last: last$4,
      PI: PI$2,
      TWOPI: PI$2 * 2,
      PITHIRD: PI$2 / 3,
      DEG2RAD: PI$2 / 180,
      RAD2DEG: 180 / PI$2
    };
    var input$h = {
      format: {},
      autodetect: []
    };
    var last$3 = utils.last;
    var clip_rgb$2 = utils.clip_rgb;
    var type$m = utils.type;
    var _input = input$h;
    var Color$D = function Color2() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var me = this;
      if (type$m(args[0]) === "object" && args[0].constructor && args[0].constructor === this.constructor) {
        return args[0];
      }
      var mode = last$3(args);
      var autodetect = false;
      if (!mode) {
        autodetect = true;
        if (!_input.sorted) {
          _input.autodetect = _input.autodetect.sort(function(a2, b2) {
            return b2.p - a2.p;
          });
          _input.sorted = true;
        }
        for (var i3 = 0, list2 = _input.autodetect; i3 < list2.length; i3 += 1) {
          var chk = list2[i3];
          mode = chk.test.apply(chk, args);
          if (mode) {
            break;
          }
        }
      }
      if (_input.format[mode]) {
        var rgb2 = _input.format[mode].apply(null, autodetect ? args : args.slice(0, -1));
        me._rgb = clip_rgb$2(rgb2);
      } else {
        throw new Error("unknown format: " + args);
      }
      if (me._rgb.length === 3) {
        me._rgb.push(1);
      }
    };
    Color$D.prototype.toString = function toString() {
      if (type$m(this.hex) == "function") {
        return this.hex();
      }
      return "[" + this._rgb.join(",") + "]";
    };
    var Color_1 = Color$D;
    var chroma$k = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(chroma$k.Color, [null].concat(args)))();
    };
    chroma$k.Color = Color_1;
    chroma$k.version = "2.4.2";
    var chroma_1 = chroma$k;
    var unpack$A = utils.unpack;
    var max$2 = Math.max;
    var rgb2cmyk$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$A(args, "rgb");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      r2 = r2 / 255;
      g2 = g2 / 255;
      b2 = b2 / 255;
      var k2 = 1 - max$2(r2, max$2(g2, b2));
      var f2 = k2 < 1 ? 1 / (1 - k2) : 0;
      var c2 = (1 - r2 - k2) * f2;
      var m2 = (1 - g2 - k2) * f2;
      var y2 = (1 - b2 - k2) * f2;
      return [c2, m2, y2, k2];
    };
    var rgb2cmyk_1 = rgb2cmyk$1;
    var unpack$z = utils.unpack;
    var cmyk2rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$z(args, "cmyk");
      var c2 = args[0];
      var m2 = args[1];
      var y2 = args[2];
      var k2 = args[3];
      var alpha = args.length > 4 ? args[4] : 1;
      if (k2 === 1) {
        return [0, 0, 0, alpha];
      }
      return [
        c2 >= 1 ? 0 : 255 * (1 - c2) * (1 - k2),
        m2 >= 1 ? 0 : 255 * (1 - m2) * (1 - k2),
        y2 >= 1 ? 0 : 255 * (1 - y2) * (1 - k2),
        alpha
      ];
    };
    var cmyk2rgb_1 = cmyk2rgb;
    var chroma$j = chroma_1;
    var Color$C = Color_1;
    var input$g = input$h;
    var unpack$y = utils.unpack;
    var type$l = utils.type;
    var rgb2cmyk = rgb2cmyk_1;
    Color$C.prototype.cmyk = function() {
      return rgb2cmyk(this._rgb);
    };
    chroma$j.cmyk = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$C, [null].concat(args, ["cmyk"])))();
    };
    input$g.format.cmyk = cmyk2rgb_1;
    input$g.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$y(args, "cmyk");
        if (type$l(args) === "array" && args.length === 4) {
          return "cmyk";
        }
      }
    });
    var unpack$x = utils.unpack;
    var last$2 = utils.last;
    var rnd = function(a2) {
      return Math.round(a2 * 100) / 100;
    };
    var hsl2css$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var hsla = unpack$x(args, "hsla");
      var mode = last$2(args) || "lsa";
      hsla[0] = rnd(hsla[0] || 0);
      hsla[1] = rnd(hsla[1] * 100) + "%";
      hsla[2] = rnd(hsla[2] * 100) + "%";
      if (mode === "hsla" || hsla.length > 3 && hsla[3] < 1) {
        hsla[3] = hsla.length > 3 ? hsla[3] : 1;
        mode = "hsla";
      } else {
        hsla.length = 3;
      }
      return mode + "(" + hsla.join(",") + ")";
    };
    var hsl2css_1 = hsl2css$1;
    var unpack$w = utils.unpack;
    var rgb2hsl$3 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$w(args, "rgba");
      var r2 = args[0];
      var g2 = args[1];
      var b2 = args[2];
      r2 /= 255;
      g2 /= 255;
      b2 /= 255;
      var min2 = Math.min(r2, g2, b2);
      var max2 = Math.max(r2, g2, b2);
      var l = (max2 + min2) / 2;
      var s2, h2;
      if (max2 === min2) {
        s2 = 0;
        h2 = Number.NaN;
      } else {
        s2 = l < 0.5 ? (max2 - min2) / (max2 + min2) : (max2 - min2) / (2 - max2 - min2);
      }
      if (r2 == max2) {
        h2 = (g2 - b2) / (max2 - min2);
      } else if (g2 == max2) {
        h2 = 2 + (b2 - r2) / (max2 - min2);
      } else if (b2 == max2) {
        h2 = 4 + (r2 - g2) / (max2 - min2);
      }
      h2 *= 60;
      if (h2 < 0) {
        h2 += 360;
      }
      if (args.length > 3 && args[3] !== void 0) {
        return [h2, s2, l, args[3]];
      }
      return [h2, s2, l];
    };
    var rgb2hsl_1 = rgb2hsl$3;
    var unpack$v = utils.unpack;
    var last$1 = utils.last;
    var hsl2css = hsl2css_1;
    var rgb2hsl$2 = rgb2hsl_1;
    var round$6 = Math.round;
    var rgb2css$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var rgba = unpack$v(args, "rgba");
      var mode = last$1(args) || "rgb";
      if (mode.substr(0, 3) == "hsl") {
        return hsl2css(rgb2hsl$2(rgba), mode);
      }
      rgba[0] = round$6(rgba[0]);
      rgba[1] = round$6(rgba[1]);
      rgba[2] = round$6(rgba[2]);
      if (mode === "rgba" || rgba.length > 3 && rgba[3] < 1) {
        rgba[3] = rgba.length > 3 ? rgba[3] : 1;
        mode = "rgba";
      }
      return mode + "(" + rgba.slice(0, mode === "rgb" ? 3 : 4).join(",") + ")";
    };
    var rgb2css_1 = rgb2css$1;
    var unpack$u = utils.unpack;
    var round$5 = Math.round;
    var hsl2rgb$1 = function() {
      var assign;
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$u(args, "hsl");
      var h2 = args[0];
      var s2 = args[1];
      var l = args[2];
      var r2, g2, b2;
      if (s2 === 0) {
        r2 = g2 = b2 = l * 255;
      } else {
        var t3 = [0, 0, 0];
        var c2 = [0, 0, 0];
        var t2 = l < 0.5 ? l * (1 + s2) : l + s2 - l * s2;
        var t1 = 2 * l - t2;
        var h_ = h2 / 360;
        t3[0] = h_ + 1 / 3;
        t3[1] = h_;
        t3[2] = h_ - 1 / 3;
        for (var i3 = 0; i3 < 3; i3++) {
          if (t3[i3] < 0) {
            t3[i3] += 1;
          }
          if (t3[i3] > 1) {
            t3[i3] -= 1;
          }
          if (6 * t3[i3] < 1) {
            c2[i3] = t1 + (t2 - t1) * 6 * t3[i3];
          } else if (2 * t3[i3] < 1) {
            c2[i3] = t2;
          } else if (3 * t3[i3] < 2) {
            c2[i3] = t1 + (t2 - t1) * (2 / 3 - t3[i3]) * 6;
          } else {
            c2[i3] = t1;
          }
        }
        assign = [round$5(c2[0] * 255), round$5(c2[1] * 255), round$5(c2[2] * 255)], r2 = assign[0], g2 = assign[1], b2 = assign[2];
      }
      if (args.length > 3) {
        return [r2, g2, b2, args[3]];
      }
      return [r2, g2, b2, 1];
    };
    var hsl2rgb_1 = hsl2rgb$1;
    var hsl2rgb = hsl2rgb_1;
    var input$f = input$h;
    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var round$4 = Math.round;
    var css2rgb$1 = function(css) {
      css = css.toLowerCase().trim();
      var m2;
      if (input$f.format.named) {
        try {
          return input$f.format.named(css);
        } catch (e2) {
        }
      }
      if (m2 = css.match(RE_RGB)) {
        var rgb2 = m2.slice(1, 4);
        for (var i3 = 0; i3 < 3; i3++) {
          rgb2[i3] = +rgb2[i3];
        }
        rgb2[3] = 1;
        return rgb2;
      }
      if (m2 = css.match(RE_RGBA)) {
        var rgb$1 = m2.slice(1, 5);
        for (var i$12 = 0; i$12 < 4; i$12++) {
          rgb$1[i$12] = +rgb$1[i$12];
        }
        return rgb$1;
      }
      if (m2 = css.match(RE_RGB_PCT)) {
        var rgb$2 = m2.slice(1, 4);
        for (var i$2 = 0; i$2 < 3; i$2++) {
          rgb$2[i$2] = round$4(rgb$2[i$2] * 2.55);
        }
        rgb$2[3] = 1;
        return rgb$2;
      }
      if (m2 = css.match(RE_RGBA_PCT)) {
        var rgb$3 = m2.slice(1, 5);
        for (var i$3 = 0; i$3 < 3; i$3++) {
          rgb$3[i$3] = round$4(rgb$3[i$3] * 2.55);
        }
        rgb$3[3] = +rgb$3[3];
        return rgb$3;
      }
      if (m2 = css.match(RE_HSL)) {
        var hsl2 = m2.slice(1, 4);
        hsl2[1] *= 0.01;
        hsl2[2] *= 0.01;
        var rgb$4 = hsl2rgb(hsl2);
        rgb$4[3] = 1;
        return rgb$4;
      }
      if (m2 = css.match(RE_HSLA)) {
        var hsl$1 = m2.slice(1, 4);
        hsl$1[1] *= 0.01;
        hsl$1[2] *= 0.01;
        var rgb$5 = hsl2rgb(hsl$1);
        rgb$5[3] = +m2[4];
        return rgb$5;
      }
    };
    css2rgb$1.test = function(s2) {
      return RE_RGB.test(s2) || RE_RGBA.test(s2) || RE_RGB_PCT.test(s2) || RE_RGBA_PCT.test(s2) || RE_HSL.test(s2) || RE_HSLA.test(s2);
    };
    var css2rgb_1 = css2rgb$1;
    var chroma$i = chroma_1;
    var Color$B = Color_1;
    var input$e = input$h;
    var type$k = utils.type;
    var rgb2css = rgb2css_1;
    var css2rgb = css2rgb_1;
    Color$B.prototype.css = function(mode) {
      return rgb2css(this._rgb, mode);
    };
    chroma$i.css = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$B, [null].concat(args, ["css"])))();
    };
    input$e.format.css = css2rgb;
    input$e.autodetect.push({
      p: 5,
      test: function(h2) {
        var rest = [], len = arguments.length - 1;
        while (len-- > 0)
          rest[len] = arguments[len + 1];
        if (!rest.length && type$k(h2) === "string" && css2rgb.test(h2)) {
          return "css";
        }
      }
    });
    var Color$A = Color_1;
    var chroma$h = chroma_1;
    var input$d = input$h;
    var unpack$t = utils.unpack;
    input$d.format.gl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var rgb2 = unpack$t(args, "rgba");
      rgb2[0] *= 255;
      rgb2[1] *= 255;
      rgb2[2] *= 255;
      return rgb2;
    };
    chroma$h.gl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$A, [null].concat(args, ["gl"])))();
    };
    Color$A.prototype.gl = function() {
      var rgb2 = this._rgb;
      return [rgb2[0] / 255, rgb2[1] / 255, rgb2[2] / 255, rgb2[3]];
    };
    var unpack$s = utils.unpack;
    var rgb2hcg$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$s(args, "rgb");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      var min2 = Math.min(r2, g2, b2);
      var max2 = Math.max(r2, g2, b2);
      var delta = max2 - min2;
      var c2 = delta * 100 / 255;
      var _g = min2 / (255 - delta) * 100;
      var h2;
      if (delta === 0) {
        h2 = Number.NaN;
      } else {
        if (r2 === max2) {
          h2 = (g2 - b2) / delta;
        }
        if (g2 === max2) {
          h2 = 2 + (b2 - r2) / delta;
        }
        if (b2 === max2) {
          h2 = 4 + (r2 - g2) / delta;
        }
        h2 *= 60;
        if (h2 < 0) {
          h2 += 360;
        }
      }
      return [h2, c2, _g];
    };
    var rgb2hcg_1 = rgb2hcg$1;
    var unpack$r = utils.unpack;
    var floor$3 = Math.floor;
    var hcg2rgb = function() {
      var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$r(args, "hcg");
      var h2 = args[0];
      var c2 = args[1];
      var _g = args[2];
      var r2, g2, b2;
      _g = _g * 255;
      var _c = c2 * 255;
      if (c2 === 0) {
        r2 = g2 = b2 = _g;
      } else {
        if (h2 === 360) {
          h2 = 0;
        }
        if (h2 > 360) {
          h2 -= 360;
        }
        if (h2 < 0) {
          h2 += 360;
        }
        h2 /= 60;
        var i3 = floor$3(h2);
        var f2 = h2 - i3;
        var p = _g * (1 - c2);
        var q = p + _c * (1 - f2);
        var t2 = p + _c * f2;
        var v2 = p + _c;
        switch (i3) {
          case 0:
            assign = [v2, t2, p], r2 = assign[0], g2 = assign[1], b2 = assign[2];
            break;
          case 1:
            assign$1 = [q, v2, p], r2 = assign$1[0], g2 = assign$1[1], b2 = assign$1[2];
            break;
          case 2:
            assign$2 = [p, v2, t2], r2 = assign$2[0], g2 = assign$2[1], b2 = assign$2[2];
            break;
          case 3:
            assign$3 = [p, q, v2], r2 = assign$3[0], g2 = assign$3[1], b2 = assign$3[2];
            break;
          case 4:
            assign$4 = [t2, p, v2], r2 = assign$4[0], g2 = assign$4[1], b2 = assign$4[2];
            break;
          case 5:
            assign$5 = [v2, p, q], r2 = assign$5[0], g2 = assign$5[1], b2 = assign$5[2];
            break;
        }
      }
      return [r2, g2, b2, args.length > 3 ? args[3] : 1];
    };
    var hcg2rgb_1 = hcg2rgb;
    var unpack$q = utils.unpack;
    var type$j = utils.type;
    var chroma$g = chroma_1;
    var Color$z = Color_1;
    var input$c = input$h;
    var rgb2hcg = rgb2hcg_1;
    Color$z.prototype.hcg = function() {
      return rgb2hcg(this._rgb);
    };
    chroma$g.hcg = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$z, [null].concat(args, ["hcg"])))();
    };
    input$c.format.hcg = hcg2rgb_1;
    input$c.autodetect.push({
      p: 1,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$q(args, "hcg");
        if (type$j(args) === "array" && args.length === 3) {
          return "hcg";
        }
      }
    });
    var unpack$p = utils.unpack;
    var last = utils.last;
    var round$3 = Math.round;
    var rgb2hex$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$p(args, "rgba");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      var a2 = ref[3];
      var mode = last(args) || "auto";
      if (a2 === void 0) {
        a2 = 1;
      }
      if (mode === "auto") {
        mode = a2 < 1 ? "rgba" : "rgb";
      }
      r2 = round$3(r2);
      g2 = round$3(g2);
      b2 = round$3(b2);
      var u2 = r2 << 16 | g2 << 8 | b2;
      var str = "000000" + u2.toString(16);
      str = str.substr(str.length - 6);
      var hxa = "0" + round$3(a2 * 255).toString(16);
      hxa = hxa.substr(hxa.length - 2);
      switch (mode.toLowerCase()) {
        case "rgba":
          return "#" + str + hxa;
        case "argb":
          return "#" + hxa + str;
        default:
          return "#" + str;
      }
    };
    var rgb2hex_1 = rgb2hex$2;
    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;
    var hex2rgb$1 = function(hex) {
      if (hex.match(RE_HEX)) {
        if (hex.length === 4 || hex.length === 7) {
          hex = hex.substr(1);
        }
        if (hex.length === 3) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        var u2 = parseInt(hex, 16);
        var r2 = u2 >> 16;
        var g2 = u2 >> 8 & 255;
        var b2 = u2 & 255;
        return [r2, g2, b2, 1];
      }
      if (hex.match(RE_HEXA)) {
        if (hex.length === 5 || hex.length === 9) {
          hex = hex.substr(1);
        }
        if (hex.length === 4) {
          hex = hex.split("");
          hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        var u$1 = parseInt(hex, 16);
        var r$1 = u$1 >> 24 & 255;
        var g$1 = u$1 >> 16 & 255;
        var b$1 = u$1 >> 8 & 255;
        var a2 = Math.round((u$1 & 255) / 255 * 100) / 100;
        return [r$1, g$1, b$1, a2];
      }
      throw new Error("unknown hex color: " + hex);
    };
    var hex2rgb_1 = hex2rgb$1;
    var chroma$f = chroma_1;
    var Color$y = Color_1;
    var type$i = utils.type;
    var input$b = input$h;
    var rgb2hex$1 = rgb2hex_1;
    Color$y.prototype.hex = function(mode) {
      return rgb2hex$1(this._rgb, mode);
    };
    chroma$f.hex = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$y, [null].concat(args, ["hex"])))();
    };
    input$b.format.hex = hex2rgb_1;
    input$b.autodetect.push({
      p: 4,
      test: function(h2) {
        var rest = [], len = arguments.length - 1;
        while (len-- > 0)
          rest[len] = arguments[len + 1];
        if (!rest.length && type$i(h2) === "string" && [3, 4, 5, 6, 7, 8, 9].indexOf(h2.length) >= 0) {
          return "hex";
        }
      }
    });
    var unpack$o = utils.unpack;
    var TWOPI$2 = utils.TWOPI;
    var min$2 = Math.min;
    var sqrt$4 = Math.sqrt;
    var acos = Math.acos;
    var rgb2hsi$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$o(args, "rgb");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      r2 /= 255;
      g2 /= 255;
      b2 /= 255;
      var h2;
      var min_ = min$2(r2, g2, b2);
      var i3 = (r2 + g2 + b2) / 3;
      var s2 = i3 > 0 ? 1 - min_ / i3 : 0;
      if (s2 === 0) {
        h2 = NaN;
      } else {
        h2 = (r2 - g2 + (r2 - b2)) / 2;
        h2 /= sqrt$4((r2 - g2) * (r2 - g2) + (r2 - b2) * (g2 - b2));
        h2 = acos(h2);
        if (b2 > g2) {
          h2 = TWOPI$2 - h2;
        }
        h2 /= TWOPI$2;
      }
      return [h2 * 360, s2, i3];
    };
    var rgb2hsi_1 = rgb2hsi$1;
    var unpack$n = utils.unpack;
    var limit = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos$4 = Math.cos;
    var hsi2rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$n(args, "hsi");
      var h2 = args[0];
      var s2 = args[1];
      var i3 = args[2];
      var r2, g2, b2;
      if (isNaN(h2)) {
        h2 = 0;
      }
      if (isNaN(s2)) {
        s2 = 0;
      }
      if (h2 > 360) {
        h2 -= 360;
      }
      if (h2 < 0) {
        h2 += 360;
      }
      h2 /= 360;
      if (h2 < 1 / 3) {
        b2 = (1 - s2) / 3;
        r2 = (1 + s2 * cos$4(TWOPI$1 * h2) / cos$4(PITHIRD - TWOPI$1 * h2)) / 3;
        g2 = 1 - (b2 + r2);
      } else if (h2 < 2 / 3) {
        h2 -= 1 / 3;
        r2 = (1 - s2) / 3;
        g2 = (1 + s2 * cos$4(TWOPI$1 * h2) / cos$4(PITHIRD - TWOPI$1 * h2)) / 3;
        b2 = 1 - (r2 + g2);
      } else {
        h2 -= 2 / 3;
        g2 = (1 - s2) / 3;
        b2 = (1 + s2 * cos$4(TWOPI$1 * h2) / cos$4(PITHIRD - TWOPI$1 * h2)) / 3;
        r2 = 1 - (g2 + b2);
      }
      r2 = limit(i3 * r2 * 3);
      g2 = limit(i3 * g2 * 3);
      b2 = limit(i3 * b2 * 3);
      return [r2 * 255, g2 * 255, b2 * 255, args.length > 3 ? args[3] : 1];
    };
    var hsi2rgb_1 = hsi2rgb;
    var unpack$m = utils.unpack;
    var type$h = utils.type;
    var chroma$e = chroma_1;
    var Color$x = Color_1;
    var input$a = input$h;
    var rgb2hsi = rgb2hsi_1;
    Color$x.prototype.hsi = function() {
      return rgb2hsi(this._rgb);
    };
    chroma$e.hsi = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$x, [null].concat(args, ["hsi"])))();
    };
    input$a.format.hsi = hsi2rgb_1;
    input$a.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$m(args, "hsi");
        if (type$h(args) === "array" && args.length === 3) {
          return "hsi";
        }
      }
    });
    var unpack$l = utils.unpack;
    var type$g = utils.type;
    var chroma$d = chroma_1;
    var Color$w = Color_1;
    var input$9 = input$h;
    var rgb2hsl$1 = rgb2hsl_1;
    Color$w.prototype.hsl = function() {
      return rgb2hsl$1(this._rgb);
    };
    chroma$d.hsl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$w, [null].concat(args, ["hsl"])))();
    };
    input$9.format.hsl = hsl2rgb_1;
    input$9.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$l(args, "hsl");
        if (type$g(args) === "array" && args.length === 3) {
          return "hsl";
        }
      }
    });
    var unpack$k = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;
    var rgb2hsl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$k(args, "rgb");
      var r2 = args[0];
      var g2 = args[1];
      var b2 = args[2];
      var min_ = min$1(r2, g2, b2);
      var max_ = max$1(r2, g2, b2);
      var delta = max_ - min_;
      var h2, s2, v2;
      v2 = max_ / 255;
      if (max_ === 0) {
        h2 = Number.NaN;
        s2 = 0;
      } else {
        s2 = delta / max_;
        if (r2 === max_) {
          h2 = (g2 - b2) / delta;
        }
        if (g2 === max_) {
          h2 = 2 + (b2 - r2) / delta;
        }
        if (b2 === max_) {
          h2 = 4 + (r2 - g2) / delta;
        }
        h2 *= 60;
        if (h2 < 0) {
          h2 += 360;
        }
      }
      return [h2, s2, v2];
    };
    var rgb2hsv$1 = rgb2hsl;
    var unpack$j = utils.unpack;
    var floor$2 = Math.floor;
    var hsv2rgb = function() {
      var assign, assign$1, assign$2, assign$3, assign$4, assign$5;
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$j(args, "hsv");
      var h2 = args[0];
      var s2 = args[1];
      var v2 = args[2];
      var r2, g2, b2;
      v2 *= 255;
      if (s2 === 0) {
        r2 = g2 = b2 = v2;
      } else {
        if (h2 === 360) {
          h2 = 0;
        }
        if (h2 > 360) {
          h2 -= 360;
        }
        if (h2 < 0) {
          h2 += 360;
        }
        h2 /= 60;
        var i3 = floor$2(h2);
        var f2 = h2 - i3;
        var p = v2 * (1 - s2);
        var q = v2 * (1 - s2 * f2);
        var t2 = v2 * (1 - s2 * (1 - f2));
        switch (i3) {
          case 0:
            assign = [v2, t2, p], r2 = assign[0], g2 = assign[1], b2 = assign[2];
            break;
          case 1:
            assign$1 = [q, v2, p], r2 = assign$1[0], g2 = assign$1[1], b2 = assign$1[2];
            break;
          case 2:
            assign$2 = [p, v2, t2], r2 = assign$2[0], g2 = assign$2[1], b2 = assign$2[2];
            break;
          case 3:
            assign$3 = [p, q, v2], r2 = assign$3[0], g2 = assign$3[1], b2 = assign$3[2];
            break;
          case 4:
            assign$4 = [t2, p, v2], r2 = assign$4[0], g2 = assign$4[1], b2 = assign$4[2];
            break;
          case 5:
            assign$5 = [v2, p, q], r2 = assign$5[0], g2 = assign$5[1], b2 = assign$5[2];
            break;
        }
      }
      return [r2, g2, b2, args.length > 3 ? args[3] : 1];
    };
    var hsv2rgb_1 = hsv2rgb;
    var unpack$i = utils.unpack;
    var type$f = utils.type;
    var chroma$c = chroma_1;
    var Color$v = Color_1;
    var input$8 = input$h;
    var rgb2hsv = rgb2hsv$1;
    Color$v.prototype.hsv = function() {
      return rgb2hsv(this._rgb);
    };
    chroma$c.hsv = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$v, [null].concat(args, ["hsv"])))();
    };
    input$8.format.hsv = hsv2rgb_1;
    input$8.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$i(args, "hsv");
        if (type$f(args) === "array" && args.length === 3) {
          return "hsv";
        }
      }
    });
    var labConstants = {
      Kn: 18,
      Xn: 0.95047,
      Yn: 1,
      Zn: 1.08883,
      t0: 0.137931034,
      t1: 0.206896552,
      t2: 0.12841855,
      t3: 8856452e-9
    };
    var LAB_CONSTANTS$3 = labConstants;
    var unpack$h = utils.unpack;
    var pow$a = Math.pow;
    var rgb2lab$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$h(args, "rgb");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      var ref$1 = rgb2xyz(r2, g2, b2);
      var x2 = ref$1[0];
      var y2 = ref$1[1];
      var z2 = ref$1[2];
      var l = 116 * y2 - 16;
      return [l < 0 ? 0 : l, 500 * (x2 - y2), 200 * (y2 - z2)];
    };
    var rgb_xyz = function(r2) {
      if ((r2 /= 255) <= 0.04045) {
        return r2 / 12.92;
      }
      return pow$a((r2 + 0.055) / 1.055, 2.4);
    };
    var xyz_lab = function(t2) {
      if (t2 > LAB_CONSTANTS$3.t3) {
        return pow$a(t2, 1 / 3);
      }
      return t2 / LAB_CONSTANTS$3.t2 + LAB_CONSTANTS$3.t0;
    };
    var rgb2xyz = function(r2, g2, b2) {
      r2 = rgb_xyz(r2);
      g2 = rgb_xyz(g2);
      b2 = rgb_xyz(b2);
      var x2 = xyz_lab((0.4124564 * r2 + 0.3575761 * g2 + 0.1804375 * b2) / LAB_CONSTANTS$3.Xn);
      var y2 = xyz_lab((0.2126729 * r2 + 0.7151522 * g2 + 0.072175 * b2) / LAB_CONSTANTS$3.Yn);
      var z2 = xyz_lab((0.0193339 * r2 + 0.119192 * g2 + 0.9503041 * b2) / LAB_CONSTANTS$3.Zn);
      return [x2, y2, z2];
    };
    var rgb2lab_1 = rgb2lab$2;
    var LAB_CONSTANTS$2 = labConstants;
    var unpack$g = utils.unpack;
    var pow$9 = Math.pow;
    var lab2rgb$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$g(args, "lab");
      var l = args[0];
      var a2 = args[1];
      var b2 = args[2];
      var x2, y2, z2, r2, g2, b_;
      y2 = (l + 16) / 116;
      x2 = isNaN(a2) ? y2 : y2 + a2 / 500;
      z2 = isNaN(b2) ? y2 : y2 - b2 / 200;
      y2 = LAB_CONSTANTS$2.Yn * lab_xyz(y2);
      x2 = LAB_CONSTANTS$2.Xn * lab_xyz(x2);
      z2 = LAB_CONSTANTS$2.Zn * lab_xyz(z2);
      r2 = xyz_rgb(3.2404542 * x2 - 1.5371385 * y2 - 0.4985314 * z2);
      g2 = xyz_rgb(-0.969266 * x2 + 1.8760108 * y2 + 0.041556 * z2);
      b_ = xyz_rgb(0.0556434 * x2 - 0.2040259 * y2 + 1.0572252 * z2);
      return [r2, g2, b_, args.length > 3 ? args[3] : 1];
    };
    var xyz_rgb = function(r2) {
      return 255 * (r2 <= 304e-5 ? 12.92 * r2 : 1.055 * pow$9(r2, 1 / 2.4) - 0.055);
    };
    var lab_xyz = function(t2) {
      return t2 > LAB_CONSTANTS$2.t1 ? t2 * t2 * t2 : LAB_CONSTANTS$2.t2 * (t2 - LAB_CONSTANTS$2.t0);
    };
    var lab2rgb_1 = lab2rgb$1;
    var unpack$f = utils.unpack;
    var type$e = utils.type;
    var chroma$b = chroma_1;
    var Color$u = Color_1;
    var input$7 = input$h;
    var rgb2lab$1 = rgb2lab_1;
    Color$u.prototype.lab = function() {
      return rgb2lab$1(this._rgb);
    };
    chroma$b.lab = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$u, [null].concat(args, ["lab"])))();
    };
    input$7.format.lab = lab2rgb_1;
    input$7.autodetect.push({
      p: 2,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$f(args, "lab");
        if (type$e(args) === "array" && args.length === 3) {
          return "lab";
        }
      }
    });
    var unpack$e = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$3 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var round$2 = Math.round;
    var lab2lch$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$e(args, "lab");
      var l = ref[0];
      var a2 = ref[1];
      var b2 = ref[2];
      var c2 = sqrt$3(a2 * a2 + b2 * b2);
      var h2 = (atan2$2(b2, a2) * RAD2DEG + 360) % 360;
      if (round$2(c2 * 1e4) === 0) {
        h2 = Number.NaN;
      }
      return [l, c2, h2];
    };
    var lab2lch_1 = lab2lch$2;
    var unpack$d = utils.unpack;
    var rgb2lab = rgb2lab_1;
    var lab2lch$1 = lab2lch_1;
    var rgb2lch$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$d(args, "rgb");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      var ref$1 = rgb2lab(r2, g2, b2);
      var l = ref$1[0];
      var a2 = ref$1[1];
      var b_ = ref$1[2];
      return lab2lch$1(l, a2, b_);
    };
    var rgb2lch_1 = rgb2lch$1;
    var unpack$c = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin$3 = Math.sin;
    var cos$3 = Math.cos;
    var lch2lab$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$c(args, "lch");
      var l = ref[0];
      var c2 = ref[1];
      var h2 = ref[2];
      if (isNaN(h2)) {
        h2 = 0;
      }
      h2 = h2 * DEG2RAD;
      return [l, cos$3(h2) * c2, sin$3(h2) * c2];
    };
    var lch2lab_1 = lch2lab$2;
    var unpack$b = utils.unpack;
    var lch2lab$1 = lch2lab_1;
    var lab2rgb = lab2rgb_1;
    var lch2rgb$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$b(args, "lch");
      var l = args[0];
      var c2 = args[1];
      var h2 = args[2];
      var ref = lch2lab$1(l, c2, h2);
      var L2 = ref[0];
      var a2 = ref[1];
      var b_ = ref[2];
      var ref$1 = lab2rgb(L2, a2, b_);
      var r2 = ref$1[0];
      var g2 = ref$1[1];
      var b2 = ref$1[2];
      return [r2, g2, b2, args.length > 3 ? args[3] : 1];
    };
    var lch2rgb_1 = lch2rgb$1;
    var unpack$a = utils.unpack;
    var lch2rgb = lch2rgb_1;
    var hcl2rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var hcl = unpack$a(args, "hcl").reverse();
      return lch2rgb.apply(void 0, hcl);
    };
    var hcl2rgb_1 = hcl2rgb;
    var unpack$9 = utils.unpack;
    var type$d = utils.type;
    var chroma$a = chroma_1;
    var Color$t = Color_1;
    var input$6 = input$h;
    var rgb2lch = rgb2lch_1;
    Color$t.prototype.lch = function() {
      return rgb2lch(this._rgb);
    };
    Color$t.prototype.hcl = function() {
      return rgb2lch(this._rgb).reverse();
    };
    chroma$a.lch = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$t, [null].concat(args, ["lch"])))();
    };
    chroma$a.hcl = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$t, [null].concat(args, ["hcl"])))();
    };
    input$6.format.lch = lch2rgb_1;
    input$6.format.hcl = hcl2rgb_1;
    ["lch", "hcl"].forEach(function(m2) {
      return input$6.autodetect.push({
        p: 2,
        test: function() {
          var args = [], len = arguments.length;
          while (len--)
            args[len] = arguments[len];
          args = unpack$9(args, m2);
          if (type$d(args) === "array" && args.length === 3) {
            return m2;
          }
        }
      });
    });
    var w3cx11$1 = {
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aqua: "#00ffff",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      black: "#000000",
      blanchedalmond: "#ffebcd",
      blue: "#0000ff",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflower: "#6495ed",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      fuchsia: "#ff00ff",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      laserlemon: "#ffff54",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrod: "#fafad2",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      magenta: "#ff00ff",
      maroon: "#800000",
      maroon2: "#7f0000",
      maroon3: "#b03060",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      navy: "#000080",
      oldlace: "#fdf5e6",
      olive: "#808000",
      olivedrab: "#6b8e23",
      orange: "#ffa500",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      purple: "#800080",
      purple2: "#7f007f",
      purple3: "#a020f0",
      rebeccapurple: "#663399",
      red: "#ff0000",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      silver: "#c0c0c0",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      teal: "#008080",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      white: "#ffffff",
      whitesmoke: "#f5f5f5",
      yellow: "#ffff00",
      yellowgreen: "#9acd32"
    };
    var w3cx11_1 = w3cx11$1;
    var Color$s = Color_1;
    var input$5 = input$h;
    var type$c = utils.type;
    var w3cx11 = w3cx11_1;
    var hex2rgb = hex2rgb_1;
    var rgb2hex = rgb2hex_1;
    Color$s.prototype.name = function() {
      var hex = rgb2hex(this._rgb, "rgb");
      for (var i3 = 0, list2 = Object.keys(w3cx11); i3 < list2.length; i3 += 1) {
        var n2 = list2[i3];
        if (w3cx11[n2] === hex) {
          return n2.toLowerCase();
        }
      }
      return hex;
    };
    input$5.format.named = function(name2) {
      name2 = name2.toLowerCase();
      if (w3cx11[name2]) {
        return hex2rgb(w3cx11[name2]);
      }
      throw new Error("unknown color name: " + name2);
    };
    input$5.autodetect.push({
      p: 5,
      test: function(h2) {
        var rest = [], len = arguments.length - 1;
        while (len-- > 0)
          rest[len] = arguments[len + 1];
        if (!rest.length && type$c(h2) === "string" && w3cx11[h2.toLowerCase()]) {
          return "named";
        }
      }
    });
    var unpack$8 = utils.unpack;
    var rgb2num$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$8(args, "rgb");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      return (r2 << 16) + (g2 << 8) + b2;
    };
    var rgb2num_1 = rgb2num$1;
    var type$b = utils.type;
    var num2rgb = function(num2) {
      if (type$b(num2) == "number" && num2 >= 0 && num2 <= 16777215) {
        var r2 = num2 >> 16;
        var g2 = num2 >> 8 & 255;
        var b2 = num2 & 255;
        return [r2, g2, b2, 1];
      }
      throw new Error("unknown num color: " + num2);
    };
    var num2rgb_1 = num2rgb;
    var chroma$9 = chroma_1;
    var Color$r = Color_1;
    var input$4 = input$h;
    var type$a = utils.type;
    var rgb2num = rgb2num_1;
    Color$r.prototype.num = function() {
      return rgb2num(this._rgb);
    };
    chroma$9.num = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$r, [null].concat(args, ["num"])))();
    };
    input$4.format.num = num2rgb_1;
    input$4.autodetect.push({
      p: 5,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        if (args.length === 1 && type$a(args[0]) === "number" && args[0] >= 0 && args[0] <= 16777215) {
          return "num";
        }
      }
    });
    var chroma$8 = chroma_1;
    var Color$q = Color_1;
    var input$3 = input$h;
    var unpack$7 = utils.unpack;
    var type$9 = utils.type;
    var round$1 = Math.round;
    Color$q.prototype.rgb = function(rnd2) {
      if (rnd2 === void 0)
        rnd2 = true;
      if (rnd2 === false) {
        return this._rgb.slice(0, 3);
      }
      return this._rgb.slice(0, 3).map(round$1);
    };
    Color$q.prototype.rgba = function(rnd2) {
      if (rnd2 === void 0)
        rnd2 = true;
      return this._rgb.slice(0, 4).map(function(v2, i3) {
        return i3 < 3 ? rnd2 === false ? v2 : round$1(v2) : v2;
      });
    };
    chroma$8.rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$q, [null].concat(args, ["rgb"])))();
    };
    input$3.format.rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var rgba = unpack$7(args, "rgba");
      if (rgba[3] === void 0) {
        rgba[3] = 1;
      }
      return rgba;
    };
    input$3.autodetect.push({
      p: 3,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$7(args, "rgba");
        if (type$9(args) === "array" && (args.length === 3 || args.length === 4 && type$9(args[3]) == "number" && args[3] >= 0 && args[3] <= 1)) {
          return "rgb";
        }
      }
    });
    var log$1 = Math.log;
    var temperature2rgb$1 = function(kelvin) {
      var temp = kelvin / 100;
      var r2, g2, b2;
      if (temp < 66) {
        r2 = 255;
        g2 = temp < 6 ? 0 : -155.25485562709179 - 0.44596950469579133 * (g2 = temp - 2) + 104.49216199393888 * log$1(g2);
        b2 = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b2 = temp - 10) + 115.67994401066147 * log$1(b2);
      } else {
        r2 = 351.97690566805693 + 0.114206453784165 * (r2 = temp - 55) - 40.25366309332127 * log$1(r2);
        g2 = 325.4494125711974 + 0.07943456536662342 * (g2 = temp - 50) - 28.0852963507957 * log$1(g2);
        b2 = 255;
      }
      return [r2, g2, b2, 1];
    };
    var temperature2rgb_1 = temperature2rgb$1;
    var temperature2rgb = temperature2rgb_1;
    var unpack$6 = utils.unpack;
    var round2 = Math.round;
    var rgb2temperature$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var rgb2 = unpack$6(args, "rgb");
      var r2 = rgb2[0], b2 = rgb2[2];
      var minTemp = 1e3;
      var maxTemp = 4e4;
      var eps = 0.4;
      var temp;
      while (maxTemp - minTemp > eps) {
        temp = (maxTemp + minTemp) * 0.5;
        var rgb$1 = temperature2rgb(temp);
        if (rgb$1[2] / rgb$1[0] >= b2 / r2) {
          maxTemp = temp;
        } else {
          minTemp = temp;
        }
      }
      return round2(temp);
    };
    var rgb2temperature_1 = rgb2temperature$1;
    var chroma$7 = chroma_1;
    var Color$p = Color_1;
    var input$2 = input$h;
    var rgb2temperature = rgb2temperature_1;
    Color$p.prototype.temp = Color$p.prototype.kelvin = Color$p.prototype.temperature = function() {
      return rgb2temperature(this._rgb);
    };
    chroma$7.temp = chroma$7.kelvin = chroma$7.temperature = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$p, [null].concat(args, ["temp"])))();
    };
    input$2.format.temp = input$2.format.kelvin = input$2.format.temperature = temperature2rgb_1;
    var unpack$5 = utils.unpack;
    var cbrt = Math.cbrt;
    var pow$8 = Math.pow;
    var sign$1 = Math.sign;
    var rgb2oklab$2 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$5(args, "rgb");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      var ref$1 = [rgb2lrgb(r2 / 255), rgb2lrgb(g2 / 255), rgb2lrgb(b2 / 255)];
      var lr = ref$1[0];
      var lg = ref$1[1];
      var lb = ref$1[2];
      var l = cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
      var m2 = cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
      var s2 = cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
      return [
        0.2104542553 * l + 0.793617785 * m2 - 0.0040720468 * s2,
        1.9779984951 * l - 2.428592205 * m2 + 0.4505937099 * s2,
        0.0259040371 * l + 0.7827717662 * m2 - 0.808675766 * s2
      ];
    };
    var rgb2oklab_1 = rgb2oklab$2;
    function rgb2lrgb(c2) {
      var abs2 = Math.abs(c2);
      if (abs2 < 0.04045) {
        return c2 / 12.92;
      }
      return (sign$1(c2) || 1) * pow$8((abs2 + 0.055) / 1.055, 2.4);
    }
    var unpack$4 = utils.unpack;
    var pow$7 = Math.pow;
    var sign = Math.sign;
    var oklab2rgb$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$4(args, "lab");
      var L2 = args[0];
      var a2 = args[1];
      var b2 = args[2];
      var l = pow$7(L2 + 0.3963377774 * a2 + 0.2158037573 * b2, 3);
      var m2 = pow$7(L2 - 0.1055613458 * a2 - 0.0638541728 * b2, 3);
      var s2 = pow$7(L2 - 0.0894841775 * a2 - 1.291485548 * b2, 3);
      return [
        255 * lrgb2rgb(4.0767416621 * l - 3.3077115913 * m2 + 0.2309699292 * s2),
        255 * lrgb2rgb(-1.2684380046 * l + 2.6097574011 * m2 - 0.3413193965 * s2),
        255 * lrgb2rgb(-0.0041960863 * l - 0.7034186147 * m2 + 1.707614701 * s2),
        args.length > 3 ? args[3] : 1
      ];
    };
    var oklab2rgb_1 = oklab2rgb$1;
    function lrgb2rgb(c2) {
      var abs2 = Math.abs(c2);
      if (abs2 > 31308e-7) {
        return (sign(c2) || 1) * (1.055 * pow$7(abs2, 1 / 2.4) - 0.055);
      }
      return c2 * 12.92;
    }
    var unpack$3 = utils.unpack;
    var type$8 = utils.type;
    var chroma$6 = chroma_1;
    var Color$o = Color_1;
    var input$1 = input$h;
    var rgb2oklab$1 = rgb2oklab_1;
    Color$o.prototype.oklab = function() {
      return rgb2oklab$1(this._rgb);
    };
    chroma$6.oklab = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$o, [null].concat(args, ["oklab"])))();
    };
    input$1.format.oklab = oklab2rgb_1;
    input$1.autodetect.push({
      p: 3,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack$3(args, "oklab");
        if (type$8(args) === "array" && args.length === 3) {
          return "oklab";
        }
      }
    });
    var unpack$2 = utils.unpack;
    var rgb2oklab = rgb2oklab_1;
    var lab2lch = lab2lch_1;
    var rgb2oklch$1 = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var ref = unpack$2(args, "rgb");
      var r2 = ref[0];
      var g2 = ref[1];
      var b2 = ref[2];
      var ref$1 = rgb2oklab(r2, g2, b2);
      var l = ref$1[0];
      var a2 = ref$1[1];
      var b_ = ref$1[2];
      return lab2lch(l, a2, b_);
    };
    var rgb2oklch_1 = rgb2oklch$1;
    var unpack$1 = utils.unpack;
    var lch2lab = lch2lab_1;
    var oklab2rgb = oklab2rgb_1;
    var oklch2rgb = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      args = unpack$1(args, "lch");
      var l = args[0];
      var c2 = args[1];
      var h2 = args[2];
      var ref = lch2lab(l, c2, h2);
      var L2 = ref[0];
      var a2 = ref[1];
      var b_ = ref[2];
      var ref$1 = oklab2rgb(L2, a2, b_);
      var r2 = ref$1[0];
      var g2 = ref$1[1];
      var b2 = ref$1[2];
      return [r2, g2, b2, args.length > 3 ? args[3] : 1];
    };
    var oklch2rgb_1 = oklch2rgb;
    var unpack = utils.unpack;
    var type$7 = utils.type;
    var chroma$5 = chroma_1;
    var Color$n = Color_1;
    var input = input$h;
    var rgb2oklch = rgb2oklch_1;
    Color$n.prototype.oklch = function() {
      return rgb2oklch(this._rgb);
    };
    chroma$5.oklch = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      return new (Function.prototype.bind.apply(Color$n, [null].concat(args, ["oklch"])))();
    };
    input.format.oklch = oklch2rgb_1;
    input.autodetect.push({
      p: 3,
      test: function() {
        var args = [], len = arguments.length;
        while (len--)
          args[len] = arguments[len];
        args = unpack(args, "oklch");
        if (type$7(args) === "array" && args.length === 3) {
          return "oklch";
        }
      }
    });
    var Color$m = Color_1;
    var type$6 = utils.type;
    Color$m.prototype.alpha = function(a2, mutate) {
      if (mutate === void 0)
        mutate = false;
      if (a2 !== void 0 && type$6(a2) === "number") {
        if (mutate) {
          this._rgb[3] = a2;
          return this;
        }
        return new Color$m([this._rgb[0], this._rgb[1], this._rgb[2], a2], "rgb");
      }
      return this._rgb[3];
    };
    var Color$l = Color_1;
    Color$l.prototype.clipped = function() {
      return this._rgb._clipped || false;
    };
    var Color$k = Color_1;
    var LAB_CONSTANTS$1 = labConstants;
    Color$k.prototype.darken = function(amount) {
      if (amount === void 0)
        amount = 1;
      var me = this;
      var lab2 = me.lab();
      lab2[0] -= LAB_CONSTANTS$1.Kn * amount;
      return new Color$k(lab2, "lab").alpha(me.alpha(), true);
    };
    Color$k.prototype.brighten = function(amount) {
      if (amount === void 0)
        amount = 1;
      return this.darken(-amount);
    };
    Color$k.prototype.darker = Color$k.prototype.darken;
    Color$k.prototype.brighter = Color$k.prototype.brighten;
    var Color$j = Color_1;
    Color$j.prototype.get = function(mc) {
      var ref = mc.split(".");
      var mode = ref[0];
      var channel = ref[1];
      var src = this[mode]();
      if (channel) {
        var i3 = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
        if (i3 > -1) {
          return src[i3];
        }
        throw new Error("unknown channel " + channel + " in mode " + mode);
      } else {
        return src;
      }
    };
    var Color$i = Color_1;
    var type$5 = utils.type;
    var pow$6 = Math.pow;
    var EPS = 1e-7;
    var MAX_ITER = 20;
    Color$i.prototype.luminance = function(lum) {
      if (lum !== void 0 && type$5(lum) === "number") {
        if (lum === 0) {
          return new Color$i([0, 0, 0, this._rgb[3]], "rgb");
        }
        if (lum === 1) {
          return new Color$i([255, 255, 255, this._rgb[3]], "rgb");
        }
        var cur_lum = this.luminance();
        var mode = "rgb";
        var max_iter = MAX_ITER;
        var test = function(low, high) {
          var mid = low.interpolate(high, 0.5, mode);
          var lm = mid.luminance();
          if (Math.abs(lum - lm) < EPS || !max_iter--) {
            return mid;
          }
          return lm > lum ? test(low, mid) : test(mid, high);
        };
        var rgb2 = (cur_lum > lum ? test(new Color$i([0, 0, 0]), this) : test(this, new Color$i([255, 255, 255]))).rgb();
        return new Color$i(rgb2.concat([this._rgb[3]]));
      }
      return rgb2luminance.apply(void 0, this._rgb.slice(0, 3));
    };
    var rgb2luminance = function(r2, g2, b2) {
      r2 = luminance_x(r2);
      g2 = luminance_x(g2);
      b2 = luminance_x(b2);
      return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
    };
    var luminance_x = function(x2) {
      x2 /= 255;
      return x2 <= 0.03928 ? x2 / 12.92 : pow$6((x2 + 0.055) / 1.055, 2.4);
    };
    var interpolator$1 = {};
    var Color$h = Color_1;
    var type$4 = utils.type;
    var interpolator = interpolator$1;
    var mix$1 = function(col1, col2, f2) {
      if (f2 === void 0)
        f2 = 0.5;
      var rest = [], len = arguments.length - 3;
      while (len-- > 0)
        rest[len] = arguments[len + 3];
      var mode = rest[0] || "lrgb";
      if (!interpolator[mode] && !rest.length) {
        mode = Object.keys(interpolator)[0];
      }
      if (!interpolator[mode]) {
        throw new Error("interpolation mode " + mode + " is not defined");
      }
      if (type$4(col1) !== "object") {
        col1 = new Color$h(col1);
      }
      if (type$4(col2) !== "object") {
        col2 = new Color$h(col2);
      }
      return interpolator[mode](col1, col2, f2).alpha(col1.alpha() + f2 * (col2.alpha() - col1.alpha()));
    };
    var Color$g = Color_1;
    var mix = mix$1;
    Color$g.prototype.mix = Color$g.prototype.interpolate = function(col2, f2) {
      if (f2 === void 0)
        f2 = 0.5;
      var rest = [], len = arguments.length - 2;
      while (len-- > 0)
        rest[len] = arguments[len + 2];
      return mix.apply(void 0, [this, col2, f2].concat(rest));
    };
    var Color$f = Color_1;
    Color$f.prototype.premultiply = function(mutate) {
      if (mutate === void 0)
        mutate = false;
      var rgb2 = this._rgb;
      var a2 = rgb2[3];
      if (mutate) {
        this._rgb = [rgb2[0] * a2, rgb2[1] * a2, rgb2[2] * a2, a2];
        return this;
      } else {
        return new Color$f([rgb2[0] * a2, rgb2[1] * a2, rgb2[2] * a2, a2], "rgb");
      }
    };
    var Color$e = Color_1;
    var LAB_CONSTANTS = labConstants;
    Color$e.prototype.saturate = function(amount) {
      if (amount === void 0)
        amount = 1;
      var me = this;
      var lch2 = me.lch();
      lch2[1] += LAB_CONSTANTS.Kn * amount;
      if (lch2[1] < 0) {
        lch2[1] = 0;
      }
      return new Color$e(lch2, "lch").alpha(me.alpha(), true);
    };
    Color$e.prototype.desaturate = function(amount) {
      if (amount === void 0)
        amount = 1;
      return this.saturate(-amount);
    };
    var Color$d = Color_1;
    var type$3 = utils.type;
    Color$d.prototype.set = function(mc, value, mutate) {
      if (mutate === void 0)
        mutate = false;
      var ref = mc.split(".");
      var mode = ref[0];
      var channel = ref[1];
      var src = this[mode]();
      if (channel) {
        var i3 = mode.indexOf(channel) - (mode.substr(0, 2) === "ok" ? 2 : 0);
        if (i3 > -1) {
          if (type$3(value) == "string") {
            switch (value.charAt(0)) {
              case "+":
                src[i3] += +value;
                break;
              case "-":
                src[i3] += +value;
                break;
              case "*":
                src[i3] *= +value.substr(1);
                break;
              case "/":
                src[i3] /= +value.substr(1);
                break;
              default:
                src[i3] = +value;
            }
          } else if (type$3(value) === "number") {
            src[i3] = value;
          } else {
            throw new Error("unsupported value for Color.set");
          }
          var out = new Color$d(src, mode);
          if (mutate) {
            this._rgb = out._rgb;
            return this;
          }
          return out;
        }
        throw new Error("unknown channel " + channel + " in mode " + mode);
      } else {
        return src;
      }
    };
    var Color$c = Color_1;
    var rgb = function(col1, col2, f2) {
      var xyz0 = col1._rgb;
      var xyz1 = col2._rgb;
      return new Color$c(xyz0[0] + f2 * (xyz1[0] - xyz0[0]), xyz0[1] + f2 * (xyz1[1] - xyz0[1]), xyz0[2] + f2 * (xyz1[2] - xyz0[2]), "rgb");
    };
    interpolator$1.rgb = rgb;
    var Color$b = Color_1;
    var sqrt$2 = Math.sqrt;
    var pow$5 = Math.pow;
    var lrgb = function(col1, col2, f2) {
      var ref = col1._rgb;
      var x1 = ref[0];
      var y1 = ref[1];
      var z1 = ref[2];
      var ref$1 = col2._rgb;
      var x2 = ref$1[0];
      var y2 = ref$1[1];
      var z2 = ref$1[2];
      return new Color$b(sqrt$2(pow$5(x1, 2) * (1 - f2) + pow$5(x2, 2) * f2), sqrt$2(pow$5(y1, 2) * (1 - f2) + pow$5(y2, 2) * f2), sqrt$2(pow$5(z1, 2) * (1 - f2) + pow$5(z2, 2) * f2), "rgb");
    };
    interpolator$1.lrgb = lrgb;
    var Color$a = Color_1;
    var lab = function(col1, col2, f2) {
      var xyz0 = col1.lab();
      var xyz1 = col2.lab();
      return new Color$a(xyz0[0] + f2 * (xyz1[0] - xyz0[0]), xyz0[1] + f2 * (xyz1[1] - xyz0[1]), xyz0[2] + f2 * (xyz1[2] - xyz0[2]), "lab");
    };
    interpolator$1.lab = lab;
    var Color$9 = Color_1;
    var _hsx = function(col1, col2, f2, m2) {
      var assign, assign$1;
      var xyz0, xyz1;
      if (m2 === "hsl") {
        xyz0 = col1.hsl();
        xyz1 = col2.hsl();
      } else if (m2 === "hsv") {
        xyz0 = col1.hsv();
        xyz1 = col2.hsv();
      } else if (m2 === "hcg") {
        xyz0 = col1.hcg();
        xyz1 = col2.hcg();
      } else if (m2 === "hsi") {
        xyz0 = col1.hsi();
        xyz1 = col2.hsi();
      } else if (m2 === "lch" || m2 === "hcl") {
        m2 = "hcl";
        xyz0 = col1.hcl();
        xyz1 = col2.hcl();
      } else if (m2 === "oklch") {
        xyz0 = col1.oklch().reverse();
        xyz1 = col2.oklch().reverse();
      }
      var hue0, hue1, sat0, sat1, lbv0, lbv1;
      if (m2.substr(0, 1) === "h" || m2 === "oklch") {
        assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2];
        assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2];
      }
      var sat, hue, lbv, dh;
      if (!isNaN(hue0) && !isNaN(hue1)) {
        if (hue1 > hue0 && hue1 - hue0 > 180) {
          dh = hue1 - (hue0 + 360);
        } else if (hue1 < hue0 && hue0 - hue1 > 180) {
          dh = hue1 + 360 - hue0;
        } else {
          dh = hue1 - hue0;
        }
        hue = hue0 + f2 * dh;
      } else if (!isNaN(hue0)) {
        hue = hue0;
        if ((lbv1 == 1 || lbv1 == 0) && m2 != "hsv") {
          sat = sat0;
        }
      } else if (!isNaN(hue1)) {
        hue = hue1;
        if ((lbv0 == 1 || lbv0 == 0) && m2 != "hsv") {
          sat = sat1;
        }
      } else {
        hue = Number.NaN;
      }
      if (sat === void 0) {
        sat = sat0 + f2 * (sat1 - sat0);
      }
      lbv = lbv0 + f2 * (lbv1 - lbv0);
      return m2 === "oklch" ? new Color$9([lbv, sat, hue], m2) : new Color$9([hue, sat, lbv], m2);
    };
    var interpolate_hsx$5 = _hsx;
    var lch = function(col1, col2, f2) {
      return interpolate_hsx$5(col1, col2, f2, "lch");
    };
    interpolator$1.lch = lch;
    interpolator$1.hcl = lch;
    var Color$8 = Color_1;
    var num = function(col1, col2, f2) {
      var c1 = col1.num();
      var c2 = col2.num();
      return new Color$8(c1 + f2 * (c2 - c1), "num");
    };
    interpolator$1.num = num;
    var interpolate_hsx$4 = _hsx;
    var hcg = function(col1, col2, f2) {
      return interpolate_hsx$4(col1, col2, f2, "hcg");
    };
    interpolator$1.hcg = hcg;
    var interpolate_hsx$3 = _hsx;
    var hsi = function(col1, col2, f2) {
      return interpolate_hsx$3(col1, col2, f2, "hsi");
    };
    interpolator$1.hsi = hsi;
    var interpolate_hsx$2 = _hsx;
    var hsl = function(col1, col2, f2) {
      return interpolate_hsx$2(col1, col2, f2, "hsl");
    };
    interpolator$1.hsl = hsl;
    var interpolate_hsx$1 = _hsx;
    var hsv = function(col1, col2, f2) {
      return interpolate_hsx$1(col1, col2, f2, "hsv");
    };
    interpolator$1.hsv = hsv;
    var Color$7 = Color_1;
    var oklab = function(col1, col2, f2) {
      var xyz0 = col1.oklab();
      var xyz1 = col2.oklab();
      return new Color$7(xyz0[0] + f2 * (xyz1[0] - xyz0[0]), xyz0[1] + f2 * (xyz1[1] - xyz0[1]), xyz0[2] + f2 * (xyz1[2] - xyz0[2]), "oklab");
    };
    interpolator$1.oklab = oklab;
    var interpolate_hsx = _hsx;
    var oklch = function(col1, col2, f2) {
      return interpolate_hsx(col1, col2, f2, "oklch");
    };
    interpolator$1.oklch = oklch;
    var Color$6 = Color_1;
    var clip_rgb$1 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$1 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$2 = Math.sin;
    var atan2$1 = Math.atan2;
    var average = function(colors, mode, weights) {
      if (mode === void 0)
        mode = "lrgb";
      if (weights === void 0)
        weights = null;
      var l = colors.length;
      if (!weights) {
        weights = Array.from(new Array(l)).map(function() {
          return 1;
        });
      }
      var k2 = l / weights.reduce(function(a2, b2) {
        return a2 + b2;
      });
      weights.forEach(function(w2, i4) {
        weights[i4] *= k2;
      });
      colors = colors.map(function(c2) {
        return new Color$6(c2);
      });
      if (mode === "lrgb") {
        return _average_lrgb(colors, weights);
      }
      var first = colors.shift();
      var xyz = first.get(mode);
      var cnt = [];
      var dx = 0;
      var dy = 0;
      for (var i3 = 0; i3 < xyz.length; i3++) {
        xyz[i3] = (xyz[i3] || 0) * weights[0];
        cnt.push(isNaN(xyz[i3]) ? 0 : weights[0]);
        if (mode.charAt(i3) === "h" && !isNaN(xyz[i3])) {
          var A2 = xyz[i3] / 180 * PI$1;
          dx += cos$2(A2) * weights[0];
          dy += sin$2(A2) * weights[0];
        }
      }
      var alpha = first.alpha() * weights[0];
      colors.forEach(function(c2, ci) {
        var xyz2 = c2.get(mode);
        alpha += c2.alpha() * weights[ci + 1];
        for (var i4 = 0; i4 < xyz.length; i4++) {
          if (!isNaN(xyz2[i4])) {
            cnt[i4] += weights[ci + 1];
            if (mode.charAt(i4) === "h") {
              var A3 = xyz2[i4] / 180 * PI$1;
              dx += cos$2(A3) * weights[ci + 1];
              dy += sin$2(A3) * weights[ci + 1];
            } else {
              xyz[i4] += xyz2[i4] * weights[ci + 1];
            }
          }
        }
      });
      for (var i$12 = 0; i$12 < xyz.length; i$12++) {
        if (mode.charAt(i$12) === "h") {
          var A$1 = atan2$1(dy / cnt[i$12], dx / cnt[i$12]) / PI$1 * 180;
          while (A$1 < 0) {
            A$1 += 360;
          }
          while (A$1 >= 360) {
            A$1 -= 360;
          }
          xyz[i$12] = A$1;
        } else {
          xyz[i$12] = xyz[i$12] / cnt[i$12];
        }
      }
      alpha /= l;
      return new Color$6(xyz, mode).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };
    var _average_lrgb = function(colors, weights) {
      var l = colors.length;
      var xyz = [0, 0, 0, 0];
      for (var i3 = 0; i3 < colors.length; i3++) {
        var col = colors[i3];
        var f2 = weights[i3] / l;
        var rgb2 = col._rgb;
        xyz[0] += pow$4(rgb2[0], 2) * f2;
        xyz[1] += pow$4(rgb2[1], 2) * f2;
        xyz[2] += pow$4(rgb2[2], 2) * f2;
        xyz[3] += rgb2[3] * f2;
      }
      xyz[0] = sqrt$1(xyz[0]);
      xyz[1] = sqrt$1(xyz[1]);
      xyz[2] = sqrt$1(xyz[2]);
      if (xyz[3] > 0.9999999) {
        xyz[3] = 1;
      }
      return new Color$6(clip_rgb$1(xyz));
    };
    var chroma$4 = chroma_1;
    var type$2 = utils.type;
    var pow$3 = Math.pow;
    var scale$2 = function(colors) {
      var _mode = "rgb";
      var _nacol = chroma$4("#ccc");
      var _spread = 0;
      var _domain = [0, 1];
      var _pos = [];
      var _padding = [0, 0];
      var _classes = false;
      var _colors = [];
      var _out = false;
      var _min = 0;
      var _max = 1;
      var _correctLightness = false;
      var _colorCache = {};
      var _useCache = true;
      var _gamma = 1;
      var setColors = function(colors2) {
        colors2 = colors2 || ["#fff", "#000"];
        if (colors2 && type$2(colors2) === "string" && chroma$4.brewer && chroma$4.brewer[colors2.toLowerCase()]) {
          colors2 = chroma$4.brewer[colors2.toLowerCase()];
        }
        if (type$2(colors2) === "array") {
          if (colors2.length === 1) {
            colors2 = [colors2[0], colors2[0]];
          }
          colors2 = colors2.slice(0);
          for (var c2 = 0; c2 < colors2.length; c2++) {
            colors2[c2] = chroma$4(colors2[c2]);
          }
          _pos.length = 0;
          for (var c$1 = 0; c$1 < colors2.length; c$1++) {
            _pos.push(c$1 / (colors2.length - 1));
          }
        }
        resetCache();
        return _colors = colors2;
      };
      var getClass = function(value) {
        if (_classes != null) {
          var n2 = _classes.length - 1;
          var i3 = 0;
          while (i3 < n2 && value >= _classes[i3]) {
            i3++;
          }
          return i3 - 1;
        }
        return 0;
      };
      var tMapLightness = function(t2) {
        return t2;
      };
      var tMapDomain = function(t2) {
        return t2;
      };
      var getColor = function(val, bypassMap) {
        var col, t2;
        if (bypassMap == null) {
          bypassMap = false;
        }
        if (isNaN(val) || val === null) {
          return _nacol;
        }
        if (!bypassMap) {
          if (_classes && _classes.length > 2) {
            var c2 = getClass(val);
            t2 = c2 / (_classes.length - 2);
          } else if (_max !== _min) {
            t2 = (val - _min) / (_max - _min);
          } else {
            t2 = 1;
          }
        } else {
          t2 = val;
        }
        t2 = tMapDomain(t2);
        if (!bypassMap) {
          t2 = tMapLightness(t2);
        }
        if (_gamma !== 1) {
          t2 = pow$3(t2, _gamma);
        }
        t2 = _padding[0] + t2 * (1 - _padding[0] - _padding[1]);
        t2 = Math.min(1, Math.max(0, t2));
        var k2 = Math.floor(t2 * 1e4);
        if (_useCache && _colorCache[k2]) {
          col = _colorCache[k2];
        } else {
          if (type$2(_colors) === "array") {
            for (var i3 = 0; i3 < _pos.length; i3++) {
              var p = _pos[i3];
              if (t2 <= p) {
                col = _colors[i3];
                break;
              }
              if (t2 >= p && i3 === _pos.length - 1) {
                col = _colors[i3];
                break;
              }
              if (t2 > p && t2 < _pos[i3 + 1]) {
                t2 = (t2 - p) / (_pos[i3 + 1] - p);
                col = chroma$4.interpolate(_colors[i3], _colors[i3 + 1], t2, _mode);
                break;
              }
            }
          } else if (type$2(_colors) === "function") {
            col = _colors(t2);
          }
          if (_useCache) {
            _colorCache[k2] = col;
          }
        }
        return col;
      };
      var resetCache = function() {
        return _colorCache = {};
      };
      setColors(colors);
      var f2 = function(v2) {
        var c2 = chroma$4(getColor(v2));
        if (_out && c2[_out]) {
          return c2[_out]();
        } else {
          return c2;
        }
      };
      f2.classes = function(classes) {
        if (classes != null) {
          if (type$2(classes) === "array") {
            _classes = classes;
            _domain = [classes[0], classes[classes.length - 1]];
          } else {
            var d2 = chroma$4.analyze(_domain);
            if (classes === 0) {
              _classes = [d2.min, d2.max];
            } else {
              _classes = chroma$4.limits(d2, "e", classes);
            }
          }
          return f2;
        }
        return _classes;
      };
      f2.domain = function(domain) {
        if (!arguments.length) {
          return _domain;
        }
        _min = domain[0];
        _max = domain[domain.length - 1];
        _pos = [];
        var k2 = _colors.length;
        if (domain.length === k2 && _min !== _max) {
          for (var i3 = 0, list2 = Array.from(domain); i3 < list2.length; i3 += 1) {
            var d2 = list2[i3];
            _pos.push((d2 - _min) / (_max - _min));
          }
        } else {
          for (var c2 = 0; c2 < k2; c2++) {
            _pos.push(c2 / (k2 - 1));
          }
          if (domain.length > 2) {
            var tOut = domain.map(function(d3, i4) {
              return i4 / (domain.length - 1);
            });
            var tBreaks = domain.map(function(d3) {
              return (d3 - _min) / (_max - _min);
            });
            if (!tBreaks.every(function(val, i4) {
              return tOut[i4] === val;
            })) {
              tMapDomain = function(t2) {
                if (t2 <= 0 || t2 >= 1) {
                  return t2;
                }
                var i4 = 0;
                while (t2 >= tBreaks[i4 + 1]) {
                  i4++;
                }
                var f3 = (t2 - tBreaks[i4]) / (tBreaks[i4 + 1] - tBreaks[i4]);
                var out = tOut[i4] + f3 * (tOut[i4 + 1] - tOut[i4]);
                return out;
              };
            }
          }
        }
        _domain = [_min, _max];
        return f2;
      };
      f2.mode = function(_m) {
        if (!arguments.length) {
          return _mode;
        }
        _mode = _m;
        resetCache();
        return f2;
      };
      f2.range = function(colors2, _pos2) {
        setColors(colors2);
        return f2;
      };
      f2.out = function(_o) {
        _out = _o;
        return f2;
      };
      f2.spread = function(val) {
        if (!arguments.length) {
          return _spread;
        }
        _spread = val;
        return f2;
      };
      f2.correctLightness = function(v2) {
        if (v2 == null) {
          v2 = true;
        }
        _correctLightness = v2;
        resetCache();
        if (_correctLightness) {
          tMapLightness = function(t2) {
            var L0 = getColor(0, true).lab()[0];
            var L1 = getColor(1, true).lab()[0];
            var pol = L0 > L1;
            var L_actual = getColor(t2, true).lab()[0];
            var L_ideal = L0 + (L1 - L0) * t2;
            var L_diff = L_actual - L_ideal;
            var t0 = 0;
            var t1 = 1;
            var max_iter = 20;
            while (Math.abs(L_diff) > 0.01 && max_iter-- > 0) {
              (function() {
                if (pol) {
                  L_diff *= -1;
                }
                if (L_diff < 0) {
                  t0 = t2;
                  t2 += (t1 - t2) * 0.5;
                } else {
                  t1 = t2;
                  t2 += (t0 - t2) * 0.5;
                }
                L_actual = getColor(t2, true).lab()[0];
                return L_diff = L_actual - L_ideal;
              })();
            }
            return t2;
          };
        } else {
          tMapLightness = function(t2) {
            return t2;
          };
        }
        return f2;
      };
      f2.padding = function(p) {
        if (p != null) {
          if (type$2(p) === "number") {
            p = [p, p];
          }
          _padding = p;
          return f2;
        } else {
          return _padding;
        }
      };
      f2.colors = function(numColors, out) {
        if (arguments.length < 2) {
          out = "hex";
        }
        var result = [];
        if (arguments.length === 0) {
          result = _colors.slice(0);
        } else if (numColors === 1) {
          result = [f2(0.5)];
        } else if (numColors > 1) {
          var dm = _domain[0];
          var dd = _domain[1] - dm;
          result = __range__(0, numColors, false).map(function(i4) {
            return f2(dm + i4 / (numColors - 1) * dd);
          });
        } else {
          colors = [];
          var samples = [];
          if (_classes && _classes.length > 2) {
            for (var i3 = 1, end = _classes.length, asc = 1 <= end; asc ? i3 < end : i3 > end; asc ? i3++ : i3--) {
              samples.push((_classes[i3 - 1] + _classes[i3]) * 0.5);
            }
          } else {
            samples = _domain;
          }
          result = samples.map(function(v2) {
            return f2(v2);
          });
        }
        if (chroma$4[out]) {
          result = result.map(function(c2) {
            return c2[out]();
          });
        }
        return result;
      };
      f2.cache = function(c2) {
        if (c2 != null) {
          _useCache = c2;
          return f2;
        } else {
          return _useCache;
        }
      };
      f2.gamma = function(g2) {
        if (g2 != null) {
          _gamma = g2;
          return f2;
        } else {
          return _gamma;
        }
      };
      f2.nodata = function(d2) {
        if (d2 != null) {
          _nacol = chroma$4(d2);
          return f2;
        } else {
          return _nacol;
        }
      };
      return f2;
    };
    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i3 = left; ascending ? i3 < end : i3 > end; ascending ? i3++ : i3--) {
        range.push(i3);
      }
      return range;
    }
    var Color$5 = Color_1;
    var scale$1 = scale$2;
    var binom_row = function(n2) {
      var row = [1, 1];
      for (var i3 = 1; i3 < n2; i3++) {
        var newrow = [1];
        for (var j2 = 1; j2 <= row.length; j2++) {
          newrow[j2] = (row[j2] || 0) + row[j2 - 1];
        }
        row = newrow;
      }
      return row;
    };
    var bezier = function(colors) {
      var assign, assign$1, assign$2;
      var I2, lab0, lab1, lab2;
      colors = colors.map(function(c2) {
        return new Color$5(c2);
      });
      if (colors.length === 2) {
        assign = colors.map(function(c2) {
          return c2.lab();
        }), lab0 = assign[0], lab1 = assign[1];
        I2 = function(t2) {
          var lab4 = [0, 1, 2].map(function(i3) {
            return lab0[i3] + t2 * (lab1[i3] - lab0[i3]);
          });
          return new Color$5(lab4, "lab");
        };
      } else if (colors.length === 3) {
        assign$1 = colors.map(function(c2) {
          return c2.lab();
        }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2];
        I2 = function(t2) {
          var lab4 = [0, 1, 2].map(function(i3) {
            return (1 - t2) * (1 - t2) * lab0[i3] + 2 * (1 - t2) * t2 * lab1[i3] + t2 * t2 * lab2[i3];
          });
          return new Color$5(lab4, "lab");
        };
      } else if (colors.length === 4) {
        var lab3;
        assign$2 = colors.map(function(c2) {
          return c2.lab();
        }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3];
        I2 = function(t2) {
          var lab4 = [0, 1, 2].map(function(i3) {
            return (1 - t2) * (1 - t2) * (1 - t2) * lab0[i3] + 3 * (1 - t2) * (1 - t2) * t2 * lab1[i3] + 3 * (1 - t2) * t2 * t2 * lab2[i3] + t2 * t2 * t2 * lab3[i3];
          });
          return new Color$5(lab4, "lab");
        };
      } else if (colors.length >= 5) {
        var labs, row, n2;
        labs = colors.map(function(c2) {
          return c2.lab();
        });
        n2 = colors.length - 1;
        row = binom_row(n2);
        I2 = function(t2) {
          var u2 = 1 - t2;
          var lab4 = [0, 1, 2].map(function(i3) {
            return labs.reduce(function(sum, el, j2) {
              return sum + row[j2] * Math.pow(u2, n2 - j2) * Math.pow(t2, j2) * el[i3];
            }, 0);
          });
          return new Color$5(lab4, "lab");
        };
      } else {
        throw new RangeError("No point in running bezier with only one color.");
      }
      return I2;
    };
    var bezier_1 = function(colors) {
      var f2 = bezier(colors);
      f2.scale = function() {
        return scale$1(f2);
      };
      return f2;
    };
    var chroma$3 = chroma_1;
    var blend = function(bottom, top, mode) {
      if (!blend[mode]) {
        throw new Error("unknown blend mode " + mode);
      }
      return blend[mode](bottom, top);
    };
    var blend_f = function(f2) {
      return function(bottom, top) {
        var c0 = chroma$3(top).rgb();
        var c1 = chroma$3(bottom).rgb();
        return chroma$3.rgb(f2(c0, c1));
      };
    };
    var each = function(f2) {
      return function(c0, c1) {
        var out = [];
        out[0] = f2(c0[0], c1[0]);
        out[1] = f2(c0[1], c1[1]);
        out[2] = f2(c0[2], c1[2]);
        return out;
      };
    };
    var normal = function(a2) {
      return a2;
    };
    var multiply = function(a2, b2) {
      return a2 * b2 / 255;
    };
    var darken = function(a2, b2) {
      return a2 > b2 ? b2 : a2;
    };
    var lighten = function(a2, b2) {
      return a2 > b2 ? a2 : b2;
    };
    var screen = function(a2, b2) {
      return 255 * (1 - (1 - a2 / 255) * (1 - b2 / 255));
    };
    var overlay = function(a2, b2) {
      return b2 < 128 ? 2 * a2 * b2 / 255 : 255 * (1 - 2 * (1 - a2 / 255) * (1 - b2 / 255));
    };
    var burn = function(a2, b2) {
      return 255 * (1 - (1 - b2 / 255) / (a2 / 255));
    };
    var dodge = function(a2, b2) {
      if (a2 === 255) {
        return 255;
      }
      a2 = 255 * (b2 / 255) / (1 - a2 / 255);
      return a2 > 255 ? 255 : a2;
    };
    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    var blend_1 = blend;
    var type$1 = utils.type;
    var clip_rgb = utils.clip_rgb;
    var TWOPI = utils.TWOPI;
    var pow$2 = Math.pow;
    var sin$1 = Math.sin;
    var cos$1 = Math.cos;
    var chroma$2 = chroma_1;
    var cubehelix = function(start, rotations, hue, gamma, lightness) {
      if (start === void 0)
        start = 300;
      if (rotations === void 0)
        rotations = -1.5;
      if (hue === void 0)
        hue = 1;
      if (gamma === void 0)
        gamma = 1;
      if (lightness === void 0)
        lightness = [0, 1];
      var dh = 0, dl;
      if (type$1(lightness) === "array") {
        dl = lightness[1] - lightness[0];
      } else {
        dl = 0;
        lightness = [lightness, lightness];
      }
      var f2 = function(fract) {
        var a2 = TWOPI * ((start + 120) / 360 + rotations * fract);
        var l = pow$2(lightness[0] + dl * fract, gamma);
        var h2 = dh !== 0 ? hue[0] + fract * dh : hue;
        var amp = h2 * l * (1 - l) / 2;
        var cos_a = cos$1(a2);
        var sin_a = sin$1(a2);
        var r2 = l + amp * (-0.14861 * cos_a + 1.78277 * sin_a);
        var g2 = l + amp * (-0.29227 * cos_a - 0.90649 * sin_a);
        var b2 = l + amp * (1.97294 * cos_a);
        return chroma$2(clip_rgb([r2 * 255, g2 * 255, b2 * 255, 1]));
      };
      f2.start = function(s2) {
        if (s2 == null) {
          return start;
        }
        start = s2;
        return f2;
      };
      f2.rotations = function(r2) {
        if (r2 == null) {
          return rotations;
        }
        rotations = r2;
        return f2;
      };
      f2.gamma = function(g2) {
        if (g2 == null) {
          return gamma;
        }
        gamma = g2;
        return f2;
      };
      f2.hue = function(h2) {
        if (h2 == null) {
          return hue;
        }
        hue = h2;
        if (type$1(hue) === "array") {
          dh = hue[1] - hue[0];
          if (dh === 0) {
            hue = hue[1];
          }
        } else {
          dh = 0;
        }
        return f2;
      };
      f2.lightness = function(h2) {
        if (h2 == null) {
          return lightness;
        }
        if (type$1(h2) === "array") {
          lightness = h2;
          dl = h2[1] - h2[0];
        } else {
          lightness = [h2, h2];
          dl = 0;
        }
        return f2;
      };
      f2.scale = function() {
        return chroma$2.scale(f2);
      };
      f2.hue(hue);
      return f2;
    };
    var Color$4 = Color_1;
    var digits = "0123456789abcdef";
    var floor$1 = Math.floor;
    var random = Math.random;
    var random_1 = function() {
      var code = "#";
      for (var i3 = 0; i3 < 6; i3++) {
        code += digits.charAt(floor$1(random() * 16));
      }
      return new Color$4(code, "hex");
    };
    var type = type$p;
    var log2 = Math.log;
    var pow$1 = Math.pow;
    var floor2 = Math.floor;
    var abs$1 = Math.abs;
    var analyze = function(data, key2) {
      if (key2 === void 0)
        key2 = null;
      var r2 = {
        min: Number.MAX_VALUE,
        max: Number.MAX_VALUE * -1,
        sum: 0,
        values: [],
        count: 0
      };
      if (type(data) === "object") {
        data = Object.values(data);
      }
      data.forEach(function(val) {
        if (key2 && type(val) === "object") {
          val = val[key2];
        }
        if (val !== void 0 && val !== null && !isNaN(val)) {
          r2.values.push(val);
          r2.sum += val;
          if (val < r2.min) {
            r2.min = val;
          }
          if (val > r2.max) {
            r2.max = val;
          }
          r2.count += 1;
        }
      });
      r2.domain = [r2.min, r2.max];
      r2.limits = function(mode, num2) {
        return limits(r2, mode, num2);
      };
      return r2;
    };
    var limits = function(data, mode, num2) {
      if (mode === void 0)
        mode = "equal";
      if (num2 === void 0)
        num2 = 7;
      if (type(data) == "array") {
        data = analyze(data);
      }
      var min2 = data.min;
      var max2 = data.max;
      var values = data.values.sort(function(a2, b2) {
        return a2 - b2;
      });
      if (num2 === 1) {
        return [min2, max2];
      }
      var limits2 = [];
      if (mode.substr(0, 1) === "c") {
        limits2.push(min2);
        limits2.push(max2);
      }
      if (mode.substr(0, 1) === "e") {
        limits2.push(min2);
        for (var i3 = 1; i3 < num2; i3++) {
          limits2.push(min2 + i3 / num2 * (max2 - min2));
        }
        limits2.push(max2);
      } else if (mode.substr(0, 1) === "l") {
        if (min2 <= 0) {
          throw new Error("Logarithmic scales are only possible for values > 0");
        }
        var min_log = Math.LOG10E * log2(min2);
        var max_log = Math.LOG10E * log2(max2);
        limits2.push(min2);
        for (var i$12 = 1; i$12 < num2; i$12++) {
          limits2.push(pow$1(10, min_log + i$12 / num2 * (max_log - min_log)));
        }
        limits2.push(max2);
      } else if (mode.substr(0, 1) === "q") {
        limits2.push(min2);
        for (var i$2 = 1; i$2 < num2; i$2++) {
          var p = (values.length - 1) * i$2 / num2;
          var pb = floor2(p);
          if (pb === p) {
            limits2.push(values[pb]);
          } else {
            var pr = p - pb;
            limits2.push(values[pb] * (1 - pr) + values[pb + 1] * pr);
          }
        }
        limits2.push(max2);
      } else if (mode.substr(0, 1) === "k") {
        var cluster;
        var n2 = values.length;
        var assignments = new Array(n2);
        var clusterSizes = new Array(num2);
        var repeat = true;
        var nb_iters = 0;
        var centroids = null;
        centroids = [];
        centroids.push(min2);
        for (var i$3 = 1; i$3 < num2; i$3++) {
          centroids.push(min2 + i$3 / num2 * (max2 - min2));
        }
        centroids.push(max2);
        while (repeat) {
          for (var j2 = 0; j2 < num2; j2++) {
            clusterSizes[j2] = 0;
          }
          for (var i$4 = 0; i$4 < n2; i$4++) {
            var value = values[i$4];
            var mindist = Number.MAX_VALUE;
            var best = void 0;
            for (var j$1 = 0; j$1 < num2; j$1++) {
              var dist3 = abs$1(centroids[j$1] - value);
              if (dist3 < mindist) {
                mindist = dist3;
                best = j$1;
              }
              clusterSizes[best]++;
              assignments[i$4] = best;
            }
          }
          var newCentroids = new Array(num2);
          for (var j$2 = 0; j$2 < num2; j$2++) {
            newCentroids[j$2] = null;
          }
          for (var i$5 = 0; i$5 < n2; i$5++) {
            cluster = assignments[i$5];
            if (newCentroids[cluster] === null) {
              newCentroids[cluster] = values[i$5];
            } else {
              newCentroids[cluster] += values[i$5];
            }
          }
          for (var j$3 = 0; j$3 < num2; j$3++) {
            newCentroids[j$3] *= 1 / clusterSizes[j$3];
          }
          repeat = false;
          for (var j$4 = 0; j$4 < num2; j$4++) {
            if (newCentroids[j$4] !== centroids[j$4]) {
              repeat = true;
              break;
            }
          }
          centroids = newCentroids;
          nb_iters++;
          if (nb_iters > 200) {
            repeat = false;
          }
        }
        var kClusters = {};
        for (var j$5 = 0; j$5 < num2; j$5++) {
          kClusters[j$5] = [];
        }
        for (var i$6 = 0; i$6 < n2; i$6++) {
          cluster = assignments[i$6];
          kClusters[cluster].push(values[i$6]);
        }
        var tmpKMeansBreaks = [];
        for (var j$6 = 0; j$6 < num2; j$6++) {
          tmpKMeansBreaks.push(kClusters[j$6][0]);
          tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length - 1]);
        }
        tmpKMeansBreaks = tmpKMeansBreaks.sort(function(a2, b2) {
          return a2 - b2;
        });
        limits2.push(tmpKMeansBreaks[0]);
        for (var i$7 = 1; i$7 < tmpKMeansBreaks.length; i$7 += 2) {
          var v2 = tmpKMeansBreaks[i$7];
          if (!isNaN(v2) && limits2.indexOf(v2) === -1) {
            limits2.push(v2);
          }
        }
      }
      return limits2;
    };
    var analyze_1 = { analyze, limits };
    var Color$3 = Color_1;
    var contrast = function(a2, b2) {
      a2 = new Color$3(a2);
      b2 = new Color$3(b2);
      var l1 = a2.luminance();
      var l2 = b2.luminance();
      return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };
    var Color$2 = Color_1;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var min = Math.min;
    var max = Math.max;
    var atan2 = Math.atan2;
    var abs = Math.abs;
    var cos = Math.cos;
    var sin = Math.sin;
    var exp = Math.exp;
    var PI = Math.PI;
    var deltaE = function(a2, b2, Kl, Kc, Kh) {
      if (Kl === void 0)
        Kl = 1;
      if (Kc === void 0)
        Kc = 1;
      if (Kh === void 0)
        Kh = 1;
      var rad2deg = function(rad) {
        return 360 * rad / (2 * PI);
      };
      var deg2rad = function(deg) {
        return 2 * PI * deg / 360;
      };
      a2 = new Color$2(a2);
      b2 = new Color$2(b2);
      var ref = Array.from(a2.lab());
      var L1 = ref[0];
      var a1 = ref[1];
      var b1 = ref[2];
      var ref$1 = Array.from(b2.lab());
      var L2 = ref$1[0];
      var a22 = ref$1[1];
      var b22 = ref$1[2];
      var avgL = (L1 + L2) / 2;
      var C1 = sqrt(pow(a1, 2) + pow(b1, 2));
      var C2 = sqrt(pow(a22, 2) + pow(b22, 2));
      var avgC = (C1 + C2) / 2;
      var G = 0.5 * (1 - sqrt(pow(avgC, 7) / (pow(avgC, 7) + pow(25, 7))));
      var a1p = a1 * (1 + G);
      var a2p = a22 * (1 + G);
      var C1p = sqrt(pow(a1p, 2) + pow(b1, 2));
      var C2p = sqrt(pow(a2p, 2) + pow(b22, 2));
      var avgCp = (C1p + C2p) / 2;
      var arctan1 = rad2deg(atan2(b1, a1p));
      var arctan2 = rad2deg(atan2(b22, a2p));
      var h1p = arctan1 >= 0 ? arctan1 : arctan1 + 360;
      var h2p = arctan2 >= 0 ? arctan2 : arctan2 + 360;
      var avgHp = abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h2p) / 2;
      var T2 = 1 - 0.17 * cos(deg2rad(avgHp - 30)) + 0.24 * cos(deg2rad(2 * avgHp)) + 0.32 * cos(deg2rad(3 * avgHp + 6)) - 0.2 * cos(deg2rad(4 * avgHp - 63));
      var deltaHp = h2p - h1p;
      deltaHp = abs(deltaHp) <= 180 ? deltaHp : h2p <= h1p ? deltaHp + 360 : deltaHp - 360;
      deltaHp = 2 * sqrt(C1p * C2p) * sin(deg2rad(deltaHp) / 2);
      var deltaL = L2 - L1;
      var deltaCp = C2p - C1p;
      var sl = 1 + 0.015 * pow(avgL - 50, 2) / sqrt(20 + pow(avgL - 50, 2));
      var sc = 1 + 0.045 * avgCp;
      var sh = 1 + 0.015 * avgCp * T2;
      var deltaTheta = 30 * exp(-pow((avgHp - 275) / 25, 2));
      var Rc = 2 * sqrt(pow(avgCp, 7) / (pow(avgCp, 7) + pow(25, 7)));
      var Rt = -Rc * sin(2 * deg2rad(deltaTheta));
      var result = sqrt(pow(deltaL / (Kl * sl), 2) + pow(deltaCp / (Kc * sc), 2) + pow(deltaHp / (Kh * sh), 2) + Rt * (deltaCp / (Kc * sc)) * (deltaHp / (Kh * sh)));
      return max(0, min(100, result));
    };
    var Color$1 = Color_1;
    var distance = function(a2, b2, mode) {
      if (mode === void 0)
        mode = "lab";
      a2 = new Color$1(a2);
      b2 = new Color$1(b2);
      var l1 = a2.get(mode);
      var l2 = b2.get(mode);
      var sum_sq = 0;
      for (var i3 in l1) {
        var d2 = (l1[i3] || 0) - (l2[i3] || 0);
        sum_sq += d2 * d2;
      }
      return Math.sqrt(sum_sq);
    };
    var Color = Color_1;
    var valid = function() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      try {
        new (Function.prototype.bind.apply(Color, [null].concat(args)))();
        return true;
      } catch (e2) {
        return false;
      }
    };
    var chroma$12 = chroma_1;
    var scale = scale$2;
    var scales = {
      cool: function cool() {
        return scale([chroma$12.hsl(180, 1, 0.9), chroma$12.hsl(250, 0.7, 0.4)]);
      },
      hot: function hot() {
        return scale(["#000", "#f00", "#ff0", "#fff"]).mode("rgb");
      }
    };
    var colorbrewer = {
      OrRd: ["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
      PuBu: ["#fff7fb", "#ece7f2", "#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#045a8d", "#023858"],
      BuPu: ["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"],
      Oranges: ["#fff5eb", "#fee6ce", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#a63603", "#7f2704"],
      BuGn: ["#f7fcfd", "#e5f5f9", "#ccece6", "#99d8c9", "#66c2a4", "#41ae76", "#238b45", "#006d2c", "#00441b"],
      YlOrBr: ["#ffffe5", "#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"],
      YlGn: ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"],
      Reds: ["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d"],
      RdPu: ["#fff7f3", "#fde0dd", "#fcc5c0", "#fa9fb5", "#f768a1", "#dd3497", "#ae017e", "#7a0177", "#49006a"],
      Greens: ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"],
      YlGnBu: ["#ffffd9", "#edf8b1", "#c7e9b4", "#7fcdbb", "#41b6c4", "#1d91c0", "#225ea8", "#253494", "#081d58"],
      Purples: ["#fcfbfd", "#efedf5", "#dadaeb", "#bcbddc", "#9e9ac8", "#807dba", "#6a51a3", "#54278f", "#3f007d"],
      GnBu: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4", "#4eb3d3", "#2b8cbe", "#0868ac", "#084081"],
      Greys: ["#ffffff", "#f0f0f0", "#d9d9d9", "#bdbdbd", "#969696", "#737373", "#525252", "#252525", "#000000"],
      YlOrRd: ["#ffffcc", "#ffeda0", "#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c", "#bd0026", "#800026"],
      PuRd: ["#f7f4f9", "#e7e1ef", "#d4b9da", "#c994c7", "#df65b0", "#e7298a", "#ce1256", "#980043", "#67001f"],
      Blues: ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"],
      PuBuGn: ["#fff7fb", "#ece2f0", "#d0d1e6", "#a6bddb", "#67a9cf", "#3690c0", "#02818a", "#016c59", "#014636"],
      Viridis: ["#440154", "#482777", "#3f4a8a", "#31678e", "#26838f", "#1f9d8a", "#6cce5a", "#b6de2b", "#fee825"],
      Spectral: ["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"],
      RdYlGn: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#d9ef8b", "#a6d96a", "#66bd63", "#1a9850", "#006837"],
      RdBu: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#f7f7f7", "#d1e5f0", "#92c5de", "#4393c3", "#2166ac", "#053061"],
      PiYG: ["#8e0152", "#c51b7d", "#de77ae", "#f1b6da", "#fde0ef", "#f7f7f7", "#e6f5d0", "#b8e186", "#7fbc41", "#4d9221", "#276419"],
      PRGn: ["#40004b", "#762a83", "#9970ab", "#c2a5cf", "#e7d4e8", "#f7f7f7", "#d9f0d3", "#a6dba0", "#5aae61", "#1b7837", "#00441b"],
      RdYlBu: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4", "#313695"],
      BrBG: ["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"],
      RdGy: ["#67001f", "#b2182b", "#d6604d", "#f4a582", "#fddbc7", "#ffffff", "#e0e0e0", "#bababa", "#878787", "#4d4d4d", "#1a1a1a"],
      PuOr: ["#7f3b08", "#b35806", "#e08214", "#fdb863", "#fee0b6", "#f7f7f7", "#d8daeb", "#b2abd2", "#8073ac", "#542788", "#2d004b"],
      Set2: ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"],
      Accent: ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"],
      Set1: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"],
      Set3: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"],
      Dark2: ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"],
      Paired: ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"],
      Pastel2: ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"],
      Pastel1: ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
    };
    for (var i2 = 0, list = Object.keys(colorbrewer); i2 < list.length; i2 += 1) {
      var key = list[i2];
      colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }
    var colorbrewer_1 = colorbrewer;
    var chroma2 = chroma_1;
    chroma2.average = average;
    chroma2.bezier = bezier_1;
    chroma2.blend = blend_1;
    chroma2.cubehelix = cubehelix;
    chroma2.mix = chroma2.interpolate = mix$1;
    chroma2.random = random_1;
    chroma2.scale = scale$2;
    chroma2.analyze = analyze_1.analyze;
    chroma2.contrast = contrast;
    chroma2.deltaE = deltaE;
    chroma2.distance = distance;
    chroma2.limits = analyze_1.limits;
    chroma2.valid = valid;
    chroma2.scales = scales;
    chroma2.colors = w3cx11_1;
    chroma2.brewer = colorbrewer_1;
    var chroma_js = chroma2;
    return chroma_js;
  });
})(chroma$1);
var chroma = chroma$1.exports;
/*!
 * iro.js v5.5.2
 * 2016-2021 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */
var n, u, t, i, r, f = {}, e = [], c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;
function s(n2, l) {
  for (var u2 in l) {
    n2[u2] = l[u2];
  }
  return n2;
}
function a(n2) {
  var l = n2.parentNode;
  l && l.removeChild(n2);
}
function h(n2, l, u2) {
  var t2, i2, r2, o, f2 = arguments;
  if (l = s({}, l), arguments.length > 3) {
    for (u2 = [u2], t2 = 3; t2 < arguments.length; t2++) {
      u2.push(f2[t2]);
    }
  }
  if (u2 != null && (l.children = u2), n2 != null && n2.defaultProps != null) {
    for (i2 in n2.defaultProps) {
      l[i2] === void 0 && (l[i2] = n2.defaultProps[i2]);
    }
  }
  return o = l.key, (r2 = l.ref) != null && delete l.ref, o != null && delete l.key, v(n2, l, o, r2);
}
function v(l, u2, t2, i2) {
  var r2 = { type: l, props: u2, key: t2, ref: i2, __k: null, __p: null, __b: 0, __e: null, l: null, __c: null, constructor: void 0 };
  return n.vnode && n.vnode(r2), r2;
}
function d(n2) {
  return n2.children;
}
function y(n2) {
  if (n2 == null || typeof n2 == "boolean") {
    return null;
  }
  if (typeof n2 == "string" || typeof n2 == "number") {
    return v(null, n2, null, null);
  }
  if (n2.__e != null || n2.__c != null) {
    var l = v(n2.type, n2.props, n2.key, null);
    return l.__e = n2.__e, l;
  }
  return n2;
}
function m(n2, l) {
  this.props = n2, this.context = l;
}
function w(n2, l) {
  if (l == null) {
    return n2.__p ? w(n2.__p, n2.__p.__k.indexOf(n2) + 1) : null;
  }
  for (var u2; l < n2.__k.length; l++) {
    if ((u2 = n2.__k[l]) != null && u2.__e != null) {
      return u2.__e;
    }
  }
  return typeof n2.type == "function" ? w(n2) : null;
}
function g(n2) {
  var l, u2;
  if ((n2 = n2.__p) != null && n2.__c != null) {
    for (n2.__e = n2.__c.base = null, l = 0; l < n2.__k.length; l++) {
      if ((u2 = n2.__k[l]) != null && u2.__e != null) {
        n2.__e = n2.__c.base = u2.__e;
        break;
      }
    }
    return g(n2);
  }
}
function k(l) {
  (!l.__d && (l.__d = true) && u.push(l) === 1 || i !== n.debounceRendering) && (i = n.debounceRendering, (n.debounceRendering || t)(_));
}
function _() {
  var n2, l, t2, i2, r2, o, f2, e2;
  for (u.sort(function(n3, l2) {
    return l2.__v.__b - n3.__v.__b;
  }); n2 = u.pop(); ) {
    n2.__d && (t2 = void 0, i2 = void 0, o = (r2 = (l = n2).__v).__e, f2 = l.__P, e2 = l.u, l.u = false, f2 && (t2 = [], i2 = $(f2, r2, s({}, r2), l.__n, f2.ownerSVGElement !== void 0, null, t2, e2, o == null ? w(r2) : o), j(t2, r2), i2 != o && g(r2)));
  }
}
function b(n2, l, u2, t2, i2, r2, o, c2, s2) {
  var h2, v2, p, d2, y2, m2, g2, k2 = u2 && u2.__k || e, _2 = k2.length;
  if (c2 == f && (c2 = r2 != null ? r2[0] : _2 ? w(u2, 0) : null), h2 = 0, l.__k = x(l.__k, function(u3) {
    if (u3 != null) {
      if (u3.__p = l, u3.__b = l.__b + 1, (p = k2[h2]) === null || p && u3.key == p.key && u3.type === p.type) {
        k2[h2] = void 0;
      } else {
        for (v2 = 0; v2 < _2; v2++) {
          if ((p = k2[v2]) && u3.key == p.key && u3.type === p.type) {
            k2[v2] = void 0;
            break;
          }
          p = null;
        }
      }
      if (d2 = $(n2, u3, p = p || f, t2, i2, r2, o, null, c2, s2), (v2 = u3.ref) && p.ref != v2 && (g2 || (g2 = [])).push(v2, u3.__c || d2, u3), d2 != null) {
        if (m2 == null && (m2 = d2), u3.l != null) {
          d2 = u3.l, u3.l = null;
        } else if (r2 == p || d2 != c2 || d2.parentNode == null) {
          n:
            if (c2 == null || c2.parentNode !== n2) {
              n2.appendChild(d2);
            } else {
              for (y2 = c2, v2 = 0; (y2 = y2.nextSibling) && v2 < _2; v2 += 2) {
                if (y2 == d2) {
                  break n;
                }
              }
              n2.insertBefore(d2, c2);
            }
          l.type == "option" && (n2.value = "");
        }
        c2 = d2.nextSibling, typeof l.type == "function" && (l.l = d2);
      }
    }
    return h2++, u3;
  }), l.__e = m2, r2 != null && typeof l.type != "function") {
    for (h2 = r2.length; h2--; ) {
      r2[h2] != null && a(r2[h2]);
    }
  }
  for (h2 = _2; h2--; ) {
    k2[h2] != null && D(k2[h2], k2[h2]);
  }
  if (g2) {
    for (h2 = 0; h2 < g2.length; h2++) {
      A(g2[h2], g2[++h2], g2[++h2]);
    }
  }
}
function x(n2, l, u2) {
  if (u2 == null && (u2 = []), n2 == null || typeof n2 == "boolean") {
    l && u2.push(l(null));
  } else if (Array.isArray(n2)) {
    for (var t2 = 0; t2 < n2.length; t2++) {
      x(n2[t2], l, u2);
    }
  } else {
    u2.push(l ? l(y(n2)) : n2);
  }
  return u2;
}
function C(n2, l, u2, t2, i2) {
  var r2;
  for (r2 in u2) {
    r2 in l || N(n2, r2, null, u2[r2], t2);
  }
  for (r2 in l) {
    i2 && typeof l[r2] != "function" || r2 === "value" || r2 === "checked" || u2[r2] === l[r2] || N(n2, r2, l[r2], u2[r2], t2);
  }
}
function P(n2, l, u2) {
  l[0] === "-" ? n2.setProperty(l, u2) : n2[l] = typeof u2 == "number" && c.test(l) === false ? u2 + "px" : u2 == null ? "" : u2;
}
function N(n2, l, u2, t2, i2) {
  var r2, o, f2, e2, c2;
  if ((l = i2 ? l === "className" ? "class" : l : l === "class" ? "className" : l) === "key" || l === "children")
    ;
  else if (l === "style") {
    if (r2 = n2.style, typeof u2 == "string") {
      r2.cssText = u2;
    } else {
      if (typeof t2 == "string" && (r2.cssText = "", t2 = null), t2) {
        for (o in t2) {
          u2 && o in u2 || P(r2, o, "");
        }
      }
      if (u2) {
        for (f2 in u2) {
          t2 && u2[f2] === t2[f2] || P(r2, f2, u2[f2]);
        }
      }
    }
  } else {
    l[0] === "o" && l[1] === "n" ? (e2 = l !== (l = l.replace(/Capture$/, "")), c2 = l.toLowerCase(), l = (c2 in n2 ? c2 : l).slice(2), u2 ? (t2 || n2.addEventListener(l, T, e2), (n2.t || (n2.t = {}))[l] = u2) : n2.removeEventListener(l, T, e2)) : l !== "list" && l !== "tagName" && l !== "form" && !i2 && l in n2 ? n2[l] = u2 == null ? "" : u2 : typeof u2 != "function" && l !== "dangerouslySetInnerHTML" && (l !== (l = l.replace(/^xlink:?/, "")) ? u2 == null || u2 === false ? n2.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n2.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u2) : u2 == null || u2 === false ? n2.removeAttribute(l) : n2.setAttribute(l, u2));
  }
}
function T(l) {
  return this.t[l.type](n.event ? n.event(l) : l);
}
function $(l, u2, t2, i2, r2, o, f2, e2, c2, a2) {
  var h2, v2, p, y2, w2, g2, k2, _2, C2, P2, N2 = u2.type;
  if (u2.constructor !== void 0) {
    return null;
  }
  (h2 = n.__b) && h2(u2);
  try {
    n:
      if (typeof N2 == "function") {
        if (_2 = u2.props, C2 = (h2 = N2.contextType) && i2[h2.__c], P2 = h2 ? C2 ? C2.props.value : h2.__p : i2, t2.__c ? k2 = (v2 = u2.__c = t2.__c).__p = v2.__E : ("prototype" in N2 && N2.prototype.render ? u2.__c = v2 = new N2(_2, P2) : (u2.__c = v2 = new m(_2, P2), v2.constructor = N2, v2.render = H), C2 && C2.sub(v2), v2.props = _2, v2.state || (v2.state = {}), v2.context = P2, v2.__n = i2, p = v2.__d = true, v2.__h = []), v2.__s == null && (v2.__s = v2.state), N2.getDerivedStateFromProps != null && s(v2.__s == v2.state ? v2.__s = s({}, v2.__s) : v2.__s, N2.getDerivedStateFromProps(_2, v2.__s)), p) {
          N2.getDerivedStateFromProps == null && v2.componentWillMount != null && v2.componentWillMount(), v2.componentDidMount != null && f2.push(v2);
        } else {
          if (N2.getDerivedStateFromProps == null && e2 == null && v2.componentWillReceiveProps != null && v2.componentWillReceiveProps(_2, P2), !e2 && v2.shouldComponentUpdate != null && v2.shouldComponentUpdate(_2, v2.__s, P2) === false) {
            for (v2.props = _2, v2.state = v2.__s, v2.__d = false, v2.__v = u2, u2.__e = c2 != null ? c2 !== t2.__e ? c2 : t2.__e : null, u2.__k = t2.__k, h2 = 0; h2 < u2.__k.length; h2++) {
              u2.__k[h2] && (u2.__k[h2].__p = u2);
            }
            break n;
          }
          v2.componentWillUpdate != null && v2.componentWillUpdate(_2, v2.__s, P2);
        }
        for (y2 = v2.props, w2 = v2.state, v2.context = P2, v2.props = _2, v2.state = v2.__s, (h2 = n.__r) && h2(u2), v2.__d = false, v2.__v = u2, v2.__P = l, h2 = v2.render(v2.props, v2.state, v2.context), u2.__k = x(h2 != null && h2.type == d && h2.key == null ? h2.props.children : h2), v2.getChildContext != null && (i2 = s(s({}, i2), v2.getChildContext())), p || v2.getSnapshotBeforeUpdate == null || (g2 = v2.getSnapshotBeforeUpdate(y2, w2)), b(l, u2, t2, i2, r2, o, f2, c2, a2), v2.base = u2.__e; h2 = v2.__h.pop(); ) {
          v2.__s && (v2.state = v2.__s), h2.call(v2);
        }
        p || y2 == null || v2.componentDidUpdate == null || v2.componentDidUpdate(y2, w2, g2), k2 && (v2.__E = v2.__p = null);
      } else {
        u2.__e = z(t2.__e, u2, t2, i2, r2, o, f2, a2);
      }
    (h2 = n.diffed) && h2(u2);
  } catch (l2) {
    n.__e(l2, u2, t2);
  }
  return u2.__e;
}
function j(l, u2) {
  for (var t2; t2 = l.pop(); ) {
    try {
      t2.componentDidMount();
    } catch (l2) {
      n.__e(l2, t2.__v);
    }
  }
  n.__c && n.__c(u2);
}
function z(n2, l, u2, t2, i2, r2, o, c2) {
  var s2, a2, h2, v2, p = u2.props, d2 = l.props;
  if (i2 = l.type === "svg" || i2, n2 == null && r2 != null) {
    for (s2 = 0; s2 < r2.length; s2++) {
      if ((a2 = r2[s2]) != null && (l.type === null ? a2.nodeType === 3 : a2.localName === l.type)) {
        n2 = a2, r2[s2] = null;
        break;
      }
    }
  }
  if (n2 == null) {
    if (l.type === null) {
      return document.createTextNode(d2);
    }
    n2 = i2 ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), r2 = null;
  }
  return l.type === null ? p !== d2 && (r2 != null && (r2[r2.indexOf(n2)] = null), n2.data = d2) : l !== u2 && (r2 != null && (r2 = e.slice.call(n2.childNodes)), h2 = (p = u2.props || f).dangerouslySetInnerHTML, v2 = d2.dangerouslySetInnerHTML, c2 || (v2 || h2) && (v2 && h2 && v2.__html == h2.__html || (n2.innerHTML = v2 && v2.__html || "")), C(n2, d2, p, i2, c2), l.__k = l.props.children, v2 || b(n2, l, u2, t2, l.type !== "foreignObject" && i2, r2, o, f, c2), c2 || ("value" in d2 && d2.value !== void 0 && d2.value !== n2.value && (n2.value = d2.value == null ? "" : d2.value), "checked" in d2 && d2.checked !== void 0 && d2.checked !== n2.checked && (n2.checked = d2.checked))), n2;
}
function A(l, u2, t2) {
  try {
    typeof l == "function" ? l(u2) : l.current = u2;
  } catch (l2) {
    n.__e(l2, t2);
  }
}
function D(l, u2, t2) {
  var i2, r2, o;
  if (n.unmount && n.unmount(l), (i2 = l.ref) && A(i2, null, u2), t2 || typeof l.type == "function" || (t2 = (r2 = l.__e) != null), l.__e = l.l = null, (i2 = l.__c) != null) {
    if (i2.componentWillUnmount) {
      try {
        i2.componentWillUnmount();
      } catch (l2) {
        n.__e(l2, u2);
      }
    }
    i2.base = i2.__P = null;
  }
  if (i2 = l.__k) {
    for (o = 0; o < i2.length; o++) {
      i2[o] && D(i2[o], u2, t2);
    }
  }
  r2 != null && a(r2);
}
function H(n2, l, u2) {
  return this.constructor(n2, u2);
}
function I(l, u2, t2) {
  var i2, o, c2;
  n.__p && n.__p(l, u2), o = (i2 = t2 === r) ? null : t2 && t2.__k || u2.__k, l = h(d, null, [l]), c2 = [], $(u2, i2 ? u2.__k = l : (t2 || u2).__k = l, o || f, f, u2.ownerSVGElement !== void 0, t2 && !i2 ? [t2] : o ? null : e.slice.call(u2.childNodes), c2, false, t2 || f, i2), j(c2, l);
}
n = {}, m.prototype.setState = function(n2, l) {
  var u2 = this.__s !== this.state && this.__s || (this.__s = s({}, this.state));
  (typeof n2 != "function" || (n2 = n2(u2, this.props))) && s(u2, n2), n2 != null && this.__v && (this.u = false, l && this.__h.push(l), k(this));
}, m.prototype.forceUpdate = function(n2) {
  this.__v && (n2 && this.__h.push(n2), this.u = true, k(this));
}, m.prototype.render = d, u = [], t = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, i = n.debounceRendering, n.__e = function(n2, l, u2) {
  for (var t2; l = l.__p; ) {
    if ((t2 = l.__c) && !t2.__p) {
      try {
        if (t2.constructor && t2.constructor.getDerivedStateFromError != null) {
          t2.setState(t2.constructor.getDerivedStateFromError(n2));
        } else {
          if (t2.componentDidCatch == null) {
            continue;
          }
          t2.componentDidCatch(n2);
        }
        return k(t2.__E = t2);
      } catch (l2) {
        n2 = l2;
      }
    }
  }
  throw n2;
}, r = f;
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) {
      descriptor.writable = true;
    }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) {
    _defineProperties(Constructor.prototype, protoProps);
  }
  if (staticProps) {
    _defineProperties(Constructor, staticProps);
  }
  return Constructor;
}
function _extends() {
  _extends = Object.assign || function(target) {
    var arguments$1 = arguments;
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments$1[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
var PERMISSIVE_MATCH_3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH_4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var REGEX_FUNCTIONAL_RGB = new RegExp("rgb" + PERMISSIVE_MATCH_3);
var REGEX_FUNCTIONAL_RGBA = new RegExp("rgba" + PERMISSIVE_MATCH_4);
var REGEX_FUNCTIONAL_HSL = new RegExp("hsl" + PERMISSIVE_MATCH_3);
var REGEX_FUNCTIONAL_HSLA = new RegExp("hsla" + PERMISSIVE_MATCH_4);
var HEX_START = "^(?:#?|0x?)";
var HEX_INT_SINGLE = "([0-9a-fA-F]{1})";
var HEX_INT_DOUBLE = "([0-9a-fA-F]{2})";
var REGEX_HEX_3 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + "$");
var REGEX_HEX_4 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + "$");
var REGEX_HEX_6 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + "$");
var REGEX_HEX_8 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + "$");
var KELVIN_MIN = 2e3;
var KELVIN_MAX = 4e4;
var log = Math.log, round = Math.round, floor = Math.floor;
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function parseUnit(str, max) {
  var isPercentage = str.indexOf("%") > -1;
  var num = parseFloat(str);
  return isPercentage ? max / 100 * num : num;
}
function parseHexInt(str) {
  return parseInt(str, 16);
}
function intToHex(_int) {
  return _int.toString(16).padStart(2, "0");
}
var IroColor = /* @__PURE__ */ function() {
  function IroColor2(value, onChange) {
    this.$ = {
      h: 0,
      s: 0,
      v: 0,
      a: 1
    };
    if (value) {
      this.set(value);
    }
    this.onChange = onChange;
    this.initialValue = _extends({}, this.$);
  }
  var _proto = IroColor2.prototype;
  _proto.set = function set(value) {
    if (typeof value === "string") {
      if (/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(value)) {
        this.hexString = value;
      } else if (/^rgba?/.test(value)) {
        this.rgbString = value;
      } else if (/^hsla?/.test(value)) {
        this.hslString = value;
      }
    } else if (typeof value === "object") {
      if (value instanceof IroColor2) {
        this.hsva = value.hsva;
      } else if ("r" in value && "g" in value && "b" in value) {
        this.rgb = value;
      } else if ("h" in value && "s" in value && "v" in value) {
        this.hsv = value;
      } else if ("h" in value && "s" in value && "l" in value) {
        this.hsl = value;
      } else if ("kelvin" in value) {
        this.kelvin = value.kelvin;
      }
    } else {
      throw new Error("Invalid color value");
    }
  };
  _proto.setChannel = function setChannel(format, channel, value) {
    var _extends2;
    this[format] = _extends({}, this[format], (_extends2 = {}, _extends2[channel] = value, _extends2));
  };
  _proto.reset = function reset() {
    this.hsva = this.initialValue;
  };
  _proto.clone = function clone() {
    return new IroColor2(this);
  };
  _proto.unbind = function unbind() {
    this.onChange = void 0;
  };
  IroColor2.hsvToRgb = function hsvToRgb(hsv) {
    var h2 = hsv.h / 60;
    var s2 = hsv.s / 100;
    var v2 = hsv.v / 100;
    var i2 = floor(h2);
    var f2 = h2 - i2;
    var p = v2 * (1 - s2);
    var q = v2 * (1 - f2 * s2);
    var t2 = v2 * (1 - (1 - f2) * s2);
    var mod3 = i2 % 6;
    var r2 = [v2, q, p, p, t2, v2][mod3];
    var g2 = [t2, v2, v2, q, p, p][mod3];
    var b2 = [p, p, t2, v2, v2, q][mod3];
    return {
      r: clamp(r2 * 255, 0, 255),
      g: clamp(g2 * 255, 0, 255),
      b: clamp(b2 * 255, 0, 255)
    };
  };
  IroColor2.rgbToHsv = function rgbToHsv(rgb) {
    var r2 = rgb.r / 255;
    var g2 = rgb.g / 255;
    var b2 = rgb.b / 255;
    var max = Math.max(r2, g2, b2);
    var min = Math.min(r2, g2, b2);
    var delta = max - min;
    var hue = 0;
    var value = max;
    var saturation = max === 0 ? 0 : delta / max;
    switch (max) {
      case min:
        hue = 0;
        break;
      case r2:
        hue = (g2 - b2) / delta + (g2 < b2 ? 6 : 0);
        break;
      case g2:
        hue = (b2 - r2) / delta + 2;
        break;
      case b2:
        hue = (r2 - g2) / delta + 4;
        break;
    }
    return {
      h: hue * 60 % 360,
      s: clamp(saturation * 100, 0, 100),
      v: clamp(value * 100, 0, 100)
    };
  };
  IroColor2.hsvToHsl = function hsvToHsl(hsv) {
    var s2 = hsv.s / 100;
    var v2 = hsv.v / 100;
    var l = (2 - s2) * v2;
    var divisor = l <= 1 ? l : 2 - l;
    var saturation = divisor < 1e-9 ? 0 : s2 * v2 / divisor;
    return {
      h: hsv.h,
      s: clamp(saturation * 100, 0, 100),
      l: clamp(l * 50, 0, 100)
    };
  };
  IroColor2.hslToHsv = function hslToHsv(hsl) {
    var l = hsl.l * 2;
    var s2 = hsl.s * (l <= 100 ? l : 200 - l) / 100;
    var saturation = l + s2 < 1e-9 ? 0 : 2 * s2 / (l + s2);
    return {
      h: hsl.h,
      s: clamp(saturation * 100, 0, 100),
      v: clamp((l + s2) / 2, 0, 100)
    };
  };
  IroColor2.kelvinToRgb = function kelvinToRgb(kelvin) {
    var temp = kelvin / 100;
    var r2, g2, b2;
    if (temp < 66) {
      r2 = 255;
      g2 = -155.25485562709179 - 0.44596950469579133 * (g2 = temp - 2) + 104.49216199393888 * log(g2);
      b2 = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b2 = temp - 10) + 115.67994401066147 * log(b2);
    } else {
      r2 = 351.97690566805693 + 0.114206453784165 * (r2 = temp - 55) - 40.25366309332127 * log(r2);
      g2 = 325.4494125711974 + 0.07943456536662342 * (g2 = temp - 50) - 28.0852963507957 * log(g2);
      b2 = 255;
    }
    return {
      r: clamp(floor(r2), 0, 255),
      g: clamp(floor(g2), 0, 255),
      b: clamp(floor(b2), 0, 255)
    };
  };
  IroColor2.rgbToKelvin = function rgbToKelvin(rgb) {
    var r2 = rgb.r, b2 = rgb.b;
    var eps = 0.4;
    var minTemp = KELVIN_MIN;
    var maxTemp = KELVIN_MAX;
    var temp;
    while (maxTemp - minTemp > eps) {
      temp = (maxTemp + minTemp) * 0.5;
      var _rgb = IroColor2.kelvinToRgb(temp);
      if (_rgb.b / _rgb.r >= b2 / r2) {
        maxTemp = temp;
      } else {
        minTemp = temp;
      }
    }
    return temp;
  };
  _createClass(IroColor2, [{
    key: "hsv",
    get: function get() {
      var value = this.$;
      return {
        h: value.h,
        s: value.s,
        v: value.v
      };
    },
    set: function set(newValue) {
      var oldValue = this.$;
      newValue = _extends({}, oldValue, newValue);
      if (this.onChange) {
        var changes = {
          h: false,
          v: false,
          s: false,
          a: false
        };
        for (var key in oldValue) {
          changes[key] = newValue[key] != oldValue[key];
        }
        this.$ = newValue;
        if (changes.h || changes.s || changes.v || changes.a) {
          this.onChange(this, changes);
        }
      } else {
        this.$ = newValue;
      }
    }
  }, {
    key: "hsva",
    get: function get() {
      return _extends({}, this.$);
    },
    set: function set(value) {
      this.hsv = value;
    }
  }, {
    key: "hue",
    get: function get() {
      return this.$.h;
    },
    set: function set(value) {
      this.hsv = {
        h: value
      };
    }
  }, {
    key: "saturation",
    get: function get() {
      return this.$.s;
    },
    set: function set(value) {
      this.hsv = {
        s: value
      };
    }
  }, {
    key: "value",
    get: function get() {
      return this.$.v;
    },
    set: function set(value) {
      this.hsv = {
        v: value
      };
    }
  }, {
    key: "alpha",
    get: function get() {
      return this.$.a;
    },
    set: function set(value) {
      this.hsv = _extends({}, this.hsv, {
        a: value
      });
    }
  }, {
    key: "kelvin",
    get: function get() {
      return IroColor2.rgbToKelvin(this.rgb);
    },
    set: function set(value) {
      this.rgb = IroColor2.kelvinToRgb(value);
    }
  }, {
    key: "red",
    get: function get() {
      var rgb = this.rgb;
      return rgb.r;
    },
    set: function set(value) {
      this.rgb = _extends({}, this.rgb, {
        r: value
      });
    }
  }, {
    key: "green",
    get: function get() {
      var rgb = this.rgb;
      return rgb.g;
    },
    set: function set(value) {
      this.rgb = _extends({}, this.rgb, {
        g: value
      });
    }
  }, {
    key: "blue",
    get: function get() {
      var rgb = this.rgb;
      return rgb.b;
    },
    set: function set(value) {
      this.rgb = _extends({}, this.rgb, {
        b: value
      });
    }
  }, {
    key: "rgb",
    get: function get() {
      var _IroColor$hsvToRgb = IroColor2.hsvToRgb(this.$), r2 = _IroColor$hsvToRgb.r, g2 = _IroColor$hsvToRgb.g, b2 = _IroColor$hsvToRgb.b;
      return {
        r: round(r2),
        g: round(g2),
        b: round(b2)
      };
    },
    set: function set(value) {
      this.hsv = _extends({}, IroColor2.rgbToHsv(value), {
        a: value.a === void 0 ? 1 : value.a
      });
    }
  }, {
    key: "rgba",
    get: function get() {
      return _extends({}, this.rgb, {
        a: this.alpha
      });
    },
    set: function set(value) {
      this.rgb = value;
    }
  }, {
    key: "hsl",
    get: function get() {
      var _IroColor$hsvToHsl = IroColor2.hsvToHsl(this.$), h2 = _IroColor$hsvToHsl.h, s2 = _IroColor$hsvToHsl.s, l = _IroColor$hsvToHsl.l;
      return {
        h: round(h2),
        s: round(s2),
        l: round(l)
      };
    },
    set: function set(value) {
      this.hsv = _extends({}, IroColor2.hslToHsv(value), {
        a: value.a === void 0 ? 1 : value.a
      });
    }
  }, {
    key: "hsla",
    get: function get() {
      return _extends({}, this.hsl, {
        a: this.alpha
      });
    },
    set: function set(value) {
      this.hsl = value;
    }
  }, {
    key: "rgbString",
    get: function get() {
      var rgb = this.rgb;
      return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    },
    set: function set(value) {
      var match;
      var r2, g2, b2, a2 = 1;
      if (match = REGEX_FUNCTIONAL_RGB.exec(value)) {
        r2 = parseUnit(match[1], 255);
        g2 = parseUnit(match[2], 255);
        b2 = parseUnit(match[3], 255);
      } else if (match = REGEX_FUNCTIONAL_RGBA.exec(value)) {
        r2 = parseUnit(match[1], 255);
        g2 = parseUnit(match[2], 255);
        b2 = parseUnit(match[3], 255);
        a2 = parseUnit(match[4], 1);
      }
      if (match) {
        this.rgb = {
          r: r2,
          g: g2,
          b: b2,
          a: a2
        };
      } else {
        throw new Error("Invalid rgb string");
      }
    }
  }, {
    key: "rgbaString",
    get: function get() {
      var rgba = this.rgba;
      return "rgba(" + rgba.r + ", " + rgba.g + ", " + rgba.b + ", " + rgba.a + ")";
    },
    set: function set(value) {
      this.rgbString = value;
    }
  }, {
    key: "hexString",
    get: function get() {
      var rgb = this.rgb;
      return "#" + intToHex(rgb.r) + intToHex(rgb.g) + intToHex(rgb.b);
    },
    set: function set(value) {
      var match;
      var r2, g2, b2, a2 = 255;
      if (match = REGEX_HEX_3.exec(value)) {
        r2 = parseHexInt(match[1]) * 17;
        g2 = parseHexInt(match[2]) * 17;
        b2 = parseHexInt(match[3]) * 17;
      } else if (match = REGEX_HEX_4.exec(value)) {
        r2 = parseHexInt(match[1]) * 17;
        g2 = parseHexInt(match[2]) * 17;
        b2 = parseHexInt(match[3]) * 17;
        a2 = parseHexInt(match[4]) * 17;
      } else if (match = REGEX_HEX_6.exec(value)) {
        r2 = parseHexInt(match[1]);
        g2 = parseHexInt(match[2]);
        b2 = parseHexInt(match[3]);
      } else if (match = REGEX_HEX_8.exec(value)) {
        r2 = parseHexInt(match[1]);
        g2 = parseHexInt(match[2]);
        b2 = parseHexInt(match[3]);
        a2 = parseHexInt(match[4]);
      }
      if (match) {
        this.rgb = {
          r: r2,
          g: g2,
          b: b2,
          a: a2 / 255
        };
      } else {
        throw new Error("Invalid hex string");
      }
    }
  }, {
    key: "hex8String",
    get: function get() {
      var rgba = this.rgba;
      return "#" + intToHex(rgba.r) + intToHex(rgba.g) + intToHex(rgba.b) + intToHex(floor(rgba.a * 255));
    },
    set: function set(value) {
      this.hexString = value;
    }
  }, {
    key: "hslString",
    get: function get() {
      var hsl = this.hsl;
      return "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
    },
    set: function set(value) {
      var match;
      var h2, s2, l, a2 = 1;
      if (match = REGEX_FUNCTIONAL_HSL.exec(value)) {
        h2 = parseUnit(match[1], 360);
        s2 = parseUnit(match[2], 100);
        l = parseUnit(match[3], 100);
      } else if (match = REGEX_FUNCTIONAL_HSLA.exec(value)) {
        h2 = parseUnit(match[1], 360);
        s2 = parseUnit(match[2], 100);
        l = parseUnit(match[3], 100);
        a2 = parseUnit(match[4], 1);
      }
      if (match) {
        this.hsl = {
          h: h2,
          s: s2,
          l,
          a: a2
        };
      } else {
        throw new Error("Invalid hsl string");
      }
    }
  }, {
    key: "hslaString",
    get: function get() {
      var hsla = this.hsla;
      return "hsla(" + hsla.h + ", " + hsla.s + "%, " + hsla.l + "%, " + hsla.a + ")";
    },
    set: function set(value) {
      this.hslString = value;
    }
  }]);
  return IroColor2;
}();
var sliderDefaultOptions = {
  sliderShape: "bar",
  sliderType: "value",
  minTemperature: 2200,
  maxTemperature: 11e3
};
function getSliderDimensions(props) {
  var _sliderSize;
  var width = props.width, sliderSize = props.sliderSize, borderWidth = props.borderWidth, handleRadius = props.handleRadius, padding = props.padding, sliderShape = props.sliderShape;
  var ishorizontal = props.layoutDirection === "horizontal";
  sliderSize = (_sliderSize = sliderSize) != null ? _sliderSize : padding * 2 + handleRadius * 2;
  if (sliderShape === "circle") {
    return {
      handleStart: props.padding + props.handleRadius,
      handleRange: width - padding * 2 - handleRadius * 2,
      width,
      height: width,
      cx: width / 2,
      cy: width / 2,
      radius: width / 2 - borderWidth / 2
    };
  } else {
    return {
      handleStart: sliderSize / 2,
      handleRange: width - sliderSize,
      radius: sliderSize / 2,
      x: 0,
      y: 0,
      width: ishorizontal ? sliderSize : width,
      height: ishorizontal ? width : sliderSize
    };
  }
}
function getCurrentSliderValue(props, color) {
  var hsva = color.hsva;
  var rgb = color.rgb;
  switch (props.sliderType) {
    case "red":
      return rgb.r / 2.55;
    case "green":
      return rgb.g / 2.55;
    case "blue":
      return rgb.b / 2.55;
    case "alpha":
      return hsva.a * 100;
    case "kelvin":
      var minTemperature = props.minTemperature, maxTemperature = props.maxTemperature;
      var temperatureRange = maxTemperature - minTemperature;
      var percent = (color.kelvin - minTemperature) / temperatureRange * 100;
      return Math.max(0, Math.min(percent, 100));
    case "hue":
      return hsva.h /= 3.6;
    case "saturation":
      return hsva.s;
    case "value":
    default:
      return hsva.v;
  }
}
function getSliderValueFromInput(props, x2, y2) {
  var _getSliderDimensions = getSliderDimensions(props), handleRange = _getSliderDimensions.handleRange, handleStart = _getSliderDimensions.handleStart;
  var handlePos;
  if (props.layoutDirection === "horizontal") {
    handlePos = -1 * y2 + handleRange + handleStart;
  } else {
    handlePos = x2 - handleStart;
  }
  handlePos = Math.max(Math.min(handlePos, handleRange), 0);
  var percent = Math.round(100 / handleRange * handlePos);
  switch (props.sliderType) {
    case "kelvin":
      var minTemperature = props.minTemperature, maxTemperature = props.maxTemperature;
      var temperatureRange = maxTemperature - minTemperature;
      return minTemperature + temperatureRange * (percent / 100);
    case "alpha":
      return percent / 100;
    case "hue":
      return percent * 3.6;
    case "red":
    case "blue":
    case "green":
      return percent * 2.55;
    default:
      return percent;
  }
}
function getSliderHandlePosition(props, color) {
  var _getSliderDimensions2 = getSliderDimensions(props), width = _getSliderDimensions2.width, height = _getSliderDimensions2.height, handleRange = _getSliderDimensions2.handleRange, handleStart = _getSliderDimensions2.handleStart;
  var ishorizontal = props.layoutDirection === "horizontal";
  var sliderValue = getCurrentSliderValue(props, color);
  var midPoint = ishorizontal ? width / 2 : height / 2;
  var handlePos = handleStart + sliderValue / 100 * handleRange;
  if (ishorizontal) {
    handlePos = -1 * handlePos + handleRange + handleStart * 2;
  }
  return {
    x: ishorizontal ? midPoint : handlePos,
    y: ishorizontal ? handlePos : midPoint
  };
}
function getSliderGradient(props, color) {
  var hsv = color.hsv;
  var rgb = color.rgb;
  switch (props.sliderType) {
    case "red":
      return [[0, "rgb(" + 0 + "," + rgb.g + "," + rgb.b + ")"], [100, "rgb(" + 255 + "," + rgb.g + "," + rgb.b + ")"]];
    case "green":
      return [[0, "rgb(" + rgb.r + "," + 0 + "," + rgb.b + ")"], [100, "rgb(" + rgb.r + "," + 255 + "," + rgb.b + ")"]];
    case "blue":
      return [[0, "rgb(" + rgb.r + "," + rgb.g + "," + 0 + ")"], [100, "rgb(" + rgb.r + "," + rgb.g + "," + 255 + ")"]];
    case "alpha":
      return [[0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0)"], [100, "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"]];
    case "kelvin":
      var stops = [];
      var min = props.minTemperature;
      var max = props.maxTemperature;
      var numStops = 8;
      var range = max - min;
      for (var kelvin = min, stop = 0; kelvin < max; kelvin += range / numStops, stop += 1) {
        var _IroColor$kelvinToRgb = IroColor.kelvinToRgb(kelvin), r2 = _IroColor$kelvinToRgb.r, g2 = _IroColor$kelvinToRgb.g, b2 = _IroColor$kelvinToRgb.b;
        stops.push([100 / numStops * stop, "rgb(" + r2 + "," + g2 + "," + b2 + ")"]);
      }
      return stops;
    case "hue":
      return [[0, "#f00"], [16.666, "#ff0"], [33.333, "#0f0"], [50, "#0ff"], [66.666, "#00f"], [83.333, "#f0f"], [100, "#f00"]];
    case "saturation":
      var noSat = IroColor.hsvToHsl({
        h: hsv.h,
        s: 0,
        v: hsv.v
      });
      var fullSat = IroColor.hsvToHsl({
        h: hsv.h,
        s: 100,
        v: hsv.v
      });
      return [[0, "hsl(" + noSat.h + "," + noSat.s + "%," + noSat.l + "%)"], [100, "hsl(" + fullSat.h + "," + fullSat.s + "%," + fullSat.l + "%)"]];
    case "value":
    default:
      var hsl = IroColor.hsvToHsl({
        h: hsv.h,
        s: hsv.s,
        v: 100
      });
      return [[0, "#000"], [100, "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)"]];
  }
}
var TAU = Math.PI * 2;
var mod = function mod2(a2, n2) {
  return (a2 % n2 + n2) % n2;
};
var dist = function dist2(x2, y2) {
  return Math.sqrt(x2 * x2 + y2 * y2);
};
function getHandleRange(props) {
  return props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
}
function isInputInsideWheel(props, x2, y2) {
  var _getWheelDimensions = getWheelDimensions(props), cx = _getWheelDimensions.cx, cy = _getWheelDimensions.cy;
  var r2 = props.width / 2;
  return dist(cx - x2, cy - y2) < r2;
}
function getWheelDimensions(props) {
  var r2 = props.width / 2;
  return {
    width: props.width,
    radius: r2 - props.borderWidth,
    cx: r2,
    cy: r2
  };
}
function translateWheelAngle(props, angle, invert) {
  var wheelAngle = props.wheelAngle;
  var wheelDirection = props.wheelDirection;
  if (invert && wheelDirection === "clockwise") {
    angle = wheelAngle + angle;
  } else if (wheelDirection === "clockwise") {
    angle = 360 - wheelAngle + angle;
  } else if (invert && wheelDirection === "anticlockwise") {
    angle = wheelAngle + 180 - angle;
  } else if (wheelDirection === "anticlockwise") {
    angle = wheelAngle - angle;
  }
  return mod(angle, 360);
}
function getWheelHandlePosition(props, color) {
  var hsv = color.hsv;
  var _getWheelDimensions2 = getWheelDimensions(props), cx = _getWheelDimensions2.cx, cy = _getWheelDimensions2.cy;
  var handleRange = getHandleRange(props);
  var handleAngle = (180 + translateWheelAngle(props, hsv.h, true)) * (TAU / 360);
  var handleDist = hsv.s / 100 * handleRange;
  var direction = props.wheelDirection === "clockwise" ? -1 : 1;
  return {
    x: cx + handleDist * Math.cos(handleAngle) * direction,
    y: cy + handleDist * Math.sin(handleAngle) * direction
  };
}
function getWheelValueFromInput(props, x2, y2) {
  var _getWheelDimensions3 = getWheelDimensions(props), cx = _getWheelDimensions3.cx, cy = _getWheelDimensions3.cy;
  var handleRange = getHandleRange(props);
  x2 = cx - x2;
  y2 = cy - y2;
  var hue = translateWheelAngle(props, Math.atan2(-y2, -x2) * (360 / TAU));
  var handleDist = Math.min(dist(x2, y2), handleRange);
  return {
    h: Math.round(hue),
    s: Math.round(100 / handleRange * handleDist)
  };
}
function getBoxDimensions(props) {
  var width = props.width, boxHeight = props.boxHeight, padding = props.padding, handleRadius = props.handleRadius;
  return {
    width,
    height: boxHeight != null ? boxHeight : width,
    radius: padding + handleRadius
  };
}
function getBoxValueFromInput(props, x2, y2) {
  var _getBoxDimensions = getBoxDimensions(props), width = _getBoxDimensions.width, height = _getBoxDimensions.height, radius = _getBoxDimensions.radius;
  var handleStart = radius;
  var handleRangeX = width - radius * 2;
  var handleRangeY = height - radius * 2;
  var percentX = (x2 - handleStart) / handleRangeX * 100;
  var percentY = (y2 - handleStart) / handleRangeY * 100;
  return {
    s: Math.max(0, Math.min(percentX, 100)),
    v: Math.max(0, Math.min(100 - percentY, 100))
  };
}
function getBoxHandlePosition(props, color) {
  var _getBoxDimensions2 = getBoxDimensions(props), width = _getBoxDimensions2.width, height = _getBoxDimensions2.height, radius = _getBoxDimensions2.radius;
  var hsv = color.hsv;
  var handleStart = radius;
  var handleRangeX = width - radius * 2;
  var handleRangeY = height - radius * 2;
  return {
    x: handleStart + hsv.s / 100 * handleRangeX,
    y: handleStart + (handleRangeY - hsv.v / 100 * handleRangeY)
  };
}
function getBoxGradients(props, color) {
  var hue = color.hue;
  return [
    [[0, "#fff"], [100, "hsl(" + hue + ",100%,50%)"]],
    [[0, "rgba(0,0,0,0)"], [100, "#000"]]
  ];
}
var BASE_ELEMENTS;
function resolveSvgUrl(url) {
  if (!BASE_ELEMENTS) {
    BASE_ELEMENTS = document.getElementsByTagName("base");
  }
  var ua = window.navigator.userAgent;
  var isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  var isIos = /iPhone|iPod|iPad/i.test(ua);
  var location = window.location;
  return (isSafari || isIos) && BASE_ELEMENTS.length > 0 ? location.protocol + "//" + location.host + location.pathname + location.search + url : url;
}
function getHandleAtPoint(props, x2, y2, handlePositions) {
  for (var i2 = 0; i2 < handlePositions.length; i2++) {
    var dX = handlePositions[i2].x - x2;
    var dY = handlePositions[i2].y - y2;
    var dist3 = Math.sqrt(dX * dX + dY * dY);
    if (dist3 < props.handleRadius) {
      return i2;
    }
  }
  return null;
}
function cssBorderStyles(props) {
  return {
    boxSizing: "border-box",
    border: props.borderWidth + "px solid " + props.borderColor
  };
}
function cssGradient(type, direction, stops) {
  return type + "-gradient(" + direction + ", " + stops.map(function(_ref) {
    var o = _ref[0], col = _ref[1];
    return col + " " + o + "%";
  }).join(",") + ")";
}
function cssValue(value) {
  if (typeof value === "string") {
    return value;
  }
  return value + "px";
}
var iroColorPickerOptionDefaults = {
  width: 300,
  height: 300,
  color: "#fff",
  colors: [],
  padding: 6,
  layoutDirection: "vertical",
  borderColor: "#fff",
  borderWidth: 0,
  handleRadius: 8,
  activeHandleRadius: null,
  handleSvg: null,
  handleProps: {
    x: 0,
    y: 0
  },
  wheelLightness: true,
  wheelAngle: 0,
  wheelDirection: "anticlockwise",
  sliderSize: null,
  sliderMargin: 12,
  boxHeight: null
};
var SECONDARY_EVENTS = ["mousemove", "touchmove", "mouseup", "touchend"];
var IroComponentWrapper = /* @__PURE__ */ function(Component) {
  function IroComponentWrapper2(props) {
    Component.call(this, props);
    this.uid = (Math.random() + 1).toString(36).substring(5);
  }
  if (Component)
    IroComponentWrapper2.__proto__ = Component;
  IroComponentWrapper2.prototype = Object.create(Component && Component.prototype);
  IroComponentWrapper2.prototype.constructor = IroComponentWrapper2;
  IroComponentWrapper2.prototype.render = function render(props) {
    var eventHandler = this.handleEvent.bind(this);
    var rootProps = {
      onMouseDown: eventHandler,
      ontouchstart: eventHandler
    };
    var isHorizontal = props.layoutDirection === "horizontal";
    var margin = props.margin === null ? props.sliderMargin : props.margin;
    var rootStyles = {
      overflow: "visible",
      display: isHorizontal ? "inline-block" : "block"
    };
    if (props.index > 0) {
      rootStyles[isHorizontal ? "marginLeft" : "marginTop"] = margin;
    }
    return h(d, null, props.children(this.uid, rootProps, rootStyles));
  };
  IroComponentWrapper2.prototype.handleEvent = function handleEvent(e2) {
    var this$1$1 = this;
    var inputHandler = this.props.onInput;
    var bounds = this.base.getBoundingClientRect();
    e2.preventDefault();
    var point = e2.touches ? e2.changedTouches[0] : e2;
    var x2 = point.clientX - bounds.left;
    var y2 = point.clientY - bounds.top;
    switch (e2.type) {
      case "mousedown":
      case "touchstart":
        var result = inputHandler(x2, y2, 0);
        if (result !== false) {
          SECONDARY_EVENTS.forEach(function(event) {
            document.addEventListener(event, this$1$1, { passive: false });
          });
        }
        break;
      case "mousemove":
      case "touchmove":
        inputHandler(x2, y2, 1);
        break;
      case "mouseup":
      case "touchend":
        inputHandler(x2, y2, 2);
        SECONDARY_EVENTS.forEach(function(event) {
          document.removeEventListener(event, this$1$1, { passive: false });
        });
        break;
    }
  };
  return IroComponentWrapper2;
}(m);
function IroHandle(props) {
  var radius = props.r;
  var url = props.url;
  var cx = radius;
  var cy = radius;
  return h("svg", { className: "IroHandle IroHandle--" + props.index + " " + (props.isActive ? "IroHandle--isActive" : ""), style: {
    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0);",
    transform: "translate(" + cssValue(props.x) + ", " + cssValue(props.y) + ")",
    willChange: "transform",
    top: cssValue(-radius),
    left: cssValue(-radius),
    width: cssValue(radius * 2),
    height: cssValue(radius * 2),
    position: "absolute",
    overflow: "visible"
  } }, url && h("use", Object.assign({ xlinkHref: resolveSvgUrl(url) }, props.props)), !url && h("circle", { cx, cy, r: radius, fill: "none", "stroke-width": 2, stroke: "#000" }), !url && h("circle", { cx, cy, r: radius - 2, fill: props.fill, "stroke-width": 2, stroke: "#fff" }));
}
IroHandle.defaultProps = {
  fill: "none",
  x: 0,
  y: 0,
  r: 8,
  url: null,
  props: { x: 0, y: 0 }
};
function IroSlider(props) {
  var activeIndex = props.activeIndex;
  var activeColor = activeIndex !== void 0 && activeIndex < props.colors.length ? props.colors[activeIndex] : props.color;
  var ref = getSliderDimensions(props);
  var width = ref.width;
  var height = ref.height;
  var radius = ref.radius;
  var handlePos = getSliderHandlePosition(props, activeColor);
  var gradient = getSliderGradient(props, activeColor);
  function handleInput(x2, y2, type) {
    var value = getSliderValueFromInput(props, x2, y2);
    props.parent.inputActive = true;
    activeColor[props.sliderType] = value;
    props.onInput(type, props.id);
  }
  return h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function(uid, rootProps, rootStyles) {
    return h("div", Object.assign({}, rootProps, { className: "IroSlider", style: Object.assign({}, {
      position: "relative",
      width: cssValue(width),
      height: cssValue(height),
      borderRadius: cssValue(radius),
      background: "conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",
      backgroundSize: "8px 8px"
    }, rootStyles) }), h("div", { className: "IroSliderGradient", style: Object.assign({}, {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: cssValue(radius),
      background: cssGradient("linear", props.layoutDirection === "horizontal" ? "to top" : "to right", gradient)
    }, cssBorderStyles(props)) }), h(IroHandle, { isActive: true, index: activeColor.index, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePos.x, y: handlePos.y }));
  });
}
IroSlider.defaultProps = Object.assign({}, sliderDefaultOptions);
function IroBox(props) {
  var ref = getBoxDimensions(props);
  var width = ref.width;
  var height = ref.height;
  var radius = ref.radius;
  var colors = props.colors;
  var colorPicker = props.parent;
  var activeIndex = props.activeIndex;
  var activeColor = activeIndex !== void 0 && activeIndex < props.colors.length ? props.colors[activeIndex] : props.color;
  var gradients = getBoxGradients(props, activeColor);
  var handlePositions = colors.map(function(color) {
    return getBoxHandlePosition(props, color);
  });
  function handleInput(x2, y2, inputType) {
    if (inputType === 0) {
      var activeHandle = getHandleAtPoint(props, x2, y2, handlePositions);
      if (activeHandle !== null) {
        colorPicker.setActiveColor(activeHandle);
      } else {
        colorPicker.inputActive = true;
        activeColor.hsv = getBoxValueFromInput(props, x2, y2);
        props.onInput(inputType, props.id);
      }
    } else if (inputType === 1) {
      colorPicker.inputActive = true;
      activeColor.hsv = getBoxValueFromInput(props, x2, y2);
    }
    props.onInput(inputType, props.id);
  }
  return h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function(uid, rootProps, rootStyles) {
    return h("div", Object.assign({}, rootProps, { className: "IroBox", style: Object.assign({}, {
      width: cssValue(width),
      height: cssValue(height),
      position: "relative"
    }, rootStyles) }), h("div", { className: "IroBox", style: Object.assign({}, {
      width: "100%",
      height: "100%",
      borderRadius: cssValue(radius)
    }, cssBorderStyles(props), { background: cssGradient("linear", "to bottom", gradients[1]) + "," + cssGradient("linear", "to right", gradients[0]) }) }), colors.filter(function(color) {
      return color !== activeColor;
    }).map(function(color) {
      return h(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y });
    }), h(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.activeHandleRadius || props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }));
  });
}
var HUE_GRADIENT_CLOCKWISE = "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)";
var HUE_GRADIENT_ANTICLOCKWISE = "conic-gradient(red, magenta, blue, aqua, lime, yellow, red)";
function IroWheel(props) {
  var ref = getWheelDimensions(props);
  var width = ref.width;
  var colors = props.colors;
  props.borderWidth;
  var colorPicker = props.parent;
  var activeColor = props.color;
  var hsv = activeColor.hsv;
  var handlePositions = colors.map(function(color) {
    return getWheelHandlePosition(props, color);
  });
  var circleStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    boxSizing: "border-box"
  };
  function handleInput(x2, y2, inputType) {
    if (inputType === 0) {
      if (!isInputInsideWheel(props, x2, y2)) {
        return false;
      }
      var activeHandle = getHandleAtPoint(props, x2, y2, handlePositions);
      if (activeHandle !== null) {
        colorPicker.setActiveColor(activeHandle);
      } else {
        colorPicker.inputActive = true;
        activeColor.hsv = getWheelValueFromInput(props, x2, y2);
        props.onInput(inputType, props.id);
      }
    } else if (inputType === 1) {
      colorPicker.inputActive = true;
      activeColor.hsv = getWheelValueFromInput(props, x2, y2);
    }
    props.onInput(inputType, props.id);
  }
  return h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function(uid, rootProps, rootStyles) {
    return h("div", Object.assign({}, rootProps, { className: "IroWheel", style: Object.assign({}, {
      width: cssValue(width),
      height: cssValue(width),
      position: "relative"
    }, rootStyles) }), h("div", { className: "IroWheelHue", style: Object.assign({}, circleStyles, {
      transform: "rotateZ(" + (props.wheelAngle + 90) + "deg)",
      background: props.wheelDirection === "clockwise" ? HUE_GRADIENT_CLOCKWISE : HUE_GRADIENT_ANTICLOCKWISE
    }) }), h("div", { className: "IroWheelSaturation", style: Object.assign({}, circleStyles, { background: "radial-gradient(circle closest-side, #fff, transparent)" }) }), props.wheelLightness && h("div", { className: "IroWheelLightness", style: Object.assign({}, circleStyles, {
      background: "#000",
      opacity: 1 - hsv.v / 100
    }) }), h("div", { className: "IroWheelBorder", style: Object.assign({}, circleStyles, cssBorderStyles(props)) }), colors.filter(function(color) {
      return color !== activeColor;
    }).map(function(color) {
      return h(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y });
    }), h(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.activeHandleRadius || props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }));
  });
}
function createWidget(WidgetComponent) {
  var widgetFactory = function(parent, props) {
    var widget;
    var widgetRoot = document.createElement("div");
    I(h(WidgetComponent, Object.assign({}, { ref: function(ref) {
      return widget = ref;
    } }, props)), widgetRoot);
    function mountWidget() {
      var container = parent instanceof Element ? parent : document.querySelector(parent);
      container.appendChild(widget.base);
      widget.onMount(container);
    }
    if (document.readyState !== "loading") {
      mountWidget();
    } else {
      document.addEventListener("DOMContentLoaded", mountWidget);
    }
    return widget;
  };
  widgetFactory.prototype = WidgetComponent.prototype;
  Object.assign(widgetFactory, WidgetComponent);
  widgetFactory.__component = WidgetComponent;
  return widgetFactory;
}
var IroColorPicker = /* @__PURE__ */ function(Component) {
  function IroColorPicker2(props) {
    var this$1$1 = this;
    Component.call(this, props);
    this.colors = [];
    this.inputActive = false;
    this.events = {};
    this.activeEvents = {};
    this.deferredEvents = {};
    this.id = props.id;
    var colors = props.colors.length > 0 ? props.colors : [props.color];
    colors.forEach(function(colorValue) {
      return this$1$1.addColor(colorValue);
    });
    this.setActiveColor(0);
    this.state = Object.assign({}, props, {
      color: this.color,
      colors: this.colors,
      layout: props.layout
    });
  }
  if (Component)
    IroColorPicker2.__proto__ = Component;
  IroColorPicker2.prototype = Object.create(Component && Component.prototype);
  IroColorPicker2.prototype.constructor = IroColorPicker2;
  IroColorPicker2.prototype.addColor = function addColor(color, index2) {
    if (index2 === void 0)
      index2 = this.colors.length;
    var newColor = new IroColor(color, this.onColorChange.bind(this));
    this.colors.splice(index2, 0, newColor);
    this.colors.forEach(function(color2, index3) {
      return color2.index = index3;
    });
    if (this.state) {
      this.setState({ colors: this.colors });
    }
    this.deferredEmit("color:init", newColor);
  };
  IroColorPicker2.prototype.removeColor = function removeColor(index2) {
    var color = this.colors.splice(index2, 1)[0];
    color.unbind();
    this.colors.forEach(function(color2, index3) {
      return color2.index = index3;
    });
    if (this.state) {
      this.setState({ colors: this.colors });
    }
    if (color.index === this.color.index) {
      this.setActiveColor(0);
    }
    this.emit("color:remove", color);
  };
  IroColorPicker2.prototype.setActiveColor = function setActiveColor(index2) {
    this.color = this.colors[index2];
    if (this.state) {
      this.setState({ color: this.color });
    }
    this.emit("color:setActive", this.color);
  };
  IroColorPicker2.prototype.setColors = function setColors(newColorValues, activeColorIndex) {
    var this$1$1 = this;
    if (activeColorIndex === void 0)
      activeColorIndex = 0;
    this.colors.forEach(function(color) {
      return color.unbind();
    });
    this.colors = [];
    newColorValues.forEach(function(colorValue) {
      return this$1$1.addColor(colorValue);
    });
    this.setActiveColor(activeColorIndex);
    this.emit("color:setAll", this.colors);
  };
  IroColorPicker2.prototype.on = function on(eventList, callback) {
    var this$1$1 = this;
    var events = this.events;
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function(eventType) {
      (events[eventType] || (events[eventType] = [])).push(callback);
      if (this$1$1.deferredEvents[eventType]) {
        this$1$1.deferredEvents[eventType].forEach(function(args) {
          callback.apply(null, args);
        });
        this$1$1.deferredEvents[eventType] = [];
      }
    });
  };
  IroColorPicker2.prototype.off = function off(eventList, callback) {
    var this$1$1 = this;
    (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function(eventType) {
      var callbackList = this$1$1.events[eventType];
      if (callbackList) {
        callbackList.splice(callbackList.indexOf(callback), 1);
      }
    });
  };
  IroColorPicker2.prototype.emit = function emit(eventType) {
    var this$1$1 = this;
    var args = [], len = arguments.length - 1;
    while (len-- > 0)
      args[len] = arguments[len + 1];
    var activeEvents = this.activeEvents;
    var isEventActive = activeEvents.hasOwnProperty(eventType) ? activeEvents[eventType] : false;
    if (!isEventActive) {
      activeEvents[eventType] = true;
      var callbackList = this.events[eventType] || [];
      callbackList.forEach(function(fn) {
        return fn.apply(this$1$1, args);
      });
      activeEvents[eventType] = false;
    }
  };
  IroColorPicker2.prototype.deferredEmit = function deferredEmit(eventType) {
    var ref;
    var args = [], len = arguments.length - 1;
    while (len-- > 0)
      args[len] = arguments[len + 1];
    var deferredEvents = this.deferredEvents;
    (ref = this).emit.apply(ref, [eventType].concat(args));
    (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
  };
  IroColorPicker2.prototype.setOptions = function setOptions2(newOptions) {
    this.setState(newOptions);
  };
  IroColorPicker2.prototype.resize = function resize(width) {
    this.setOptions({ width });
  };
  IroColorPicker2.prototype.reset = function reset() {
    this.colors.forEach(function(color) {
      return color.reset();
    });
    this.setState({ colors: this.colors });
  };
  IroColorPicker2.prototype.onMount = function onMount(container) {
    this.el = container;
    this.deferredEmit("mount", this);
  };
  IroColorPicker2.prototype.onColorChange = function onColorChange(color, changes) {
    this.setState({ color: this.color });
    if (this.inputActive) {
      this.inputActive = false;
      this.emit("input:change", color, changes);
    }
    this.emit("color:change", color, changes);
  };
  IroColorPicker2.prototype.emitInputEvent = function emitInputEvent(type, originId) {
    if (type === 0) {
      this.emit("input:start", this.color, originId);
    } else if (type === 1) {
      this.emit("input:move", this.color, originId);
    } else if (type === 2) {
      this.emit("input:end", this.color, originId);
    }
  };
  IroColorPicker2.prototype.render = function render(props, state) {
    var this$1$1 = this;
    var layout = state.layout;
    if (!Array.isArray(layout)) {
      switch (layout) {
        default:
          layout = [
            { component: IroWheel },
            { component: IroSlider }
          ];
      }
      if (state.transparency) {
        layout.push({
          component: IroSlider,
          options: {
            sliderType: "alpha"
          }
        });
      }
    }
    return h("div", { class: "IroColorPicker", id: state.id, style: {
      display: state.display
    } }, layout.map(function(ref, componentIndex) {
      var UiComponent = ref.component;
      var options = ref.options;
      return h(UiComponent, Object.assign({}, state, options, { ref: void 0, onInput: this$1$1.emitInputEvent.bind(this$1$1), parent: this$1$1, index: componentIndex }));
    }));
  };
  return IroColorPicker2;
}(m);
IroColorPicker.defaultProps = Object.assign({}, iroColorPickerOptionDefaults, {
  colors: [],
  display: "block",
  id: null,
  layout: "default",
  margin: null
});
var IroColorPickerWidget = createWidget(IroColorPicker);
var iro;
(function(iro2) {
  iro2.version = "5.5.2";
  iro2.Color = IroColor;
  iro2.ColorPicker = IroColorPickerWidget;
  (function(ui) {
    ui.h = h;
    ui.ComponentBase = IroComponentWrapper;
    ui.Handle = IroHandle;
    ui.Slider = IroSlider;
    ui.Wheel = IroWheel;
    ui.Box = IroBox;
  })(iro2.ui || (iro2.ui = {}));
})(iro || (iro = {}));
var iro$1 = iro;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d2, b2) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b3) {
    d3.__proto__ = b3;
  } || function(d3, b3) {
    for (var p in b3)
      if (Object.prototype.hasOwnProperty.call(b3, p))
        d3[p] = b3[p];
  };
  return extendStatics(d2, b2);
};
function __extends(d2, b2) {
  if (typeof b2 !== "function" && b2 !== null)
    throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
  extendStatics(d2, b2);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
}
function __values(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m2 = s2 && o[s2], i2 = 0;
  if (m2)
    return m2.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i2 >= o.length)
          o = void 0;
        return { value: o && o[i2++], done: !o };
      }
    };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i2 = m2.call(o), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i2["return"]))
        m2.call(i2);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
      if (ar || !(i2 in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i2);
        ar[i2] = from[i2];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i2) {
      return i2 + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index2 = arr.indexOf(item);
    0 <= index2 && arr.splice(index2, 1);
  }
}
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._teardowns = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                _a.call(_parentage_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialTeardown = this.initialTeardown;
      if (isFunction(initialTeardown)) {
        try {
          initialTeardown();
        } catch (e2) {
          errors = e2 instanceof UnsubscriptionError ? e2.errors : [e2];
        }
      }
      var _teardowns = this._teardowns;
      if (_teardowns) {
        this._teardowns = null;
        try {
          for (var _teardowns_1 = __values(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
            var teardown_1 = _teardowns_1_1.value;
            try {
              execTeardown(teardown_1);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return))
              _b.call(_teardowns_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execTeardown(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _teardowns = this._teardowns;
    _teardowns && arrRemove(_teardowns, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty = new Subscription2();
    empty.closed = true;
    return empty;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execTeardown(teardown) {
  if (isFunction(teardown)) {
    teardown();
  } else {
    teardown.unsubscribe();
  }
}
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};
var timeoutProvider = {
  setTimeout: function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, __spreadArray([], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    {
      throw err;
    }
  });
}
function noop() {
}
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a = context, errorThrown = _a.errorThrown, error = _a.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped)
      ;
    else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped)
      ;
    else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped)
      ;
    else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop,
  error: defaultErrorHandler,
  complete: noop
};
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
function identity(x2) {
  return x2;
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = function() {
  function Observable2(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a = _this, operator = _a.operator, source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a;
    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x2) {
        return value = x2;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe) {
    return new Observable2(subscribe);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a;
  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        var copy = _this.observers.slice();
        try {
          for (var copy_1 = __values(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
            var observer = copy_1_1.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return))
              _a.call(copy_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a;
      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
    return hasError || isStopped ? EMPTY_SUBSCRIPTION : (observers.push(subscriber), new Subscription(function() {
      return arrRemove(observers, subscriber);
    }));
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a, _b;
    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a, _b;
    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);
function guidGenerator() {
  var S4 = function() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
class LeafletGlVectorLayerControlWrapper extends L$1.Control {
  constructor() {
    super();
    this.colorMapWrappers = [];
    this.tabs = [];
    this.subjects = {
      control: new Subject()
    };
    this.controls = [];
  }
  addTo(map) {
    this.map = map;
    this.mapContainer = map.getContainer();
    let controlContainer = this.mapContainer.querySelector(".leaflet-control-container");
    this.controlWrapperOuterContainer = L$1.DomUtil.create("div", "control-wrapper-outer-container", controlContainer);
    this.controlWrapperInnerContainer = L$1.DomUtil.create("div", "control-wrapper-inner-container", this.controlWrapperOuterContainer);
    this.controlWrapperTabContainer = L$1.DomUtil.create("div", "control-wrapper-tab-container", this.controlWrapperInnerContainer);
    this.controlWrapperContentContainer = L$1.DomUtil.create("div", "control-wrapper-content-container", this.controlWrapperInnerContainer);
    this.toggleButton = L$1.DomUtil.create("div", "toggle-button main-toggle", this.controlWrapperOuterContainer);
    this.toggleButtonInner = L$1.DomUtil.create("div", "toggle-button-inner main-toggle-inner", this.toggleButton);
    this.resetButton = L$1.DomUtil.create("div", "toggle-button reset-button", this.controlWrapperOuterContainer);
    this.resetButtonInner = L$1.DomUtil.create("div", "toggle-button-inner reset-button-inner", this.resetButton);
    this.infoContainer = L$1.DomUtil.create("div", "info-container", this.controlWrapperOuterContainer);
    this.infoContainerContent = L$1.DomUtil.create("div", "info-container-content", this.infoContainer);
    this.infoButton = L$1.DomUtil.create("div", "info-button toggle-button", this.controlWrapperOuterContainer);
    this.infoButtonInner = L$1.DomUtil.create("div", "info-button-inner toggle-button-inner", this.infoButton);
    this.colorPickerContainer = L$1.DomUtil.create("div", "color-picker-dialog color-picker-container", this.controlWrapperOuterContainer);
    let colorPickerElement = L$1.DomUtil.create("div", "color-picker", this.colorPickerContainer);
    let id = `color-picker-${guidGenerator()}`;
    colorPickerElement.id = id;
    this.colorPicker = new iro$1.ColorPicker(`#${id}`, {
      width: 150,
      borderWidth: 2,
      borderColor: "#343434",
      layout: [
        {
          component: iro$1.ui.Wheel
        },
        {
          component: iro$1.ui.Slider,
          options: {
            sliderType: "alpha"
          }
        },
        {
          component: iro$1.ui.Slider,
          options: {
            sliderType: "value"
          }
        }
      ]
    });
    this.colorPickerDialogButtonContainer = L$1.DomUtil.create("div", "color-picker-dialog-button-container", this.colorPickerContainer);
    this.colorPickerDialogCancelButton = L$1.DomUtil.create("div", "color-picker-dialog-button cancel", this.colorPickerDialogButtonContainer);
    this.colorPickerDialogSubmitButton = L$1.DomUtil.create("div", "color-picker-dialog-button success", this.colorPickerDialogButtonContainer);
    this.createColorMapDialog();
    this.addEventListeners();
    return this;
  }
  removeControl(controlToRemove) {
    let index2 = this.controls.findIndex((control) => {
      return control.id === controlToRemove.id;
    });
    if (index2 > -1) {
      if (controlToRemove.id === this.selectedControl.id) {
        let firstUnselectedControl = this.controls.find((control) => {
          return control.id !== controlToRemove.id;
        });
        if (firstUnselectedControl) {
          this.selectControl(firstUnselectedControl);
        }
      }
      this.controls.splice(index2, 1);
      this.removeTab(index2);
    }
  }
  removeTab(index2) {
    let tab = this.tabs[index2];
    this.tabs.splice(index2, 1);
    this.controlWrapperTabContainer.removeChild(tab);
  }
  addControl(control, layerName) {
    this.controls.push(control);
    control.subjects.selectedColorSlider.subscribe((colorSlider) => {
      this.updateColorPicker(colorSlider);
    });
    control.subjects.colorMapDialog.subscribe((isOpen) => {
      this.toggleColorPickerDialog(isOpen);
    });
    let tab = this.createTab(control, layerName);
    this.tabs.push(tab);
    this.tabs[0].classList.add("active");
    if (!this.selectedControl) {
      this.selectControl(control);
    } else {
      control.onAdd();
    }
  }
  updateColorPicker(colorSlider) {
    let colorString = this.getRgbaString(colorSlider.colorWrapper.color);
    this.colorPicker.setColors([colorString]);
  }
  getRgbaString(rgbaArray) {
    let colorArray = rgbaArray;
    if (rgbaArray.length === 3) {
      colorArray.push(1);
    }
    return `rgba(${colorArray.join(",")})`;
  }
  createTab(control, layerName) {
    let tab = L$1.DomUtil.create("div", "control-wrapper-tab", this.controlWrapperTabContainer);
    tab.innerHTML = layerName != null ? layerName : "Layer " + this.controls.length;
    L$1.DomEvent.on(tab, "click", () => {
      this.onTabClicked(control, tab);
    });
    return tab;
  }
  onTabClicked(control, tab) {
    this.selectControl(control);
    for (let tab2 of this.tabs) {
      tab2.classList.remove("active");
    }
    tab.classList.add("active");
  }
  selectControl(control) {
    this.selectedControl = control;
    this.subjects.control.next(control);
    this.controlWrapperContentContainer.replaceChildren();
    this.controlWrapperContentContainer.appendChild(this.selectedControl.initialize(this.map, this.mapContainer));
    this.infoContainerContent.innerHTML = `<div class="info-container-content">
             <div class="info-container-content-row">
               <div class="info-container-content-value median"><b>Median:</b> ${this.selectedControl.layer.dataHelper.median}</div>
             </div>
             <div class="info-container-content-row">
               <div class="info-container-content-value median"><b>Mean:</b> ${this.selectedControl.layer.dataHelper.mean}</div>
             </div>
          </div>`;
    control.onSelected();
  }
  createColorMapDialog() {
    this.colorMapDropdownContainer = L$1.DomUtil.create("div", "color-map-dropdown-container", this.controlWrapperOuterContainer);
    this.colorMapDropdownToggle = L$1.DomUtil.create("div", "toggle-button color-map-dropdown-toggle", this.controlWrapperOuterContainer);
    this.colorMapDropdownToggleInner = L$1.DomUtil.create("div", "toggle-button-inner color-map-dropdown-toggle-inner", this.colorMapDropdownToggle);
    let dropdownInner = L$1.DomUtil.create("div", "color-map-dropdown-container-inner", this.colorMapDropdownContainer);
    let colorMapKeys = Object.keys(chroma.brewer).slice(0, 16);
    for (let i2 = 0; i2 < colorMapKeys.length - 1; i2 += 2) {
      let row = L$1.DomUtil.create("div", "single-color-map-row", dropdownInner);
      let colorMapElement1 = L$1.DomUtil.create("div", "single-color-map", row);
      colorMapElement1.id = guidGenerator();
      let colorMapElement2 = L$1.DomUtil.create("div", "single-color-map", row);
      let colorMap1 = chroma.brewer[colorMapKeys[i2]];
      let colorMap2 = chroma.brewer[colorMapKeys[i2 + 1]];
      colorMapElement1.style.background = this.createGradientString(colorMap1);
      colorMapElement2.style.background = this.createGradientString(colorMap2);
      let colorMapWrapper1 = this.createColorMapWrapper(colorMap1, colorMapElement1);
      let colorMapWrapper2 = this.createColorMapWrapper(colorMap2, colorMapElement2);
      colorMapElement1.addEventListener("click", (event) => {
        this.onColorMapClick(colorMapWrapper1);
      });
      colorMapElement2.addEventListener("click", (event) => {
        this.onColorMapClick(colorMapWrapper2);
      });
    }
  }
  guidGenerator() {
    var S4 = function() {
      return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  }
  createGradientString(colors) {
    let linearGradientString = "linear-gradient(to right";
    for (let i2 = 0; i2 < colors.length; i2++) {
      let suffix = `, ${colors[i2]} ${i2 / colors.length * 100}%`;
      linearGradientString += suffix;
    }
    return linearGradientString;
  }
  createColorMapWrapper(colors, colorMapElement) {
    let colorWrappers = [];
    for (let i2 = 0; i2 < colors.length; i2++) {
      let color = chroma(colors[i2]).rgba();
      let colorWrapper = {
        value: i2 / colors.length,
        color
      };
      colorWrappers.push(colorWrapper);
    }
    let colorMapWrapper = {
      colorMapElement,
      id: colorMapElement.id,
      colorWrappers
    };
    this.colorMapWrappers.push(colorMapWrapper);
    return colorMapWrapper;
  }
  onColorMapClick(colorMapWrapper) {
    this.selectedControl.onColorMapChange(colorMapWrapper);
  }
  addEventListeners() {
    var _a, _b;
    L$1.DomEvent.disableClickPropagation(this.controlWrapperInnerContainer);
    L$1.DomEvent.disableClickPropagation(this.colorPickerContainer);
    L$1.DomEvent.disableClickPropagation(this.toggleButton);
    L$1.DomEvent.disableClickPropagation(this.colorMapDropdownToggle);
    this.infoButton.addEventListener("click", (event) => {
      this.toggleInfoContainer();
    });
    this.resetButton.addEventListener("click", (event) => {
      this.hideDialogs();
      this.reset();
    });
    this.colorPickerDialogSubmitButton.addEventListener("click", (event) => {
      this.toggleColorPickerDialog(false);
    });
    this.colorPickerDialogCancelButton.addEventListener("click", (event) => {
      this.toggleColorPickerDialog(false, true);
    });
    (_a = this.toggleButton) == null ? void 0 : _a.addEventListener("click", (event) => {
      this.hideDialogs();
      this.toggleButton.classList.toggle("toggled");
      this.colorMapDropdownToggle.classList.toggle("toggled");
      this.infoButton.classList.toggle("toggled");
      this.resetButton.classList.toggle("toggled");
      this.controlWrapperInnerContainer.classList.toggle("show");
    });
    this.colorMapDropdownToggle.addEventListener("click", (event) => {
      this.showColorMapDropdown();
    });
    this.colorMapDropdownContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    (_b = this.colorPicker) == null ? void 0 : _b.on("color:change", (color) => {
      this.selectedControl.onColorPickerChange(color);
    });
    this.map.on("click", (event) => {
      this.colorMapDropdownContainer.classList.remove("show");
    });
  }
  toggleInfoContainer() {
    var _a;
    this.infoContainer.classList.toggle("show");
    let parentLeft = this.infoButton.offsetLeft;
    let parentTop = this.infoButton.offsetTop;
    let dialogBounds = (_a = this.infoContainer) == null ? void 0 : _a.getBoundingClientRect();
    this.infoContainer.style.left = parentLeft - dialogBounds.width + "px";
    this.infoContainer.style.top = parentTop - dialogBounds.height + "px";
  }
  showColorMapDropdown() {
    var _a;
    this.colorMapDropdownContainer.classList.toggle("show");
    let parentLeft = this.colorMapDropdownToggle.offsetLeft;
    let parentTop = this.colorMapDropdownToggle.offsetTop;
    let dialogBounds = (_a = this.colorMapDropdownContainer) == null ? void 0 : _a.getBoundingClientRect();
    this.colorMapDropdownContainer.style.left = parentLeft - dialogBounds.width + 10 + "px";
    this.colorMapDropdownContainer.style.top = parentTop - dialogBounds.height - 10 + "px";
  }
  onRemove() {
    this.controlWrapperOuterContainer.replaceChildren();
    this.controlWrapperOuterContainer.remove();
    this.colorMapDropdownToggle.remove();
    this.resetButton.remove();
    this.toggleButton.remove();
  }
  hideDialogs() {
    this.colorMapDropdownContainer.classList.remove("show");
    this.colorPickerContainer.classList.remove("show");
    this.infoContainer.classList.remove("show");
  }
  reset() {
    this.selectedControl.reset();
  }
  toggleColorPickerDialog(show, reset = false) {
    var _a, _b;
    if (!show) {
      this.selectedControl.onColorPickerDialogClose(reset);
      this.colorPickerContainer.classList.toggle("show");
    } else {
      this.colorPickerContainer.classList.toggle("show");
      (_a = this.controlWrapperInnerContainer.querySelector(".color-input-inner")) == null ? void 0 : _a.getBoundingClientRect();
      let dialogBounds = (_b = this.colorPickerContainer) == null ? void 0 : _b.getBoundingClientRect();
      let parentTop = this.controlWrapperInnerContainer.offsetTop;
      this.colorPickerContainer.style.left = 20 + "px";
      let calculatedHeight = parentTop - dialogBounds.height;
      this.colorPickerContainer.style.top = calculatedHeight < 0 ? 0 + "px" : calculatedHeight + "px";
    }
  }
}
class LeafletGlVectorLayerWrapper extends L.Layer {
  constructor() {
    super();
    this.layers = [];
  }
  onAdd(map) {
    this.addTo(map);
    return this;
  }
  addTo(map) {
    this.map = map;
    this.controlWrapper = new LeafletGlVectorLayerControlWrapper();
    this.controlWrapper.addTo(map);
    this.controlWrapper.subjects.control.subscribe({
      next: (control) => {
        this.onLayerSelected(control.layer);
      }
    });
    return this;
  }
  removeLayer(layer) {
    layer.onRemove(this.map);
    return this;
  }
  cleanUpControlAndLayerData(layer) {
    let index2 = this.layers.findIndex((layer2) => {
      return layer2._leaflet_id === layer2._leaflet_id;
    });
    this.controlWrapper.removeControl(layer.control);
    this.layers.splice(index2, 1);
  }
  addLayer(layer) {
    layer.addTo(this.map);
    layer.wrapper = this;
    this.layers.push(layer);
    this.controlWrapper.addControl(layer.control);
    if (!this.selectedLayer) {
      this.onLayerSelected(layer);
    }
    return this;
  }
  onLayerSelected(layer) {
    this.selectedLayer = layer;
  }
  animateLayerOpacity(layer) {
    if (layer.canvas) {
      layer.canvas.style.opacity = "0.3";
    }
    let interval = setInterval(() => {
      let opacity = parseFloat(layer.canvas.style.opacity);
      let newOpacity = opacity + 0.01;
      layer.canvas.style.opacity = newOpacity + "";
      if (newOpacity >= 1) {
        clearInterval(interval);
      }
    }, 20);
  }
}
class MapMatrix {
  constructor() {
    this.array = new Float32Array(16);
  }
  setSize(width, height) {
    this.array.set([
      2 / width,
      0,
      0,
      0,
      0,
      -2 / height,
      0,
      0,
      0,
      0,
      0,
      0,
      -1,
      1,
      0,
      1
    ]);
    return this;
  }
  translateTo(x2, y2) {
    const { array } = this;
    array[12] = array[0] * x2 - 1;
    array[13] = array[5] * y2 + 1;
    return this;
  }
  scaleTo(scale) {
    const { array } = this;
    array[0] *= scale;
    array[5] *= scale;
    return this;
  }
}
class BaseRenderer {
  constructor(leafletGlVectorLayerOptions, canvas, map, dataHelper) {
    this.dataHelper = dataHelper;
    this.vertices = [];
    this.numPoints = 0;
    this.vertexValues = [];
    this.colorFidelity = 1e4;
    this.defaultVertexShader = `    
        uniform mat4 u_matrix;
        attribute vec4 a_vertex;
        attribute vec4 a_color;
        varying vec4 v_color;
        
        
        void main() {
          // Set the size of the point
        
          // multiply each vertex by a matrix.
          gl_Position = u_matrix * a_vertex;
        
        
          // pass the color to the fragment shader
          v_color = a_color;
          gl_PointSize = 4.0;
        }
    
    `;
    this.defaultFragmentShader = `
        precision mediump float;
        varying lowp vec4 v_color;
        
        void main() {
            gl_FragColor = v_color;
        }
    `;
    this.unwrappedGradient = [];
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl", { antialias: true });
    this.mapMatrix = new MapMatrix();
    this.createShaders();
    this.program = this.gl.createProgram();
    this.vertBuffer = this.gl.createBuffer();
    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);
    this.matrix = this.gl.getUniformLocation(this.program, "u_matrix");
    this.mapMatrix.setSize(this.canvas.width, this.canvas.height);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniformMatrix4fv(this.matrix, false, this.mapMatrix.array);
  }
  createShaders() {
    this.vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
    this.gl.shaderSource(this.vertexShader, this.defaultVertexShader);
    this.gl.compileShader(this.vertexShader);
    this.fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    this.gl.shaderSource(this.fragmentShader, this.defaultFragmentShader);
    this.gl.compileShader(this.fragmentShader);
    if (!this.gl.getShaderParameter(this.fragmentShader, this.gl.COMPILE_STATUS)) {
      throw "Fragment shader is broken";
    }
    if (!this.gl.getShaderParameter(this.vertexShader, this.gl.COMPILE_STATUS)) {
      throw "Vertex shader is broken";
    }
  }
  normalizeValue(value) {
    if (value <= this.dataHelper.currentMinValue) {
      return this.dataHelper.currentMinValue;
    } else if (value >= this.dataHelper.currentMaxValue) {
      return this.dataHelper.currentMaxValue;
    } else {
      return value;
    }
  }
  updateColors() {
    this.unwrappedGradient = [];
    for (let i2 = 0; i2 < this.colorFidelity + 1; i2++) {
      this.unwrappedGradient.push(this.customColorMap(i2 / this.colorFidelity).rgba());
    }
    for (let i2 = 0; i2 < this.vertexValues.length; i2++) {
      let adjustedValue = (this.vertexValues[i2] + this.dataHelper.absoluteCurrentMinValue) / (this.dataHelper.currentMaxValue + this.dataHelper.absoluteCurrentMinValue);
      let color = this.unwrappedGradient[Math.floor(adjustedValue * this.colorFidelity)];
      let index2 = i2 * 6 + 2;
      this.vertices[index2] = color[0] / 255;
      this.vertices[index2 + 1] = color[1] / 255;
      this.vertices[index2 + 2] = color[2] / 255;
      this.vertices[index2 + 3] = color[3];
    }
    this.updateBuffers();
    this.render();
  }
  bindBuffers() {
    let colorLoc = this.gl.getAttribLocation(this.program, "a_color");
    var vertArray = new Float32Array(this.vertices);
    var fsize = vertArray.BYTES_PER_ELEMENT;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertArray, this.gl.STATIC_DRAW);
    let vertLoc = this.gl.getAttribLocation(this.program, "a_vertex");
    this.gl.vertexAttribPointer(vertLoc, 2, this.gl.FLOAT, false, 4 * 6, 0);
    this.gl.enableVertexAttribArray(vertLoc);
    this.gl.vertexAttribPointer(colorLoc, 4, this.gl.FLOAT, false, fsize * 6, fsize * 2);
    this.gl.enableVertexAttribArray(colorLoc);
  }
  setCustomColorMap(colorMap) {
    this.customColorMap = colorMap;
  }
  updateBuffers() {
    var vertArray = new Float32Array(this.vertices);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertArray, this.gl.STATIC_DRAW);
  }
  render(event) {
    if (!this.gl)
      return this;
    if (event) {
      const scale = Math.pow(2, event.zoom);
      this.mapMatrix.setSize(this.canvas.width, this.canvas.height).scaleTo(scale).translateTo(-event.offset.x, -event.offset.y);
    }
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniformMatrix4fv(this.matrix, false, this.mapMatrix.array);
    this.gl.drawArrays(this.drawType, 0, this.numPoints);
    return this;
  }
  buildPixel(xy, value) {
    let adjustedValue = (value + this.dataHelper.absoluteCurrentMinValue) / (this.dataHelper.currentMaxValue + this.dataHelper.absoluteCurrentMinValue);
    let color = this.unwrappedGradient[Math.floor(adjustedValue * this.colorFidelity)];
    return [xy.x, xy.y, color[0] / 255, color[1] / 255, color[2] / 255, color[3]];
  }
  processData(callback) {
    this.vertexValues = [];
    this.unwrappedGradient = [];
    for (let i2 = 0; i2 < this.colorFidelity + 1; i2++) {
      this.unwrappedGradient.push(this.customColorMap(i2 / this.colorFidelity).rgba());
    }
  }
  cutPolygon(polygon) {
    let newNegativePolygon = [];
    let newPositivePolygon = [];
    for (let i2 = 0; i2 < polygon.length; i2++) {
      if (polygon[i2][1] < 0) {
        newNegativePolygon.push(polygon[i2]);
        let nextIndex = (i2 + 1) % polygon.length;
        let nextLongitude = polygon[nextIndex][1];
        if (nextLongitude > 0) {
          let halfwayPoint = (polygon[i2][0] + polygon[nextIndex][0]) / 2;
          newNegativePolygon.push([halfwayPoint, -180]);
          newPositivePolygon.push([halfwayPoint, 180]);
        }
      } else {
        newPositivePolygon.push(polygon[i2]);
        let nextIndex = (i2 + 1) % polygon.length;
        let nextLongitude = polygon[nextIndex][1];
        if (nextLongitude < 0) {
          let halfwayPoint = (polygon[i2][0] + polygon[nextIndex][0]) / 2;
          newPositivePolygon.push([halfwayPoint, 180]);
          newNegativePolygon.push([halfwayPoint, -180]);
        }
      }
    }
    return [newNegativePolygon, newPositivePolygon];
  }
  createTrianglesFromPolygons(polygons) {
    let triangles = [];
    for (let polygon of polygons) {
      triangles = triangles.concat(BaseRenderer.createTrianglesFromPolygon(polygon));
    }
    return triangles;
  }
  createTrianglesFromQuad(polygon) {
    let triangle1 = [
      [polygon[0][0], polygon[0][1]],
      [polygon[1][0], polygon[1][1]],
      [polygon[2][0], polygon[2][1]]
    ];
    let triangle2 = [
      [polygon[0][0], polygon[0][1]],
      [polygon[2][0], polygon[2][1]],
      [polygon[3][0], polygon[3][1]]
    ];
    return [triangle1, triangle2];
  }
  static createTrianglesFromPolygon(polygon) {
    let latitudesSummed = polygon.reduce((sum, point) => sum + point[0], 0);
    let longitudesSummed = polygon.reduce((sum, point) => sum + point[1], 0);
    let centerPoint = [latitudesSummed / polygon.length, longitudesSummed / polygon.length];
    let triangles = [];
    for (let i2 = 0; i2 < polygon.length; i2++) {
      let triangle = [polygon[i2], polygon[(i2 + 1) % polygon.length], centerPoint];
      triangles.push(triangle);
    }
    return triangles;
  }
  addTrianglesToVertices(triangles, value) {
    for (let triangle of triangles) {
      let pixel = this.outputPixelFromlatLon(triangle[0][0], triangle[0][1], value);
      let pixel2 = this.outputPixelFromlatLon(triangle[1][0], triangle[1][1], value);
      let pixel3 = this.outputPixelFromlatLon(triangle[2][0], triangle[2][1], value);
      this.vertices.push(pixel[0], pixel[1], pixel[2], pixel[3], pixel[4], pixel[5]);
      this.vertexValues.push(value);
      this.vertices.push(pixel2[0], pixel2[1], pixel2[2], pixel2[3], pixel2[4], pixel2[5]);
      this.vertexValues.push(value);
      this.vertices.push(pixel3[0], pixel3[1], pixel3[2], pixel3[3], pixel3[4], pixel3[5]);
      this.vertexValues.push(value);
    }
  }
  outputPixelFromlatLon(latitude, longitude, value) {
    let xy = this.map.project([latitude, longitude], 0);
    return this.buildPixel(xy, value);
  }
}
class PointsRenderer extends BaseRenderer {
  constructor(leafletGlVectorLayerOptions, canvas, map, dataHelper) {
    super(leafletGlVectorLayerOptions, canvas, map, dataHelper);
    this.map = map;
    this.data = leafletGlVectorLayerOptions.data;
    this.drawType = this.gl.POINTS;
  }
  processData(callback) {
    super.processData();
    this.vertices = [];
    this.vertexValues = [];
    for (var index2 = 0; index2 < this.data.longitudes.length; index2++) {
      if (!this.data.values[index2] && this.data.values[index2] !== 0) {
        continue;
      }
      let pixel = this.map.project([this.data.latitudes[index2], this.data.longitudes[index2]], 0);
      let value = this.normalizeValue(this.data.values[index2]);
      this.vertexValues.push(value);
      this.vertices.push(...super.buildPixel(pixel, value));
    }
    this.numPoints = this.vertices.length / 6;
    callback();
  }
}
class GridRenderer extends BaseRenderer {
  constructor(leafletGlVectorLayerOptions, canvas, map, dataHelper) {
    super(leafletGlVectorLayerOptions, canvas, map, dataHelper);
    this.map = map;
    this.data = leafletGlVectorLayerOptions.data;
    this.drawType = this.gl.TRIANGLES;
  }
  processData(callback) {
    super.processData();
    this.vertices = [];
    for (let latIndex = 0; latIndex < this.data.latitudes.length - 1; latIndex++) {
      for (let lonIndex = 0; lonIndex < this.data.longitudes.length - 1; lonIndex++) {
        let index2 = latIndex * this.data.longitudes.length + lonIndex;
        if (!this.data.values[index2] && this.data.values[index2] !== 0) {
          continue;
        }
        let longitudes = [this.data.longitudes[lonIndex], this.data.longitudes[lonIndex + 1]];
        let isBelowAntiMeridian = longitudes.some((longitude) => longitude <= -160);
        let isAboveAntiMeridian = longitudes.some((longitude) => longitude >= 160);
        let isCrossAntimeridian = isBelowAntiMeridian && isAboveAntiMeridian;
        let polygon = [
          [this.data.latitudes[latIndex], this.data.longitudes[lonIndex]],
          [this.data.latitudes[latIndex], this.data.longitudes[lonIndex + 1]],
          [this.data.latitudes[latIndex + 1], this.data.longitudes[lonIndex + 1]],
          [this.data.latitudes[latIndex + 1], this.data.longitudes[lonIndex]]
        ];
        let value = this.normalizeValue(this.data.values[index2]);
        let triangles = [];
        if (isCrossAntimeridian) {
          let newPolygons = this.cutPolygon(polygon);
          triangles = this.createTrianglesFromPolygons(newPolygons);
        } else {
          triangles = this.createTrianglesFromQuad(polygon);
        }
        this.addTrianglesToVertices(triangles, value);
      }
    }
    this.numPoints = this.vertices.length / 6;
    callback();
  }
}
class SwathRenderer extends BaseRenderer {
  constructor(leafletGlVectorLayerOptions, canvas, map, dataHelper) {
    super(leafletGlVectorLayerOptions, canvas, map, dataHelper);
    this.data = leafletGlVectorLayerOptions.data;
    this.map = map;
    this.index = 0;
    this.drawType = this.gl.TRIANGLES;
  }
  processData(callback) {
    super.processData();
    this.vertices = [];
    let values = this.data.values;
    for (var index2 = 0; index2 < this.data.latitudes.length; index2 += 4) {
      if (!values[index2 / 4] && values[index2 / 4] !== 0) {
        continue;
      }
      let value = this.normalizeValue(values[index2 / 4]);
      let longitudesForSquare = [this.data.longitudes[index2], this.data.longitudes[index2 + 1], this.data.longitudes[index2 + 2], this.data.longitudes[index2 + 3]];
      let isCrossAntiMeridian = longitudesForSquare.some((longitude) => longitude <= -160 && longitudesForSquare.some((longitude2) => longitude2 >= 60));
      let polygon = [
        [this.data.latitudes[index2], this.data.longitudes[index2]],
        [this.data.latitudes[index2 + 1], this.data.longitudes[index2 + 1]],
        [this.data.latitudes[index2 + 2], this.data.longitudes[index2 + 2]],
        [this.data.latitudes[index2 + 3], this.data.longitudes[index2 + 3]]
      ];
      let triangles = [];
      if (isCrossAntiMeridian) {
        let polygons = this.cutPolygon(polygon);
        triangles = this.createTrianglesFromPolygons(polygons);
      } else {
        triangles = this.createTrianglesFromQuad(polygon);
      }
      this.addTrianglesToVertices(triangles, value);
    }
    this.numPoints = this.vertices.length / 6;
    callback();
  }
}
class LeafletGlVectorLayerControl {
  constructor(layer) {
    this.layer = layer;
    this.colorWrappers = [];
    this.colorSliders = [];
    this.COLOR_SLIDER_WIDTH = 20;
    this.subjects = {
      selectedColorSlider: new Subject(),
      colorMapDialog: new Subject(),
      gradient: new Subject(),
      updateLimits: new Subject()
    };
    this.id = guidGenerator();
    if (layer.options.leafletGlVectorLayerOptions.data.points) {
      this.data = layer.options.leafletGlVectorLayerOptions.data.points;
    } else if (layer.options.leafletGlVectorLayerOptions.data.swath) {
      this.data = layer.options.leafletGlVectorLayerOptions.data.swath;
    } else if (layer.options.leafletGlVectorLayerOptions.data.grid) {
      this.data = layer.options.leafletGlVectorLayerOptions.data.grid;
    }
  }
  initialize(map, mapContainer) {
    this.map = map;
    this.mapContainer = mapContainer;
    this.innerContainer = L$1.DomUtil.create("div", "data-control-container-inner");
    this.colorMapContainer = L$1.DomUtil.create("div", "color-map-container", this.innerContainer);
    this.colorInputContainer = L$1.DomUtil.create("div", "color-input-container", this.colorMapContainer);
    this.colorInput = L$1.DomUtil.create("div", "color-input-inner", this.colorInputContainer);
    this.gradientStopDeleteButton = L$1.DomUtil.create("div", "gradient-stop-delete-button disabled", this.colorInputContainer);
    this.gradientContainer = L$1.DomUtil.create("div", "gradient-container", this.colorMapContainer);
    this.gradientElement = L$1.DomUtil.create("div", "gradient-element", this.gradientContainer);
    this.normalizingContainer = L$1.DomUtil.create("div", "normalizing-container", this.colorMapContainer);
    this.normalizingValueContainer = L$1.DomUtil.create("div", "normalizing-value-container", this.normalizingContainer);
    L$1.DomUtil.create("div", "normalizing-value-container-filler", this.normalizingValueContainer);
    this.normalizingContainerInput1 = L$1.DomUtil.create("input", "normalizing-container-input", this.normalizingContainer);
    for (let i2 = 0; i2 < 3; i2++) {
      let container = L$1.DomUtil.create("div", "gradient-marker-container", this.normalizingValueContainer);
      L$1.DomUtil.create("div", "gradient-marker-arrow", container).innerHTML = "|";
      L$1.DomUtil.create("div", "gradient-marker-value", container);
    }
    L$1.DomUtil.create("div", "normalizing-value-container-filler", this.normalizingValueContainer);
    this.normalizingContainerInput2 = L$1.DomUtil.create("input", "normalizing-container-input", this.normalizingContainer);
    this.normalizingContainerInput1.type = "number";
    this.normalizingContainerInput2.type = "number";
    this.normalizingContainerInput1.value = String(this.layer.dataHelper.currentMinValue);
    this.normalizingContainerInput2.value = String(this.layer.dataHelper.currentMaxValue);
    return this.innerContainer;
  }
  onAdd() {
    this.initColorWrappers();
  }
  onSelected() {
    this.initColorWrappers();
    this.initColorSliders();
    this.updateNormalizingMarkers();
    this.addEventListeners();
    this.updateGradientAndGradientElement();
  }
  initColorWrappers() {
    if (!this.colorWrappers.length) {
      this.createColorWrapper(0, [255, 255, 255, 1], 0);
      this.createColorWrapper(1, [0, 0, 0, 1], 1);
    }
    this.updateGradient();
    this.subjects.gradient.next(this.gradient);
  }
  createColorWrapper(value, color, index2) {
    let newColorWrapper = {
      color,
      value
    };
    this.colorWrappers.splice(index2, 0, newColorWrapper);
    return newColorWrapper;
  }
  initColorSliders() {
    for (let i2 = 0; i2 < this.colorWrappers.length; i2++) {
      this.insertColorSlider(this.colorWrappers[i2], i2);
    }
    this.selectedColorSlider = this.colorSliders[0];
  }
  onColorMapChange(colorMapWrapper) {
    this.deleteExistingSliders();
    this.colorWrappers = [];
    this.colorSliders = [];
    this.selectedColorSlider = null;
    for (let i2 = 0; i2 < colorMapWrapper.colorWrappers.length; i2++) {
      let wrapper = colorMapWrapper.colorWrappers[i2];
      let newColorWrapper = {
        color: wrapper.color,
        value: wrapper.value
      };
      this.colorWrappers.splice(i2, 0, newColorWrapper);
      this.insertColorSlider(newColorWrapper, i2);
    }
    this.selectedColorSlider = this.colorSliders[0];
    this.updateGradientAndGradientElement();
    this.subjects.gradient.next(this.gradient);
  }
  addEventListeners() {
    var _a, _b, _c;
    this.gradientStopDeleteButton.addEventListener("click", (event) => {
      if (this.colorWrappers.length <= 2) {
        return;
      }
      if (this.selectedColorSlider) {
        this.deleteGradientSlider(this.selectedColorSlider);
        this.subjects.gradient.next(this.gradient);
      }
    });
    this.innerContainer.addEventListener("mousemove", (event) => {
      if (!this.draggedSlider || !this.selectedColorSlider) {
        return;
      } else {
        let bbox = this.gradientContainer.getBoundingClientRect();
        let left = Math.max(Math.min(event.clientX - bbox.x - this.COLOR_SLIDER_WIDTH / 2, this.gradientContainer.clientWidth - this.COLOR_SLIDER_WIDTH / 2), -(this.COLOR_SLIDER_WIDTH / 2));
        let newPercentage = Math.max((left + -this.COLOR_SLIDER_WIDTH / 2) / this.gradientContainer.clientWidth, 0);
        this.draggedSlider.style.left = left + "px";
        this.selectedColorSlider.colorWrapper.value = newPercentage;
        this.colorWrappers.sort((item) => {
          return item.value;
        });
        this.updateGradientAndGradientElement();
      }
    });
    document.addEventListener("mouseup", (event) => {
      if (this.draggedSlider) {
        this.updateGradient();
        this.subjects.gradient.next(this.gradient);
      }
      this.draggedSlider = null;
    });
    this.gradientContainer.addEventListener("dblclick", (event) => {
      let bbox = this.gradientContainer.getBoundingClientRect();
      let percentage = (event.clientX - bbox.x) / bbox.width;
      this.addNewColor(percentage);
    });
    (_a = this.colorInput) == null ? void 0 : _a.addEventListener("click", (event) => {
      var _a2, _b2;
      this.previousStopColor = (_b2 = (_a2 = this.selectedColorSlider) == null ? void 0 : _a2.colorWrapper) == null ? void 0 : _b2.color;
      this.subjects.colorMapDialog.next(true);
    });
    (_b = this.normalizingContainerInput1) == null ? void 0 : _b.addEventListener("change", this.onNormalizingContainerInputChange.bind(this, "currentMinValue"));
    (_c = this.normalizingContainerInput2) == null ? void 0 : _c.addEventListener("change", this.onNormalizingContainerInputChange.bind(this, "currentMaxValue"));
  }
  onColorPickerChange(color) {
    let colorArray = [color.rgba.r, color.rgba.g, color.rgba.b, color.rgba.a];
    if (this.selectedColorSlider) {
      this.selectedColorSlider.colorWrapper.color = colorArray;
    }
    let colorString = this.getRgbaString(colorArray);
    this.colorInput.style.background = colorString;
    let innerSliderElement = this.selectedColorSlider.slider.querySelector(".color-slider-inner");
    innerSliderElement.style.background = colorString;
    this.updateGradientAndGradientElement();
  }
  reset() {
    this.deleteExistingSliders();
    this.colorWrappers = [];
    this.colorSliders = [];
    this.initColorWrappers();
    this.initColorSliders();
    this.updateGradientAndGradientElement();
    this.subjects.gradient.next(this.gradient);
  }
  onColorPickerDialogClose(reset) {
    if (reset) {
      if (this.selectedColorSlider && this.previousStopColor) {
        this.selectedColorSlider.colorWrapper.color = this.previousStopColor;
        let colorString = this.getRgbaString(this.selectedColorSlider.colorWrapper.color);
        this.colorInput.style.background = colorString;
        let innerSliderElement = this.selectedColorSlider.slider.querySelector(".color-slider-inner");
        innerSliderElement.style.background = colorString;
        this.layer.wrapper.controlWrapper.colorPicker.setColors([colorString]);
        this.updateGradientAndGradientElement();
      }
    } else {
      this.updateGradient();
    }
    this.subjects.gradient.next(this.gradient);
  }
  deleteExistingSliders() {
    let sliders = this.mapContainer.querySelectorAll(".color-slider-wrapper");
    for (let i2 = 0; i2 < sliders.length; i2++) {
      sliders[i2].remove();
    }
    this.gradientStopDeleteButton.classList.add("disabled");
  }
  deleteGradientSlider(slider) {
    let index2 = this.colorSliders.findIndex((wrapper) => {
      return wrapper.slider.id === slider.slider.id;
    });
    this.gradientContainer.removeChild(slider.slider);
    if (index2 > -1) {
      this.colorSliders.splice(index2, 1);
      this.colorWrappers.splice(index2, 1);
      this.updateGradientAndGradientElement();
      this.subjects.gradient.next(this.gradient);
      if (this.colorSliders.length) {
        this.selectColorSlider(this.colorSliders[0]);
      }
      if (this.colorWrappers.length <= 2) {
        this.gradientStopDeleteButton.classList.add("disabled");
      }
    }
  }
  onNormalizingContainerInputChange(type, event) {
    let value = event.target.value;
    if (value === "") {
      value = 0;
    }
    this.layer.dataHelper.setValue(type, parseFloat(value));
    this.updateNormalizingMarkers();
    this.subjects.updateLimits.next({
      min: this.layer.dataHelper.currentMinValue,
      max: this.layer.dataHelper.currentMaxValue
    });
  }
  updateNormalizingMarkers() {
    var _a;
    let markerValues = (_a = this.normalizingContainer) == null ? void 0 : _a.querySelectorAll(".gradient-marker-value");
    for (let i2 = 0; i2 < markerValues.length; i2++) {
      let percentage = (i2 + 1) / (markerValues.length + 1);
      markerValues[i2].innerHTML = String(this.getValueForPercentage(percentage));
    }
  }
  getValueForPercentage(percentage) {
    let value = (this.layer.dataHelper.currentMaxValue - this.layer.dataHelper.currentMinValue) * percentage + this.layer.dataHelper.currentMinValue;
    return parseFloat(value.toFixed(6));
  }
  getColorScaleString() {
    let colors = this.colorWrappers.map((item) => {
      return "rgba(" + item.color.join(",") + ")";
    });
    return colors;
  }
  updateGradientAndGradientElement() {
    this.updateGradient();
    this.updateGradientElement();
  }
  updateGradient() {
    let colors = this.getColorScaleString();
    this.gradient = chroma.scale(colors).domain([...this.colorWrappers.map((position) => position.value)]);
  }
  updateGradientElement() {
    if (!this.gradientElement || !this.gradient) {
      return;
    }
    let gradientStopCount = 20;
    let linearGradientString = "linear-gradient(to right";
    for (let i2 = 0; i2 < gradientStopCount; i2++) {
      let rgba = this.gradient(i2 / gradientStopCount).rgba();
      let suffix = `, rgba(${rgba}) ${i2 / 20 * 100}%`;
      linearGradientString += suffix;
    }
    this.gradientElement.style.setProperty("--gradient-element-background", linearGradientString);
    if (this.colorSliders.length > 2) {
      this.gradientStopDeleteButton.classList.remove("disabled");
    }
  }
  addNewColor(percentage) {
    let index2 = this.colorWrappers.findIndex((item, index22) => {
      let isSmaller = item.value < percentage;
      if (index22 === this.colorWrappers.length - 1) {
        return index22;
      } else {
        return isSmaller && this.colorWrappers[index22 + 1].value > percentage;
      }
    });
    index2 += 1;
    let colorAtPosition = this.gradient(percentage);
    let color = colorAtPosition.rgba();
    let newColorWrapper = {
      color,
      value: percentage
    };
    this.colorWrappers.splice(index2, 0, newColorWrapper);
    let slider = this.insertColorSlider(newColorWrapper, index2);
    this.selectColorSlider(slider);
    if (this.colorSliders.length > 2) {
      this.gradientStopDeleteButton.classList.remove("disabled");
    }
  }
  insertColorSlider(colorWrapper, index2) {
    let slider = document.createElement("div");
    slider.classList.add("color-slider-wrapper");
    slider.id = guidGenerator();
    let bbox = this.gradientContainer.getBoundingClientRect();
    slider.style.left = bbox.width * colorWrapper.value - this.COLOR_SLIDER_WIDTH / 2 + "px";
    let sliderTriangle = document.createElement("div");
    sliderTriangle.classList.add("color-slider-triangle");
    slider.appendChild(sliderTriangle);
    let sliderInner = document.createElement("div");
    sliderInner.classList.add("color-slider-inner");
    sliderInner.style.background = this.getRgbaString(colorWrapper.color);
    slider.appendChild(sliderInner);
    this.gradientContainer.appendChild(slider);
    let newColorSlider = {
      slider,
      colorWrapper
    };
    if (index2 !== null && index2 !== void 0) {
      this.colorSliders.splice(index2, 0, newColorSlider);
    } else {
      this.colorSliders.push(newColorSlider);
    }
    this.addClickListenerToColorSlider(newColorSlider);
    return newColorSlider;
  }
  getRgbaString(rgbaArray) {
    let colorArray = rgbaArray;
    if (rgbaArray.length === 3) {
      colorArray.push(1);
    }
    return `rgba(${colorArray.join(",")})`;
  }
  addClickListenerToColorSlider(slider) {
    slider.slider.addEventListener("mousedown", (event) => {
      this.draggedSlider = slider.slider;
      this.selectColorSlider(slider);
    });
  }
  selectColorSlider(colorSlider) {
    this.selectedColorSlider = colorSlider;
    this.subjects.selectedColorSlider.next(colorSlider);
    this.colorInput.style.background = this.getRgbaString(colorSlider.colorWrapper.color);
  }
}
class DataHelper {
  constructor(layer) {
    this.layer = layer;
    this.sortedData = this.layer.options.leafletGlVectorLayerOptions.data.values.slice(0).sort();
    let firstNonInfIndex = 0;
    for (let i22 = 0; i22 < this.sortedData.length; i22++) {
      if (this.sortedData[i22] > -Infinity) {
        firstNonInfIndex = i22;
        break;
      }
    }
    this.sortedData = this.sortedData.slice(firstNonInfIndex);
    let indexOfLastNonNan;
    for (var i2 = this.sortedData.length - 1; isNaN(this.sortedData[i2]); i2--) {
      indexOfLastNonNan = i2;
    }
    this.sortedData = this.sortedData.slice(0, indexOfLastNonNan);
    this.getMax();
    this.getMin();
    this.getMean();
    this.getMedian();
  }
  updateLimits(limits) {
    this.currentMinValue = limits.min;
    this.currentMaxValue = limits.max;
    this.absoluteCurrentMinValue = Math.abs(this.currentMinValue);
    this.absoluteCurrentMaxValue = Math.abs(this.currentMaxValue);
  }
  getMax() {
    let existingColorRange = this.layer.options.leafletGlVectorLayerOptions.colorrange;
    this.maxValue = this.sortedData[this.sortedData.length - 1];
    if (existingColorRange == null ? void 0 : existingColorRange.length) {
      this.currentMaxValue = existingColorRange[1];
    } else {
      this.currentMaxValue = this.maxValue;
    }
    this.absoluteCurrentMaxValue = Math.abs(this.currentMaxValue);
    return this.maxValue;
  }
  getMin() {
    let existingColorRange = this.layer.options.leafletGlVectorLayerOptions.colorrange;
    this.minValue = this.sortedData[0];
    if (existingColorRange == null ? void 0 : existingColorRange.length) {
      this.currentMinValue = existingColorRange[0];
    } else {
      this.currentMinValue = this.minValue;
    }
    this.absoluteCurrentMinValue = Math.abs(this.currentMinValue);
    return this.minValue;
  }
  getMedian() {
    let median = this.sortedData[Math.floor(this.sortedData.length / 2)];
    this.median = parseFloat(median.toFixed(2));
    return this.median;
  }
  getMean() {
    this.mean = this.sortedData.reduce((a2, b2) => a2 + b2, 0) / this.sortedData.length;
    this.mean = parseFloat(this.mean.toFixed(2));
    return this.mean;
  }
  setValue(type, value) {
    this[type] = value;
  }
}
class LeafletGlVectorLayer extends Layer {
  constructor(newOptions) {
    super();
    this._paneName = "overlayPane";
    this.isFirstRun = true;
    this.id = guidGenerator();
    setOptions(this, __spreadProps(__spreadValues({}, this.options), { leafletGlVectorLayerOptions: newOptions.leafletGlVectorLayerOptions }));
  }
  onRemove(map) {
    var _a, _b;
    (_a = this.wrapper) == null ? void 0 : _a.cleanUpControlAndLayerData(this);
    (_b = this.canvas) == null ? void 0 : _b.remove();
    this.renderer = void 0;
    this._map.off("moveend", this._reset, this);
    this._map.off("resize", this._resize, this);
    this._map.off("zoomanim", Layer ? this._animateZoom : this._animateZoomNoLayer, this);
    return this;
  }
  addTo(map) {
    this.onAdd(map);
    return this;
  }
  onAdd(map) {
    var _a;
    this._map = map;
    if (!this.canvas) {
      this.canvas = document.createElement("canvas");
    }
    this.canvas.width = map.getSize().x;
    this.canvas.height = map.getSize().y;
    this.canvas.className = `leaflet-zoom-${this.isAnimated() ? "animated" : "hide"}`;
    let RendererMap = {
      "swath": SwathRenderer,
      "grid": GridRenderer,
      "points": PointsRenderer
    };
    if (!["swath", "grid", "points"].includes(this.options.leafletGlVectorLayerOptions.plot_type)) {
      throw new Error(`${this.options.leafletGlVectorLayerOptions.plot_type} is not a valid renderer type`);
    }
    this.dataHelper = new DataHelper(this);
    this.renderer = new RendererMap[this.options.leafletGlVectorLayerOptions.plot_type](this.options.leafletGlVectorLayerOptions, this.canvas, map, this.dataHelper);
    if (!map.getPane(this._paneName)) {
      throw new Error("unable to find pane");
    }
    (_a = map.getPane(this._paneName)) == null ? void 0 : _a.appendChild(this.canvas);
    map.on("moveend", this._reset, this);
    map.on("resize", this._resize, this);
    if (this.isAnimated()) {
      map.on("zoomanim", Layer ? this._animateZoom : this._animateZoomNoLayer, this);
    }
    this._reset();
    this.control = new LeafletGlVectorLayerControl(this);
    this.renderer.bindBuffers();
    this.control.subjects.gradient.subscribe({
      next: this.updateColors.bind(this)
    });
    this.control.subjects.updateLimits.subscribe({
      next: this.updateValues.bind(this)
    });
    return this;
  }
  updateColors(gradient) {
    if (this.renderer && gradient) {
      this.renderer.setCustomColorMap(gradient);
      if (this.isFirstRun) {
        this.renderer.processData(this.updateRender.bind(this));
        this.isFirstRun = false;
      } else {
        this.renderer.updateColors();
        this._reset();
      }
    }
  }
  updateRender() {
    var _a;
    (_a = this.renderer) == null ? void 0 : _a.updateBuffers();
    this._reset();
  }
  updateValues(limits) {
    var _a;
    this.dataHelper.updateLimits(limits);
    (_a = this.renderer) == null ? void 0 : _a.processData(this.updateRender.bind(this));
  }
  isAnimated() {
    return Boolean(this._map.options.zoomAnimation && Browser.any3d);
  }
  _resize(resizeEvent) {
    if (this.canvas) {
      this.canvas.width = resizeEvent.newSize.x;
      this.canvas.height = resizeEvent.newSize.y;
    }
  }
  _reset() {
    if (this.canvas) {
      const topLeft = this._map.containerPointToLayerPoint([0, 0]);
      DomUtil.setPosition(this.canvas, topLeft);
    }
    this._redraw();
  }
  _redraw() {
    const size = this._map.getSize();
    const bounds = this._map.getBounds();
    const zoomScale = size.x * 180 / (2003750834e-2 * (bounds.getEast() - bounds.getWest()));
    const zoom = this._map.getZoom();
    const topLeft = new LatLng(bounds.getNorth(), bounds.getWest());
    const offset = this._unclampedProject(topLeft, 0);
    if (this.canvas && this.renderer) {
      this.renderer.render({
        bounds,
        canvas: this.canvas,
        offset,
        scale: Math.pow(2, zoom),
        size,
        zoomScale,
        zoom
      });
    }
  }
  _animateZoom(e2) {
    const { _map, canvas } = this;
    const scale = _map.getZoomScale(e2.zoom, _map.getZoom());
    const offset = this._unclampedLatLngBoundsToNewLayerBounds(_map.getBounds(), e2.zoom, e2.center).min;
    if (canvas && offset) {
      DomUtil.setTransform(canvas, offset, scale);
    }
  }
  _animateZoomNoLayer(e2) {
    const { _map, canvas } = this;
    if (canvas) {
      const scale = _map.getZoomScale(e2.zoom, _map.getZoom());
      const offset = _map._getCenterOffset(e2.center)._multiplyBy(-scale).subtract(_map._getMapPanePos());
      DomUtil.setTransform(canvas, offset, scale);
    }
  }
  _unclampedProject(latlng, zoom) {
    var _a;
    const { crs } = this._map.options;
    const { R } = crs.projection;
    const d2 = Math.PI / 180;
    const lat = latlng.lat;
    const sin = Math.sin(lat * d2);
    const projectedPoint = new Point(R * latlng.lng * d2, R * Math.log((1 + sin) / (1 - sin)) / 2);
    const scale = (_a = crs == null ? void 0 : crs.scale(zoom)) != null ? _a : 0;
    return crs.transformation._transform(projectedPoint, scale);
  }
  _unclampedLatLngBoundsToNewLayerBounds(latLngBounds, zoom, center) {
    const topLeft = this._map._getNewPixelOrigin(center, zoom);
    return new Bounds([
      this._unclampedProject(latLngBounds.getSouthWest(), zoom).subtract(topLeft),
      this._unclampedProject(latLngBounds.getNorthWest(), zoom).subtract(topLeft),
      this._unclampedProject(latLngBounds.getSouthEast(), zoom).subtract(topLeft),
      this._unclampedProject(latLngBounds.getNorthEast(), zoom).subtract(topLeft)
    ]);
  }
}
var index = "";
export { LeafletGlVectorLayer, LeafletGlVectorLayerWrapper };
