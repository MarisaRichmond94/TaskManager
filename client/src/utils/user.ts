const timedUserGreeting = (name: string): string => {
  const hours = new Date().getHours();
  switch (true) {
    case hours >= 6 && hours < 12: return `Good morning, ${name}`;
    case hours >= 12 && hours < 17: return `Good afternoon, ${name}`;
    case hours >= 17 && hours < 20: return `Good evening, ${name}`;
    default: return `Good night, ${name}`;
  }
};

export {
  timedUserGreeting,
};
