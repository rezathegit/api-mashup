import { musicBrainFetch, coverArtFetch, wikidataFetch, wikipediaFetch } from "../externalApi/api.js";

export const getArtistInfo = async (req, res) => {
    // Fetch 1
    const musicBrainData = await musicBrainFetch(req.params.id);

    // Fetch 2
    const coverArtAndMusicBrainData = await coverArtFetch(musicBrainData);

    // Fetch 3
    const bandName = await wikidataFetch(musicBrainData.wikidataIdentifier);
    const bandDescription = await wikipediaFetch(bandName);

    const finalOutput = {
        ...coverArtAndMusicBrainData,
        description: bandDescription,
    };

    delete finalOutput.wikidataIdentifier;

    res.json(finalOutput);
}

