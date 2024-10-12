import { getTweet } from "react-tweet/api";

async function buildTweetThread(lastTweetId) {
  let thread = {
    text: "",
    tweets: {},
  };

  let currentTweetId = lastTweetId;

  while (true) {
    const tweet = await getTweet(currentTweetId);
    const { text, id_str, in_reply_to_status_id_str } = tweet;

    thread.tweets[id_str] = {
      text,
      replyTo: in_reply_to_status_id_str,
    };

    thread.text = text + thread.text;

    if (!in_reply_to_status_id_str) {
      thread.tweets[id_str] = {
        text,
        replyTo: "tweet starter",
      };
      break;
    }

    currentTweetId = in_reply_to_status_id_str;
  }

  return thread;
}

export default async function Dashboard() {
  // const tweet = await buildTweetThread("1842892265087471853");
  // const tweet = await buildTweetThread("1844741570211487747");
  // console.log(tweet);

  return <section className="p-5">Pointhread</section>;
}
