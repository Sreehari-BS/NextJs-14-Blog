"use client";

import styles from "./registerForm.module.css";
import { registerUser } from "@/lib/actions/actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {useFormState} from "react-dom";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formActon] = useFormState(registerUser, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formActon}>
      <input type="text" placeholder="User Name" name="userName" />
      <input type="email" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
      />
      <button>Register</button>
      <p>{state?.error}</p>
      <Link href="/login">
        {"Have an account?"} <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
