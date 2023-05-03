const imageWrapper = document.querySelector(".images");
const apiKey = "6J37i5Spfb1x9TWSTJcF02cWeCJruyvTtjdxZEqqYXglnzHBTVLbyHrJ";
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const perPage = "15";
let currentPage = "1";
const generateHTML = (images) => {
  imageWrapper.innerHTML += images.map((img) =>
    `<li class="carda">
      <img src="${img.src.large2x}" alt="image" style="margin-left:auto;margin-right:auto;display:block;">
      <div class="button" style="margin-right:50px;margin:5px;">
      <span style="float:left;">
      ${img.photographer}
      </span>
        <i class="fas fa-download" style="float:right;"></i>
      </div>
    </li>`
  ).join("");
};
/*this section for get a random photos*/
const getImage = (apiUrl) => {
  fetch(apiUrl, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then((data) => {
      generateHTML(data.photos);
    });
};
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreImages = () => {
  currentPage++;
  const apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  getImage(apiUrl);
};
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', loadMoreImages);
}
/*this section for load more image*/
searchBtn.addEventListener("click", function() {
  const perPage =1;
  const query = searchInput.value;
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=50`;
  fetch(url, {
    headers: {
      Authorization: apiKey
    }
  })
  .then(response => response.json())
  .then(data => {
    const searchResults = document.querySelector(".gallery");

    searchResults.innerHTML = "";
    data.photos.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.src.medium;
      searchResults.appendChild(img);
    });
  })
  .catch(error => {
    console.log(error);
  });
});
/*this section for search engine*/
getImage(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

