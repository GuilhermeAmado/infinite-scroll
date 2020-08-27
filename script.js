const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
// DON'T store API Keys like this! An exception is made here because it is free, and the data is publicly available
const apiKey = "nr0Ux0ihnCQuRuZ4JvgRTBu4FdwMgOWfZp-9pceuySc";
const API = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, add to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(photo => {
        const item = document.createElement("a");

        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        })

        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        // Check if image is finished loading
        img.addEventListener("load", imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(API);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        console.log(error);
    }
}

// Check if scrolling near bottom of page, if so, load more photos
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// window.addEventListener("scroll", () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//     if (clientHeight + scrollTop >= scrollHeight - 5) {
//         if (document.readyState === "complete" || document.readyState === "loaded") {
//             console.log("Reached bottom / loaded images")
//             getPhotos();
//        }
//     }
// });

// On load
getPhotos();