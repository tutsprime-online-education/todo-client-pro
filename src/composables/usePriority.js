export const stripPriorityFrom = (text) =>
  text.replace(/\s*\!(high|medium|low|none)/i, "");

export const extractPriorityFrom = (text) =>
  text.match(/(?=(\!(high|medium|low|none)))/i);
