import useAuth from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import ProfileForm from "./profile-form";

export default function Profile() {
  const { auth } = useAuth();

  const {
    user: { username, name },
  } = jwtDecode(auth.token);

  return (
    <section className="mt-20">
      <h1>Profile</h1>
      <div>
        <p>Welcome, {name}</p>
      </div>
      <ProfileForm />
    </section>
  );
}
