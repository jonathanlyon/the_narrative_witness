export function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];

    if (inQuotes) {
      if (character === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        inQuotes = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      inQuotes = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }

  if (inQuotes) {
    throw new Error("CSV contains an unterminated quoted field.");
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const nonEmptyRows = rows.filter((values) =>
    values.some((value) => value.trim() !== "")
  );

  if (!nonEmptyRows.length) {
    return [];
  }

  const headers = nonEmptyRows[0].map((header) => header.trim());
  return nonEmptyRows.slice(1).map((values) =>
    Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? ""])
    )
  );
}

export function stringifyCsv(rows, headers) {
  const escapeField = (value) => {
    const stringValue = String(value ?? "");
    return /[",\n\r]/.test(stringValue)
      ? `"${stringValue.replaceAll('"', '""')}"`
      : stringValue;
  };

  return [
    headers.map(escapeField).join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeField(row[header])).join(",")
    )
  ].join("\n") + "\n";
}
