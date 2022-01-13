import { musicBrainzFetch, coverArtFetch, wikidataFetch, wikipediaFetch } from "../externalApi/index.js";

export const getArtistInfo = async (req, res) => {

    try {

        const musicBrainData = await musicBrainzFetch(req.params.id);

        const coverArtAndMusicBrainData = await coverArtFetch(musicBrainData);

        const bandName = await wikidataFetch(musicBrainData.wikidataIdentifier);

        const bandDescription = await wikipediaFetch(bandName);

        const finalOutput = {
            ...coverArtAndMusicBrainData,
            description: bandDescription,
        };

        delete finalOutput.wikidataIdentifier;

        res
            .status(200)
            .json(finalOutput);

    } catch (error) {
        res
            .status(404)
            .json({ message: error.message })
    }
}

