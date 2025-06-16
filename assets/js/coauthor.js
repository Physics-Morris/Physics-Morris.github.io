async function analyze(preloadId = null) {
  const authorId = preloadId || document.getElementById("authorIdInput").value.trim();
  if (!authorId) {
    showStatus('Please enter an OpenAlex Author ID.', 'danger');
    return;
  }

  const loadingSpinner = document.getElementById("loadingSpinner");
  const statusAlert = document.getElementById("statusAlert");
  const resultsContainer = document.getElementById("resultsContainer");
  const tableBody = document.querySelector("#resultTable tbody");

  loadingSpinner.style.display = "block";
  statusAlert.style.display = "none";
  resultsContainer.style.display = "none";
  tableBody.innerHTML = "";

  try {
    const authorUrl = `https://api.openalex.org/authors/${authorId}`;
    const authorResponse = await fetch(authorUrl);
    if (!authorResponse.ok) throw new Error('Author not found. Please check the ID.');

    const authorInfo = await authorResponse.json();
    const targetAuthorName = authorInfo.display_name;
    document.getElementById("resultsTitle").textContent = `Co-authors of ${targetAuthorName}`;

    const results = {};
    let cursor = "*";
    while (cursor) {
      const url = `https://api.openalex.org/works?filter=author.id:${authorId}&per-page=200&cursor=${cursor}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        data.results.forEach(work => {
          work.authorships.forEach(author => {
            const id = author.author.id?.split("/").pop();
            const name = author.author.display_name;
            if (id && name && name !== targetAuthorName) {
              if (!results[name]) results[name] = { ids: new Set(), count: 0 };
              results[name].ids.add(id);
              results[name].count += 1;
            }
          });
        });
      }
      cursor = data.meta.next_cursor;
    }

    if (Object.keys(results).length === 0) {
      showStatus("No co-author data found for this author ID.", "danger");
      return;
    }

    const entries = Object.entries(results).sort((a, b) => b[1].count - a[1].count);
    entries.forEach(([name, data]) => {
      const ids = Array.from(data.ids);
      const row = `<tr>
        <td class="hidden-id">${ids.join(", ")}</td>
        <td title="OpenAlex IDs: ${ids.join(", ")}">${name}</td>
        <td style="text-align: center;">${data.count}</td>
      </tr>`;
      tableBody.insertAdjacentHTML("beforeend", row);
    });

    resultsContainer.style.display = "block";
  } catch (error) {
    showStatus(`Error: ${error.message}`, 'danger');
  } finally {
    loadingSpinner.style.display = "none";
  }
}

function showStatus(message, type = 'info') {
  const alert = document.getElementById('statusAlert');
  alert.textContent = message;
  alert.className = `alert-custom alert-${type}-custom`;
  alert.style.display = 'block';
}