// basic client-side behavior to replace small React bits
document.addEventListener('DOMContentLoaded', function () {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // basic menu toggle for mobile
  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var nav = document.querySelector('.main-nav');
      if (nav) nav.style.display = nav.style.display === 'block' ? '' : 'block';
    });
  }

  // Simulated symptom checker (replace with real API if you have one)
  var form = document.getElementById('symptomForm');
  var result = document.getElementById('result');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var age = fd.get('age') || 'unknown';
      var symptoms = (fd.get('symptoms') || '').split(',').map(function(s){return s.trim()}).filter(Boolean);

      // Basic heuristic: long list of symptoms -> suggest consult
      var message;
      if (symptoms.length === 0) {
        message = 'Please enter at least one symptom.';
      } else if (symptoms.length >= 3) {
        message = 'Multiple symptoms detected. We recommend booking a video consultation.';
      } else {
        message = 'For ' + symptoms.join(', ') + ' — try rest, hydration, and monitor. If symptoms worsen, book a consultation.';
      }

      result.hidden = false;
      result.innerHTML = '<strong>Age:</strong> ' + age + '<br><strong>Symptoms:</strong> ' + (symptoms.join(', ') || 'none') + '<p style="margin-top:.6rem">' + message + '</p>';
    });
  }

  // example: client-side link handling if you used <a href="/path"> internal links
  var internalLinks = document.querySelectorAll('a[href^="/"]');
  internalLinks.forEach(function (a) {
    a.addEventListener('click', function (evt) {
      // keep default behavior for now; implement SPA routing if you want.
    });
  });

  // ------------------ ADD MAP INTEGRATION ------------------
  var medicineMapContainer = document.getElementById("map");
  if (medicineMapContainer) {
    var medMap = L.map("map").setView([30.3752, 76.1529], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(medMap);

    // Pharmacy markers
    L.marker([30.3752, 76.1529]).addTo(medMap)
      .bindPopup("Civil Hospital Pharmacy");

    L.marker([30.3785, 76.159]).addTo(medMap)
      .bindPopup("Nabha Medical Store");

    L.marker([30.382, 76.155]).addTo(medMap)
      .bindPopup("Local Chemist");
  }
});