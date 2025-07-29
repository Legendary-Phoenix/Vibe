import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export default function useVideoVisibility() {
  const [screenFocused, setScreenFocused] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setScreenFocused(true); // screen is focused

      return () => {
        setScreenFocused(false); // screen is unfocused
      };
    }, [])
  );

  return screenFocused;
}
