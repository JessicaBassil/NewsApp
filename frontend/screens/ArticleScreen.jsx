import { Image, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Card, Text, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import formatDate from "../utils/formatDate";

const ArticleScreen = ({ route }) => {
  const { article } = route.params;

  if (!article) {
    //TODO navigate to 404 screen
    return <Text>404 not found</Text>;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <Card>
          <Card.Content>
            <Title
              onPress={() => {
                Linking.openURL(article.url);
              }}
            >
              {article.title}
            </Title>
            <Card.Cover source={{ uri: article.image }} />
            <Card.Title
              style={{ marginTop: 20 }}
              title={
                <Button
                  icon="earth"
                  mode="elevated"
                  onPress={() => {
                    Linking.openURL(article.source.url);
                  }}
                >
                  {article.source.name + " "}
                </Button>
              }
            ></Card.Title>
            <Text>{article.content}</Text>
            <Text style={{ marginTop: 20 }} variant="labelSmall">
              Published in: {formatDate(article.publishedAt)}
            </Text>
            <Button
              style={{ alignSelf: "flex-end" }}
              onPress={() => {
                Linking.openURL(article.url);
              }}
            >
              Go To Article
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleScreen;
