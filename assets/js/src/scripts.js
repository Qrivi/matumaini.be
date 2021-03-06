// Sticky header if necessary
const header = document.querySelector('body > header');
let scrollPos = 0;
window.addEventListener('scroll', () => {
    if (window.scrollY < 300) {
        header.classList.remove('invert');
    } else {
        header.classList.add('invert');
        header.classList.toggle('hidden', document.body.getBoundingClientRect().top < scrollPos);
    }
    scrollPos = (document.body.getBoundingClientRect()).top;
});

// Smooth scrolling for internal links.
Array.from(document.querySelectorAll('a[href*="#"]:not([href="#"])'))
    .forEach(link => link.addEventListener('click', function (event) {
        event.preventDefault();
        header.classList.add('hidden');
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    }, false));

// Activity filtering
const allPosts = document.querySelectorAll("ul.postlist li");
const yearPosts = document.querySelectorAll("#activiteiten h3.year-posts");
const noPosts = document.querySelector("#activiteiten p.no-posts");
const morePosts = document.querySelector("#activiteiten a.more-posts");
const filterInput = document.querySelector("#filter");
const filterDelay = 100;
let filterDebounce = null;
let noPostsDebounce = null;
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
    filterInput.value = window.location.search.match(/filter=(.*)/)[1].replace(/\+/g, ' ');
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
        searchParams.delete('filter');
        searchParams.set('activiteiten', loadedPosts);
        history.pushState(null, '', window.location.pathname + '?' + searchParams.toString());
    }

    checkPosts();
}

function filterPosts() {
    if (morePosts && !filterInput.value.length)
        return resetPosts(6);
    if (morePosts)
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
        searchParams.delete('activiteiten');
        searchParams.set('filter', filterInput.value);
        history.pushState(null, '', window.location.pathname + '?' + searchParams.toString());
    }

    checkPosts();
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

function checkPosts() {
    if (noPostsDebounce)
        window.clearTimeout(noPostsDebounce);
    noPostsDebounce = window.setTimeout(() => {
        noPosts.classList.toggle('hidden', !Array.from(allPosts)
            .every(post => post.classList.contains('hidden'))
        );

        if (yearPosts) {
            Array.from(yearPosts).forEach(title => {
                title.classList.toggle('hidden', Array.from(title.nextElementSibling.querySelectorAll('li'))
                    .every(post => post.classList.contains('hidden'))
                );
            })
        };
    }, 1000);
}
