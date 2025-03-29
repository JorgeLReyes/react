export interface Mapbox {
  type: string;
  features: Feature[];
  attribution: string;
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  mapbox_id: string;
  feature_type: string;
  full_address: string;
  name: string;
  name_preferred: string;
  coordinates: Coordinates;
  bbox?: number[];
  context: Context;
  additional_feature_types?: string[];
  place_formatted?: string;
}

interface Context {
  country: Country;
  region?: Region;
  place?: Place;
  street?: Postcode;
  postcode?: Postcode;
}

interface Country {
  mapbox_id: string;
  name: string;
  country_code: string;
  country_code_alpha_3: string;
  wikidata_id: string;
  translations: Translations;
}

interface Translations {
  es: Es;
}

interface Es {
  language: Language;
  name: string;
}

enum Language {
  Es = "es",
}

interface Place {
  mapbox_id: string;
  name: string;
  wikidata_id: string;
  translations: Translations;
}

interface Postcode {
  mapbox_id: string;
  name: string;
}

interface Region {
  mapbox_id: string;
  name: string;
  translations: Translations;
  wikidata_id: string;
  region_code?: string;
  region_code_full?: string;
}

interface Coordinates {
  longitude: number;
  latitude: number;
}
