---
layout: default
title: Gallery
permalink: /gallery/
description: A photo collection of my cat named 饋修 (Warm in Taiwanese).
nav: false
nav_order: 5
---

# His name is 饋修 (Warm in Taiwanese)

Here are some of my favorite photos of him! :smile:

<div class="gallery-grid" id="galleryGrid"></div>

<!-- Modal for viewing images -->
<div id="modal" class="modal" onclick="closeModal(event)">
  <div class="modal-content-wrapper">
    <img class="modal-content" id="modal-img" alt="Gallery Image">
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

.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.caption {
  text-align: center;
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
}

.prev, .next {
  position: absolute;
  top: 50%;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid #fff;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 1001; /* Ensures the buttons are above the image */
}

.prev:hover, .next:hover {
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.prev {
  left: -70px; /* Position outside the image */
}

.next {
  right: -70px; /* Position outside the image */
}

</style>

<script>
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load and display images
document.addEventListener("DOMContentLoaded", function() {
  const photos = [
    {% for photo in site.static_files %}
      {% if photo.path contains '/assets/img/warm/' %}
        { src: "{{ photo.path | relative_url }}", alt: "Cute cat photo" },
      {% endif %}
    {% endfor %}
  ];

  const shuffledPhotos = shuffle(photos);
  const galleryGrid = document.getElementById("galleryGrid");

  shuffledPhotos.forEach(photo => {
    const galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";
    img.onclick = () => openModal(photo.src);

    galleryItem.appendChild(img);
    galleryGrid.appendChild(galleryItem);
  });
});

let currentIndex = 0;

function openModal(src) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-img").src = src;
  currentIndex = Array.from(document.querySelectorAll('.gallery-item img')).findIndex(img => img.src.includes(src));
}

// Close modal
function closeModal(event) {
  if (event.target.classList.contains('modal')) {
    document.getElementById("modal").style.display = "none";
  }
}

function changePhoto(step) {
  const photos = Array.from(document.querySelectorAll('.gallery-item img'));
  currentIndex = (currentIndex + step + photos.length) % photos.length;
  document.getElementById("modal-img").src = photos[currentIndex].src;
}
</script>
