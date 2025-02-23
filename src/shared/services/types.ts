import { GuardianArticleModel } from "../types/guardianArticleModel";
import { NewsApiArticleModel } from "../types/newsApiArticleModel";
import { NewsOrgArticleModel } from "../types/newsOrgArticleModel";


export interface GetNewsOrgArticlesResponse {
  articles: NewsOrgArticleModel[];
}

export interface GetNewsApiArticlesReponse {
  data: NewsApiArticleModel[];
}

export interface GetGuardianArticlesResponse {
  response: {
    results: GuardianArticleModel[];
  };
}
