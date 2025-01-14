import {
  Globe,
  Briefcase,
  CircuitBoard,
  Film,
  Trophy,
  Microscope,
  Heart,
} from "lucide-react";

export function useCategory() {
  const categories = [
    { name: "general", Icon: Globe },
    { name: "business", Icon: Briefcase },
    { name: "technology", Icon: CircuitBoard },
    { name: "entertainment", Icon: Film },
    { name: "sports", Icon: Trophy },
    { name: "science", Icon: Microscope },
    { name: "health", Icon: Heart },
  ];

  return { categories };
}
