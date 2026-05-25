import { useState } from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { styles } from "../../styles/searchBar";

const eggGroups = [
  {
    label: "Monster",
    value: "monster",
  },

  {
    label: "Dragon",
    value: "dragon",
  },

  {
    label: "Human-Like",
    value: "humanshape",
  },

  {
    label: "Water 1",
    value: "water1",
  },

  {
    label: "Water 2",
    value: "water2",
  },

  {
    label: "Water 3",
    value: "water3",
  },

  {
    label: "Bug",
    value: "bug",
  },

  {
    label: "Flying",
    value: "flying",
  },

  {
    label: "Field",
    value: "ground",
  },

  {
    label: "Fairy",
    value: "fairy",
  },

  {
    label: "Grass",
    value: "plant",
  },

  {
    label: "Amorphous",
    value: "indeterminate",
  },

  {
    label: "Mineral",
    value: "mineral",
  },

  {
    label: "Ditto",
    value: "ditto",
  },

  {
    label: "No Eggs",
    value: "no-eggs",
  },
];

const flags = {
  br: require('../../assets/flags/br-flag.png'),
  uk: require('../../assets/flags/uk-flag.png'),
};

export default function SearchBar({ search, setSearch }) {
  const [showFilters, setShowFilters] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [language, setLanguage] = useState('br');
  
  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Pokedex</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Nome, número ou egg group..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
        </View>

        <TouchableOpacity onPress={() => setShowLanguages(!showLanguages)}>
          <Image source={flags[language]} style={styles.flagIcon} />
        </TouchableOpacity>

        {showLanguages && (
          <View style={styles.languageDropdown}>
            <TouchableOpacity onPress={() => setLanguage('br')}>
              <Image source={flags.br} style={styles.flagIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLanguage('uk')}>
              <Image source={flags.uk} style={styles.flagIcon} />
            </TouchableOpacity>
          </View>
        )}

      </View>

      {showFilters && (
        <View style={styles.filtersContainer}>
          {eggGroups.map((group) => (
            <TouchableOpacity
              key={group.value}
              style={styles.filterButton}
              onPress={() => setSearch(group.value)}
            >
              <Text style={styles.filterText}>{group.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
