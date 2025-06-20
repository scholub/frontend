export const getUserData = async () => {
  const response = await fetch(`https://scholub.misile.xyz/user/verify`, {
    headers: {
      "token": sessionStorage.getItem("token") ||   "",
      "Content-Type": "application/json"
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching user data: ${response.statusText}`);
  }
  return response.json();
};