// methods sourced from https://github.com/blaqbox-prime/interactive_comments
export const getTimeDifference = (timestamp) => {
  let today = new Date();
  let givenDate = new Date(parseInt(timestamp)); // Convert the timestamp to a number

  let daysInBetween =
    millisecondsToDays(today.getTime()) -
    millisecondsToDays(givenDate.getTime());

  if (daysInBetween <= 1) {
    return "today";
  }
  if (daysInBetween > 7 && daysInBetween < 14) {
    return "1 week ago";
  }
  if (daysInBetween > 14) {
    return `${Math.floor(daysInBetween / 7)} weeks ago`;
  }
  if (daysInBetween > 29 && daysInBetween < 58) {
    return `${Math.floor(daysInBetween / 4 / 7)} month ago`;
  }
  if (daysInBetween > 60) {
    return `${Math.floor(daysInBetween / 4 / 7)} months ago`;
  }
  if (daysInBetween > 1) {
    return `${daysInBetween} days ago`;
  }
};

const millisecondsToDays = (miliseconds) => {
  return Math.floor(miliseconds / 1000 / 60 / 60 / 24);
};

export function selectionSort(array, key) {
  return [...array].sort((a, b) => new Date(b[key]) - new Date(a[key]));
}
