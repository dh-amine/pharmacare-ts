import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


interface DoctorCardProps {
firstName: string;
lastName: string;
location: string;
}


export default function DoctorCard({ firstName, lastName, location }: DoctorCardProps) {
return (
<Card className="w-full max-w-sm rounded-2xl shadow p-4 hover:shadow-xl transition-all ease-in-out duration-300 hover:scale-105 hover:cursor-pointer hover:bg-blue-600">
<CardHeader>
<CardTitle className="text-xl font-semibold">
{firstName} {lastName}
</CardTitle>
</CardHeader>
<CardContent>
<div className="text-base text-gray-700">
<p className="mt-2 font-medium">Location:</p>
<p>{location}</p>
</div>
</CardContent>
</Card>
);
}