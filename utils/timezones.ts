// utils/timeZones.ts
import moment from "moment-timezone";
import { Option } from "../types/common"; // adjust the path to your actual `Option` type

export const getAllTimeZones = (): Option[] => {
  return moment.tz.names().map((tz) => {
    const offset = moment.tz(tz).utcOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset >= 0 ? "+" : "-";
    const formattedOffset = `GMT${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

    return {
      id: tz,
      name: `${tz} (${formattedOffset})`,
    };
  });
};
