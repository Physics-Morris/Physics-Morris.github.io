---
layout: default
title: gallery
permalink: /gallery/
description: A photo collection of my cat named 饋修 (Warm in Taiwanese).
nav: true
nav_order: 5
---

# His name is 饋修 (Warm in Taiwanese)

Here are some of my favorite photos of him! :smile:

<div class="gallery-grid">
{% for photo in site.static_files %}
  {% if photo.path contains '/assets/img/warm/' %}
  <div class="gallery-item">
    <img src="{{ photo.path | relative_url }}" alt="Cute cat photo" onclick="openModal('{{ photo.path | relative_url }}')" loading="lazy" />
  </div>
  {% endif %}
{% endfor %}
</div>

<!-- Modal for half-screen view -->
<div id="modal" class="modal" onclick="closeModal(event)">
  <div class="modal-content-wrapper">
    <img class="modal-content" id="modal-img">
    <div class="caption" id="modal-caption"></div>
    <a class="prev" onclick="changePhoto(-1)">&#10094;</a>
    <a class="next" onclick="changePhoto(1)">&#10095;</a>
  </div>
</div>

<style>
/* Gallery Grid */
.gallery-grid {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 20px;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  object-fit: cover;
}

.gallery-item img:hover {
  transform: scale(1.05);
  cursor: pointer;
}

/* Modal Style */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85); /* Dark transparent background */
}

.modal-content-wrapper {
  position: relative;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  width: 80%;
  max-width: 600px;
  text-align: center;
}

.modal-content {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Soft shadow to make it stand out */
}

.caption {
  text-align: center;
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
}

/* Navigation Buttons */
.prev, .next {
  position: absolute;
  top: 50%;
  color: #333; /* Dark gray arrows for better visibility */
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transform: translateY(-50%);
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.6); /* Slightly transparent background */
  border-radius: 50%;
}

.prev { left: 10px; }
.next { right: 10px; }

.prev:hover, .next:hover {
  color: #000; /* Darker hover effect */
  background-color: rgba(255, 255, 255, 0.8);
}

</style>

<script>
let currentIndex = 0;
let photos = Array.from(document.querySelectorAll('.gallery-item img'));

function openModal(src) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-img").src = src;
  currentIndex = photos.findIndex(img => img.src.includes(src));
}

function closeModal(event) {
  if (event.target.classList.contains('modal')) {
    document.getElementById("modal").style.display = "none";
  }
}

function changePhoto(step) {
  currentIndex = (currentIndex + step + photos.length) % photos.length;
  document.getElementById("modal-img").src = photos[currentIndex].src;
}
</script>
