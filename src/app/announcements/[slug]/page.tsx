import Image from "next/image";
import { notFound } from "next/navigation";

const NEWS = [
  {
    slug: "q3-results",
    title: "Q3 Results Beat Expectations",
    date: "Sep 25, 2025",
    imageSrc: "/news/q3.jpg",
    body: `
      We are pleased to report strong results in Q3 with revenue up 18% YoY.
      Growth was led by APAC and EMEA with significant traction in enterprise deals.
      Product gross margins improved due to cost optimizations and mix shift toward premium SKUs.
    `,
  },
  {
    slug: "hr-policy-update",
    title: "New HR Policy Update",
    date: "Sep 20, 2025",
    imageSrc: "/news/hr.jpg",
    body: `
      HR has updated policies to streamline leave approvals and introduced flexible Friday timings.
      Please review the full policy on the Policies page and contact HR for any clarifications.
    `,
  },
  {
    slug: "renovation-complete",
    title: "Mumbai HQ Renovation Complete",
    date: "Sep 15, 2025",
    imageSrc: "/news/reno.jpg",
    body: `
      The 12th floor collaboration hub is now open with new meeting pods, focus rooms, and a wellness corner.
      Booking details are available in the Facilities section of the portal.
    `,
  },
];

export default function AnnouncementDetail({ params }: { params: { slug: string } }) {
  const post = NEWS.find((n) => n.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="relative w-full h-64 card overflow-hidden">
        <Image src={post.imageSrc} alt={post.title} fill className="object-cover" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mt-6">{post.title}</h1>
      <p className="text-slate-500 text-sm mt-1">{post.date}</p>
      <article className="prose prose-slate mt-6 max-w-none">
        <p>{post.body}</p>
      </article>
    </div>
  );
}
