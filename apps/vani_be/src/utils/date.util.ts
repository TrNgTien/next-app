import { App } from "@/common";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(CustomParseFormat);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(utc);

const tz = App.TIMEZONE;
dayjs.tz.setDefault(tz);

export { dayjs };
