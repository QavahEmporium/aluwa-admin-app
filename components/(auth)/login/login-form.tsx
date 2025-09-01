"use client";
import { loginUser } from "@/actions/auth";
import { SubmitButton } from "@/components/ui/buttons";
import InputValidated from "@/components/ui/input-validation";
import { loginFormData } from "@/constants/auth";
import { LoginUserForm, loginUserformSchema } from "@/definitions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const initialState = {
    message: "",
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserForm>({
    resolver: zodResolver(loginUserformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(() => {
          const formData = new FormData(formRef.current!);
          startTransition(() => {
            formAction(formData);
          });
        })(evt);
      }}
      className="flex flex-col items-center w-full max-w-sm mx-auto space-y-4"
    >
      <div className="w-full">
        {loginFormData.map((data) => (
          <InputValidated
            key={data.name}
            {...data}
            register={register}
            errors={errors}
            isPending={isPending}
            stateError={state?.errors}
          />
        ))}
      </div>

      <SubmitButton name="Login" isPending={isPending} />
    </form>
  );
};

export default LoginForm;
