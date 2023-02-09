const image = document.querySelector("#chargers-image");

function resizeImage(image) {
    const { innerHeight, innerWidth } = window;
    const width = innerHeight < innerWidth ? innerHeight * 0.1 : innerWidth * 0.1;

    image.width = width;
    image.height = width;
}

window.addEventListener("resize", () => resizeImage(image));

resizeImage(image);