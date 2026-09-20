(function () {
  'use strict';

  const list    = document.getElementById('announcements-list');
  const noRes   = document.getElementById('no-results');
  const search  = document.getElementById('search-input');
  const typeEl  = document.getElementById('type-filter');
  const sortEl  = document.getElementById('sort-select');

  if (!list) return; // not on the index page

  function getCards() {
    return Array.from(list.querySelectorAll('.announcement-card'));
  }

  function applyFilters() {
    const q    = search.value.trim().toLowerCase();
    const type = typeEl.value;

    let cards = getCards();
    let visible = 0;

    cards.forEach(function (card) {
      const matchText = !q ||
        card.dataset.name.includes(q) ||
        card.dataset.location.includes(q) ||
        card.dataset.reason.includes(q) ||
        card.dataset.notes.includes(q);

      const matchType = !type || card.dataset.type === type;

      const show = matchText && matchType;
      card.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    noRes.style.display = visible === 0 ? '' : 'none';
  }

  function applySort() {
    const val   = sortEl.value;
    const cards = getCards();

    cards.sort(function (a, b) {
      if (val === 'date-asc')  return a.dataset.date.localeCompare(b.dataset.date);
      if (val === 'date-desc') return b.dataset.date.localeCompare(a.dataset.date);
      if (val === 'name-asc')  return a.dataset.name.localeCompare(b.dataset.name);
      return 0;
    });

    cards.forEach(function (card) { list.appendChild(card); });
  }

  function update() {
    applySort();
    applyFilters();
  }

  search.addEventListener('input', applyFilters);
  typeEl.addEventListener('change', applyFilters);
  sortEl.addEventListener('change', update);

  // Formspree AJAX submission for the submit page
  var form = document.getElementById('submission-form');
  var successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          form.style.display = 'none';
          successMsg.style.display = '';
        } else {
          return response.json().then(function (json) {
            throw new Error(json.error || 'Submission failed. Please try again.');
          });
        }
      })
      .catch(function (err) {
        alert(err.message);
      });
    });
  }
})();
