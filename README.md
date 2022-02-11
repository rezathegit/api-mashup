
# MASHUP-API

## Description
This task is to create a REST API that offers a mashup of some external APIs.
The APIs to be combined are MusicBrainz, Wikidata / Wikipedia and Cover Art Archive.

The API-mashup receives a ** MBID ** (MusicBrainz Identifier) ​​and returns a result consisting of:
		 					
- A description of the artist taken from Wikipedia. Wikipedia does not contain any MBID, but the mapping between MBID and Wikipedia identifiers is available via the MusicBrainz API (either a direct reference or via the language proxy Wikidata)
 
- A list of all the albums the artist has released and links to images for each album. The list of albums is in MusicBrainz but the pictures are in the Cover Art Archive.	

## Setup and Usage

1. Go to the root and `npm install`
2. `npm start`
3. Open a tab in the browser and go to http://localhost:5000/api/artists/
4. Go to https://musicbrainz.org/ and search for your favorite artist.
5. under the `details` tab you can find `MBID`for each artist. Copy and paste the MBID to the end of the link above.
6. For example if you are looking for `Nirvana` band you should have something like this : http://localhost:5000/api/artists/5b11f4ce-a62d-471e-81fc-a69a8278c7da
7. you can use the link both in the browser and Postman to get the result data back. The returend data would be in a JSON format.


## Folder structure and files 


![image](https://user-images.githubusercontent.com/57294217/153571267-74abf429-cf03-47f1-ac89-2ce294a4cebe.png)


.
├── README.md                   # File you are reading now which consists of description and instruction.
├── controllers                 # Folder for controllers files which includes functions. 
│   └── artists.js              # File includes the several fetches functions.
├── externalApi                 # Folder includes the files for fetches from external API:s.
│   ├── coverArtFetch.js        # file include fetch function from Cover Art Archive API.
│   ├── index.js                # file include import and export of all fetches.
│   ├── musicBrainzFetch.js     # file include fetch function from Musicbrainz API.
│   ├── wikidataFetch.js        # file include fetch function from Wikidata API.
│   └── wikipediaFetch.js       # file include fetch function from Wikipedia API.
├── package-lock.json           # File to keep track of the exact version of every package that is installed.           
├── package.json                # File for installed packages, modules and dependencies.
├── routes                      # Folder for routing files.
│   └── route.js                # File include the routing for the GET request.   
└── server.js                   # File for creationg the Express server.

## Technology 
Node, Express, Axios, REST API

## Reference

Link to the external API:s and their documentations:
### Musicbrainz
Documentation: http://musicbrainz.org/doc/Development/XML_Web_Service/Version_2
API: http://musicbrainz.org/ws/2

### Wikidata
Documentation: https://www.wikidata.org/w/api.php
API: https://www.wikidata.org/w/api.php

### Wikipedia
Documentation: https://www.mediawiki.org/wiki/API:Main_page
API: https://en.wikipedia.org/w/api.php

### Cover Art Archive
Documentation: https://wiki.musicbrainz.org/Cover_Art_Archive/API
API: http://coverartarchive.org/

## Limitations and Error handling
If there is no cover image for the requested album from the API (Cover Art Archive), you would receive an error message in the image field saying 'Image from Cover Art Archive API is not available'.

## Development
In case of you want to fetch more info from existing API:s and wish to add up more info to the output you can continue on /externalApi folder.
In case you want to use another external API and wish to combine the outcome with the current output data, I suggest to create new file in /externalApi/exampleApi.js and also a new controller file under /controllers/example.js and start writing the fetch function there.

## Extras
Some MBID from random artist which you can use for the fetch request: 
Depeche Mode: 8538e728-ca0b-4321-b7e5-cff6565dd4c0
ABBA: d87e52c5-bb8d-4da8-b941-9f4928627dc8
George Michael: ccb8f30e-4d71-40c4-8b1d-846dafe73e2c
Queen: 0383dadf-2a4e-4d10-a46a-e9e041da8eb3
Michael Jackson: f27ec8db-af05-4f36-916e-3d57f91ecf5e
Madonna: 79239441-bfd5-4981-a70c-55c3f15c1287
