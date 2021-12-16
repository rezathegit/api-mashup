import axios from "axios";

// const mbid = "5b11f4ce-a62d-471e-81fc-a69a8278c7da";

// first fetch from Musicbrainz
export const musicBrainFetch = async (id) => {
  const response = await axios.get(`http://musicbrainz.org/ws/2/artist/${id}?&fmt=json&inc=url-rels+release-groups`)

  // extract artist name
  const artistName = response.data.name;
   console.log('name is = ', artistName);

  // extract MBID
  const mbid = id;

  // extract wikidta identifier
  const wikidata = response.data.relations.filter(element => element.type === "wikidata")
  const wikidataLink = wikidata[0].url.resource;
  const wikidataIdentifier = wikidataLink.split('/').pop();

  // console.log(wikidataLink);
  // console.log(wikidataIdentifier);

  // extract album names
  const albums = response.data['release-groups']
    .filter(element => element['primary-type'] === "Album")
    .map(album => {
      return {
        title: album.title,
        id: album.id
      }
    })
  // console.log(albums);

  // extract album title
  //   const albumTitle = albums.map(album => {
  //     return {
  //       id: album.id,
  //       title: album.title
  //     }
  //   });

  // console.log(albumTitle)


  // create output object
  const musicBrainOutput = {
    mbid: mbid,
    name: artistName,
    wikidataIdentifier: wikidataIdentifier,
    albums: albums,

  }
  console.log(musicBrainOutput);
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
        image: undefined
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
    // console.log(description)
    return description;

}