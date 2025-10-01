// Register.tsx
import React from "react";
import { Form, Input, Button, RadioGroup, Radio } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../Schema/user";
import { handelRegister } from "../../Services/user/usersAuth";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender:"", // خليها undefined عشان تمشي مع enum
    },
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  async function SignUp(value) {

try{
      const res =await handelRegister(value);
      console.log(res);
      if(res.message==="success"){
        toast.success(res.message);
      }      

}    catch(err){
  console.log(err.response.data.error);
  
  const errorMessage =err.response.data.error || "Something went wrong!";
    toast.error(errorMessage);
    // console.log(errorMessage);
  }
  
}
  
return (
    <Form
      className="w-full max-w-2xl flex flex-col gap-6 bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(SignUp)}
    >
      {/* Username */}
      <Input
        isInvalid={Boolean(errors.name)}
        errorMessage={errors?.name?.message}
        isRequired
        label="Username"
        labelPlacement="outside"
        {...register("name")}
        placeholder="Enter your username"
        type="text"
      />

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

      {/* Confirm Password */}
      <Input
        isRequired
        isInvalid={Boolean(errors.rePassword)}
        errorMessage={errors?.rePassword?.message}
        label="Confirm your Password"
        labelPlacement="outside"
        {...register("rePassword")}
        placeholder="Confirm your Password"
        type="password"
      />

      {/* Date of Birth */}
      <Input
        isRequired
        isInvalid={Boolean(errors.dateOfBirth)}
        errorMessage={errors?.dateOfBirth?.message}
        label="Birth Date"
        labelPlacement="outside"
        {...register("dateOfBirth")}
        type="date"
      />

      {/* Gender */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <RadioGroup
              label="Select your gender"
              orientation="horizontal"
              value={field.value}
              onValueChange={field.onChange}
            >
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </RadioGroup>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
        )}
      />

      {/* Actions */}
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>

        <div>
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </div>
    </Form>
  );
}
