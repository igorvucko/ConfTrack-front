"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    await registerUser(data.email, data.password, data.name);
    router.push("/");
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" />
        <input {...register("email")} placeholder="Email" required />
        <input {...register("password")} type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}