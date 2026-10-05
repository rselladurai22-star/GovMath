/**
 * Local Housing Allowance rates for Northern Ireland, by Broad Rental Market Area.
 *
 * Weekly rates set by the Northern Ireland Housing Executive ("Current LHA rent
 * levels (2026/27)", effective 1 April 2026 to 31 March 2027, frozen at their
 * 2025/26 levels). These are the Housing Benefit rates.
 *
 * For Universal Credit the Housing Executive determines monthly rates from
 * monthly rents (Universal Credit Housing Costs (Executive Determinations)
 * Regulations (Northern Ireland) 2016). The weekly rates are those monthly
 * rates × 12 × 7 ÷ 365, so the monthly rate is weekly × 365 ÷ 84, to the penny
 * (checked against the published Belfast monthly rates).
 *
 * Columns: shared room, 1, 2, 3 and 4 bedrooms.
 */

import type { LhaRow } from "./lha-england";

export const LHA_NORTHERN_IRELAND_2026: readonly LhaRow[] = [
  ["Belfast", 75.75, 139.34, 155.77, 173.08, 219.76],
  ["Lough Neagh Lower", 83.49, 97.34, 121.15, 137.31, 150.25],
  ["Lough Neagh Upper", 71.08, 96.91, 118.56, 133.76, 141.62],
  ["North", 74.22, 119.79, 123.32, 133.48, 147.62],
  ["North West", 88.21, 99.23, 118.2, 133.34, 153.7],
  ["South", 65.49, 110.08, 124.61, 138.46, 164.81],
  ["South East", 79.7, 109.62, 144.23, 162.48, 199.12],
  ["South West", 71.28, 88.68, 105.16, 113.44, 133.27],
];

/** The main towns and postcodes in each Northern Ireland area, as the Housing Executive lists them. */
export const NORTHERN_IRELAND_AREA_COVERS: Readonly<Record<string, string>> = {
  Belfast: "BT1 to BT16",
  "Lough Neagh Lower": "Portadown, Lurgan, Craigavon; BT25, BT62 to BT67, BT69 to BT71",
  "Lough Neagh Upper": "Ballymena, Antrim, Larne, Magherafelt; BT29, BT36 to BT46, BT80",
  North: "Coleraine, Portstewart, Ballycastle, Ballymoney; BT51 to BT57",
  "North West": "Derry, Limavady, Strabane; BT47 to BT49, BT82",
  South: "Banbridge, Newry, Armagh, Dungannon; BT32, BT34, BT35, BT60, BT61, BT68",
  "South East": "Lisburn, Bangor, Newtownards, Downpatrick; BT17 to BT24, BT26 to BT28, BT30, BT31, BT33",
  "South West": "Enniskillen, Omagh; BT74 to BT79, BT81, BT92 to BT94",
};

/** Universal Credit monthly rate from a Northern Ireland weekly rate. */
export const niMonthlyFromWeekly = (weekly: number) => Math.round(((weekly * 365) / 84) * 100) / 100;
