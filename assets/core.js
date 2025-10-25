// Execute the script after the DOM content is fully loaded.
document.addEventListener('DOMContentLoaded', function() {

    // Get the DOM elements to manipulate
    const toggleButton = document.getElementById('toggle-button');
    const sidebar = document.getElementById('table-of-contents');

    const viewListButton = document.getElementById('view-list-button');
    const viewGridButton = document.getElementById('view-grid-button');

    const viewList = document.getElementById('view-list');
    const viewGrid = document.getElementById('view-grid');

    function switchView() {
        viewList.classList.toggle('hidden');
        viewGrid.classList.toggle('hidden');
        viewListButton.classList.toggle('active');
        viewGridButton.classList.toggle('active');
    }

    // Add click event listener to the button

    if (viewGridButton && viewGridButton) {
        viewListButton.addEventListener('click', switchView);
        viewGridButton.addEventListener('click', switchView);
    }

    if (toggleButton) {
        // Add click event listener to the button
        toggleButton.addEventListener('click', function() {
            sidebar.classList.toggle('shifted');
            toggleButton.classList.toggle('active');
        });
    }
});
