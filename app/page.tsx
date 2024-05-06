import Image from "next/image";
import { allPosts } from ".contentlayer/generated";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

import Link from "@/components/ui/Link";
import PostList from "@/app/blog/components/PostList";
import BentoGrid from "@/app/components/bento/BentoGrid";
import Me from "@/public/avatar.png";
import Avatar from "@/app/components/ui/Avatar";

export default function Home() {
  const posts = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    // 3 most recent
    .filter((_, i) => i < 3);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex animate-in flex-col gap-8">
      <div
          className="animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
          >
          <Avatar src={Me} alt="Brian Ruiz" initials="br" size="lg" />
        </div>
        <div
          className="animate-in space-y-4"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h1 className="text-3xl font-bold tracking-tight text-primary">
          Vadim Krasnokutskiy
          </h1>
          <p className="max-w-lg text-secondary">
            Hi there, I&apos;m tester who loves to create something new. 
            Besides testing, I also enjoy programming, where I focus on developing my portfolio, and personal development.
          </p>
        </div>
      </div>
      <div
        className="animate-in"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <BentoGrid />
      </div>
      <div
        className="flex animate-in flex-col gap-8"
        style={{ "--index": 4 } as React.CSSProperties}
      >
        <div className="space-y-4">
          <Link
            className="group flex items-center gap-2 text-xl font-semibold tracking-tight text-primary"
            href="/blog"
          >
            Latest Posts
            <ArrowUpRightIcon className="h-5 w-5 text-tertiary transition-all group-hover:text-primary" />
          </Link>
          <p className="max-w-lg text-secondary">
            From time to time I write about my life, productivity and more. 
            Check me out and subscribe to stay updated.
          </p>
        </div>
        <PostList posts={posts} />
      </div>
    </div>
  );
}