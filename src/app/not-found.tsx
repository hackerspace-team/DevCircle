"use client";

import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex h-[91vh] w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold text-zinc-50">A Big 404</h1>
      <Image
        src="/images/timed-out-error.svg"
        alt="Not found"
        height={400}
        data-nimg={1}
        width={400}
        decoding="async"
      />
      <p className="text-lg text-zinc-50">
        Blimey! You&apos;ve found a page that doesn&apos;t exist.
      </p>
      <a
        className="border-b-2 border-zinc-500 py-1 hover:border-zinc-300"
        href="/home"
      >
        Head back home
      </a>
    </div>
  );
};

export default NotFoundPage;