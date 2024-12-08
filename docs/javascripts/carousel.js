// Description: Whenever an input radio is checked, the previous label is assigned the class 'carousel_input_previous' and
// all the other labels lose this class. This will make the slide previous to current slide become small.
// This is done as a workaround as CSS has no previous sibling selector. 
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.carousel_input');
    const container = document.querySelector('.carousel_container');
    inputs.forEach(input => {
        input.addEventListener('change', function () {
            if (input.checked) {
                const previousLabels = container.querySelectorAll('.carousel_input_previous');
                previousLabels.forEach(label => {
                    label.classList.remove('carousel_input_previous');
                });
                prevLabel = input.previousElementSibling;
                if (prevLabel) {
                    prevLabel.classList.add('carousel_input_previous');
                }
            }
        });
    });
});


// Description: This script is used to detect swipe gestures on carousel cards. If a swipe is detected, the next or previous
// input radio is checked and the change event is dispatched. This will make the carousel slide to the next or previous slide.
let startX;
document.querySelectorAll('.carousel_card').forEach(card => {
    card.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    });

    card.addEventListener('touchend', function (e) {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // Swipe threshold
            const input = card.nextElementSibling;
            if (diffX > 0) { // Swiped left
                if (input && input.classList.contains('carousel_input')) {
                    input.checked = true;
                    input.dispatchEvent(new Event('change'));
                }
            } else { // Swiped right
                prevEle = card.previousElementSibling;
                prevEle = prevEle ? prevEle.previousElementSibling : null;
                const prevInput = prevEle ? prevEle.previousElementSibling : null;
                if (prevInput && prevInput.classList.contains('carousel_input')) {
                    prevInput.checked = true;
                    prevInput.dispatchEvent(new Event('change'));
                }
            }
        }
    });
});
