import { notFound } from "next/navigation";
import { Card, CardBody, Image } from "@nextui-org/react";

const NEWS = [
  {
    slug:"q3-results",
    title:"Q3 Results Beat Expectations",
    date:"Sep 25, 2025",
    imageSrc:"/news/q3.jpg",
    body:"We are pleased to report strong results in Q3 with revenue up 18% YoY..."
  },
  {
    slug:"hr-policy-update",
    title:"New HR Policy Update",
    date:"Sep 20, 2025",
    imageSrc:"/news/hr.jpg",
    body:"HR has updated policies to streamline leave approvals..."
  },
  {
    slug:"renovation-complete",
    title:"Mumbai HQ Renovation Complete",
    date:"Sep 15, 2025",
    imageSrc:"/news/reno.jpg",
    body:"The 12th floor collaboration hub is now open..."
  },
];

export default function AnnouncementDetail({ params }: { params: { slug: string } }) {
  const post = NEWS.find((n) => n.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <Card shadow="sm" className="card-glow">
        <Image src={post.imageSrc} alt={post.title} width={800} height={300} className="object-cover w-full h-64"/>
        <CardBody className="space-y-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-xs text-default-500">{post.date}</p>
          <p>{post.body}</p>
        </CardBody>
      </Card>
    </div>
  );
}
