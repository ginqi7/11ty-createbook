window.addEventListener('DOMContentLoaded', (event) => {
    new PagefindUI({
        element: "#search",
        highlightParam: "highlight"
    });

    const searchToggle = document.getElementById('search-toggle');
    const searchClose = document.getElementById('close-search');
    const input = document.getElementById("search").querySelector("input");

    function focusSearch() {
        if (searchToggle.checked) {
            input.focus();
        }
    }

    function closeSearch() {
        searchToggle.checked = false;
    }

    searchToggle.addEventListener('click', focusSearch);
    searchClose.addEventListener('click', closeSearch);
});
