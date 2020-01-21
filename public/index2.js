/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

// window.onscroll = function(){
// document.body.style.webkitPerspectiveOrigin =
// window.scrollX + "px " + window.scrollY + "px";
// }

let button1 = document.querySelector(".button1");
let button2 = document.querySelector(".button2");

let buttonback = document.querySelector(".buttonback");
let body = document.querySelector("body");

let buttongraph2a = document.querySelector(".buttongraph2a");
let buttongraph2b = document.querySelector(".buttongraph2b");
let graph2imga = document.querySelector(".graph2imga");
let graph2imgb = document.querySelector(".graph2imgb");
let graph2imga_mobile = document.querySelector(".graph2imga_mobile");
let graph2imgb_mobile = document.querySelector(".graph2imgb_mobile");
let graph2pa = document.querySelector(".graph2pa");
let graph2pb = document.querySelector(".graph2pb");

button2.onclick = function() {
  body.classList.remove("overflowx");

  let vwidd = document.querySelector(".vwidd");
  vwidd.scrollIntoView({behavior: "smooth"});

  body.classList.add("overflowhidden")
}

buttonback.onclick = function() {
  body.classList.remove("overflowhidden")
  let research = document.querySelector(".research");
  research.scrollIntoView({behavior: "smooth"});
  body.classList.add("overflowx");
}

button1.onclick = function() {
  let graph1 = document.querySelector(".graph1");
  graph1.scrollIntoView({behavior: "smooth"});
}

// https://stackoverflow.com/questions/3664381/force-page-scroll-position-to-top-at-page-refresh-in-html
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}













buttongraph2a.onclick = function() {
  graph2imga.classList.remove("invisible");
  graph2imgb.classList.add("invisible");
  graph2imga_mobile.classList.remove("invisible");
  graph2imgb_mobile.classList.add("invisible");

  graph2pa.classList.remove("invisible");
  graph2pb.classList.add("invisible");

  buttongraph2a.classList.remove("nietingedrukt");
  buttongraph2b.classList.add("nietingedrukt");
}

buttongraph2b.onclick = function() {
  graph2imgb.classList.remove("invisible");
  graph2imga.classList.add("invisible");

  graph2imgb_mobile.classList.remove("invisible");
  graph2imga_mobile.classList.add("invisible");

  graph2pb.classList.remove("invisible");
  graph2pa.classList.add("invisible");

  buttongraph2b.classList.remove("nietingedrukt");
  buttongraph2a.classList.add("nietingedrukt");
}
