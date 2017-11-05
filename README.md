Image Search Abstraction Layer
=========================

User stories:
* I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
* I can paginate through the responses by adding a ?offset=2 parameter to the URL.
* I can get a list of the most recently submitted search strings.

### Example usage:

For searching an image : 

`https://nova-bathroom.glitch.me/api/imagesearch/{search-string}?offset={pagination}`

Recent search string : 

`https://nova-bathroom.glitch.me/api/latest/imagesearch/`
