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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  leftSection: {
    flex: 1,
  },

  centerSection: {
    flex: 2,
    alignItems: "center",
  },

  rightSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",

    gap: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E3350D',
  },

  searchContainer: {
    width: "100%",
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
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
    flex: 1,
  },

  flagIcon: {
    width: 30,
    height: 20,
    borderRadius: 4,
  },

  languageDropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    borderRadius: 10,
    padding: 10,
    gap: 10,
    elevation: 5,
    right: 10,
    top: 45,
    backgroundColor: '#fff',
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