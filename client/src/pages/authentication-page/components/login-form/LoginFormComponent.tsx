import { z } from "zod";
import styles from "./LoginFormComponent.module.scss";
import { loginSchema } from "../../../../types/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonComponent from "../../../../components/button/ButtonComponent";
import loginUser from "../../../../lib/authentication/loginUser";
import { useAuth } from "../../../../util/useAuthContext";
import { useNavigate } from "react-router-dom";

export type TLoginSchema = z.infer<typeof loginSchema>;

interface LoginFormComponentProps {
  openModal: () => void;
}

const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  openModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: TLoginSchema) => {
    const response = await loginUser(data);

    if (!response.success) {
      auth?.openSnackBarComponent("error", response.message);
      return;
    }

    if (auth) {
      auth.setIsAuth(true);
      auth.setUser(response.user);
    }
    navigate("/");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
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
          autoComplete="email"
          {...register("password")}
        />
        {errors.password && (
          <p className="form_error">{`${errors.password.message}`}</p>
        )}
      </label>
      <p className={styles.login_form__text}>
        Nemate račun? <span onClick={openModal}>Kreiraj račun</span>
      </p>
      <ButtonComponent variant={"main"} onClick={handleSubmit(onSubmit)}>
        <p>Prijavite se</p>
      </ButtonComponent>
    </form>
  );
};

export default LoginFormComponent;
