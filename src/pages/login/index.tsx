import "bootstrap/dist/css/bootstrap.min.css";
import { register, login } from "@/api/index";
import { useRef, useState } from "react";
import toast from '@/components/toast'
import { useRouter } from "next/router";


export default function Login() {
  const form = useRef(null);
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter()

  const submit = async () => {
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());
    console.log(formData.entries(), formData, form.current, data, "formform");
    if (isLogin) {
      const res = await login(data);

      console.log(res, "resresres");
      toast({
        position: 'top-end',
        message: '登录成功！'
  
      })
      localStorage.setItem("token", res.token);
      router.push('/userInfo')

    } else {
      const res = await register(data);
      toast({
        position: 'top-end',
        message: '注册成功！'
  
      })
      localStorage.setItem("token", res.token);
      router.push('/userInfo')
      console.log(res, "registerregisterregister");
    }
  };
  return (
    <div>
      <h1>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="btn btn-primary"
        >
          checket
        </button>
        {/* Login */}
        {isLogin ? "login" : "register"}
        {/* <LoginData/> */}
      </h1>
      <div className="form">
        <form id="form" ref={form} onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="username"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="remember"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
