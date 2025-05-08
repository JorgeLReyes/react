import moment from "moment";

export const dateFormat = (date: string) => {
  return moment(date).local().format("HH:mm a | MMM Do");
};
