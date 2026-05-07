import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar Pokémon..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },
});