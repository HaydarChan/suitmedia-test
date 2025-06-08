import Image from 'next/image';

interface IdeaCardProps {
  title: string;
  description: string;
  created_at: string;
}

export default function IdeaCard({ title, description, created_at }: IdeaCardProps) {
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="w-full aspect-[4/3] relative">
        <Image
          src="/software.png"
          alt="Static software image"
          className="object-cover"
          width={400}
          height={300}
        />
      </div>
      <div className="px-4 flex-1 flex flex-col">
        <p className="text-sm text-black mt-auto">{formattedDate}</p>
        <h2 className="text-xl font-semibold mb-2 line-clamp-3" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{title}</h2>
        <p className="text-gray-600 mb-2">{description}</p>
      </div>
    </div>
  );
} 