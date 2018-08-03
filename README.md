# Petful Server

The petful server supports the following api calls, where `<pet>` can be either dog or cat

GET https://petful-server-alex-harley.herokuapp.com/api/`<pet>`

DELETE https://petful-server-alex-harley.herokuapp.com/api/`<pet>`

POST https://petful-server-alex-harley.herokuapp.com/api/`<pet>`

GET will respond with either a JSON object containing pet information:

`{
  imageURL: <string>, 
  imageDescription: <string>,
  name: <string>,
  sex: <string>,
  age: <num> in years,
  breed: <string>,
  story: <string>
}`

or a message:

`{
	message: <string>
}`

DELETE will respond with either a JSON object containing the removed pet's information:

`{
  imageURL: <string>, 
  imageDescription: <string>,
  name: <string>,
  sex: <string>,
  age: <num> in years,
  breed: <string>,
  story: <string>
}`

or an empty response:

`{}`

POST will reset the pets in the respective dataset and reply with, if the dataset is empty from adoption:

`{
	message: <string>
}`

or reply with:

`{
	message: <string>
}`


The server uses:

* Node.js
* Express.js
* Morgan.js
* A standard Queue class implemented in Javascript