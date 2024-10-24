const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'screenshots');
const outputHtml = path.join(__dirname, 'index.html');

fs.readdir(imagesDir, (err, files) => {
  if (err) throw err;
  
  const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Swiper.js Dynamic Slideshow</title>
    <!-- Link Swiper's CSS -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/swiper/swiper-bundle.min.css"
    />
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .swiper {
        width: 100%;
        max-width: 800px;
        margin: 20px auto;
      }
      .swiper-slide img {
        width: 100%;
        height: auto;
      }
    </style>
  </head>
  <body>
    <h1>Dynamic Image Slideshow with Swiper.js</h1>
    
    <!-- Swiper -->
    <div class="swiper">
      <div class="swiper-wrapper">
        ${images.map(img => `<div class="swiper-slide"><img src="images/${img}" alt="${img}"></div>`).join('')}
      </div>
      
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>

      <!-- Add Navigation -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    
    <!-- Include Swiper JS -->
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script>
      const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
          delay: 3000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    </script>
  </body>
  </html>
  `;

  fs.writeFile(outputHtml, html, err => {
    if (err) throw err;
    console.log('Swiper slideshow HTML generated.');
  });
});
