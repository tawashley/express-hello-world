const express = require("express");
const { App, ExpressReceiver } = require('@slack/bolt');

const app = express();
const port = process.env.PORT || 3001;

const token = process.env.SLACK_BOT_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET

const receiver = new ExpressReceiver({
    signingSecret,
    endpoints: {
        events: `/slack/events`,
    },
});

// Initializes your app with your bot token and signing secret
const slackApp = new App({
  token,
  receiver
});

// Listens to incoming messages that contain "hello"
slackApp.message('test1234', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Hey there <@${message.user}>!`,
        },
      },
    ],
    text: `Hey there <@${message.user}>!`
  });

  await say('> Payload')
  await say('_italic_')
  await say('*bold*')
  await say('~strike~')
  await say('https://www.google.com')
  await say('Smile emoji: :smile:')
  await say('[Duck Duck Go](https://duckduckgo.com)')
  await say('https://media.tenor.com/ijTmLickqicAAAAM/captain-holt-brooklyn-nine-nine.gif')
  await say(`line

    with

    a

    break`)
});

// slackApp.action('button_click', async ({ body, ack, say }) => {
//   // Acknowledge the action
//   await ack();
//   await say(`<@${body.user.id}> clicked the button`);
// });

app.get("/", (req, res) => res.send('OK'));
app.use(receiver.router)

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
