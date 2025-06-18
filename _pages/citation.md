---
layout: default
title: Citation Analyzer
permalink: /citation/
nav: false
nav_order: 8
thumbnail: /assets/img/citation-preview.png
compress_html: false
---

# Citation Analyzer

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

Building on the previous <a href="{{ '/coauthor/' | relative_url }}" target="_blank" rel="noopener noreferrer">tool</a> for analyzing co-authors, this tool lists the researchers who have cited the author’s work.

<div class="card-custom">
  <div class="input-group">
    <input type="text" id="authorIdInput" placeholder="Enter OpenAlex Author ID (e.g., a5083138872)" onkeypress="if(event.key==='Enter') analyzeCitations()">
    <button onclick="analyzeCitations()">Analyze</button>
  </div>
  <p class="subtitle">
  🔍 To find your OpenAlex Author ID, visit <a href="https://openalex.org/authors?page=1" target="_blank" rel="noopener noreferrer">openalex.org</a>, search for your name (e.g., <em>Albert Einstein</em>), and click the correct author profile. The Author ID is the string at the end of the URL — for example, <code>https://openalex.org/a5083138872</code> has Author ID <strong>a5083138872</strong>. Tip: use <kbd>Ctrl</kbd> + <kbd>F</kbd> to quickly locate the author you're interested in.
  </p>
</div>


<div id="progressBarContainer" style="display:none; max-width: 600px; margin: 1rem auto;">
  <div style="background: #e9ecef; border-radius: 1rem; overflow: hidden; height: 1.25rem;">
    <div id="progressBar" style="height: 100%; background: var(--global-theme-color); width: 0%; transition: width 0.3s;"></div>
  </div>
  <div id="progressText" style="text-align: center; font-size: 0.9rem; margin-top: 0.4rem;">Loading...</div>
</div>

<div id="statusAlert" class="alert-custom alert-danger-custom"></div>

<div id="resultsContainer" class="card-custom" style="display: none;">
  <h2 id="resultsTitle" class="results-title"></h2>
  <table class="simple-table" id="resultTable">
    <thead>
      <tr>
        <th class="hidden-id">ID</th>
        <th>Name</th>
        <th style="text-align: center;">Times Cited Author's Work</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</div>

<script src="{{ '/assets/js/citation.js' | relative_url }}"></script>
