import { Button, Card, Chip, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { data } from "../data";
import { ScrollView } from "react-native-gesture-handler";
import { Linking, View } from "react-native";
import formatDate from "../utils/formatDate";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

const HomeScreen = ({ route }) => {
  const { query } = route.params ?? { params: {} };

  const [activeQuery, setActiveQuery] = useState();
  const navigation = useNavigation();
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    if (query && query.trim().length > 0 && activeQuery !== query) {
      // Remove duplicate of the new query if it exists
      const updatedQueries = queries.filter((q) => q !== query);

      // Keep only the latest 5 queries
      const newQueries = [query, ...updatedQueries.slice(0, 4)];

      setActiveQuery(query);
      setQueries(newQueries);
    }
  }, [query]);

  const changeActiveQuery = (query) => {
    setActiveQuery(query);
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ marginLeft: 20, marginRight: 20 }}>
        <ScrollView horizontal>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Chip
              icon="tea"
              style={{ marginHorizontal: 5 }}
              mode={!activeQuery ? "flat" : "outlined"}
              key="latest"
              onPress={() => changeActiveQuery()}
            >
              Latest
            </Chip>
            {queries.map((query, index) => (
              <Chip
                style={{ marginHorizontal: 5 }}
                mode={query === activeQuery ? "flat" : "outlined"}
                key={index}
                onPress={() => changeActiveQuery(query)}
              >
                {query}
              </Chip>
            ))}
          </View>
        </ScrollView>

        {data.articles.map((article, index) => (
          <Card style={{ marginBottom: 20 }} key={index}>
            <Card.Title
              title={article.source.name}
              left={() => (
                <Button
                  icon="earth"
                  mode="text"
                  onPress={() => {
                    Linking.openURL(article.source.url);
                  }}
                ></Button>
              )}
            ></Card.Title>
            <Card.Content>
              <Text variant="titleLarge" style={{ marginBottom: 20 }}>
                {article.title}
              </Text>
              <Card.Cover source={{ uri: article.image }} />
              <Text variant="labelSmall">
                Published in : {formatDate(article.publishedAt)}
              </Text>
              <Text style={{ marginTop: 20 }}>{article.description}</Text>
              <Card.Actions>
                <Button
                  onPress={() => {
                    navigation.navigate("Article", { article });
                  }}
                >
                  Learn More
                </Button>
              </Card.Actions>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
