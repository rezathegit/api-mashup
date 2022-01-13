import axios from "axios";

export const coverArtFetch = async (artistObject) => {

  try {

    const updatedAlbumsInfo = artistObject.albums.map(async album => {

      try {
        const response = await axios.get(`http://coverartarchive.org/release-group/${album.id}`);
        const imageLink = await response.data.images[0].image;
        const returnAlbum = {
          ...album,
          image: imageLink
        }
        return returnAlbum;

      } catch (error) {
        const errorAlbum = {
          ...album,
          image: {
            message: 'Image from Cover Art Archive API is not available'
          }
        }
        return errorAlbum;
      }

    });
    const updatedAlbums = await Promise.all(updatedAlbumsInfo);
    const coverArtOutput = {
      ...artistObject,
      albums: updatedAlbums
    }

    return coverArtOutput;

  } catch (error) {
    throw Error(`Cover Art Archive API does not respond to the request: ${error.message}`)
  }
}