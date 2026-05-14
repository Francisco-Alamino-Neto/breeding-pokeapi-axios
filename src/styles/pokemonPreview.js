import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    alignItems: "center",
  },

  image: {
    width: 180,
    height: 180,
  },

  number: {
    fontSize: 20,
  },

  name: {
    fontSize: 24,
    textTransform: "capitalize",
  },
});
