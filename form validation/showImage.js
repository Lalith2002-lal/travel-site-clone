// Script for the image preview:
const previewOver = document.getElementsByClassName("preview-over")[0];

const previewImg = (event) => {
  const imageFiles = event.target.files;
  const imageFilesLength = imageFiles.length;

  if (imageFilesLength === 1) {
    const imageSrc = URL.createObjectURL(imageFiles[0]);
    const imagePreviewElement = document.querySelector(
      "#preview-selected-image"
    );
    imagePreviewElement.src = imageSrc;
    imagePreviewElement.style.display = "block";

    previewOver.classList.add("active");
  } else {
    previewOver.classList.remove("active");
  }
};

// Function to show the image larger while clicking
function showLargeImage() {
  const imageSrc = document.querySelector("#preview-selected-image").src;

  // Creating a new element for the larger image
  const largerImageElement = document.createElement("img");
  //   Css for the modal element popup
  largerImageElement.src = imageSrc;
  largerImageElement.alt = "Larger Image";
  largerImageElement.style.width = "35%";
  largerImageElement.style.height = "auto";

  // Creating a container for the larger image
  const modalContainer = document.createElement("div");
  modalContainer.style.position = "fixed";
  modalContainer.style.top = "0";
  modalContainer.style.left = "0";
  modalContainer.style.width = "100%";
  modalContainer.style.height = "100%";
  modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  modalContainer.style.display = "flex";
  modalContainer.style.alignItems = "center";
  modalContainer.style.justifyContent = "center";
  modalContainer.style.zIndex = "1000";
  modalContainer.onclick = function () {
    document.body.removeChild(modalContainer);
  };

  // Appending the larger image to the modal container
  modalContainer.appendChild(largerImageElement);

  // Appending the modal container to the body
  document.body.appendChild(modalContainer);
}
