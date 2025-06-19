// dayjsLocalizer.ts
// import { DateLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(weekday);
dayjs.extend(localeData);

// const dayjsLocalizer = (): DateLocalizer => ({
//   formats: {
//     dateFormat: "DD",
//     dayFormat: "ddd DD",
//     weekdayFormat: "ddd",
//     monthHeaderFormat: "MMMM YYYY",
//     dayHeaderFormat: "dddd, MMM D",
//     dayRangeHeaderFormat: ({ start, end }) =>
//       `${dayjs(start).format("MMM D")} – ${dayjs(end).format("MMM D")}`,
//     agendaHeaderFormat: ({ start, end }) =>
//       `${dayjs(start).format("MMM D")} – ${dayjs(end).format("MMM D")}`,
//     agendaDateFormat: "ddd, MMM D",
//     agendaTimeFormat: "h:mm A",
//     agendaTimeRangeFormat: ({ start, end }) =>
//       `${dayjs(start).format("h:mm A")} – ${dayjs(end).format("h:mm A")}`,
//   },
//   firstOfWeek: () => dayjs().localeData().firstDayOfWeek(),
//   format: (value, formatStr) => dayjs(value).format(formatStr),
//   parse: (value, formatStr) => dayjs(value, formatStr).toDate(),
//   startOfWeek: () => dayjs().startOf("week").toDate(),
//   getDay: (date) => dayjs(date).day(),
// });

// export default dayjsLocalizer();
