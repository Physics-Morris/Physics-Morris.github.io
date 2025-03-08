---
layout: default
title: Physics Demo
permalink: /physics/
nav: false
nav_order: 6
---

# Physics Demo - Two Stream Instability

{% raw %}
<style>
.photo-container {
  position: relative;
  width: 100%; 
  aspect-ratio: 3449 / 4435; 
  perspective: 1000px; 
  margin: auto; 
  overflow: hidden;
}

.photo-container-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 1.0s ease-in-out;
}

.photo-container:hover .photo-container-inner {
  transform: rotateY(180deg); 
}

.photo {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform-style: preserve-3d;
}

.photo.front {
  transform: rotateY(0deg);
}

.photo.back {
  transform: rotateY(180deg);
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
}

@media (max-width: 768px) {
  .photo-container {
    aspect-ratio: 3449 / 4435;
  }
}

@media (max-width: 480px) {
  .photo-container {
    aspect-ratio: 3449 / 4435; 
  }
}
</style>

<style>
details {
  border: 1px solid var(--global-divider-color);
  border-radius: 10px;
  padding: 10px;
  margin: 20px 0;
  background-color: var(--global-card-bg-color);
  color: var(--global-text-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-weight: bold;
    color: var(--global-text-color);

    &:hover {
      color: var(--global-hover-color);
    }
  }

  .control-icon {
    fill: var(--global-theme-color);
    transition: 0.3s ease;
  }

  details[open] {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    .control-icon-expand {
      display: none;
    }

    .control-icon-close {
      display: inline;
    }
  }
}
</style>

<div class="main-container">
    <div class="canvas-container">
        <canvas id="myCanvas" width="600" height="450"></canvas>
    </div>
    <div class="controls-container">
        <h5>Beam Width <span id="bw"></span> ( \(1 / V_b \) ) </h5>
    <div class="slider-button-container">
        <input type="range" min="0.0" max="0.3" value="0.1" step="0.01" class="slider w3-slider" id="myRange">
        <button class="stylish-button" id="start">Run</button>
    </div>
        <p>
        The phenomenon of the two-stream instability occurs 
        where plasma flows are moving in opposite directions. 
        This instability arises from the transfer of energy 
        between particles in the plasma and EM wave, 
        leading to the exponential growth of certain wave modes, 
        described by the dispersion relation:
        \[ 1 = \dfrac{\omega_p^2/2}{(\omega+\omega_D)^2} + \dfrac{\omega_p^2/2}{(\omega-\omega_D)^2}. \]
        (See blog post for more detail :smile:)
        </p>
    </div>
</div>

