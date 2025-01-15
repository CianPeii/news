import us from "../assets/images/nation/us.png";
import ch from "../assets/images/nation/ch.png";
import de from "../assets/images/nation/de.png";
import tw from "../assets/images/nation/tw.png";
import jp from "../assets/images/nation/jp.png";
import { useMemo } from "react";

function useNation() {
  const nations = useMemo(
    () => [
      { id: "us", nation: "USA", flagUrl: us },
      { id: "ch", nation: "Switzerland", flagUrl: ch },
      { id: "de", nation: "Germany", flagUrl: de },
      { id: "tw", nation: "Taiwan", flagUrl: tw },
      { id: "jp", nation: "Japan", flagUrl: jp },
    ],
    []
  );

  return { nations };
}

export default useNation;
