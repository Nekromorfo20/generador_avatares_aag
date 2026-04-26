// Seleccionar elementos del DOM
const generateBtn = document.querySelector(".btn-generate");
const avatarBox = document.querySelector(".avatar-box");
const loading = document.querySelector(".loading");
const categorySelector = document.querySelector(".category-selector");

loading.style.display = "none";

generateBtn.addEventListener("click", async () => {
    // Sacar la categoria seleccionada
    const category = categorySelector.value;

    // Mostrar cargando
    loading.style.display = "block";

    try {
        // Peticion AJAX al backend
        let response = await fetch(`http://localhost:3000/api/gen-img`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category })
        });

        let data = await response.json();

        // Incrustar la imagen en la caja
        if (data && data.image_url) {
            avatarBox.innerHTML = `<img src="${data.image_url}" alt="avataer generado" />`;
        } else {
            alert("¡Hay un error al generar el avatar!");
        }

    } catch (error) {
        console.log(`Error al generar avatar: ${error}`);
        alert("¡No se ha podido generar la imagen!");
    } finally {
        loading.style.display = "none";
    }
});