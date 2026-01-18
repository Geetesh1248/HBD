// src/memoriesData.js

// 1. This magically grabs every image file in that folder
const modules = import.meta.glob('./assets/memories/*.{png,jpg,jpeg,svg}', { eager: true });

// 2. Convert the file paths into a clean list of data objects
const memoriesData = Object.keys(modules).map((path, index) => {
  // Get the actual URL of the image
  const imageUrl = modules[path].default;
  
  // Optional: Make a title based on the filename
  // (e.g., "my_photo.jpg" becomes "my photo")
  const fileName = path.split('/').pop().split('.')[0].replace(/_/g, ' ');

  return {
    id: index,
    title: fileName, // or just use `Memory #${index + 1}`
    date: "From your gallery",
    image: imageUrl
  };
});

export default memoriesData;