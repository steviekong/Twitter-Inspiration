const OpenAI = require("openai-api");
const fs = require("fs");
const path = require("path");
const ora = require("ora");
require("dotenv").config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const SAMPLE_COUNT = 30;

const readFile = () => {
  return new Promise((res, rej) => {
    fs.readFile(path.resolve(__dirname, "tweets.json"), (err, data) => {
      if (err) {
        rej("err");
      }
      const tweetsList = JSON.parse(data).tweetList;
      res(tweetsList);
    });
  });
};

const constructTrainingData = (inputArr) => {
  let result = "This is a tweet generator\n";
  let sampleList = new Set();
  while (sampleList.size < SAMPLE_COUNT) {
    const randomElement = inputArr[Math.floor(Math.random() * inputArr.length)];
    sampleList.add(randomElement);
  }
  for (input of sampleList) {
    result += input + "\n";
    result += "###\n";
  }
  return result;
};

const generateTweets = async () => {
  let trainingData = await readFile();
  const trainingString = constructTrainingData(trainingData);
  const spinner = ora("Generating tweets").start();
  const gptResponse = await openai.complete({
    engine: "davinci",
    prompt: trainingString,
    maxTokens: 200,
    temperature: 0.8,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
  });
  spinner.stop();

  const resultTextList = gptResponse.data.choices[0].text.split("\n");

  for (result of resultTextList) {
    if (result[0] !== "#") {
      console.log(result);
    }
  }
};

generateTweets();
