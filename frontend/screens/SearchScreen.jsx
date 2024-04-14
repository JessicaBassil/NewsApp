import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchScreen = () => {
  const [query, setQuery] = useState();
  const searchbarRef = useRef(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Focus the searchbar when the screen comes into focus to display the keyboard
      if (searchbarRef.current) {
        searchbarRef.current.focus();
      }
      //clear query when the screen comes into focus
      setQuery("");
    }, [])
  );
  return (
    <SafeAreaView>
      <Searchbar
        ref={searchbarRef}
        placeholder="Search"
        onChangeText={setQuery}
        value={query}
        onSubmitEditing={() => {
          navigation.navigate("Home", { query: query });
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;
