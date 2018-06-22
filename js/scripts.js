"use strict";function hasTouch(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}function getWidth(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth}if(hasTouch())try{for(var si in document.styleSheets){var styleSheet=document.styleSheets[si];if(styleSheet.rules)for(var ri=styleSheet.rules.length-1;ri>=0;ri--)styleSheet.rules[ri].selectorText&&styleSheet.rules[ri].selectorText.match(":hover")&&styleSheet.deleteRule(ri)}}catch(ex){}var forEach=function(a,b,c){var d=0,e=a.length;if(e>0)for(;e>d;d++)b.call(c,d,a[d])},tabSelector=function(){function a(a,b){for(;(a=a.parentElement)&&!a.classList.contains(b););return a}function b(b,c){forEach(c,function(a,b){b.setAttribute("data-id",a+1)}),forEach(b,function(c,e){e.setAttribute("data-id",c+1),e.addEventListener("click",function(){var c=this,e=a(c,"tab-container"),f=e.querySelector(".tab-select-container"),g=e.querySelector(".tabs-navigation-container .select-placeholder"),h=e.querySelectorAll(".tabs-navigation-container ul.tab-select-container li"),i=e.querySelectorAll(".tab-content-container .tab-content");b.length>1&&(g.innerHTML=c.innerHTML,window.matchMedia("only screen and (max-width: 599px)").matches&&(f.style.maxHeight="0px"),setTimeout(function(){d(f),f.classList.add("in-active")},500),d(g),g.classList.remove("start-animation"),g.classList.add("finish-animation")),forEach(h,function(a,b){c==b?b.classList.add("active"):b.classList.remove("active")}),forEach(i,function(a,b){var d=c.getAttribute("data-id"),e=b.getAttribute("data-id");d==e?(b.classList.add("active"),setTimeout(function(){b.classList.add("in")},50)):(b.classList.remove("active"),b.classList.remove("in"))})},!1)})}function c(a){a.classList.remove("collapsed"),a.classList.add("expanded")}function d(a){a.classList.remove("expanded"),a.classList.add("collapsed")}function e(a,b,e){function f(){i&&(window.matchMedia("only screen and (max-width: 599px)").matches?i.classList.contains("collapsed")?(i.classList.remove("collapsed","in-active"),i.style.maxHeight="",i.setAttribute("data-height",i.offsetHeight),i.classList.add("collapsed","in-active"),i.style.maxHeight="0px"):(i.style.maxHeight="",i.setAttribute("data-height",i.offsetHeight),i.style.maxHeight=i.getAttribute("data-height")+"px"):i.style.maxHeight="")}function g(){window.matchMedia("only screen and (max-width: 599px)").matches&&i&&(i.classList.contains("collapsed")?(i.classList.remove("in-active"),c(i),c(j),setTimeout(function(){i.style.maxHeight=i.getAttribute("data-height")+"px"},50),j.classList.add("start-animation"),j.classList.remove("finish-animation")):(i.style.maxHeight="0px",setTimeout(function(){d(i),i.classList.add("in-active")},500),d(j),j.classList.remove("start-animation"),j.classList.add("finish-animation")))}if(e.length>1){var h=a.querySelector("ul.tab-select-container li.active"),i=a.querySelector("ul.tab-select-container"),j=a.querySelector(".select-placeholder"),k=h.innerHTML;b.innerHTML=k,f();var l=getWidth();window.addEventListener("resize",function(){var a=getWidth();a!==l&&f()},!1),j&&j.addEventListener("click",function(){g()},!1)}else b.classList.add("one")}function f(a){var c=document.querySelector(".tab-selector#"+a.namespace);if(c){var d=c.querySelectorAll("ul.tab-select-container li"),f=c.querySelector(".select-placeholder"),g=c.querySelectorAll(".tab-content");d[0].classList.add("active"),g[0].classList.add("active"),b(d,g),e(c,f,d)}}return{app:f}}();