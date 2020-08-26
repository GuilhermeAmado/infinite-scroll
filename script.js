const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

const count = 5;
// DON'T store API Keys like this! An exception is made here because it is free, and the data is publicly available
const apiKey = "nr0Ux0ihnCQuRuZ4JvgRTBu4FdwMgOWfZp-9pceuySc";
const API = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, add to the DOM
function displayPhotos() {
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

getPhotos();