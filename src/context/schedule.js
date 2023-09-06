import { createContext } from "react";

export const ScheduleData = {
    subject:"",
    teacher:"",
    auditorium:"",
    timeStart:"",
    timeEnd:""
};

export const ScheduleContext = createContext(ScheduleData);