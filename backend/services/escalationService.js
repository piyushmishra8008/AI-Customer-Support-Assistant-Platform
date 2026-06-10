const escalationKeywords = [
  "refund",
  "payment failed",
  "service down",
  "service outage",
  "lawyer",
  "legal",
  "human",
  "manager",
  "angry",
  "complaint"
];

const checkEscalation = (message) => {

  const lower =
    message.toLowerCase();

  return escalationKeywords.some(
    keyword =>
      lower.includes(keyword)
  );
};

module.exports = {
  checkEscalation,
};