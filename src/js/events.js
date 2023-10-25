document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".drop-down");
    if (container) {  // Check if the element exists
        setTimeout(() => {
            container.classList.remove("starting-position");
            container.classList.add("animate-drop");
        }, 100); // Small delay to ensure the CSS class gets applied correctly.
    }
});
