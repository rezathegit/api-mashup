import axios from "axios";
export const wikidataFetch = async (identifier) => {
    const response = await axios.get(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${identifier}&format=json&props=sitelinks`);
    const title = response.data.entities[identifier].sitelinks.enwiki.title;
    return encodeURIComponent(title)
}