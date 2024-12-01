---
layout: default
title: Night Sky
permalink: /night-sky/
nav: false
nav_order: 6
---


<style>
  #typedtext {
      font-family: 'Gloria Hallelujah', cursive;
      white-space: pre-wrap; 
  }
  #particles-js {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  background: black;
  }

  #milky-way-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    pointer-events: none; 
  }


  .sky-content {
    position: relative;
    z-index: 1; 
    color: white; 
    text-align: center;
    padding: 10px;
    margin-top: 0px; 
    height: 120vh;
  }
  .copy-btn {
    margin: 15px 0;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .copy-btn:hover {
    background-color: #ffddaa;
    color: #000;
    transform: scale(1.05);
  }

  .build-with, .source-code {
    margin: 10px 0;
    font-size: 16px;
  }

  .build-with a, .source-code a {
    text-decoration: none;
    color: #ffddaa;
    transition: color 0.3s ease;
  }

  .build-with a:hover, .source-code a:hover {
    color: #ffffff;
  }

  body.fullscreen .sky-content,
  body.fullscreen header,
  body.fullscreen footer {
    display: none; 
  }

  body.fullscreen #particles-js {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; 
    background: black;
  }

  .fullscreen-btn {
    margin-top: 10px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .fullscreen-btn:hover {
    background-color: #ffddaa;
    color: #000;
    transform: scale(1.05);
  }
</style>


<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<div id="particles-js"></div>

<div class="sky-content" id="sky-content">
  <h1 class="post-title" style="font-family: 'Gloria Hallelujah', cursive; margin-bottom: 20px;">Welcome to the Night Sky</h1>
    
  <p class="build-with">
  :sparkles: Built with <a href="https://vincentgarreau.com/particles.js/" target="_blank">Particles.js</a>. 
  See source code here <a href="https://github.com/Physics-Morris/night-sky" target="_blank" style="color: #ffddaa;">[GitHub]</a>. Share this night sky ~ :milky_way:
  </p>

  <p>
  <a class="twitter-share-button"
    href="https://twitter.com/intent/tweet?text=Check%20out%20this%20beautiful%20Night%20Sky%20Wallpaper!&url=https://github.com/Physics-Morris/night-sky&hashtags=NightSky,Wallpaper,ParticlesJS" data-size="large"> Tweet 
  </a>
  </p>

  <button id="fullscreen-button" class="fullscreen-btn">Full Screen</button>

</div>


<script>
  function initializeParticles() {
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 7000,
          "density": {
            "enable": true,
            "value_area": 2000 
          }
        },
        "color": {
          "value": ["#ffffff", "#ffddaa", "#aad4ff", "#ff9999"]
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          }
        },
        "opacity": {
          "value": 1.0,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.5, 
            "opacity_min": 0.3,
            "sync": false
          }
        },
        "size": {
          "value": 2,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.3,
            "size_min": 0.5,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false 
        },
        "move": {
          "enable": true,
          "speed": 0.01, 
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": false
          },
          "onclick": {
            "enable": false
          },
          "resize": true
        }
      },
      "retina_detect": true
    });
  }

initializeParticles();



function destroyParticles() {
  if (window.pJSDom && window.pJSDom.length > 0) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
}


function createShootingStar() {
  const canvas = document.querySelector(".particles-js-canvas-el");
  const ctx = canvas.getContext("2d");

  const elementColors = [
    { name: "Nitrogen/Oxygen", colors: ["rgba(255, 69, 0, 1)", "rgba(255, 69, 0, 0)"] }, // Red
    { name: "Iron", colors: ["rgba(255, 255, 0, 1)", "rgba(255, 255, 0, 0)"] }, // Yellow
    { name: "Calcium", colors: ["rgba(138, 43, 226, 1)", "rgba(138, 43, 226, 0)"] }, // Violet
    { name: "Sodium", colors: ["rgba(255, 165, 0, 1)", "rgba(255, 165, 0, 0)"] }, // Orange
    { name: "Magnesium", colors: ["rgba(135, 206, 250, 1)", "rgba(135, 206, 250, 0)"] }, // Light blue
    { name: "Copper", colors: ["rgba(70, 130, 180, 1)", "rgba(70, 130, 180, 0)"] }, // Blue
  ];

  const randomElement = elementColors[Math.floor(Math.random() * elementColors.length)];

  const star = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 5 + 2,
    speedX: Math.random() * 8 - 2,
    speedY: Math.random() * 8 - 2,
    opacity: 1,
    trailLength: 0,
    fading: false,
  };

  function animateStar() {
    if (!star.fading) {
      star.opacity -= 0.008; 
      if (star.opacity <= 0) {
        return; 
      }
    }

    const velocity = Math.sqrt(star.speedX ** 2 + star.speedY ** 2);
    const tailX = star.x - star.trailLength * (star.speedX / velocity);
    const tailY = star.y - star.trailLength * (star.speedY / velocity);

    star.trailLength += velocity * 0.5;

    // trail
    const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
    gradient.addColorStop(1, `rgba(${parseColor(randomElement.colors[0])}, 0)`);

    ctx.globalCompositeOperation = "lighter";
    ctx.beginPath();
    ctx.strokeStyle = gradient;

    ctx.lineWidth = Math.max(1, star.size - star.trailLength / 50);
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();

    star.x += star.speedX;
    star.y += star.speedY;

    requestAnimationFrame(animateStar);
  }


  animateStar();
}

function parseColor(rgba) {
  const result = rgba.match(/\d+/g);
  return result.slice(0, 3).join(",");
}

setInterval(createShootingStar, Math.random() * 500 + 250);

</script>

<script>
  const copyButton = document.getElementById("copy-button");

  copyButton.addEventListener("click", async () => {
    const urlToCopy = window.location.href;
    try {
      await navigator.clipboard.writeText(urlToCopy);

      copyButton.textContent = "Copied!";
      copyButton.classList.add("success");

      setTimeout(() => {
        copyButton.textContent = "Copy Website Link";
        copyButton.classList.remove("success");
      }, 3000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  });
</script>

<script>
  const fullscreenButton = document.getElementById('fullscreen-button');
  const particlesContainer = document.getElementById('particles-js');

  fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      particlesContainer.requestFullscreen()
        .then(() => {
          destroyParticles();
          initializeParticles();
          document.body.classList.add('fullscreen');
        })
        .catch((err) => {
          console.error(`Error attempting fullscreen: ${err.message}`);
        });
    } else {
      document.exitFullscreen()
        .then(() => {
          destroyParticles();
          initializeParticles();
          document.body.classList.remove('fullscreen');
        })
        .catch((err) => {
          console.error(`Error exiting fullscreen: ${err.message}`);
        });
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      destroyParticles();
      initializeParticles();
      document.body.classList.remove('fullscreen');
    }
  });
</script>

<script>
  function shareNightSky() {
    if (navigator.share) {
      navigator.share({
        title: 'Night Sky Wallpaper',
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch((err) => {
        console.error('Error sharing:', err);
      });
    } else {
      alert("Your browser doesn't support sharing. You can manually copy the link: " + window.location.href);
    }
  }
</script>