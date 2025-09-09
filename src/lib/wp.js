const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `${domain}/wp-json/wp/v2`;

export async function getPageInfo(slug) {
  const response = await fetch(`${apiUrl}/pages?slug=${slug}`);

  if (!response.ok) throw new Error('Error al traer la página');

  const [data] = await response.json();
  const { title: { rendered: title }, content: { rendered: content } } = data;

  return { title, content};
}
