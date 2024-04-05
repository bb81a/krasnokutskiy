import Image from "next/image";
import Link from "@/components/ui/Link";
import { allPosts } from ".contentlayer/generated";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

import Avatar from "@/public/avatar.png";

import PostList from "@/app/blog/components/ui/PostList";
import Card from "@/app/components/bento/CardTemplate";
import Map from "@/app/components/bento/map";
import Gumroad from "@/app/components/bento/Gumroad";
import Instagram from "@/app/components/bento/Instagram";
import YouTube from "@/app/components/bento/Youtube";

export default async function Home() {
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
        <Image
          src={Avatar}
          width={100}
          height={100}
          alt="avatar"
          className="rounded-full bg-secondaryA"
          style={{ "--index": 1 } as React.CSSProperties}
        />
        <div
          className="animate-in space-y-4"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Vadim Krasnokutskiy
          </h1>
          <p className="max-w-md leading-relaxed text-secondary">
            Hi there, I&apos;m, a tester who loves to create something new. 
            Besides testing, I also enjoy programming, where 
            I focus on developing my portfolio, and personal development.
          </p>
        </div>
      </div>
      <div
        className="grid animate-in grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-8"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <YouTube/>
        <Instagram />
        <Gumroad />
        <Card className="relative order-2 col-span-2">
          <Map/>
          {/* chip showing city bottom left corner of card, above map */}
          <div className="absolute bottom-6 left-6 flex items-center rounded-lg bg-neutral-100/75 px-4 py-1.5 backdrop-blur dark:bg-neutral-900/75">
            <span className="text-sm font-medium text-primary">
              Zaporizhzha, UA
            </span>
          </div>
        </Card>
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
          <p className="max-w-md leading-relaxed text-secondary">
          From time to time I write about my life, productivity and more. Check me out and subscribe to stay updated.
          </p>
        </div>
        <PostList posts={posts} />
      </div>
    </div>
  );
}