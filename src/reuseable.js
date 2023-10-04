export function checkValidText(value) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  } else {
    return value;
  }
}

export const debounce = (func, wait) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};