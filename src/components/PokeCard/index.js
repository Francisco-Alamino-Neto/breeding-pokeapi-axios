import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { typeIcons } from "../../utils/typeIcons";

import { styles } from "../../styles/pokeCard";

export default function PokeCard({
  pokemon,
  onPress,
  isSelected,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.selectedCard,
      ]}
      onPress={onPress}
    >
      <Text style={styles.number}>
        #{pokemon.id}
      </Text>

      <Text style={styles.name}>
        {pokemon.name}
      </Text>

      <View style={styles.typesContainer}>
        {pokemon.types.map((item) => (
          <Image
            key={item.type.name}
            source={typeIcons[item.type.name]}
            style={styles.typeIcon}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
}