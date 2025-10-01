// Login.jsx
import React, { useContext, useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../Schema/user";
import { handelLogin } from "../../Services/user/usersAuth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContect } from "../../Context/AuthContect";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const {setIsloggedIn} = useContext(AuthContect);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const res = await handelLogin(values);

      if (res.message === "success") {
        localStorage.setItem("token", res.token);
        toast.success("Login successful!");
        setIsloggedIn(true);
        navigate("/");
      } else {
        toast.error(res.message || "Login failed!");
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Server Error!";
      toast.error(errorMessage);
      console.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      className="w-full max-w-2xl flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Email */}
      <Input
        isRequired
        isInvalid={Boolean(errors.email)}
        errorMessage={errors?.email?.message}
        label="Email"
        labelPlacement="outside"
        {...register("email")}
        placeholder="Enter your email"
        type="email"
      />

      {/* Password */}
      <Input
        isRequired
        isInvalid={Boolean(errors.password)}
        errorMessage={errors?.password?.message}
        label="Password"
        labelPlacement="outside"
        {...register("password")}
        placeholder="Enter your Password"
        type="password"
      />

      {/* Actions */}
      <div className="flex gap-2">
        <Button isLoading={loading} color="primary" type="submit">
          Login
        </Button>
      </div>

      <div>
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </div>
    </Form>
  );
}
