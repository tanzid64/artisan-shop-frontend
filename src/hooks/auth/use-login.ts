import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Minimum 8 character required" }),
});
export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const useLogin = () => {
  // Define login form
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Login form mutation
  const mutation = useMutation({
    mutationFn: (data: LoginFormSchemaType) => {
      return true;
    },
  });

  // Handle form submission
  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return {
    form,
    mutation,
    onSubmit,
  };
};
