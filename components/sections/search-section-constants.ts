export const REGION_GROUPS = [
  { region: "CENTER",    label: "Central Israel",           cities: ["Tel Aviv-Yafo", "Ramat Gan", "Herzliya", "Petah Tikva", "Rishon LeZion"] },
  { region: "JERUSALEM", label: "Jerusalem & Surroundings", cities: ["Jerusalem", "Modi'in", "Beit Shemesh"] },
  { region: "NORTH",     label: "North",                    cities: ["Haifa", "Caesarea", "Acre"] },
  { region: "SOUTH",     label: "South",                    cities: ["Beer Sheva", "Eilat", "Ashkelon"] },
] as const;

export const CITY_TO_REGION: Record<string, string> = REGION_GROUPS.reduce<Record<string, string>>(
  (acc, g) => { g.cities.forEach((c) => { acc[c] = g.region; }); return acc; },
  {}
);

export const LANGUAGE_OPTIONS = [
  { value: "he", label: "Hebrew" },
  { value: "en", label: "English" },
  { value: "ru", label: "Russian" },
  { value: "fr", label: "French" },
  { value: "ar", label: "Arabic" },
];
