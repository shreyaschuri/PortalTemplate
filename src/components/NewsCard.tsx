"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  imageSrc: string;
};

export default function NewsCard({ slug, title, date, excerpt, imageSrc }: Props) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="card overflow-hidden"
    >
      <div className="relative w-full h-40">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-slate-500">{date}</p>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <p className="text-slate-600 text-sm mt-2">{excerpt}</p>
        <Link
          href={`/announcements/${slug}`}
          className="inline-block mt-3 text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-700)] font-medium"
        >
          Read more →
        </Link>
      </div>
    </motion.article>
  );
}
