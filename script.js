// ===== PAGE NAVIGATION =====
function showPage(pageId, clickedLink) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show selected page
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  if (clickedLink) clickedLink.classList.add('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== EXPLORE FILTER =====
function filterRequests() {
  const cat = document.getElementById('filter-category').value;
  const urg = document.getElementById('filter-urgency').value;
  const cards = document.querySelectorAll('#explore-cards .card');

  cards.forEach(card => {
    const tags = card.querySelectorAll('.tag');
    let tagTexts = Array.from(tags).map(t => t.textContent.trim());

    const catMatch = cat === 'All categories' || tagTexts.includes(cat);
    const urgMatch = urg === 'All urgency levels' || tagTexts.includes(urg);

    card.style.display = (catMatch && urgMatch) ? 'block' : 'none';
  });
}

// ===== MESSAGES =====
function sendMessage(e) {
  e.preventDefault();
  const to = document.getElementById('msg-to').value;
  const text = document.getElementById('msg-text').value.trim();
  if (!text) return alert('Please write a message first.');

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const list = document.getElementById('messages-list');
  const div = document.createElement('div');
  div.className = 'msg-item';
  div.innerHTML = `
    <div class="msg-body">
      <div class="msg-from">You → ${to}</div>
      <p class="text-muted">${text}</p>
    </div>
    <span class="msg-time">${time}</span>
  `;
  list.appendChild(div);
  document.getElementById('msg-text').value = '';
  div.scrollIntoView({ behavior: 'smooth' });
}

// ===== NOTIFICATIONS =====
function markRead(btn) {
  btn.textContent = 'Read';
  btn.className = 'tag-btn read';
}

// ===== PROFILE SAVE =====
function saveProfile(e) {
  e.preventDefault();
  const name = document.getElementById('profile-name').value;
  alert('Profile saved! Name: ' + name);
}

// ===== CREATE REQUEST =====
function publishRequest(e) {
  e.preventDefault();
  const title = document.getElementById('req-title').value.trim();
  if (!title) return alert('Please add a title for your request.');
  alert('Request published: "' + title + '"');
}

function applyAI() {
  const title = document.getElementById('req-title').value.trim();
  const desc = document.getElementById('req-desc').value.trim();

  if (!title && !desc) {
    alert('Please fill in a title or description first to get AI suggestions.');
    return;
  }

  // Simple keyword-based AI simulation
  const lower = (title + ' ' + desc).toLowerCase();
  let cat = 'General', urg = 'Low', tags = 'Community, Help';

  if (lower.includes('figma') || lower.includes('design') || lower.includes('poster')) { cat = 'Design'; tags = 'Figma, Design, UI/UX'; }
  else if (lower.includes('react') || lower.includes('javascript') || lower.includes('css') || lower.includes('html') || lower.includes('portfolio')) { cat = 'Web Development'; tags = 'JavaScript, HTML/CSS, Frontend'; }
  else if (lower.includes('interview') || lower.includes('career') || lower.includes('internship')) { cat = 'Career'; tags = 'Interview Prep, Career, Frontend'; }

  if (lower.includes('urgent') || lower.includes('tomorrow') || lower.includes('deadline') || lower.includes('asap')) urg = 'High';
  else if (lower.includes('soon') || lower.includes('this week')) urg = 'Medium';

  document.getElementById('ai-cat').textContent = cat;
  document.getElementById('ai-urg').textContent = urg;
  document.getElementById('ai-tags').textContent = tags;
  document.getElementById('ai-rewrite').textContent =
    title ? `"${title}" — A clear request for ${cat.toLowerCase()} support with ${urg.toLowerCase()} urgency.` : 'Add a title for a rewrite suggestion.';

  document.getElementById('req-category').value = cat;
  document.getElementById('req-urgency').value = urg;
  document.getElementById('req-tags').value = tags;
}