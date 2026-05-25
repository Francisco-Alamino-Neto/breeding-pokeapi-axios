import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({

  container: {
    padding: 10,
    backgroundColor: colors.background,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E3350D',
  },

  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 15,
    paddingVertical: 10,

    borderRadius: 12,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
    flex: 1,
  },

  flagIcon: {
    width: 30,
    height: 20,
    borderRadius: 4,
  },

  languageDropdown: {
    position: 'absolute',
    right: 10,
    top: 45,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    elevation: 3,
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