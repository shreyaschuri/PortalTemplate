"use client";
import PageWrapper from "@/components/PageWrapper";
import { Card, CardBody, CardHeader, CardFooter, Image, Link } from "@nextui-org/react";

const NEWS = [
  { slug:"q3-results", title:"Q3 Results Beat Expectations", date:"Sep 25, 2025", excerpt:"Revenue grew 18% YoY...", imageSrc:"/news/q3.jpg" },
  { slug:"hr-policy-update", title:"New HR Policy Update", date:"Sep 20, 2025", excerpt:"Flexible Fridays & leave...", imageSrc:"/news/hr.jpg" },
  { slug:"renovation-complete", title:"Mumbai HQ Renovation Complete", date:"Sep 15, 2025", excerpt:"12th floor hub...", imageSrc:"/news/reno.jpg" },
];

export default function AnnouncementsPage() {
  return (
    <PageWrapper>

    
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Announcements</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS.map((n) => (
          <Card key={n.slug} shadow="sm" isPressable as={Link} href={`/announcements/${n.slug}`}>
            <CardHeader className="p-0">
              <Image src={n.imageSrc} alt={n.title} width={400} height={200} className="h-40 object-cover"/>
            </CardHeader>
            <CardBody>
              <p className="text-xs text-default-500">{n.date}</p>
              <h3 className="font-semibold mt-1">{n.title}</h3>
              <p className="text-sm text-default-600 mt-1">{n.excerpt}</p>
            </CardBody>
            <CardFooter className="text-primary">Read more →</CardFooter>
          </Card>
        ))}
      </div>
    </div>
    </PageWrapper>
  );
}
