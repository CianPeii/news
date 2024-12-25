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
    { name: "general", Icon: Globe },
    { name: "business", Icon: Briefcase },
    { name: "technology", Icon: CircuitBoard },
    { name: "entertainment", Icon: Film },
    { name: "sports", Icon: Trophy },
    { name: "science", Icon: Microscope },
    { name: "health", Icon: Heart },
  ];

  const CategoryIcon = categories.find((item) => item.name === category)?.Icon;

  return (
    <>
      <Header />
      <Navbar />
      <div className="py-6 px-8 ">
        <div className="flex items-center gap-4 border-l-4 border-blue-500 pl-4">
          <div className="flex items-center gap-3">
            {CategoryIcon && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <CategoryIcon className="w-6 h-6 text-blue-600" />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {category.charAt(0).toUpperCase() +
                  category.slice(1).toLowerCase()}
              </h1>
            </div>
          </div>
        </div>

        <div className=" py-6 px-8">new1111</div>
      </div>
    </>
  );
}

export default NewsCategory;
