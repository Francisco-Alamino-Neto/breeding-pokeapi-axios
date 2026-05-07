import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    padding: 10,
  },

  selectedCard: {
    backgroundColor: "#D8C36A",
    borderRadius: 10,
  },

  number: {
    fontSize: 16,
  },

  name: {
    fontSize: 18,
    textTransform: "capitalize",
  },

  typesContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    gap: 5,
  },

  typeIcon: {
    width: 20,
    height: 20,
  },
});
