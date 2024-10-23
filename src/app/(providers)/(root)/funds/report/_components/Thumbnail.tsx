import { cva, VariantProps } from "class-variance-authority";
import Image from "next/image";
import { PropsWithChildren } from "react";

const thumbnailVariant = cva("", {
  variants: {
    theme: {
      finance: "bg-orange-200",
    },
  },
  compoundVariants: [],
  defaultVariants: {},
});

type ThumbnailVariant = VariantProps<typeof thumbnailVariant>;

type ThumbnailProps = {
  title: string;
  thumbnailSrc: string;
  intro: JSX.Element;
  className?: string;
} & ThumbnailVariant;

function Thumbnail({
  title,
  thumbnailSrc,
  intro,
  theme,
  className,
  children,
}: PropsWithChildren<ThumbnailProps>) {
  return (
    <>
      <section
        className={`overflow-x-hidden relative w-full   flex flex-col gap-y-10 px-14 ${thumbnailVariant(
          { theme, className }
        )}`}
      >
        <div className="bg-orange-300 w-full aspect-square rounded-full absolute -right-24 top-20" />
        <Image
          className="w-full rounded-full aspect-square absolute -right-20 top-24"
          src={thumbnailSrc}
          width={300}
          height={300}
          alt={`${title} thumbnail`}
        />
        <h1 className="font-bold text-5xl mt-20">{title}</h1>
        {intro}
        <Image
          width={100}
          height={100}
          className="w-20 z-10 absolute top-[550px]"
          src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/hand-1@2x.png"
          alt="hand-1"
        />
        <Image
          width={100}
          height={100}
          className="w-20 z-10 absolute top-[450px] right-16"
          src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/hand-2@2x.png"
          alt="hand-2"
        />
      </section>
      {children}
    </>
  );
}

export default Thumbnail;