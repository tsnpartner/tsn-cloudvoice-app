export function zodToFormikError(zodError) {
  const errors = {};
  for (const issue of zodError.issues) {
    const fieldName = issue.path[0];
    errors[fieldName] = issue.message;
  }
  return errors;
}
