const searchInputBox = document.getElementById('search-input-box');
const displayCardContainer = document.getElementById('displayCardContainer'); 
const loadingSpiner = document.getElementById('loadingSpiner'); 


// discuss section all news card handler
const handleAllNews = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const {posts} = await res.json();
    displayAllNewsCards(posts);
}

const displayAllNewsCards = (newsCards) => {

    displayCardContainer.innerHTML = '';

    newsCards.forEach((card) => {  console.log(card);

        // check if news card is active or not
        let indicator = '';
        if(card.isActive) {
            indicator = 'badge-success';
        }
        else {
            indicator = 'badge-error';
        }

        const newCard = document.createElement('div');
        newCard.classList = `bg-[#F3F3F5] rounded-3xl p-4 lg:p-10 flex flex-row gap-3 lg:gap-6`;
        newCard.innerHTML = `
        <div>
                            <div class="indicator">
                                <span class="indicator-item badge ${indicator}"></span> 
                                <div class="grid size-14 lg:size-20 bg-base-300 place-items-center rounded-2xl">
                                    <img src="${card.image}" class="w-full rounded-2xl">
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="flex items-center gap-5 text-sm font-medium opacity-80 mb-3">
                                <p># <span>${card.category}</span></p>
                                <p>Author: <span>${card.author.name}</span></p>
                            </div>
                            <div>
                                <h3 class="text-lg lg:text-xl font-bold mb-4">10 Kids Unaware of Their Halloween Costume</h3>
                                <p class="opacity-60">It's one thing to subject yourself to ha Halloween costume mishap because, hey that's your prerogative</p>
                            </div>
                            <div class="divider"></div>
                            <div class="flex items-center justify-between">
                                <div class="flex gap-4 lg:gap-7 items-center opacity-60">
                                    <p><i class="fa-regular fa-message mr-3"></i> <span>560</span></p>
                                    <p><i class="fa-regular fa-eye mr-3"></i> <span>560</span></p>
                                    <p><i class="fa-regular fa-clock mr-3"></i> <span>560</span></p>
                                </div>
                                <span onclick="displayHistory()">
                                    <i class="fa-solid fa-envelope bg-[#10B981] text-xl text-white px-3 py-2 rounded-full cursor-pointer"></i>
                                </span>
                            </div> 
                        </div>
        `;
        displayCardContainer.appendChild(newCard);
    });
}

const displayHistory = () => {
    console.log("history");
}

const handleLatestNews = async() => {

}

handleAllNews();