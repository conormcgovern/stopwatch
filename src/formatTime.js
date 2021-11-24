function formatTime(s) {
  return new Date(s * 100).toISOString().substring(14, 21);
}

export default formatTime;
