// Get references to elements
const bookGrid = document.querySelector('.book-grid');
const chapterModal = document.querySelector('.chapter-modal');
const closeButton = document.querySelector('.close-button');
const versionSelect = document.getElementById('version-select');
const chapterContent = document.querySelector('.chapter-content');
const remainingChapters = document.querySelector('.remaining-chapters');

// Function to fetch and display Bible data
function fetchBibleData(book, chapter) {
    // Replace with your API call to fetch Bible data
    fetch(`https://api.example.com/bible/${book}/${chapter}`)
        .then(response => response.json())
        .then(data => {
            // Display verses in the chapter content
            chapterContent.innerHTML = data.verses.map(verse => `<p>${verse.text}</p>`).join('');

            // Display remaining chapters
            remainingChapters.innerHTML = `Remaining chapters: ${data.remainingChapters}`;
        })
        .catch(error => console.error(error));
}

// Function to toggle the chapter modal
function toggleChapterModal(book, chapter) {
    chapterModal.style.display = chapterModal.style.display === 'flex' ? 'none' : 'flex';
    fetchBibleData(book, chapter);
}

// Event listener for book buttons
bookGrid.addEventListener('click', event => {
    if (event.target.classList.contains('book-button')) {
        const book = event.target.textContent;
        toggleChapterModal(book, 1); // Display the first chapter
    }
});

// Event listener for the close button
closeButton.addEventListener('click', () => {
    toggleChapterModal();
});

// Event listener for the version selector
versionSelect.addEventListener('change', () => {
    const selectedVersion = versionSelect.value;
    // Update the API call to fetch data for the selected version
    fetchBibleData(currentBook, currentChapter, selectedVersion);
});

// Global variables to store the current book and chapter
let currentBook = '';
let currentChapter = 1;
