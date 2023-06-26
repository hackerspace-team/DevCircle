"use client";

import { FC, useRef } from "react";
import Link from "next/link";
import { BiMessageAltDetail } from "react-icons/bi";
import { Post, User, Vote } from "@prisma/client";

import formatTimeToNow from "@/lib/formatTimeToNow";
import PostVoteClient from "./PostVoteClient";
import EditorOutput from "./EditorOutput";

interface PostCardProps {
  post: Post & {
    author: User;
    votes: Vote[];
  };
  votesAmount: number;
  forumName?: string;
  commentAmount: number;
  currentVote?: Vote["type"];
  isLoggedIn?: boolean;
}

/**
 * Represents a post card component.
 */
const PostCard: FC<PostCardProps> = ({
  post,
  forumName,
  commentAmount,
  votesAmount,
  currentVote,
  isLoggedIn,
}) => {
  const postRef = useRef<HTMLParagraphElement>(null);
  const isPostOverflowed = postRef.current?.clientHeight === 160;

  const postContent = (
    <div
      className="relative text-sm max-h-40 w-full overflow-clip"
      ref={postRef}
    >
      <EditorOutput content={post.content} />
      {isPostOverflowed && (
        <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-zinc-50 dark:from-zinc-900 to-transparent"></div>
      )}
    </div>
  );

  const postMetaInfo = (
    <div className="max-h-40 mt-1 flex flex-row justify-between gap-1 text-sm text-zinc-500">
      <div className="inline-flex">
        <Link href={`/d/${forumName}`}>
          <p className="underline text-zinc-800 dark:text-zinc-50 text-md underline-offset-2">
            d/{forumName}
          </p>
        </Link>
        <span className="px-1 text-zinc-800 dark:text-zinc-50">•</span>
        <span className="text-zinc-800 dark:text-zinc-50">
          Posted by u/{post.author.name}
        </span>
      </div>
      <time>{" " + formatTimeToNow(new Date(post.createdAt))}</time>
    </div>
  );

  return (
    <article className="rounded-md dark:bg-zinc-900 bg-zinc-50 border-2 border-zinc-800">
      <div className="px-6 py-4 flex justify-between flex-col md:flex-row">
        <PostVoteClient
          postId={post.id}
          initialVoteAmount={votesAmount}
          initialVote={currentVote}
          isLoggedIn={isLoggedIn}
        />
        <div className="w-full flex flex-col gap-2">
          {postMetaInfo}
          <Link
            href={`/d/${forumName}/post/${post.id}`}
            className="text-lg font-semibold pt-2 leading-6 text-zinc-900 dark:text-zinc-50"
            aria-label={post.title}
          >
            {post.title}
          </Link>
          {postContent}
        </div>
      </div>
      <div className="border-t-2 border-t-zinc-800 z-20 text-sm rounded-b-md">
        <Link href={`/d/${forumName}/post/${post.id}`}>
          <div className="py-3 px-6 w-fit flex items-center gap-2 border-r-2 font-medium border-r-zinc-800 hover:bg-yellow-100 dark:hover:bg-zinc-800 rounded-bl-md">
            <BiMessageAltDetail size={25} /> {commentAmount} <p>comments</p>
          </div>
        </Link>
      </div>
    </article>
  );
};

export default PostCard;