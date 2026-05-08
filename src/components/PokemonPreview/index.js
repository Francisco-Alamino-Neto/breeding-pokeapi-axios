import {
  View,
  Text,
  Image,
} from "react-native";

import { styles } from "../../styles/pokemonPreview";

export default function PokemonPreview({
  pokemon,
}) {

  if (!pokemon) return null;

  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: pokemon.sprite,
        }}
        style={styles.image}
      />

      <Text style={styles.number}>
        #{pokemon.id}
      </Text>

      <Text style={styles.name}>
        {pokemon.name}
      </Text>

    </View>
  );
}
