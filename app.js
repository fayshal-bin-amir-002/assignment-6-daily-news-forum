const searchInputBox = document.getElementById('search-input-box');
const displayCardContainer = document.getElementById('displayCardContainer'); 
const loadingSpiner = document.getElementById('loadingSpiner'); 
const readNewsHistoryContainer = document.getElementById('readNewsHistoryContainer'); 
const latestNewsCardContainer = document.getElementById('latestNewsCardContainer'); 
let isCategory = false;


// discuss section all news card handler
const handleAllNews = async(isCategory, category) => {
    if(!isCategory) {
        loadSpiner();
        const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
        const {posts} = await res.json();
        displayAllNewsCards(posts);
    }
    else {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
        const data = await res.json();
        const cards = data.posts; console.log(cards);
        displayAllNewsCards(cards);
    }
}

const displayAllNewsCards = (newsCards) => {

    displayCardContainer.innerHTML = '';

    newsCards.forEach((card) => {

        // check if news card is active or not
        let indicator = '';
        if(card.isActive) {
            indicator = 'badge-success';
        }
        else {
            indicator = 'badge-error';
        }

        const newCard = document.createElement('div');
        newCard.classList = `bg-[#F3F3F5] rounded-3xl p-4 lg:p-10 flex flex-col lg:flex-row gap-3 lg:gap-6`;
        newCard.innerHTML = `
        <div>
                            <div class="indicator">
                                <span class="indicator-item badge ${indicator}"></span> 
                                <div class="grid size-14 lg:size-20 bg-base-300 place-items-center rounded-2xl">
                                    <img src="${card.image}" class="w-full rounded-2xl">
                                </div>
                            </div>
                        </div>
                        
                        <div class="w-full">
                            <div class="flex items-center gap-5 text-sm font-medium opacity-80 mb-3">
                                <p># <span>${card.category}</span></p>
                                <p>Author: <span>${card.author.name}</span></p>
                            </div>
                            <div>
                                <h3 class="text-lg lg:text-xl font-bold mb-4">${card.title}</h3>
                                <p class="opacity-60">${card.description}</p>
                            </div>
                            <div class="divider"></div>
                            <div class="flex items-center justify-between">
                                <div class="flex gap-4 lg:gap-7 items-center opacity-60">
                                    <p><i class="fa-regular fa-message mr-2"></i> <span>${card.comment_count}</span></p>
                                    <p><i class="fa-regular fa-eye mr-2"></i> <span>${card.view_count}</span></p>
                                    <p><i class="fa-regular fa-clock mr-2"></i> <span>${card.posted_time}</span> min</p>
                                </div>
                                <span onclick="displayHistory(&quot;${card.title}&quot;, '${card.view_count}')">
                                    <i class="fa-solid fa-envelope bg-[#10B981] text-xl text-white px-3 py-2 rounded-full cursor-pointer"></i>
                                </span>
                            </div> 
                        </div>
        `;
        displayCardContainer.appendChild(newCard);
    });
}

const displayHistory = (title, view_count) => {
    const historyItem = document.createElement('div');
    historyItem.classList = `bg-white rounded-3xl p-4 flex items-center gap-4`;
    historyItem.innerHTML = `
    <p class="font-semibold">${title}</p>
    <p class="opacity-60"><i class="fa-regular fa-eye mr-3"></i> <span>${view_count}</span></p>
    `;
    readNewsHistoryContainer.appendChild(historyItem);
}

const handleLatestNews = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestNews(data);
}

const displayLatestNews = (cards) => {
    cards.forEach((card) => {
        const newCard = document.createElement('div');
        newCard.classList = `card bg-base-100 shadow-xl`;
        newCard.innerHTML = `
        <figure class="px-10 pt-10">
                      <img src="${card.cover_image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body">
                        <p class="opacity-60"><i class="fa-regular fa-calendar mr-3"></i> <span>${card.author?.posted_date || 'No publish date'}</span></p>
                      <h2 class="card-title">${card.title}</h2>
                      <p>${card.description}</p>
                      <div class="flex gap-4 items-center">
                        <div>
                            <img src="${card.profile_image}" alt="" class="size-12 rounded-full">
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold">${card.author.name}</h3>
                            <p class="text-sm opacity-60">${card.author?.designation || 'Unknown'}</p>
                        </div>
                      </div>
                    </div>
        `;
        latestNewsCardContainer.appendChild(newCard);
    })
}

const searchCategory = () => {
    const searchText = searchInputBox.value.toLowerCase();
    const categories = ['comedy', 'coding', 'music'];
    if(categories.includes(searchText)) {
        loadSpiner();
        handleAllNews(true, searchText);
        searchInputBox.value = '';
    }
    else {
        searchInputBox.value = '';
        alert('Please insert a valid category!');
    }
    
}

const loadSpiner = () => {
    loadingSpiner.classList.remove('hidden');
    setTimeout(() => {
        loadingSpiner.classList.add('hidden');
    }, 2000);
}

handleLatestNews();

handleAllNews();