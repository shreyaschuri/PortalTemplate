interface PolicyCardProps {
  title: string;
  url: string;
}

export default function PolicyCard({ title, url }: PolicyCardProps) {
  return (
    <div className="p-4 border rounded mb-3 bg-white shadow flex justify-between items-center">
      <span className="font-medium">{title}</span>
      <a
        href={url}
        target="_blank"
        className="text-blue-600 underline text-sm"
      >
        View
      </a>
    </div>
  );
}
