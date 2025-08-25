export const validate = (note) => {
  const MAX_NOTE_LENGTH = 500;
  const newErrors = {};
  if (!note || !note.trim()) {
    newErrors.note = "Notatka nie może być pusta";
  }
  if (note.length > MAX_NOTE_LENGTH) {
    newErrors.note = `Notatka nie może przekraczać ${MAX_NOTE_LENGTH} znaków`;
  }
  return Object.keys(newErrors).length ? newErrors : null;
};