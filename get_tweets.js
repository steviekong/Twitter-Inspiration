const Twitter = require("twitter");
const fs = require("fs");
require("dotenv").config();

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
const urlRegex = new RegExp(
  "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
);
const SAMPLE_COUNT = Number(process.argv[3]);

let allTweets = [];

let oldest = null;

let params = {
  screen_name: process.argv[2],
  exclude_replies: true,
  tweet_mode: "extended",
  count: 200,
  include_rts: false,
};

const getTweets = async () => {
  if (oldest !== null) {
    params.max_id = oldest;
  }
  return new Promise((res, rej) => {
    client.get("statuses/user_timeline", params, (error, tweets, response) => {
      if (error) {
        console.log(error);
        res(false);
      }
      console.log(`Grabbing tweets before ${oldest}`);
      if (allTweets.length >= SAMPLE_COUNT) {
        res(false);
      }
      for (tweet of tweets) {
        const text = tweet.full_text.replace(/(\r\n|\n|\r|&amp;)/gm, " ");
        if (!urlRegex.test(text)) {
          allTweets.push(text);
        }
      }
      if (tweets.length > 0) {
        oldest = tweets[tweets.length - 1].id - 1;
      }
      console.log(`${allTweets.length} tweets downloaded so far`);
      res(true);
    });
  });
};

const getAllTweets = async () => {
  while (true) {
    const result = await getTweets();
    if (result === false) {
      writeToFile();
      break;
    }
  }
};
getAllTweets();

const writeToFile = () => {
  fs.writeFile(
    "./tweets.json",
    JSON.stringify({ tweetList: allTweets }),
    (err) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log("Wrote tweets to JSON");
      }
    }
  );
};
