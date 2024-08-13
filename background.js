document.addEventListener("DOMContentLoaded", function() {
    function handleChange() {
        console.log("text received", document.getElementById("imageUrlInput").value);
        const url = document.getElementById("imageUrlInput").value;
        document.getElementById("image").setAttribute("src", url);
        document.getElementById("imageURL").setAttribute("value", url);
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
