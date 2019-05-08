[![Build Status](https://travis-ci.org/devskope/iReporter-Frontend.svg?branch=develop)](https://travis-ci.org/devskope/iReporter-Frontend) &nbsp; &nbsp;
[![codecov](https://codecov.io/gh/devskope/iReporter-Frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/devskope/iReporter-Frontend)
# iReporter-Frontend

### Description
**iReporter** enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that need government intervention

This repository contains the react/redux [re-implementation](https://ireporter-front-staging.herokuapp.com) of the original [vanilla javascript implementation of the iReporter frontend](https://devskope.github.io/iReporter)

## Features
Currently, this Frontend application provisions the following features:
 - Account creation
 - Record creation
 - Record fetching
 - Specific Record fetching
 - Saved Record comment/location updates
 - Record deletion

## To set this project up locally
* Clone this repo and change into the directory:
 `$ git clone https://github.com/devskope/iReporter-Frontend.git && cd iReporter-Frontend`

* Install the dependencies:  `npm i`

* Create .env file with environment variables in root folder:
``` gherkin
`$ echo "API_BASE_URL=https://ireporter-pms.herokuapp.com/api/v1" >> .env`   
```
* Start the development server: `npm run devstart`

## Testing
* To run the tests, run `npm test`



## Built with (Dependencies)
- [React](https://github.com/facebook/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces. 
- [Babel](https://github.com/babel/babel) - Next generation JavaScript, today (transpiler)
- [Prettier](https://github.com/prettier/prettier) - Prettier is an opinionated code formatter.
- [Eslint](https://github.com/eslint/eslint) - A fully pluggable tool for identifying and reporting on patterns in JavaScript
- [Jest](https://github.com/facebook/jest) - Delightful JavaScript Testing.
- [Enzyme](https://github.com/airbnb/enzyme) - JavaScript Testing utilities for React
