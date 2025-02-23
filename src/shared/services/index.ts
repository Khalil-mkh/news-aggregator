import { createQuery } from "../../libs/react-query";
import { GetGuardianArticlesResponse, GetNewsApiArticlesReponse, GetNewsOrgArticlesResponse } from "./types";

export const useGetNewsOrgArticles = createQuery<GetNewsOrgArticlesResponse>({
  method: "get",
  url: `https://newsapi.org/v2/top-headlines?apiKey=${
    import.meta.env.VITE_APP_NEWSAPIORG_KEY
  }`,
});

export const useGetNewsAPIArticles = createQuery<GetNewsApiArticlesReponse>({
  method: "get",
  url: `https://api.thenewsapi.com/v1/news/all?api_token=${
    import.meta.env.VITE_APP_THENEWSAPI_KEY
  }`,
});

export const useGetAllGuardianArticles = createQuery<GetGuardianArticlesResponse>({
  method: "get",
  url: `https://content.guardianapis.com/search?api-key=${
    import.meta.env.VITE_APP_GUARDIAN_KEY
  }`,
});
