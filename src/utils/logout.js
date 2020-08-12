import { Auth } from "aws-amplify";

export default async function logout() {
  await Auth.signOut();
  localStorage.removeItem("token");
  document.location.href = "/";
}
