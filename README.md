# Twitter Inspiration

Want to get big on twitter? Have no talent? Look no further than this simple tweet generator powered by GPT-3!

It can take any public twitter username and generate some fresh tweets based on a fixed sample size.

## How to run it

**Note**: Has only been tested on OSX 11.3. Works on node so you should probably be fine.

- Install packages.
  `npm install`

- Get a twitter API keys from https://developer.twitter.com/en/docs/twitter-api/getting-started/getting-access-to-the-twitter-api

- Get your OpenAI key from https://beta.openai.com/

- Copy and create a new `.env` file from the `.example.env` file.

`cp .example.env .env`

- Grab twitter data and add it to a local JSON file

`node get_tweets.js <user name> <number of tweets to fetch>`

**Example:**

`node get_tweets.js elonmusk 100`

- Generate new tweets

`node generate.js`

If successful you should see the generated tweets printed to stdout like so

```
Unsupervised, generalized full self-driving (not yet coded in NN) has to be solved to make automated driving work.  Matter of fact, it’s the only way it will work

There’s no such thing as a small part, says @elonmusk to workers @Tesla in Fremont, California, who are putting the final touches on a record number of Model 3 sedans

Wanted: Youngest guy in the room.

I’ve been getting in trouble all day for saying “flufferbot”

In interviews I have to clarify that I have no opinion on flufferbot

At @SpaceX DMZ, this is the view of Starship

Crypto as sarcasm

“Just trying to perpetuate the conversational hallucination of a nonexistent reality inside this here bucket.”

Bitcoin is a religion
```

Your results many vary :)

The script takes a random sample of exactly 50 unique tweets to generate a prompt for GPT-3 so try to get a sample size > 100 for better results.

### Big note!

Use this carefully and please don't violate any of OpenAI's guidelines!
