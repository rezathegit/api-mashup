import axios from "axios";

// const mbid = "5b11f4ce-a62d-471e-81fc-a69a8278c7da";

export const musicBrainzFetch = async (id) => {
  const response = await axios.get(`http://musicbrainz.org/ws/2/artist/${id}?&fmt=json&inc=url-rels+release-groups`)

  // extract artist name
  const artistName = response.data.name;

  // extract MBID
  const mbid = id;

  // extract the wikidata identifier
  const wikidata = response.data.relations.filter(element => element.type === "wikidata")
  const wikidataLink = wikidata[0].url.resource;
  const wikidataIdentifier = wikidataLink.split('/').pop();

  // extract the album names
  const albums = response.data['release-groups']
    .filter(element => element['primary-type'] === "Album")
    .map(album => {
      return {
        title: album.title,
        id: album.id
      }
    })

  const musicBrainOutput = {
    mbid: mbid,
    name: artistName,
    wikidataIdentifier: wikidataIdentifier,
    albums: albums,

  }
  return musicBrainOutput;
}

export const coverArtFetch = async (artistObject) => {
  const updatedAlbumsInfo = artistObject.albums.map(async album => {

    try {
      const response = await axios.get(`http://coverartarchive.org/release-group/${album.id}`);
      const imageLink = response.data.images[0].image;
      const returnAlbum = {
        ...album,
        image: imageLink
      }
      return returnAlbum;

    } catch (error) {
      console.log(error.message);
      const errorAlbum = {
        ...album,
        image: 'undefined'
      }
      return errorAlbum;
    }

  });
  const updatedAlbums = await Promise.all(updatedAlbumsInfo);

  // Ersätt tidigare 'albums'-array med updatedAlbums i artistObject, och returnera object
  const coverArtOutput = {
    ...artistObject,
    albums: updatedAlbums
  }
return coverArtOutput;
}

export const wikidataFetch = async (identifier) => {
const response = await axios.get(`https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${identifier}&format=json&props=sitelinks`);
const title = response.data.entities[identifier].sitelinks.enwiki.title;
return encodeURIComponent(title)
}

export const wikipediaFetch = async (title) => {
    const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${title}`);
    const description = Object.values(response.data.query.pages)[0].extract;
    return description;
}