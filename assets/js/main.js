// Main JS to initialize plugins and behaviors
// Plugins used (6):
// 1) Slick Carousel (slider)
// 2) MixItUp (filter/sort)
// 3) GLightbox (lightbox modal)
// 4) AOS (scroll animations)
// 5) Leaflet (interactive map)
// 6) jQuery Validate (form validation)

(function () {
  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // 1) Slick Hero Slider
  $('.hero-slider').slick({
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
    dots: true,
    adaptiveHeight: true
  });

  // 2) MixItUp — Featured grid (index) + Menu grid (menu page)
  var mixGrid = document.querySelector('#mix-grid');
  if (mixGrid) {
    var mixer1 = mixitup(mixGrid, {
      selectors: { target: '.mix' },
      animation: { effects: 'fade translateY(20%)', duration: 400 }
    });

    // Filter control buttons
    $('.filter-controls .btn').on('click', function () {
      $('.filter-controls .btn').removeClass('active');
      $(this).addClass('active');
      var filter = this.getAttribute('data-filter');
      mixer1.filter(filter);
    });
  }

  var mixMenu = document.querySelector('#mix-menu');
  if (mixMenu) {
    var mixer2 = mixitup(mixMenu, {
      selectors: { target: '.mix' },
      animation: { effects: 'fade translateY(20%)', duration: 400 }
    });

    $('.filter-controls .btn').on('click', function () {
      $('.filter-controls .btn').removeClass('active');
      $(this).addClass('active');
      var filter = this.getAttribute('data-filter');
      mixer2.filter(filter);
    });
  }

  // 3) GLightbox — Lightbox gallery
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true
  });

  // 4) AOS — Animate on scroll
  AOS.init({ once: true, duration: 500, easing: 'ease-out' });

  // 5) Leaflet — Map on contact page
  var mapEl = document.getElementById('map');
  if (mapEl) {
    var map = L.map('map').setView([49.2827, -123.1207], 12); // Vancouver by default
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([49.2827, -123.1207]).addTo(map)
      .bindPopup('Bluefin Bistro<br>Downtown Vancouver.')
      .openPopup();
  }

  // 6) jQuery Validate — Contact/Reservation form
  $('#reserveForm').length && $('#reserveForm').validate({
    errorClass: 'is-invalid',
    validClass: 'is-valid',
    rules: {
      name: { required: true, minlength: 2 },
      email: { required: true, email: true },
      date: { required: true },
      party: { required: true }
    },
    messages: {
      name: 'Please enter your full name',
      email: 'Please enter a valid email',
      date: 'Select a date',
      party: 'Select your party size'
    },
    highlight: function (element) { $(element).addClass('is-invalid').removeClass('is-valid'); },
    unhighlight: function (element) { $(element).removeClass('is-invalid').addClass('is-valid'); },
    submitHandler: function (form) {
      alert('Reservation request sent! (Demo)');
      form.reset();
      $('.is-valid').removeClass('is-valid');
    }
  });
})();
