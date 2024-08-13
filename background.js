document.addEventListener("DOMContentLoaded", function() {
    function handleChange() {
        console.log("text received", document.getElementById("imageUrlInput").value);
        const url = document.getElementById("imageUrlInput").value;
        document.getElementById("imageURL").setAttribute("value", url);
        const imgpreview = document.createElement("img")
        imgpreview.src = url;
        imgpreview.height = 50
        imgpreview.width = 50
        imgpreview.id = "image"
        document.getElementById("imgpreview-container").appendChild(imgpreview)
    }

    document.getElementById("imageUrlInput").onchange = handleChange;

    function handleSubmit() {
        console.log("form submitted");
        const url = document.getElementById("imageURL").getAttribute("value");
        localStorage.setItem("ImageURL", url);
        window.open("./Walmart/index.html","_blank");
    }

    document.getElementById("gotourl").onclick = handleSubmit;
});
