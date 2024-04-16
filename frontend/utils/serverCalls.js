import axios from "axios";
import { apiPath } from "./constants";

const getArticles = async (query) => {
  const controller = new AbortController();
  const signal = controller.signal;

  let url = `${apiPath}/top-headlines?category=general&apikey=${process.env.EXPO_PUBLIC_API_KEY}`;

  if (query) {
    url = `${apiPath}/search?q=${query}&apikey=${process.env.EXPO_PUBLIC_API_KEY}`;
  }

  const response = await axios.get(url, {
    params: {
      signal: signal,
      max: 10,
    },
  });

  return response.data.articles;
};

export { getArticles };
