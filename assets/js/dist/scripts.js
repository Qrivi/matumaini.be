parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"imtx":[function(require,module,exports) {
function e(e){throw new Error('"'+e+'" is read-only')}var t=document.querySelector("body > header"),i=0;window.addEventListener("scroll",function(){window.scrollY<300?t.classList.remove("invert"):(t.classList.add("invert"),t.classList.toggle("hidden",document.body.getBoundingClientRect().top<i)),i=document.body.getBoundingClientRect().top}),Array.from(document.querySelectorAll('a[href*="#"]:not([href="#"])')).forEach(function(e){return e.addEventListener("click",function(i){i.preventDefault(),t.classList.add("hidden"),document.querySelector(e.getAttribute("href")).scrollIntoView({behavior:"smooth"})},!1)});var n=document.querySelectorAll("ul.postlist li"),o=document.querySelectorAll("#activiteiten h3.year-posts"),r=document.querySelector("#activiteiten p.no-posts"),a=document.querySelector("#activiteiten a.more-posts"),c=document.querySelector("#filter"),s=100,l=null,d=null,u=!1,h=6;if(a&&a.addEventListener("click",function(){w(h+3)}),c&&c.addEventListener("input",function(){l&&window.clearTimeout(l),u=!0,l=window.setTimeout(m,1e3)}),window.location.search.includes("filter="))c.value=window.location.search.match(/filter=(.*)/)[1].replace(/\+/g," "),m();else if(window.location.search.includes("activiteiten=")){var f=parseInt(window.location.search.match(/activiteiten=(.*)/)[1]);isNaN(f)&&(e("amount"),f=6),w(f)}function w(e){if(h=e,a.style.visibility="visible",Array.from(n).forEach(function(t,i){i<e?y(t):t.classList.add("hidden")}),"URLSearchParams"in window){var t=new URLSearchParams(window.location.search);t.delete("filter"),t.set("activiteiten",h),history.pushState(null,"",window.location.pathname+"?"+t.toString())}L()}function m(){if(a&&!c.value.length)return w(6);if(a&&(a.style.visibility="hidden"),Array.from(n).forEach(function(e){e.textContent.toUpperCase().includes(c.value.toUpperCase())?y(e):v(e)}),"URLSearchParams"in window&&u){var e=new URLSearchParams(window.location.search);e.delete("activiteiten"),e.set("filter",c.value),history.pushState(null,"",window.location.pathname+"?"+e.toString())}L()}function v(e){e.classList.contains("hidden")||(e.classList.add("hiding"),window.setTimeout(function(){e.classList.add("hidden")},800))}function y(e){e.classList.contains("hidden")&&(e.classList.remove("hidden"),e.classList.add("hiding"),window.setTimeout(function(){e.classList.remove("hiding")},10))}function L(){d&&window.clearTimeout(d),d=window.setTimeout(function(){r.classList.toggle("hidden",!Array.from(n).every(function(e){return e.classList.contains("hidden")})),o&&Array.from(o).forEach(function(e){e.classList.toggle("hidden",Array.from(e.nextElementSibling.querySelectorAll("li")).every(function(e){return e.classList.contains("hidden")}))})},1e3)}
},{}]},{},["imtx"], null)