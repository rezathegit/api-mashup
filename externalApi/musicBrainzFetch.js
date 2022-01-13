import axios from "axios";

export const musicBrainzFetch = async (id) => {

  try {
    const response = await axios.get(`http://musicbrainz.org/ws/2/artist/${id}?&fmt=json&inc=url-rels+release-groups`)

    const artistName = response.data.name;

    const mbid = id;

    const wikidata = response.data.relations.filter(element => element.type === "wikidata");
    const wikidataLink = wikidata[0].url.resource;
    const wikidataIdentifier = wikidataLink.split('/').pop();

    const albums = response.data['release-groups']
      .filter(element => element['primary-type'] === "Album")
      .map(album => {
        return {
          title: album.title,
          id: album.id
        }
      })
    try {
      const musicBrainOutput = {
        mbid: mbid,
        name: artistName,
        wikidataIdentifier: wikidataIdentifier,
        albums: albums,
      }
      return musicBrainOutput;
    } catch (error) {
      const errormusicBrainOutput = {
        ...musicBrainOutput,

        name: {
          Message: 'Artist name from Musicbrainz does not exist'
        },
        wikidataIdentifier: {
          Message: 'Wikidata Identifier from Musicbrainz does not exist'
        }
      }
      return errormusicBrainOutput;
    }
  } catch (error) {
    throw Error(`MBID does not exist, please provide a valid MBID: ${error.message}`)
  }
}