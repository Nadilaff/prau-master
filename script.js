// NAVBAR ACTIVE //
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Hapus kelas 'active' dari semua tautan
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Tambahkan kelas 'active' ke tautan yang diklik
        this.classList.add('active');
    });
});


//NAVBAR TETAP (STICKY) //
// Ambil elemen navbar
const navbar = document.querySelector('.navbar');

// Ambil tinggi navbar
const navbarHeight = navbar.offsetHeight;

// Fungsi untuk menambahkan kelas 'sticky' pada navbar saat menggulir
function stickyNavbar() {
    if (window.pageYOffset >= navbarHeight) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}

// Panggil fungsi stickyNavbar saat halaman dimuat dan di-scroll
window.addEventListener('load', stickyNavbar);
window.addEventListener('scroll', stickyNavbar);


// CAROUSEL BERANDA //
$(document).ready(function() {
    var carousel = $("#carouselExample");
    var carouselInner = carousel.find(".carousel-inner");
    var cardWidth = $(".carousel-item").outerWidth(true);
    var maxVisibleCards = 3; // Maksimum jumlah card yang dapat ditampilkan secara bersamaan
    var scrollPosition = 0;
    var totalCards = carouselInner.find(".carousel-item").length;
    var shiftCount = 0; // Jumlah pergeseran yang telah dilakukan
console.log(totalCards)
    $(".carousel-control-next").on("click", function () {
        if (shiftCount < maxVisibleCards && scrollPosition < (totalCards - maxVisibleCards) * cardWidth) {
            scrollPosition += cardWidth;
            shiftCount++;
            carouselInner.animate({ scrollLeft: scrollPosition }, 600);
        }
    });

    $(".carousel-control-prev").on("click", function () {
        if (shiftCount > 0) {
            scrollPosition -= cardWidth;
            shiftCount--;
            carouselInner.animate({ scrollLeft: scrollPosition }, 600);
        }
    });

    // Inisialisasi carousel Bootstrap
    if (window.matchMedia("(min-width: 768px)").matches) {
        var carouselInstance = new bootstrap.Carousel(carousel[0], {
            interval: false
        });
    } else {
        carousel.addClass("slide");
    }
});


// Jalur-modal
document.addEventListener("click",function (e) {
    if (e.target.classList.contains("jalur-img")) {
        const src = e.target.getAttribute("src");
        document.querySelector(".modal-img").src = src;
        const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'))
        myModal.show();
    }
    
})


//Galeri-modal
document.addEventListener("click",function (event) {
    if (event.target.classList.contains("foto-item")) {
        const src = event.target.getAttribute("src");
        document.querySelector(".modal-foto").src = src;
        const myModal = new bootstrap.Modal(document.getElementById('galerifoto-modal'))
        myModal.show();
    }
    
})


//Star Animation
const allStar = document.querySelectorAll('.rating-bintang .star')
const ratingValue = document.querySelector('.rating-bintang input')

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1
        console.log(ratingValue.value)

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})


//MAPS CUACA
var map = L.map('map').setView([-7.1926525, 109.902178], 13); // Set initial map center and zoom level

    // Add a tile layer to the map (you can use any tile layer)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
    }).addTo(map);


    const lat = "-7.1926525"; // Replace 'latitude_here' with the actual latitude
    const lon = "109.902178"; // Replace 'longitude_here' with the actual longitude
    const part = 'daily'; // Replace 'part_here' with the actual part you want to exclude (e.g., 'hourly', 'daily', 'minutely', etc.)
    const apiKey = 'f70c94d3a652ee3ff093f7094c964f96'; // Replace 'your_api_key_here' with your actual API key

    // Construct the URL with the provided parameters
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Do something with the data
            // console.log("data", data);
            // document.getElementById('cuaca').innerHTML = parseFloat(data.main.temp)-273.15+"°C"+data.timezone;
            // document.getElementById('icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            // Define custom icon
            var customIcon = L.icon({
                iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`, // Path to your custom icon image
                iconSize: [100, 100], // Size of your icon
                iconAnchor: [16, 32], // Anchor point of your icon
                popupAnchor: [0, -32] // Popup anchor of your icon
            });

            // Add marker with custom icon to the map
            let celcius = (parseFloat(data.main.temp) - 273.15).toFixed(2);
            console.log(data.timezone)
            L.marker([-7.1926525, 109.902178], { icon: customIcon }).addTo(map).bindPopup(
                "arah angin: " + data.wind.deg + "°<br>Cuaca hari ini " + data.weather[0].description + "<br>Kelembapan: " + data.main.humidity + "%<br>Kecepatan angin: " + data.wind.speed + "m/s<br>Temperatur: " + celcius + "°C<br>Timezone: " + data.timezone + ""
            );
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });


// Booking
document.getElementById('people-input').addEventListener('input', function () {
        var peopleInput = document.getElementById('people-input').value;
        if (peopleInput === '1') {
            document.getElementById('people-text').textContent = 'Orang';
        } else {
            document.getElementById('people-text').textContent = 'Orang';
        }
    });


//Form Pendaftaran
document.getElementById('fileInput').addEventListener('change', function() {
  var file = this.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      document.querySelector('.file-upload-text').textContent = file.name;
    };
    reader.readAsDataURL(file);
  }
});

document.querySelector('.upload-button').addEventListener('click', function() {
  var fileInput = document.getElementById('fileInput');
  fileInput.click();
});


//Upload Identitas
const selectImage = document.querySelector('.select-image');
const inputFile = document.querySelector('#file');
const imgArea = document.querySelector('.img-area');

selectImage.addEventListener('click', function () {
	inputFile.click();
})

inputFile.addEventListener('change', function () {
	const image = this.files[0]
	if(image.size < 2000000) {
		const reader = new FileReader();
		reader.onload = ()=> {
			const allImg = imgArea.querySelectorAll('img');
			allImg.forEach(item=> item.remove());
			const imgUrl = reader.result;
			const img = document.createElement('img');
			img.src = imgUrl;
			imgArea.appendChild(img);
			imgArea.classList.add('active');
			imgArea.dataset.img = image.name;
		}
		reader.readAsDataURL(image);
	} else {
		alert("Image size more than 2MB");
	}
})


//Popup Pemesanan
// let popup = document.getElementById("popup");

// function openPopup() {
//     popup.classList.add("open-popup");
// }

// function closePopup() {
//     popup.classList.remove("open-popup");
// }


// Upload Foto Profil
const imgDiv = document.querySelector('.profil-container');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadebtn = document.querySelector('#uploadbtn');

file.addEventListener( 'change' , function() {
const chosedfile = this.files[0];
if(chosedfile){
    const reader = new FileReader();

    reader.addEventListener( 'load' , function () {
        img.setAttribute('src' , reader.result);
    })
 reader.readAsDataURL (chosedfile);
 
}
})


// CAROUSEL ULASAN APLIKASI
$('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        })