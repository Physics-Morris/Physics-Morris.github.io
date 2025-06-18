
async function analyzeCitations(preloadId = null) {
  const authorId = preloadId || document.getElementById("authorIdInput").value.trim();
  if (!authorId) {
    showStatus('Please enter an OpenAlex Author ID.', 'danger');
    return;
  }

  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const progressContainer = document.getElementById("progressBarContainer");
  const statusAlert = document.getElementById("statusAlert");
  const resultsContainer = document.getElementById("resultsContainer");
  const tableBody = document.querySelector("#resultTable tbody");

  progressBar.style.width = "0%";
  progressText.textContent = "Fetching papers...";
  progressContainer.style.display = "block";
  statusAlert.style.display = "none";
  resultsContainer.style.display = "none";
  tableBody.innerHTML = "";

  try {
    const authorUrl = `https://api.openalex.org/authors/${authorId}`;
    const authorResponse = await fetch(authorUrl);
    if (!authorResponse.ok) throw new Error('Author not found. Please check the ID.');
    const authorInfo = await authorResponse.json();
    const targetAuthorName = authorInfo.display_name;

    document.getElementById("resultsTitle").textContent = `Citing Authors of ${targetAuthorName}'s Papers`;

    const citedBy = {};
    let cursor = "*";

    while (cursor) {
      const worksUrl = `https://api.openalex.org/works?filter=author.id:${authorId}&per-page=200&cursor=${cursor}`;
      const worksResponse = await fetch(worksUrl);
      const worksData = await worksResponse.json();

      let totalWorks = worksData.results.length;
      let processed = 0;

      for (const work of worksData.results) {
        const citingUrl = `https://api.openalex.org/works?filter=cites:${work.id}&per-page=200`;
        const citingResponse = await fetch(citingUrl);
        const citingData = await citingResponse.json();

        citingData.results.forEach(citingWork => {
          citingWork.authorships.forEach(auth => {
            const id = auth.author.id ? auth.author.id.split("/").pop() : null;
            const name = auth.author.display_name;
            if (id && name && name !== targetAuthorName) {
              if (!citedBy[name]) citedBy[name] = { ids: new Set(), count: 0 };
              citedBy[name].ids.add(id);
              citedBy[name].count += 1;
            }
          });
        });

        processed++;
        const pct = Math.round((processed / totalWorks) * 100);
        progressBar.style.width = `${pct}%`;
        progressText.textContent = `Processing ${processed} of ${totalWorks} papers...`;
      }

      cursor = worksData.meta.next_cursor;
    }

    if (Object.keys(citedBy).length === 0) {
      showStatus("No citing author data found.", "danger");
      return;
    }

    const entries = Object.entries(citedBy).sort((a, b) => b[1].count - a[1].count);
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
    progressContainer.style.display = "none";
  }
}

function showStatus(message, type = 'info') {
  const alert = document.getElementById('statusAlert');
  alert.textContent = message;
  alert.className = `alert-custom alert-${type}-custom`;
  alert.style.display = 'block';
}