<script>
  let start = document.querySelector("#start");
  start.addEventListener("click", Restart, false);
  
  var slider = document.getElementById("myRange");
  var output = document.getElementById("bw");
  output.innerHTML = slider.value;
  
  slider.oninput = function() {
      output.innerHTML = this.value;
      clearInterval(intervalid);
      updateParticles();
  }
  
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var maxX = canvas.width;
  var maxY = canvas.height;
  var tf = slider.value;
  
  /////////////////////////////
  var pi = 4.0 * Math.atan(1.0);
  var twopi = 8.0 * Math.atan(1.0);
  var L = twopi / 0.6124;
  var CL = 0.7;
  var PPC = 1000;
  var NG = 15;
  var NP = NG * PPC;
  var vb = 1.0;
  var dt = 0.1;
  var dx = L / 15.0;
  var n0 = NP / L;
  var r = new Array();
  var v = new Array();
  var vp = new Array();
  var rho = new Array();
  var phi = new Array();
  var E = new Array();
  var t = 0.0;
  var radius = 1;
  var bw = slider.value
  /////////////////////////////
  
  function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  fitToContainer(canvas);
  
  function ini() {
    var bw = slider.value
    t = 0.0
    r = new Array()
    v = new Array()
    rho = new Array()
    phi = new Array()
    E = new Array()
    // Uniform position of electron
    for (var i = 0 ; i < NP ; i++){
      var x = GRN(0.0, L);
      r.push(x);
    }  
    // two cold stream
    // for (var i = 0 ; i < NP / 2 ; i++){
    //   v.push(vb);
    // }
    // for (var i = 0 ; i < NP / 2 ; i++){
    //   v.push(-vb);
    // }
  
    // two warm stream
    for (var i = 0 ; i < NP / 2 ; i++){
      v.push(gaussianRandom(+vb, vb * bw))
    }
    for (var i = 0 ; i < NP / 2 ; i++){
      v.push(gaussianRandom(-vb, vb * bw))
    }
  }
  
  function gaussianRandom(mean=0, stdev=1) {
      let u = 1 - Math.random(); 
      let v = Math.random();
      let z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
      return z * stdev + mean;
  }
  
  function GRN(min, max) {
      return Math.random() * (max - min) + min;
  }
  
  function density(){
    for (var i = 0 ; i < NG ; i++){
      rho[i] = 0.0;
    }
    for (var i = 0 ; i < NP ; i++){
      var j = Math.floor(r[i] / dx);
      y = r[i] / dx - j;
      if (j == 0){
        rho[NG-1] = rho[NG-1] + (1.0 - y) / dx;
        rho[0] = rho[0] + y / dx;
      }
      else{
        rho[j-1] = rho[j-1] + (1.0 - y) / dx;
        rho[j] = rho[j] + y / dx;
      }
    }
    for (var i = 0 ; i < NG ; i++){
      rho[i] = rho[i] / n0 - 1.0;
    }
  }
  
  function field(){
    E[0] = (phi[NG-1] - phi[1]) / 2.0 / dx;
    E[NG-1] = (phi[NG-2] - phi[0]) / 2.0 / dx;
    for (var i = 1 ; i < NG-1 ; i++){
      E[i] = (phi[i-1] - phi[i+1]) / 2.0 / dx;
    }
  }
  
  function Poisson(){
    phi[NG-1] = 0.0;
    phi[0] = 0.0;
    for (var i = 0 ; i < NG ; i++){
      phi[0] = phi[0] + i * rho[i];
    }
    phi[0] = phi[0] / NG;
    phi[1] = rho[0] + 2.0 * phi[0];
  
    for (var i = 2 ; i < NG-1 ; i++){
      phi[i] = rho[i-1] - phi[i-2] + 2.0 * phi[i-1];
    }
  
    for (var i = 0 ; i < NG ; i++){
      phi[i] = phi[i] * dx * dx;
    }
  }
  
  function accel(x){
    var j = Math.floor(x / dx);
    var y = x / dx - j;
    var a = 0.0;
  
    if (j == 0){
      a = - (E[NG-1] * (1.0 - y) + E[0] * y);
    }
    else{
      a = - (E[j-1] * (1.0 - y) + E[j] * y);
    }
    return a
  }
  
  function leapfrog(){
    var vp = v;
    for (var i = 0 ; i < NP ; i++){
      v[i] = v[i] + accel(r[i]) * dt;
      r[i] = r[i] + vp[i] * dt;
      // Check if particle are inside 0 <= x <= L
      if (r[i] < 0.0){
        r[i] = r[i] + L;
      }
      else if (r[i] >= L){
        r[i] = r[i] - L;
      }
    }
  }
  
  function halfleap(){
    for (var i = 0 ; i < NP ; i++){
      v[i] = v[i] - 0.5 * accel(r[i]) * dt;
    }
  }
  
  function Start(){
    ini();
    density();
    Poisson();
    field();
    halfleap();
  }
  
  
  function move(){
    density();
    Poisson();
    field();
    leapfrog();
    t = t + dt;
  }
  
  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < NP; i++){
          ctx.beginPath();
          ctx.arc(r[i] / L * maxX, (v[i] + 3) / 6 * maxY, radius, 0, Math.PI*2);
          if (i < NP / 2){
            ctx.fillStyle = 'rgb(0, 165, 173)';
          }
          else{
            ctx.fillStyle = 'rgb(239, 68, 111)';
          }
          ctx.fill();
          ctx.closePath();        
      }
  }
  
  
  function ani() {
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
   
      draw();
      move();
  }
  
  var intervalid 
  
  function Restart(){
    clearInterval(intervalid);
    Start();
    intervalid = setInterval(ani, 20);
  }

  function updateParticles() {
    ini(); 
    draw();
  }

  updateParticles();
  
  // Restart()
  
</script>
{% endraw %}