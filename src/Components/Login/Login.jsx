import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[a-zA-Z0-9]{3,30}$/,
        "Password must be between 3 and 30 characters and not contain special characters",
      )
      .required("Password is required"),
  });

  function login(values) {
    setIsLoading(true);
    axios
      .post("https://nti-ecommerce.vercel.app/api/v1/auth/signIn", values)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/categories");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#1b262c]">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#3282b8_1px,transparent_1px),linear-gradient(90deg,#3282b8_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="relative w-full max-w-md">
          {/* Glow blob */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none bg-[#3282b8]" />

          {/* Card */}
          <div className="relative rounded-2xl p-8 shadow-2xl border bg-[#0f4c75] border-[rgba(50,130,184,0.3)]">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 shadow-lg bg-[#3282b8]">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#bbe1fa"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#bbe1fa] font-['Playfair_Display',serif]">
                Welcome Back
              </h1>
            </div>

            {/* Fields */}
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#bbe1fa]">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="rgba(187,225,250,0.5)"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none bg-[rgba(27,38,44,0.7)] text-[#bbe1fa] border border-[rgba(50,130,184,0.25)] placeholder:text-[rgba(187,225,250,0.3)]"
                    />
                  </div>
                </div>
                {formik.errors.email && formik.touched.email && (
                  <p className="text-xs mt-1.5 pl-1 text-[#bbe1fa] bg-[rgba(50,130,184,0.15)] border border-[rgba(50,130,184,0.3)] rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0 text-[#3282b8]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      />
                    </svg>
                    {formik.errors.email}
                  </p>
                )}

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase mb-2 text-[#bbe1fa]">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="rgba(187,225,250,0.5)"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none bg-[rgba(27,38,44,0.7)] text-[#bbe1fa] border border-[rgba(50,130,184,0.25)] placeholder:text-[rgba(187,225,250,0.3)]"
                    />
                  </div>
                </div>
                {formik.errors.password && formik.touched.password && (
                  <p className="text-xs mt-1.5 pl-1 text-[#bbe1fa] bg-[rgba(50,130,184,0.15)] border border-[rgba(50,130,184,0.3)] rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0 text-[#3282b8]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                      />
                    </svg>
                    {formik.errors.password}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer py-3 rounded-xl font-semibold text-sm tracking-widest uppercase mt-2 hover:opacity-90 shadow-lg transition-opacity bg-gradient-to-br from-[#3282b8] to-[#0f4c75] text-[#bbe1fa] border border-[rgba(187,225,250,0.2)]"
                >
                  {isLoading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[rgba(50,130,184,0.2)]" />
              <span className="text-xs text-[rgba(187,225,250,0.35)]">
                or sign up with
              </span>
              <div className="flex-1 h-px bg-[rgba(50,130,184,0.2)]" />
            </div>

            {/* Login Link */}
            <p className="text-center text-xs mt-6 text-[rgba(187,225,250,0.45)]">
              Don't have an account?{" "}
              <span className="font-semibold cursor-pointer hover:underline text-[#3282b8]">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
