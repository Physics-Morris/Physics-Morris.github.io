---
layout: default
title: Books
permalink: /books/
nav: false
nav_order: 7
---

I enjoy reading in my free time. 
Here’s a growing list of books I’ve read and loved.
I’d love to **[connect](mailto:morris@cs.unc.edu)** and have a chat !

<style>
  .books-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    gap: 2.5rem 2rem;
    justify-content: center;
  }

  .book-card {
    width: 150px;
    text-align: center;
    font-size: 0.85rem;
  }

  .book-cover {
    width: 150px;
    height: 225px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 0.5rem;
    transition: transform 0.2s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .book-cover:hover {
    transform: scale(1.03);
  }

  .book-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
    line-height: 1.2;
    height: 2.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .book-author {
    color: #666;
    font-size: 0.75rem;
    min-height: 2.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .book-rating {
    color: #f8b400;
    font-size: 0.75rem;
    margin-top: 0.5rem;
  }
  .book-rating .empty-star {
    color: #ddd;
  }
</style>

<div class="books-wrapper">
  <div class="book-grid">
    {% for book in site.data.books %}
      <div class="book-card">
        <img class="book-cover" 
             src="{{ book.cover_url | default: '/assets/img/blank.jpg' }}" 
             alt="{{ book.title }}">
        <div class="book-title">{{ book.title }}</div>
        <div class="book-author">{{ book.author }}</div>
        <div class="book-rating">
          {% assign rating_floor = book.rating | floor %}
          {% assign rating_decimal = book.rating | minus: rating_floor %}
          
          {% for i in (1..5) %}
            {% if i <= rating_floor %}
              ★
            {% elsif i == rating_floor | plus: 1 and rating_decimal >= 0.5 %}
              ★
            {% else %}
              <span class="empty-star">★</span>
            {% endif %}
          {% endfor %}
        </div>
      </div>
    {% endfor %}
  </div>
</div>