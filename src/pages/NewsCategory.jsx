import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {
  Globe,
  Briefcase,
  CircuitBoard,
  Film,
  Trophy,
  Microscope,
  Heart,
} from "lucide-react";

function NewsCategory() {
  let { category } = useParams();
  const categories = [
    { name: "GENERAL", Icon: Globe },
    { name: "BUSINESS", Icon: Briefcase },
    { name: "TECHNOLOGY", Icon: CircuitBoard },
    { name: "ENTERTAINMENT", Icon: Film },
    { name: "SPORTS", Icon: Trophy },
    { name: "SCIENCE", Icon: Microscope },
    { name: "HEALTH", Icon: Heart },
  ];
  const upperCategory = category.toUpperCase();
  const CategoryIcon = categories.find(
    (item) => item.name === upperCategory
  )?.Icon;

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex items-center space-x-3">
        {CategoryIcon && <CategoryIcon className="w-6 h-6" />}
        <h1 className="text-3xl">
          {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </h1>
      </div>
    </>
  );
}

export default NewsCategory;
