// Smooth scrolling for internal links.
Array.from(document.querySelectorAll('a[href*="#"]:not([href="#"])'))
    .forEach(link => link.addEventListener('click', function (event) {
        event.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    }, false));

const allPosts = document.querySelectorAll("ul.postlist li");
const morePosts = document.querySelector("#activiteiten a.more-posts");
const filterInput = document.querySelector("#filter");
const filterDelay = 100;
let filterDebounce = null;
let hasFiltered = false;
let loadedPosts = 6;

if (morePosts)
    morePosts.addEventListener('click', () => {
        resetPosts(loadedPosts + 3);
    });

if (filterInput)
    filterInput.addEventListener('input', () => {
        if (filterDebounce)
            window.clearTimeout(filterDebounce);
        hasFiltered = true;
        filterDebounce = window.setTimeout(filterPosts, 1000);
    });

if (window.location.search.includes('filter=')) {
    filterInput.value = window.location.search.match(/filter=(.*)/)[1];
    filterPosts();
} else if (window.location.search.includes('activiteiten=')) {
    const amount = parseInt(window.location.search.match(/activiteiten=(.*)/)[1]);
    if (isNaN(amount)) amount = 6;
    resetPosts(amount);
}

function resetPosts(amount) {
    loadedPosts = amount;
    morePosts.style.visibility = 'visible';
    Array.from(allPosts)
        .forEach((post, index) => {
            if (index < amount)
                showPost(post);
            else
                post.classList.add('hidden');
        });
    if ('URLSearchParams' in window) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('activiteiten', loadedPosts);
        history.pushState(null, '', window.location.pathname + '?' + searchParams.toString());
    }
}

function filterPosts() {
    if (morePosts && !filterInput.value.length)
        return resetPosts(6);
    morePosts.style.visibility = 'hidden';

    Array.from(allPosts)
        .forEach(post => {
            if (post.textContent.toUpperCase().includes(filterInput.value.toUpperCase()))
                showPost(post);
            else
                hidePost(post);
        });
    if ('URLSearchParams' in window && hasFiltered) {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('filter', filterInput.value);
        history.pushState(null, '', window.location.pathname + '?' + searchParams.toString());
    }
}

function hidePost(post) {
    if (!post.classList.contains('hidden')) {
        post.classList.add('hiding');
        window.setTimeout(() => {
            post.classList.add('hidden');
        }, 800);
    }
}

function showPost(post) {
    if (post.classList.contains('hidden')) {
        post.classList.remove('hidden');
        post.classList.add('hiding');
        window.setTimeout(() => {
            post.classList.remove('hiding');
        }, 10);
    }
}
