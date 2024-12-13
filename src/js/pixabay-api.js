'use strict';

import axios from 'axios';

const API_KEY = "47281982-63a34c7367b72af3cb7b29a97";
const BASE_URL = "https://pixabay.com/api/";

export async function getImages(query, page, perPage = 15) {

    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: perPage,
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
