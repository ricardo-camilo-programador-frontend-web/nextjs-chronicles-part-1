export function getRandomLinkForRedirection() {
  const links = [
    'https://www.linkedin.com/in/ricardo-camilo-492b95b3/',
    'https://x.com/Ricardo50993066',
    'https://www.instagram.com/ricardohks/',
  ];

  if (typeof window !== 'undefined') {
    const shuffled = [...links].sort(() => Math.random() - 0.5);
    return shuffled[0];
  }

  return links[0];
}