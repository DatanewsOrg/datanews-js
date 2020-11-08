import { Article, Country, Language, Monitor, Size, SortBy, Source, Topic } from "./model";

declare namespace datanews {
  type Json = { [key: string]: any; [key: number]: any; } | any[];

  type ErrorsModule = {
    DataNewsError: DatanewsError;
    AuthorizationError: AuthorizationError;
    InvalidRequestError: InvalidRequestError;
    RateLimitError: RateLimitError;
  }

  class DatanewsError extends Error {
    readonly type: keyof ErrorsModule;
    readonly json: Promise<Json | undefined>;
    readonly message: string;
    constructor(json?: Promise<Json>, message?: string);
  }

  class AuthorizationError extends DatanewsError {
    readonly type: 'AuthorizationError';
  }

  class InvalidRequestError extends DatanewsError {
    readonly type: 'InvalidRequestError';
  }

  class RateLimitError extends DatanewsError {
    readonly type: 'RateLimitError';
  }

  type SourcesParams = {
    country?: Country | Country[];
    language?: Language | Language[];
    topic?: Topic | Topic[];
    page?: number;
    size?: Size;
  };

  type HeadlinesParams = SourcesParams & {
    q?: string;
    source?: string | string[];
    sortBy?: SortBy;
  };

  type NewsParams = HeadlinesParams & {
    from?: string;
    to?: string;
  };

  type SearchResponse<T> = {
    status: number;
    numResults: number;
    hits: T[];
  };

  type NewsResponse = SearchResponse<Article>;
  type SourcesResponse = SearchResponse<Source>;

  type CreateMonitorParams = {
    query: string;
    webhook: string;
  };

  type MonitorsLatestResponse = {
    id: string;
    monitor_id: string;
    query: string;
    run_time: string;
    last_run_id: string | null;
    last_run_time: string | null;
    articles: Article[];
  };

  interface MonitoringModule {
    create(params: CreateMonitorParams): Promise<Monitor>;
    list(monitorId: string): Promise<Monitor>;
    list(): Promise<Monitor[]>;
    latest(runId: string): Promise<MonitorsLatestResponse>;
    delete(monitorId: string): Promise<void>;
  }

  interface SearchModule {
    headlines(params: HeadlinesParams): Promise<NewsResponse>;
    news(params: NewsParams): Promise<NewsResponse>;
    sources(params: SourcesParams): Promise<SourcesResponse>;
  }

  export interface DatanewsModule {
    search: SearchModule;
    monitoring: MonitoringModule;
    errors: ErrorsModule;
  }
}

declare function datanews(apiKey: string): datanews.DatanewsModule;

export = datanews;
