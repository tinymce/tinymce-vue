let unique = 0;

export const uuid = (prefix: string): string => {
  const date   = new Date();
  const time   = date.getTime();
  const random = Math.floor(Math.random() * 1000000000);

  unique++;

  return prefix + '_' + random + unique + String(time);
};

export const isTextarea = (element: Element | null): element is HTMLTextAreaElement => {
  return element !== null && element.tagName.toLowerCase() === 'textarea';
};
