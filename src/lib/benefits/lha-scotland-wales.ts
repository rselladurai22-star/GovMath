/**
 * Local Housing Allowance rates for Scotland and Wales, by Broad Rental Market Area.
 *
 * Weekly rates from April 2024, used for Housing Benefit: Scotland from the
 * Scottish Government's "Local Housing Allowance Rates: 2024-2025", Wales from
 * Rent Officers Wales "LHA rates applicable from April 2024" (Table 1, column 3).
 * Rates are frozen at these levels for 2025/26 and 2026/27.
 *
 * Columns: shared accommodation, 1, 2, 3 and 4 bedrooms.
 */

import type { LhaRow } from "./lha-england";

export const LHA_SCOTLAND_2024: readonly LhaRow[] = [
  ["Aberdeen and Shire", 74.79, 109.32, 149.59, 197.92, 287.67],
  ["Argyll and Bute", 80.55, 103.56, 138.08, 159.95, 276.16],
  ["Ayrshires", 86.3, 86.3, 109.32, 130.0, 184.11],
  ["Dumfries and Galloway", 77.1, 87.45, 103.56, 115.07, 158.79],
  ["Dundee and Angus", 86.3, 92.05, 141.53, 182.96, 253.15],
  ["East Dunbartonshire", 97.81, 126.58, 172.6, 230.14, 322.19],
  ["Fife", 86.3, 103.56, 135.78, 164.55, 287.67],
  ["Forth Valley", 95.51, 105.86, 149.59, 184.11, 299.18],
  ["Greater Glasgow", 103.56, 159.95, 195.62, 223.23, 414.25],
  ["Highland and Islands", 87.45, 109.32, 136.93, 159.95, 195.62],
  ["Lothian", 109.32, 172.6, 223.23, 316.44, 501.7],
  ["North Lanarkshire", 86.3, 101.26, 126.58, 155.34, 205.97],
  ["Perth and Kinross", 82.66, 97.81, 128.88, 172.6, 287.67],
  ["Renfrewshire and Inverclyde", 82.85, 92.05, 120.82, 138.08, 253.15],
  ["Scottish Borders", 74.79, 86.3, 115.07, 141.53, 226.68],
  ["South Lanarkshire", 86.3, 103.56, 132.33, 164.74, 254.76],
  ["West Dunbartonshire", 80.55, 109.32, 136.93, 155.34, 218.63],
  ["West Lothian", 94.36, 115.07, 143.84, 172.6, 256.03],
];

/** The councils each Scottish area covers, where its name does not say. */
export const SCOTLAND_AREA_COVERS: Readonly<Record<string, string>> = {
  "Ayrshires": "East, North and South Ayrshire",
  "Forth Valley": "Clackmannanshire, Falkirk and Stirling",
  "Highland and Islands": "Highland, Moray, Orkney, Western Isles (Eilean Siar), Shetland",
  "Lothian": "City of Edinburgh, East Lothian and Midlothian",
};

export const LHA_WALES_2024: readonly LhaRow[] = [
  ["Blaenau Gwent", 69.04, 75.0, 98.96, 112.77, 149.59],
  ["Brecon and Radnor", 76.5, 78.25, 101.26, 126.58, 149.59],
  ["Bridgend", 69.04, 92.05, 120.82, 132.33, 178.36],
  ["Caerphilly", 77.65, 80.55, 113.92, 126.58, 172.6],
  ["Cardiff", 84.25, 149.59, 189.86, 212.88, 299.18],
  ["Carmarthenshire", 77.5, 92.05, 112.5, 123.12, 149.59],
  ["Ceredigion", 70.0, 96.66, 115.07, 126.58, 149.59],
  ["Flintshire", 87.5, 103.56, 136.93, 159.95, 212.88],
  ["Merthyr Cynon", 69.04, 100.0, 115.07, 126.58, 166.85],
  ["Monmouthshire", 77.65, 122.7, 161.1, 182.96, 253.15],
  ["Neath Port Talbot", 86.3, 94.74, 103.56, 115.07, 132.33],
  ["Newport", 77.65, 101.26, 138.08, 149.59, 202.52],
  ["North Clwyd", 78.8, 90.9, 126.58, 149.59, 196.77],
  ["North Powys", 67.5, 74.79, 92.05, 126.58, 155.34],
  ["North West Wales", 78.8, 90.0, 126.58, 143.84, 172.6],
  ["Pembrokeshire", 68.45, 82.85, 105.86, 132.33, 161.1],
  ["South Gwynedd", 78.8, 80.55, 100.0, 125.0, 155.34],
  ["Swansea", 86.3, 120.82, 126.58, 138.08, 188.71],
  ["Taff Rhondda", 69.04, 86.3, 103.56, 113.92, 149.59],
  ["Torfaen", 69.04, 115.07, 130.0, 149.59, 172.6],
  ["Vale of Glamorgan", 69.04, 121.0, 153.27, 166.85, 235.89],
  ["Wrexham", 90.05, 109.32, 120.82, 138.08, 172.6],
];
