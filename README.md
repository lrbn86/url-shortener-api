# URL Shortening Service
Shorten a given link

## Features
* Create a new short URL
* Retrieve an original URL from a short URL
* Update an existing short URL
* Delete an existing short URL
* Get statistics on the short URL

## Endpoints
| Method | Path | Description |
| - | - | - |
| POST | /shorten | Create a short URL |
| GET | /shorten/:shortCode | Retrieve original URL |
| PUT | /shorten/:shortCode | Update a short URL |
| DELETE | /shorten/:shortCode | Delete a short URL |
| GET | /shorten/:shortCode/stats | Get statistics for short URL |
