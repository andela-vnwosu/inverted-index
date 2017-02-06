# inverted-index
[![Build Status](https://travis-ci.org/andela-vnwosu/inverted-index.svg?branch=master)](https://travis-ci.org/andela-vnwosu/inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-vnwosu/inverted-index/badge.svg?branch=feature)](https://coveralls.io/github/andela-vnwosu/inverted-index?branch=feature)
[![Code Climate](https://codeclimate.com/github/andela-vnwosu/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-vnwosu/inverted-index)

# Inverted-Index
An application that takes in a __JSON__ array of text objects, creates an index from the array, allowing users to search for words contained in the array.

## Application Features
- The format of the content(s) of the JSON file is as shown below:
```
[
  {
    "title": "The cyprus love affair",
    "text": "A book by Dennis Robins. I lay my love beneath your feet, thread softly, because you thread upon my dreams"
  },

  {
    "title" : "the pelican brief",
    "text" : "this is also a book by John Grisham, talking about the law and law practice. He hardly writes about love and dreams and emotions."
  }
]

```
* An Index of an uploaded file can be created, with:
  * The title and text values being the indexed words
  * The values against the titles being the headings of documents the indexed words can be found.
* Particular words (or strings of words) can be searched in already indexed files.

## Usage Instructions
- Web use
The application is hosted on heroku at the following address:
[heroku app address] (https://markie-inverted-index.herokuapp.com/)

The buttons available on the user interface guide a user through the process.

- Local Use
```
git clone https://github.com/andela-vnwosu/inverted-index/tree/develop

```
#### On an appropriate command line interface, navigate into the directory you cloned the repo into and:
- Install all the dependencies with `npm install`  (It is assumed you have [Nodejs](nodejs.org) installed already):

- Run Tests for the application with:
  `gulp` (which is the test command defined in the package manager __package.json__)

- Start the Application with:
  `gulp` and gain access to the application interface on your browser via http://localhost:3000/



## The application is written with the following Services & Javascript Technologies:
- Gulp (Task Runner - automates tasks that are recurrent)
- Karma (Generates the Test Coverage Folder)
- Jasmine (Test Runner)
- Travis CI (For Continous Integration and badge)
- Coveralls (To compute Test Coverage percentage and add a badge that displays the coverage percentage)
- Code climate (For coverage)
- Hound (To prevent style violations)
- AngularJs (For making features of the view responsive)
- Bootstrap (For Styling the view)
