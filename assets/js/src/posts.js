// Make galleries of paragraphs with only images.
Array.from(document.querySelectorAll('#post > p'))
    .forEach(paragraph => {
        if (!paragraph.textContent.trim()) {
            for (var i = 0; i < paragraph.children.length; i++)
                if (paragraph.children[i].tagName !== "IMG")
                    return;
            paragraph.classList.add('gallery');
        }
    });

// GLightbox
Array.from(document.querySelectorAll('#post > p img:not(.static)'))
    .forEach(image => {
        const title = image.getAttribute('alt') ? image.getAttribute('alt') : document.querySelector('#post header h2').textContent;
        image.classList.add('glightbox');
        image.setAttribute('data-gallery', 'gallery');
        image.setAttribute('data-title', title);
    });

const lightbox = GLightbox();
