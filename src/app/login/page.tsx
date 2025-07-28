"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    await login(data.email, data.password);
    router.push("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="Email" required />
        <input {...register("password")} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}