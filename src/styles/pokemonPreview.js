import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    borderColor: "red",
    borderWidth: 1,
  },

  contentContainer: {
    justifyContent: "center",
    minHeight: "100%",
    alignItems: "center",
    padding: 20,
  },

  infoContainer: {
  width: "100%",
  paddingHorizontal: 30,
  marginTop: 20,
  },

  description: {
  width: "100%",
  paddingHorizontal: 30,

  textAlign: "left",
  marginTop: 20,

  fontSize: 20,
  lineHeight: 30,
  },

  info: {
    width: "100%",
    textAlign: "left",
    fontSize: 20,
    marginBottom: 8,
  },

  image: {
    width: 250,
    height: 250,
  },

  number: {
    fontSize: 20,
  },

  name: {
    fontSize: 24,
    textTransform: "capitalize",
  },
});