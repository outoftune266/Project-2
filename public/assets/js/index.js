const newMap = document.getElementById("map");
const slider = document.querySelector(".slider");
const logo = document.querySelector(".logo");
//const  = document.querySelector(".hero");
const headline = document.querySelector(".headline");

const tl = gsap.timeline({defaults: {ease: "power1.out"}});



mapboxgl.accessToken = 'pk.eyJ1Ijoib3V0b2Z0dW5lMjY2IiwiYSI6ImNraGIxZGh4aDA4OXYyd3FwdTY2azRwNngifQ.w_qP1F_2EMAK3xAwx_enKA';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/outoftune266/ckhb1hfdo03im19pd13h9rez2', // style URL
    center: [-86.7, 36.1], // starting position [lng, lat]
    zoom: 9 // starting zoom

});


tl.to(".text", { y:"0%", duration: 1, stagger: 0.55});
tl.to(".slider", {y: "-100%", duration:1.5, delay: 0.5 });
tl.to(".intro", {y: "-100%", duration: 1}, "-=1");
tl.fromTo("nav", {opacity: 0}, {opacity:1, duration: 1})
tl.fromTo(".big-text", {opacity: 0}, {opacity:1, duration: 1}, "-=1")
tl.fromTo(".toggle", {opacity: 0}, {opacity:1, duration: 1}, "-=1")
tl.fromTo("footer", {opacity: 0}, {opacity:1, duration: 1}, "-=1")