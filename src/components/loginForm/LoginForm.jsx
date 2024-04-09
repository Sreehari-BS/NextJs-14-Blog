"use client"

import styles from "./loginForm.module.css"
import { userLogin } from "@/lib/actions/actions"
import {useFormState} from "react-dom"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

const LoginForm = () => {
    const [state, formAction] = useFormState(userLogin, undefined)

    const router = useRouter()

    // useEffect(() => {

    // },[])
  return (
    <form className={styles.form} action={formAction}>
        <input type="text" placeholder="User Name" name="userName" />
        <input type="password" placeholder="Password" name="password" />
        <button>Login</button>
        <p>{state?.error}</p>
        <Link href="/register">
            {"Don't have an account?"} <b>Register</b>
        </Link>
    </form>
  )
}

export default LoginForm