import { musicBrainzFetch, coverArtFetch, wikidataFetch, wikipediaFetch } from "../externalApi/api.js";

export const getArtistInfo = async (req, res) => {
    
    const musicBrainData = await musicBrainzFetch(req.params.id);

    const coverArtAndMusicBrainData = await coverArtFetch(musicBrainData);

    const bandName = await wikidataFetch(musicBrainData.wikidataIdentifier);
    
    const bandDescription = await wikipediaFetch(bandName);

    const finalOutput = {
        ...coverArtAndMusicBrainData,
        description: bandDescription,
    };

    delete finalOutput.wikidataIdentifier;

    res.json(finalOutput);
}

