let isCelebrating = false;  // Menandakan apakah perayaan sudah dimulai
let confettiAnimationFrame;  // Variabel untuk menyimpan ID animasi konfeti
let particles = [];  // Menyimpan partikel konfeti
let music = document.getElementById("backgroundMusic");
let musicPosition = 170;  // Posisi musik mulai dari detik ke-170
let musicPausedAt = musicPosition;  // Posisi musik ketika dipause
let messageText = document.getElementById("messageText");
let nellyPhoto = document.getElementById("nellyPhoto");
let complimentText = document.getElementById("complimentText");
let messageOutput = document.getElementById("messageOutput");
let button = document.getElementById("celebrateButton");  // Tombol "Rayakan"
let showPhotoButton = document.getElementById("showPhotoButton"); // Tombol untuk menampilkan foto Nelly

// Fungsi untuk memulai atau menghentikan perayaan
function celebrate() {
  if (!isCelebrating) {
    // Mulai musik dan konfeti saat pertama kali diklik
    if (music && music.paused) {
      music.currentTime = musicPausedAt;  // Mulai dari posisi terakhir dipause
      music.play();
    }

    // Tampilkan foto Nelly
    if (nellyPhoto) {
      nellyPhoto.style.display = "block";  // Menampilkan foto
    } else {
      console.error('Elemen dengan ID "nellyPhoto" tidak ditemukan.');
    }

    // Tampilkan pesan ucapan selamat
    const congratulationsMessage = document.getElementById("messageText");
    if (congratulationsMessage) {
      congratulationsMessage.style.display = "block";  // Menampilkan pesan
    } else {
      console.error('Elemen dengan ID "messageText" tidak ditemukan.');
    }

    // Jika konfeti belum dimulai, mulai konfeti
    if (particles.length === 0) {
      const canvas = document.getElementById("confettiCanvas");
      if (canvas) {
        const context = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Partikel konfeti
        const confettiColors = ["#4CAF50", "#FFC107", "#2196F3", "#FF5722"];
        particles = Array.from({ length: 150 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          size: Math.random() * 5 + 2,
          speedY: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
        }));

        function drawConfetti() {
          context.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((particle) => {
            context.fillStyle = particle.color;
            context.beginPath();
            context.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            context.fill();
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.x > canvas.width || particle.x < 0) particle.x = Math.random() * canvas.width;
          });
          confettiAnimationFrame = requestAnimationFrame(drawConfetti);  // Looping animasi konfeti
        }

        drawConfetti();  // Mulai animasi konfeti
      } else {
        console.error('Elemen dengan ID "confettiCanvas" tidak ditemukan.');
      }
    }

    // Mengubah tombol menjadi "Pause"
    button.innerText = "Pause";
    isCelebrating = true;  // Menandakan bahwa perayaan telah dimulai
  } else {
    // Jika perayaan sudah dimulai, hentikan musik dan konfeti
    if (music) {
      musicPausedAt = music.currentTime;  // Menyimpan posisi musik ketika dihentikan
      music.pause();  // Hentikan musik
    }

    // Hentikan animasi konfeti dan reset partikel
    cancelAnimationFrame(confettiAnimationFrame);  // Hentikan animasi konfeti
    particles = [];  // Reset partikel konfeti

    // Mengubah tombol kembali menjadi "Rayakan"
    button.innerText = "Rayakan";
    isCelebrating = false;  // Menandakan bahwa perayaan dihentikan
  }
}

// Fungsi untuk menampilkan puisi setelah foto Nelly diklik
function showPoem() {
  // Menyembunyikan tombol "Rayakan" atau "Pause"
  if (button) {
    button.style.display = "none"; // Menyembunyikan tombol ketika foto diklik
  }

  const poem = [
    [
      "Nelly, kamu telah melangkah jauh,",
      "Dengan segala usaha, tanpa pernah lelah.",
      "Aku hanya bisa menyaksikan, dari jauh disini,",
      "Dan bangga melihatmu terus tumbuh dan berseri.",
    ],
    [
      "Lulus dengan gemilang, hasil kerja kerasmu,",
      "Lulus dengan gemilang, hasil kerja kerasmu,",
      "Setiap tantangan kamu hadapi, tak ada yang sia-sia.",
      "Meski tak bisa menemanimu disetiap langkah,",
      "Aku selalu melihatmu, berjuang disetiap detik yang berlalu.",
    ],
    [
      "Ini baru permulaan, perjalananmu yang hebat,",
      "Ini baru permulaan, perjalananmu yang hebat,",
      "Ke depan banyak hal menanti, penuh harapan yang lekat.",
      "Kamu luar biasa, dengan segala yang telah kamu capai,",
      "Semoga langkahmu terus membawa kebahagiaan yang tak terhitung.",
    ],
    [
      "Nelly."
    ]
  ];

  // Menampilkan puisi dengan animasi mengetik
  if (messageOutput) {
    messageOutput.style.display = "block"; // Menampilkan puisi
    messageOutput.innerHTML = ""; // Reset sebelum mulai mengetik
    let currentParagraph = 0; // Menyimpan indeks paragraf yang sedang ditampilkan
    let currentLine = 0; // Menyimpan indeks baris dalam paragraf
    let i = 0;
    const speed = 10; // Waktu per karakter, lebih lambat agar lebih mudah dibaca

    function typeWriter() {
      if (i < poem[currentParagraph][currentLine].length) {
        messageOutput.innerHTML += poem[currentParagraph][currentLine].charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        currentLine++;
        if (currentLine < poem[currentParagraph].length) {
          i = 0;
          messageOutput.innerHTML += "<br>";
          setTimeout(typeWriter, 500);
        } else {
          currentParagraph++;
          if (currentParagraph < poem.length) {
            currentLine = 0;
            messageOutput.innerHTML += "<br>";
            setTimeout(typeWriter, 500);
          }
        }
      }
    }
    typeWriter(); // Mulai animasi mengetik
  }

  // Mulai konfeti lagi setelah foto diklik
  if (!isCelebrating) {
    celebrate();  // Panggil fungsi celebrate untuk mulai konfeti dan musik
  }
}

// Fungsi untuk memperbesar foto Nelly
function enlargePhoto() {
  if (nellyPhoto) {
    nellyPhoto.classList.toggle("enlarged"); // Menambahkan atau menghapus kelas enlarged
  }
}

// Event listener untuk foto Nelly
if (nellyPhoto) {
  nellyPhoto.addEventListener('click', showPoem);
  showPhotoButton.addEventListener('click', enlargePhoto);  // Menambahkan event listener untuk memperbesar foto
} else {
  console.error('Elemen dengan ID "nellyPhoto" tidak ditemukan.');
}
