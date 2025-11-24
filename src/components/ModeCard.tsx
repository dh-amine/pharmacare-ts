import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ModeCardProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

export function ModeCard({ title, description, image, onClick }: ModeCardProps) {
  return (
    <Card
      onClick={onClick}
      className="
        w-96 h-96 rounded-2xl cursor-pointer overflow-hidden
        bg-white/10 backdrop-blur-md border border-white/20
        shadow-xl transition-transform duration-500 hover:scale-105
        flex flex-col
      "
    >
      {/* Image */}
      <div className="relative h-1/2">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <CardContent className="flex flex-col items-center justify-center h-1/2 p-6 ">
        <CardHeader className="text-center p-0  w-full h-32">
          <CardTitle className="text-2xl text-white tracking-wide ">
            {title}
          </CardTitle>
        </CardHeader>

        <p className="text-gray-300 text-center mt-2  h-full">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
