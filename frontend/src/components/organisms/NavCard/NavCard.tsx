import { Link } from "react-router-dom";
import { Card } from "../../molecules";

interface NavCardProps {
  to: string;
  title: string;
  description: string;
}

export default function NavCard({ to, title, description }: NavCardProps) {
  return (
    <Link to={to}>
      <Card>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Card>
    </Link>
  );
}
