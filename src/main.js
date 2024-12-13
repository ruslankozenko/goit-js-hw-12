'use strict';

import { getImages } from "./js/pixabay-api";
import { galleryEl, createMarkUp } from "./js/render-function";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");
const inputEl = document.querySelector("input");
const loaderEl = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".load-btn");

let currentPage = 1;
let queryTrimmed = "";
const PER_PAGE = 15;
let totalHits = 0;

// function toggleLoaderAndButton(showButton = false, showLoader = false) {
//     loadMoreBtn.hidden = !showButton;
//     loaderEl.hidden = !showLoader;
// }

function toggleLoaderAndButton(showButton = false, showLoader = false) {
    if (showButton) {
        loadMoreBtn.classList.add("is-open");
    } else {
        loadMoreBtn.classList.remove("is-open");
    }

    if (showLoader) {
        loaderEl.classList.add("is-open");
    } else {
        loaderEl.classList.remove("is-open");
    }
}


function smoothScroll() {
    const { height: cardHeight } = galleryEl.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

function checkEndOfResults() {
    const displayedHits = currentPage * PER_PAGE;
    if (displayedHits >= totalHits) {
        toggleLoaderAndButton(false, false);
        iziToast.info({
            title: "End of Results",
            message: "We're sorry, but you've reached the end of search results.",
            position: "center",
            timeout: 3000,
        });
    }
}

formEl.addEventListener("submit", async event => {
    event.preventDefault();

    galleryEl.innerHTML = "";
    toggleLoaderAndButton(false, true);

    queryTrimmed = inputEl.value.trim();
    currentPage = 1;

    if (queryTrimmed === "") {
        toggleLoaderAndButton(false, false);
        return iziToast.warning({
            title: "Caution",
            message: "Please complete the field!",
            position: "center",
            timeout: 2000,
        });
    }

    try {
        const response = await getImages(queryTrimmed, currentPage, PER_PAGE);
        totalHits = response.totalHits;

        if (response.hits.length === 0) {
            toggleLoaderAndButton(false, false);
            return iziToast.info({
                title: "Sorry",
                message: "There are no images matching your search query. Please try again!",
                position: "center",
                timeout: 2000,
            });
        }

        createMarkUp(response.hits);
        toggleLoaderAndButton(true, false);
        iziToast.success({
            title: "Success",
            message: `Found ${totalHits} images!`,
            position: "center",
            timeout: 2000,
        });

        checkEndOfResults();
    } catch (error) {
        toggleLoaderAndButton(false, false);
        iziToast.error({
            title: "Error",
            message: "There was an error fetching the images.",
            position: "center",
            timeout: 2000,
        });
    }
});

loadMoreBtn.addEventListener("click", async () => {
    toggleLoaderAndButton(false, true);
    currentPage += 1;

    try {
        const response = await getImages(queryTrimmed, currentPage, PER_PAGE);

        if (response.hits.length === 0) {
            toggleLoaderAndButton(false, false);
            return iziToast.info({
                title: "End of Results",
                message: "We're sorry, but you've reached the end of search results.",
                position: "center",
                timeout: 3000,
            });
        }

        createMarkUp(response.hits);
        toggleLoaderAndButton(true, false);
        smoothScroll();
        checkEndOfResults();
    } catch (error) {
        toggleLoaderAndButton(false, false);
        iziToast.error({
            title: "Error",
            message: "Failed to load more images.",
            position: "center",
            timeout: 2000,
        });
    }
});
