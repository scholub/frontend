export const getReaction = async (postId: string) => {
  const response = await fetch(`https://scholub.misile.xyz/post/${postId}/reaction`, {
    headers: {
      "token": sessionStorage.getItem("token") || "",
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    throw new Error(`Error fetching reaction for post with ID ${postId}: ${response.statusText}`);
  }
  return response.json();
}

export const postReaction = async (postId: string, reaction: 'like' | 'dislike') => {
  const response = await fetch(`https://scholub.misile.xyz/post/${postId}/reaction`, {
    method: "POST",
    headers: {
      "token": sessionStorage.getItem("token") || "",
      "Content-Type": "application/json",
      "like": reaction === 'like' ? 'true' : 'false'
    },
  });
  if (!response.ok) {
    throw new Error(`Error posting reaction for post with ID ${postId}: ${response.statusText}`);
  }
  return response.json();
}

export const deleteReaction = async (postId: string) => {
  const response = await fetch(`https://scholub.misile.xyz/post/${postId}/reaction`, {
    method: "DELETE",
    headers: {
      "token": sessionStorage.getItem("token") || "",
      "Content-Type": "application/json"
    },
  });
  if (!response.ok) {
    throw new Error(`Error deleting reaction for post with ID ${postId}: ${response.statusText}`);
  }
  return response.json();
}