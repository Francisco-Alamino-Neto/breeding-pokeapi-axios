import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    padding: 10,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 15,
    paddingVertical: 10,

    borderRadius: 12,
  },

  input: {
    flex: 1,
  },

  filtersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",

    gap: 10,

    marginTop: 10,
  },

  filterButton: {
    backgroundColor: "#D8C36A",

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 10,
  },

  filterText: {
    textTransform: "capitalize",
  },
});