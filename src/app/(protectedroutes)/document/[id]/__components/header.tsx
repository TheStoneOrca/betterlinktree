"use client";

export default function DocumentPageHeader(props: { text: string }) {
  return (
    <h1 className="dark:text-white text-black sm:text-4xl md:text-5xl lg:text-2xl">
      {props.text}
    </h1>
  );
}
