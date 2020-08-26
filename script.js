const count = 5;
const apiKey = "";
const API = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from unsplash API
async function getPhotos() {
    try {
        const response = await fetch(API);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

getPhotos();