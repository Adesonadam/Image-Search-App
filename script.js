document.addEventListener('DOMContentLoaded', function () {
    const accessKey = "W3PMzxFYyzY8-SOtawn3DvbiLStzPPpoCdokeGNJScY";

    const formEl = document.querySelector("form");
    const inputEl = document.getElementById("search-input");
    const searchResults = document.querySelector(".search-results");
    const showMore = document.getElementById("show-more-button");
    const resetButton = document.getElementById("reset-button");

    let inputData = "";
    let page = 1;

    function setDefaultContent() {
        searchResults.innerHTML = `
            <div class="search-result">
                <img src="https://images.unsplash.com/photo-1682687980976-fec0915c6177?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="Diver">
                <a href="https://unsplash.com/photos/gBCMAENwknA" target="_blank">Diver</a>
            </div>
            <div class="search-result">
                <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZ3JhbW1pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="Program and Chill">
                <a href="https://unsplash.com/photos/gBCMAENwknA" target="_blank">Program and Chill</a>
            </div>
            <div class="search-result">
                <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="Everlast">
                <a href="https://unsplash.com/photos/gBCMAENwknA" target="_blank">Everlast</a>
            </div>
        `;
    }

    async function searchImages() {
        inputData = inputEl.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        if (page > 1) {
            showMore.style.display = "block";
        }
    }

  
    formEl.addEventListener("submit", (event) => {
        event.preventDefault();
        page = 1;
        searchImages();
    });

   
    showMore.addEventListener("click", () => {
        searchImages();
    });

  
    resetButton.addEventListener('click', function () {
       
        formEl.reset();
        setDefaultContent(); 
        page = 1; 
        showMore.style.display = "none"; 

       
        event.preventDefault();
    });

    
    setDefaultContent();
});
