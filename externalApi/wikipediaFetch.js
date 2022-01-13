import axios from "axios";
export const wikipediaFetch = async (title) => {

    try {
        const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${title}`);
        const description = Object.values(response.data.query.pages)[0].extract;
        return description;
    } catch (error) {
        throw Error(`Wikipedia API does not respond to the request: ${error.message}`)
    }
}