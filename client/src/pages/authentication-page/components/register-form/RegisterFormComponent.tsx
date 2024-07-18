import styles from "./RegisterFormComponent.module.scss";
import { z } from "zod";
import { registerSchema } from "../../../../types/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonComponent from "../../../../components/button/ButtonComponent";
import registerUser from "../../../../lib/authentication/registerUser";

export type TRegisterSchema = z.infer<typeof registerSchema>;

const RegisterFormComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: TRegisterSchema) => {
    const { username, email, password } = data;

    const response = await registerUser({ username, email, password });

    if (!response.success) {
      return;
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.register_form}>
      <h2>Registracija</h2>
      <label>
        <input
          type="text"
          placeholder="Unesite korisničko ime"
          autoComplete="username"
          {...register("username")}
        />
        {errors.username && (
          <p className="form_error">{`${errors.username.message}`}</p>
        )}
      </label>
      <label>
        <input
          type="email"
          placeholder="Unesite email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="form_error">{`${errors.email.message}`}</p>
        )}
      </label>
      <label>
        <input
          type="password"
          placeholder="Unesite šifru"
          autoComplete="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="form_error">{`${errors.password.message}`}</p>
        )}
      </label>
      <label>
        <input
          type="password"
          placeholder="Potvrdi šifru"
          autoComplete="repeatPassword"
          {...register("repeatPassword")}
        />
        {errors.repeatPassword && (
          <p className="form_error">{`${errors.repeatPassword.message}`}</p>
        )}
      </label>
      <ButtonComponent variant={"main"} onClick={handleSubmit(onSubmit)}>
        <p>Registriraj se</p>
      </ButtonComponent>
    </form>
  );
};

export default RegisterFormComponent;
