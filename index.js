var currentPage = 1;
var itemsPerPage = 9;

//variables
const generealBtn = document.getElementById('general');
const businessBtn = document.getElementById('business');
const sportsBtn = document.getElementById('sports');
const technologyBtn = document.getElementById('technology');
const entertainmentBtn = document.getElementById('entertainment');
const searchBtn = document.getElementById('searchBtn');

const newsQuery = document.getElementById('newsQuery');

const newsType = document.getElementById('newsType');
const newsdetails = document.getElementById('newsdetails');

// Array 
var newsDataArr = [];

//apis
const API_KEY = "915b7fdbc6d44b57811cdba2594aa4f6";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";


window.onload = function() {
    newsType.innerHTML = '<h4 class="heading text-center">Headlines</h4>';
    fetchHeadlines();
};

generealBtn.addEventListener("click", function() {
    newsType.innerHTML = '<h4 class="heading text-center">General</h4>';
    fetchGeneralNews();
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML ='<h4 class="heading text-center">Business</h4>';
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = '<h4 class="heading text-center">Sports</h4>';
    fetchSportsNews();
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = '<h4 class="heading text-center">Technology</h4>';
    fetchTechnologyNews();
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = '<h4 class="heading text-center">Entertainment</h4>';
    fetchEntertainmentNews();
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML = '<h4 class="heading text-center">'+newsQuery.value+'</h4>';
    fetchQueryNews();
});


const fetchHeadlines = async() => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        //handle errors
        console.log(response.status, response.statusText);
    }
    displayNews();
}

const fetchGeneralNews = async() => {
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        //handle errors
        console.log(response.status, response.statusText);
    }
    displayNews();
}
const fetchBusinessNews = async() => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        //handle errors
        console.log(response.status, response.statusText);
    }
    displayNews();
}
const fetchSportsNews = async() => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        console.log(newsDataArr);
    }
    else {
        //handle errors
        console.log(response.status, response.statusText);
    }
    displayNews();
}
const fetchTechnologyNews = async() => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        //handle errors
        console.log(response.status, response.statusText);
    }
    displayNews();
}
const fetchEntertainmentNews = async() => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        //handle errors
        console.log(response.status, response.statusText);
    }
    displayNews();
}
const fetchQueryNews = async() => {
    if(newsQuery.value == null) {
        return;
    }
    const response = await fetch(SEARCH_NEWS+ encodeURIComponent(newsQuery.value) + "&apiKey=" +API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    }
    else {
        //handle errors
        console.log(response.status, response.statusText);
    }
    displayNews();
}



function displayNews() {
    newsdetails.innerHTML = "";
    if(newsDataArr.length == 0) {
        newsdetails.innerHTML = "<h5>No Data found</h5>"
        return;
    }

    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var newsSubset = newsDataArr.slice(startIndex, endIndex);

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");

        var col = document.createElement("div");
        col.className = "col-sm-12 col-md-6 col-lg-4 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
    
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        var link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read More";

        var shareBtn = document.createElement('button');
        shareBtn.className = "btn-share";
        shareBtn.innerHTML = '<i class="fa fa-share"></i>';
        shareBtn.addEventListener("click", function() {
            var urlToShare = news.url;
            navigator.share({ url: urlToShare });
        });

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
        cardBody.appendChild(shareBtn);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);

    });

    var totalPages = Math.ceil(newsDataArr.length / itemsPerPage);
    var paginationControls = document.createElement('div');
    paginationControls.className = "text-center";
    for(var i = 1; i <= totalPages; i++) {
        var pageLink = document.createElement('a');
        pageLink.className = "btn bg-dark m-2 btn-page";
        pageLink.innerHTML = i;
        pageLink.addEventListener("click", function(event) {
            currentPage = parseInt(event.target.innerHTML);
            if(currentPage === 1) {
                fetchGeneralNews();
            }
            if(currentPage === 2) {
                fetchBusinessNews();
            }
            if(currentPage === 3) {
                fetchEntertainmentNews();
            }
            location.reload();
        });
        paginationControls.appendChild(pageLink);
    }
    newsdetails.appendChild(paginationControls);
    
}