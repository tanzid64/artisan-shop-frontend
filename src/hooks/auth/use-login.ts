import { login } from "@/actions/auth";
import { cookieManager } from "@/lib/cookie-manager";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Minimum 8 character required" }),
});
export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const useLogin = () => {
  const router = useRouter();
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
    mutationFn: login,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        // save credentials
        cookieManager.setAuthToken({
          token: data?.data?.token ?? "",
          role: data?.data?.user?.role ?? "",
        });
        // redirect to dashboard
        router.push("/");
      } else {
        toast.error(data.message);
        if (data.status === 422) {
          Object.entries(data.errors as Record<string, string[]>).forEach(
            ([key, value]) => {
              form.setError(key as "email" | "password", {
                message: value[0],
              });
            }
          );
        }
      }
    },
  });

  // Handle form submission
  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    form,
    mutation,
    onSubmit,
  };
};
