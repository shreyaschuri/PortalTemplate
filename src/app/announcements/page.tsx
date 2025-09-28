import NewsCard from "../../components/NewsCard";

const NEWS = [
  {
    slug: "q3-results",
    title: "Q3 Results Beat Expectations",
    date: "Sep 25, 2025",
    excerpt: "Revenue grew 18% YoY with strong performance in APAC and EMEA. Product margins improved…",
    imageSrc: "/news/q3.jpg",
  },
  {
    slug: "hr-policy-update",
    title: "New HR Policy Update",
    date: "Sep 20, 2025",
    excerpt: "We’ve streamlined leave approvals and introduced flexible Friday timings. Here’s what changes…",
    imageSrc: "/news/hr.jpg",
  },
  {
    slug: "renovation-complete",
    title: "Mumbai HQ Renovation Complete",
    date: "Sep 15, 2025",
    excerpt: "The 12th floor collaboration hub is now open with new meeting pods and focus rooms…",
    imageSrc: "/news/reno.jpg",
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Announcements</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {NEWS.map((n) => (
          <NewsCard key={n.slug} {...n} />
        ))}
      </div>
    </div>
  );
}
