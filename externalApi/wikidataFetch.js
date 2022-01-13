import axios from "axios";
export const wikidataFetch = async (identifier) => {

    try {
        const response = await axios.get(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${identifier}&format=json&props=sitelinks`);
        const title = response.data.entities[identifier].sitelinks.enwiki.title;
        return encodeURIComponent(title)

    } catch (error) {
        throw Error(`Wikidata API does not respond to the request: ${error.message}`)
    }
}