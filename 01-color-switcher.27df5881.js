!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");t.addEventListener("click",(function(){c(!0),o=setInterval(a,1e3)})),e.addEventListener("click",(function(){c(!1),clearInterval(o)}));var o=0;function a(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}function c(n){t.disabled=n,e.disabled=!n}}();
//# sourceMappingURL=01-color-switcher.27df5881.js.map
