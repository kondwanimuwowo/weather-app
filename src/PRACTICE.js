function toggleUnitCheckbox(currentChecked) {
  const isValid = typeof currentChecked === "boolean";
  if (!isValid) {
    console.log(`Invalid value. Defaulting to "false"`);
    currentChecked = false;
  }
  const unitGroup = currentChecked ? "imperial" : "metric";
  console.log(
    `The input was ${currentChecked} and the output is ${!currentChecked} with unitGroup ${unitGroup}`
  );
  return { checked: !currentChecked, unitGroup: unitGroup };
}

console.log(toggleUnitCheckbox(true));
console.log(toggleUnitCheckbox(false));
console.log(toggleUnitCheckbox(undefined));
console.log(toggleUnitCheckbox(null));
