import axios from "axios";
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