document.addEventListener('DOMContentLoaded', function() {

  function filterCat(cat) {
    // Aktif buton
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.cat-btn[data-cat="${cat}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const sections = document.querySelectorAll('.menu-section');
    const dividers = document.querySelectorAll('.divider');

    sections.forEach(s => {
      if (cat === 'all' || s.dataset.cat === cat) {
        s.classList.remove('hidden');
        s.querySelectorAll('.menu-item, .special-card, .extra-item').forEach((item, i) => {
          item.style.animation = 'none';
          item.offsetHeight;
          item.style.animation = '';
          item.style.animationDelay = (i * 0.04) + 's';
        });
      } else {
        s.classList.add('hidden');
      }
    });

    dividers.forEach(d => {
      d.style.display = cat === 'all' ? 'block' : 'none';
    });
  }

  // Butonlara event listener ekle
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      filterCat(this.dataset.cat);
    });
  });

});
