import {
  enrichTweet,
  QuotedTweet,
  TweetActions,
  TweetBody,
  TweetContainer,
  TweetHeader,
  TweetInfo,
  TweetInReplyTo,
  TweetMedia,
} from "react-tweet";
import { Suspense } from "react";
import { getTweet as _getTweet } from "react-tweet/api";
import { TweetNotFound, TweetSkeleton } from "react-tweet";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import DeleteSummaryDialog from "./form/delete-summary-dialog";
import { unstable_cache } from "next/cache";

export const MyTweet = ({ tweet: t, components, summaryId }) => {
  const tweet = enrichTweet(t);
  return (
    <TweetContainer>
      <TweetHeader tweet={tweet} components={components} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {/* {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} components={components} /> : null} */}
      {/* {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />} */}
      <TweetInfo tweet={tweet} />
      {/* <TweetActions tweet={tweet} /> */}
      {/* We're not including the `TweetReplies` component that adds the reply button */}
      <div className="mt-2">
        <DeleteSummaryDialog id={summaryId} />
        <Link href={`/all-summaries/${summaryId}`}>
          <Button className="w-full">See Summary</Button>
        </Link>
      </div>
    </TweetContainer>
  );
};

const getTweet = unstable_cache(async (id) => _getTweet(id), ["tweet"], { revalidate: 3600 * 24 });

const TweetContent = async ({ id, components, onError, ...props }) => {
  const tweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          onError(err);
        } else {
          console.error(err);
        }
      })
    : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound />;
  }

  return <MyTweet tweet={tweet} components={components} {...props} />;
};

const components = {
  AvatarImg: (props) => <Image {...props} alt="Avatar Image" />,
  MediaImg: (props) => <Image {...props} fill unoptimized alt="Media Img" />,
};

export const CardTweet = ({ fallback = <TweetSkeleton />, ...props }) => (
  <Suspense fallback={fallback}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <TweetContent {...props} components={components} />
  </Suspense>
);
