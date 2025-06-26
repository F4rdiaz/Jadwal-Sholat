function tampilkanJadwalSholat(lat, lon) {
  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const waktu = data.data.timings;
      const lokasi = data.data.meta.timezone;

      document.getElementById("location").textContent = `Lokasi: ${lokasi}`;

      const prayerDiv = document.getElementById("prayer-times");
      prayerDiv.innerHTML = ""; // Kosongkan konten dulu

      const sholatList = ["Fajr", "Dzuhur", "Asr", "Maghrib", "Isha"];

      sholatList.forEach((sholat) => {
        const waktuItem = document.createElement("div");
        waktuItem.innerHTML = `<strong>${sholat}</strong><br>${waktu[sholat]}`;
        prayerDiv.appendChild(waktuItem);
      });
    })
    .catch(() => {
      document.getElementById("location").textContent =
        "Gagal mengambil data lokasi/jadwal.";
    });
}

function getLocationAndShowPrayerTimes() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        tampilkanJadwalSholat(lat, lon);
      },
      () => {
        document.getElementById("location").textContent =
          "Izin lokasi ditolak.";
      }
    );
  } else {
    document.getElementById("location").textContent =
      "Geolocation tidak didukung browser ini.";
  }
}

window.onload = getLocationAndShowPrayerTimes;
