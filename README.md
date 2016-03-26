# Splatoon Map Schedule Alexa Skill

This is a skill built for Amazon's Alexa service that queries the current schedule of online maps
from http://splatoon.ink for the game [Splatoon](http://splatoon.nintendo.com) on the Wii U.  It
allows you to ask Alexa the following:

> Alexa, ask Splatoon what the current maps are

> Alexa, ask Splatoon what the current ranked maps are

> Alexa, ask Splatoon when the maps change

> Alexa, ask Splatoon if it's Splatfest

## Testing The Skill Locally

You can use [node-lambda](https://github.com/motdotla/node-lambda) to test this skill locally. In
the `test_events` directory are several event files you can use for testing, and they should map
pretty well to each Intent. To test an intent, simply copy the contents of one of the json files in
that directory and overwrite the contents of `event.json`. Then run `node-lambda run` from the
command line.

## Deploying to Lambda

To deploy to Amazon Lambda, first makes sure you do an `npm install` at the root of the project.
Once all the dependencies are installed, run `npm run bundle`, which will create a lambda.zip file.
You can then upload that zip file to Lambda for use in your function and skill.

You can also use [node-lambda](https://github.com/motdotla/node-lambda) to deploy to your Lambda
function directly from the command line. Simply add a deploy.env file with your environment
configuration (and double check the supplied .env file in this repository) and then run
`node-lambda deploy`. Please visit the [node-lambda](https://github.com/motdotla/node-lambda)
project page for more information on deploying from the command line.
