export interface FormatDateOptions {
  locale?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
}

export function formatDate(
  input: Date | string | number,
  options?: FormatDateOptions,
): string {
  const date =
    typeof input === "string" || typeof input === "number"
      ? new Date(input)
      : input;
  if (isNaN(date.getTime())) {
    return "";
  }
  const {
    locale = "en-US",
    formatOptions = { year: "numeric", month: "long", day: "numeric" },
  } = options || {};
  return new Intl.DateTimeFormat(locale, formatOptions).format(date);
}

export const formatDateToMonthYear = (
  input: Date | string | number,
  locale: string = "en-US",
) =>
  formatDate(input, {
    locale,
    formatOptions: {
      month: "long",
      year: "numeric",
    },
  });
