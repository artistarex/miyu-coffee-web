window.addEventListener('load', function() {

  var buttons  = document.querySelectorAll('.cat-btn');
  var sections = document.querySelectorAll('.menu-section');
  var dividers = document.querySelectorAll('.divider');

  function filterCat(cat) {
    buttons.forEach(function(b) { b.classList.remove('active'); });

    var activeBtn = document.querySelector('[data-cat="' + cat + '"].cat-btn');
    if (activeBtn) activeBtn.classList.add('active');

    sections.forEach(function(s) {
      var sCat = s.getAttribute('data-cat');
      s.style.display = (cat === 'all' || sCat === cat) ? 'block' : 'none';
    });

    dividers.forEach(function(d) {
      d.style.display = (cat === 'all') ? 'block' : 'none';
    });
  }

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterCat(this.getAttribute('data-cat'));
    });

    // Mobil için touchend de ekle
    btn.addEventListener('touchend', function(e) {
      e.preventDefault();
      filterCat(this.getAttribute('data-cat'));
    });
  });

});
