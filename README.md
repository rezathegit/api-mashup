
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
.
├── README.md                   # File you are reading now which consists of description and instruction.
├── controllers                 # Folder for controllers files which includes functions. 
│   └── artists.js              # File includes the several fetches functions 
├── externalApi                 # Folder includes the files for external API:s
│   └── api.js                  # file include external API:s links and fetch functions.
├── package-lock.json           # File to keep track of the exact version of every package that is installed. 
├── package.json                # File for installed packages, modules and dependencies.
├── routes                      # Folder for routing files.
│   └── route.js                # File for creating the different routes.        
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



## Limitations
If there is no cover image for the requested album, the result would be "unkown" for the image field.

## Development
In case of you want to fetch more info from existing API:s and wish to add up more info to the output you can continue on /externalApi/api.js file.
In case you want to use another external API and wish to combine the outcome with the current output data, I suggest to create new file in /externalApi/exampleApi.js and also a new controller file under /controllers/example.js and start writing the fetch function there.
