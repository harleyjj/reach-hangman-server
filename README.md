# REACH Hangman Server

The REACH Hangman server supports the following api call:

`GET https://reach-hangman-server.herokuapp.com/words`

Since it simply relaying a response from the Linkedin REACH Word Dictionary API, the following descriptions are adapted from their documentation:

It provides a plain text response, with one word per line.

The following parameters are optional, and applied in the following order:

URL Parameter: difficulty; Legal Values: integer from 1-10; Purpose: Filters returned words based on the difficulty level provided: 1 is the lowest level and 10 is the highest level

URL Parameter: minLength; Legal Values: Integer >= 0; Purpose: Filters returned words to ensure they are at least as long as the provided length.  Providing 0 will return all words, providing a number larger than the length of the longest word will return an empty result.

URL Parameter: maxLength; Legal Values: Integer >= 0; Purpose: Filters returned words to ensure they are shorter than the provided length.  Providing 0 will return an empty result, providing a number larger than the length of the longest word will return all words.

The server uses:

* Node.js
* Express.js
* Morgan.js
* Node-Fetch package