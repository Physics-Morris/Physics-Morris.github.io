---
layout: default
title: Co-author Analyzer
permalink: /coauthor/
nav: false
nav_order: 7
thumbnail: /assets/img/coauthor-preview.png
compress_html: false
---

# Co-author Analyzer

<style>
  .subtitle {
    text-align: left;
    color: #6c757d;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .card-custom {
    background: var(--global-card-bg-color, #fff);
    border: 1px solid var(--global-divider-color, #dee2e6);
    border-radius: 0.75rem;
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .input-group {
    max-width: 500px;
    margin: 0 auto 1rem;
    display: flex;
    box-shadow: none;
  }

  .input-group input {
    flex: 1;
    border: 1px solid var(--global-divider-color);
    border-right: none;
    border-radius: 0.4rem 0 0 0.4rem;
    padding: 0.5rem 0.75rem;
  }

  .input-group button {
    border: 1px solid var(--global-divider-color);
    background-color: var(--global-theme-color);
    color: white;
    border-radius: 0 0.4rem 0.4rem 0;
    padding: 0.5rem 1rem;
  }

  .openalex-link {
    text-align: center;
    display: block;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #ccc;
    border-bottom-color: var(--global-theme-color);
    border-radius: 50%;
    display: none;
    margin: 2rem auto;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .alert-custom {
    text-align: center;
    margin: 1rem auto;
    padding: 0.8rem;
    max-width: 600px;
    border-radius: 0.5rem;
    display: none;
  }

  .alert-danger-custom {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .results-title {
    text-align: center;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  table.simple-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  table.simple-table th,
  table.simple-table td {
    border: 1px solid var(--global-divider-color);
    padding: 0.6rem 1rem;
    text-align: left;
  }

  table.simple-table th {
    background: var(--global-light-bg-color);
  }

  .hidden-id {
    display: none;
  }

</style>

I always curious about how researchers collaborates. I built this simple tool to quantify the co-author pattern. Hope you also find it useful! :smile:


<div class="card-custom">
  <div class="input-group">
    <input type="text" id="authorIdInput" placeholder="Enter OpenAlex Author ID (e.g., a5083138872)" onkeypress="if(event.key==='Enter') analyze()">
    <button onclick="analyze()">Analyze</button>
  </div>
<p class="subtitle">
  🔍 To find your OpenAlex Author ID, visit <a href="https://openalex.org/authors?page=1" target="_blank" rel="noopener noreferrer">openalex.org</a>, search for your name (e.g., <em>Albert Einstein</em>), and click the correct author profile. The Author ID is the string at the end of the URL — for example, <code>https://openalex.org/a5083138872</code> has Author ID <strong>a5083138872</strong>. Tip: use <kbd>Ctrl</kbd> + <kbd>F</kbd> to quickly locate the author you're interested in.
</p>

</div>

<div id="loadingSpinner" class="loading-spinner"></div>
<div id="statusAlert" class="alert-custom alert-danger-custom"></div>

<div id="resultsContainer" class="card-custom" style="display: none;">
  <h2 id="resultsTitle" class="results-title"></h2>
  <table class="simple-table" id="resultTable">
    <thead>
      <tr>
        <th class="hidden-id">ID</th>
        <th>Name</th>
        <th style="text-align: center;">Publications</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>

<script src="{{ '/assets/js/coauthor.js' | relative_url }}"></script>