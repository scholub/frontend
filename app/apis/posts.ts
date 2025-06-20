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

export const getPostCommentsById = async (postId: string) => {
  const response = await fetch(`https://scholub.misile.xyz/post/${postId}/comment`);
  if (!response.ok) {
    throw new Error(`Error fetching comments for post with ID ${postId}: ${response.statusText}`);
  }
  return response.json();
};

export const postComment = async (postId: string, content: string) => {
  const response = await fetch(`https://scholub.misile.xyz/post/${postId}/comment?content=${encodeURIComponent(content)}`, {
    method: "POST",
    headers: {
      "token": sessionStorage.getItem("token") ||   "",
      "Content-Type": "application/json"
    },
  });
    if (!response.ok) {
        throw new Error(`Error posting comment for post with ID ${postId}: ${response.statusText}`);
    }
    return response.json();
};

export const postBookmark = async (postId: string) => {
  const response = await fetch(`https://scholub.misile.xyz/post/${postId}/bookmark`, {
    method: "POST",
    headers: {
      "token": sessionStorage.getItem("token") ||   "",
      "Content-Type": "application/json"
    },
  });
  if (!response.ok) {
    throw new Error(`Error bookmarking post with ID ${postId}: ${response.statusText}`);
  }
  return response.json();
};  

export const deleteBookmark = async (postId: string) => {
  const response = await fetch(`https://scholub.misile.xyz/post/${postId}/bookmark`, {
    method: "DELETE",
    headers: {
      "token": sessionStorage.getItem("token") ||   "",
      "Content-Type": "application/json"
    },
  });
  if (!response.ok) {
    throw new Error(`Error deleting bookmark for post with ID ${postId}: ${response.statusText}`);
  }
  return response.json();
};

export const deleteComment = async (commentId: string) => {
  const response = await fetch(`https://scholub.misile.xyz/comment/${commentId}`, {
    method: "DELETE",
    headers: {
      "token": sessionStorage.getItem("token") ||   "",
      "Content-Type": "application/json"
    },
  });
  if (!response.ok) {
    throw new Error(`Error deleting comment with ID ${commentId}: ${response.statusText}`);
  }
  return response.json();
};
