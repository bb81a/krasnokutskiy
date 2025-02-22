import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "@/components/ui/Link";
import { allBlogs } from ".contentlayer/generated";

import Tags from "@/components/Tags";
import Mdx from "@/app/blog/components/MdxWrapper";
import Avatar from "@/app/components/ui/Avatar";
import FlipNumber from "@/components/FlipNumber";
import Me from "@/public/avatar.png";

import { formatDate } from "@/app/_utils/formatDate";
import { getViewsCount } from "@/app/db/queries";
import { incrementViews } from "@/app/db/actions";


type Props = {
  params: {
    slug: string;
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const blog = allBlogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    throw new Error("Post not found");
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = blog;

  const ogImage = `https://https://krasnokutskiy.vercel.app/${image}`;

  const metadata: Metadata = {
    title: `${title} | Krasnokutskiy`,
    description,
    openGraph: {
      title: `${title} | Krasnokutskiy`,
      description,
      type: "article",
      publishedTime,
      url: `https://krasnokutskiy.vercel.app/blog/${slug}`,
      images: [
        {
          url: `https://krasnokutskiy.vercel.app/api/og?title=${title}`,
          alt: title,
        },
        { url: ogImage, alt: title },
      ],
      
    },
  };

  return metadata;
}

export default async function Post({ params }: { params: any }) {
  const blog = allBlogs.find((blog) => blog.slug === params.slug);


  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <article>
          <div className="flex flex-col gap-8">
          <div className="flex max-w-xl flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
              {blog.title}
            </h1>
            <p className="text-secondary">{blog.summary}</p>
          </div>

          <div className="flex max-w-none items-center gap-4">
          <Avatar src={Me} initials="br" size="sm" />
            <div className="leading-tight">
              <p className="text-primary">Vadim Krasnokutskiy</p>
              <p className="text-secondary">
                <time dateTime={blog.publishedAt}>
                  {formatDate(blog.publishedAt)}
                </time>
                {blog.updatedAt
                  ? `(Updated ${formatDate(blog.updatedAt)})`
                  : ""}
                {" · "}

                <Views slug={blog.slug} />
              </p>
            </div>
          </div>
        </div>
        {blog.image && (
          <>
            <div className="h-8" />
            <Image
              src={blog.image}
              alt={`${blog.title} blog image`}
              width={700}
              height={350}
              className="-ml-6 w-[calc(100%+48px)] max-w-none md:rounded-lg lg:-ml-16 lg:w-[calc(100%+128px)]"
              priority
            />
          </>
        )}
        <div className="h-16" />
        <div className="prose prose-neutral text-pretty">
          <Mdx code={blog.body.code} />
        </div>
      </article>

      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <h2>Tags</h2>
          <Tags tags={blog.tags} />
        </div>

        <div className="flex flex-col gap-6">
          <h2>Contact</h2>
          <p className="max-w-lg text-secondary">
            Need more details, or interested in working together? Reach out at
            any of my{" "}
            <Link href="/links" underline>
              links
            </Link>
            . I&apos;d be happy to connect!{" "}
          </p>
        </div>

        <Link href="/blog">← All Blogs</Link>
      </div>
    </div>
  );
}

async function Views({ slug }: { slug: string }) {
  let blogViews = await getViewsCount();
  const viewsForBlog = blogViews.find((view) => view.slug === slug);

  incrementViews(slug);

  return (
    <span>
      <FlipNumber>{viewsForBlog?.count || 0}</FlipNumber>
      {viewsForBlog?.count === 1 ? " view" : " views"}
    </span>
  );
}