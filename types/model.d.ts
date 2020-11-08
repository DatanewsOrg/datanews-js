export type Topic = 'general' | 'business' | 'tech' | 'entertainment' | 'sports' | 'science' | 'health' | string;
export type Language = string |
    'en' |
    'de' |
    'it' |
    'fr' |
    'nl' |
    'sv' |
    'da' |
    'fi' |
    'hu' |
    'no' |
    'pl' |
    'ru' |
    'uk' |
    'pt' |
    'es' ;

export type SortBy = 'relevance' | 'date';

export type Size = number;

export type Country = string |
    'at' |  // Australia
    'au' |  // Austria
    'br' |  // Brazil
    'ca' |  // Canada
    'dk' |  // Denmark
    'fi' |  // Finland
    'fr' |  // France
    'de' |  // Germany
    'gb' |  // Great Britain
    'gr' |  // Greece
    'hu' |  // Hungary
    'in' |  // India
    'ie' |  // Ireland
    'it' |  // Italy
    'mx' |  // Mexico
    'ma' |  // Morocco
    'nl' |  // Netherlands
    'nz' |  // New Zealand
    'no' |  // Norway
    'pl' |  // Poland
    'pt' |  // Portugal
    'ru' |  // Russia
    'se' |  // Sweden
    'ch' |  // Switzerland
    'ua' |  // Ukraine
    'us' |  // USA
    've' ;  // Venezuela

export type Article = {
  url: string;
  source: string;
  authors: string[];
  title: string;
  pubDate: string;
  country: Country | '';
  language: Language | '';
  description: string;
  imageUrl: string | null;
  content: string;
};

export type Source = {
  description: string;
  url: string;
  country: Country | '';
  language: Language | '';
};

export type Monitor = {
  id: string;
  query: string;
  webhook: string;
  active: boolean;
  last_run_id: string | null;
  last_run_time: string | null;
};
