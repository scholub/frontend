export const getPostById = async (postId: string) => {
 const response = await fetch(`https://scholub.misile.xyz/post/${postId}`);
  if (!response.ok) {
    throw new Error(`Error fetching post with ID ${postId}: ${response.statusText}`);
  }
  return response.json();
}

export const getPostMarkdownById = async (postId: string) => {
  const response = await fetch(`https://scholub.misile.xyz/files/post/${postId}/post.md`);
  if (!response.ok) {
    throw new Error(`Error fetching post markdown with ID ${postId}: ${response.statusText}`);
  }
  const markdown = await response.text();
  const basePath = `https://scholub.misile.xyz/files/post/${postId}`;
  return markdown.replace(
    /!\[image\]\(\/files\/post\/[^/]+\/([^)]+)\)/g,
    (_, imagePath) => `![image](${basePath}/${imagePath})`
  );
};