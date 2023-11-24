import { expect } from "vitest"
import { GeneratorID, getDateTimeForPicker, diffTime, groupBy } from "../helper"

test("function GeneratorID", () => {
    expect(GeneratorID()).toMatch(/^[A-Za-z0-9]{70,}$/g);
})
test("function GroupBy", () => {
    const Tableau = [{
        id: "1",
        category: "sport",
        starttime: "2021-08-01T16:40:01",
        endtime: "2021-08-01T17:40:01",
        name: "mike",
        display: true,
      },
      {
        id: "2",
        category: "sport",
        starttime: "2021-08-01T16:40:01",
        endtime: "2021-08-01T17:40:01",
        name: "Pierre",
        display: true,
      },
      {
        id: "3",
        category: "perso",
        starttime: "2021-08-01T16:40:01",
        endtime: "2021-08-01T17:40:01",
        name: "Alanja",
        display: true,
      }];

    const result = {sport: [{
        id: "1",
        category: "sport",
        starttime: "2021-08-01T16:40:01",
        endtime: "2021-08-01T17:40:01",
        name: "mike",
        display: true,
      },
      {
        id: "2",
        category: "sport",
        starttime: "2021-08-01T16:40:01",
        endtime: "2021-08-01T17:40:01",
        name: "Pierre",
        display: true,
      }], 
    perso: [{
        id: "3",
        category: "perso",
        starttime: "2021-08-01T16:40:01",
        endtime: "2021-08-01T17:40:01",
        name: "Alanja",
        display: true,
      }]}
    expect(groupBy(Tableau, 'category')).toStrictEqual(result);
})
test("function diffTime", () => {
    const firstStartTime = "2021-08-01T16:40:01";
    const firstEndTime = "2021-08-01T17:40:01";
    const SecondStartTime = "2023-09-05T11:27:43";
    const SecondEndTime = "2023-09-05T17:03:21"
    expect(diffTime(firstStartTime, firstEndTime)).toBe("1 h ");
    expect(diffTime(SecondStartTime, SecondEndTime)).toBe("5 h 35 min 38 sec ");
})
test("function getDateTimeForPicker", () => {
    const date = new Date("Wed Sep 06 2023 15:34:46 GMT+0200 (heure d\'été d\'Europe centrale)");
    const ConvertDate = new Date("2023-09-06T15:34:46").toISOString();
    const result = ConvertDate.substring(0, ConvertDate.length - 5);
    expect(getDateTimeForPicker(date)).toStrictEqual(result);
})

