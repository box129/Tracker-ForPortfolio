export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md space-y-6 px-6 py-10 border border-neutral-200 rounded-2xl shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="font-unbounded text-2xl font-semibold">Forgot Password?</h1>
          <p className="font-montserrat text-sm text-black/70">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>
        <form className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-montserrat" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-lg bg-[#f3f3f3] px-4 py-3 text-sm font-montserrat placeholder:text-[#7c7c7c] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-black py-3 text-center font-montserrat text-base font-semibold text-white hover:bg-neutral-900 transition-colors"
          >
            Send reset link
          </button>
        </form>
        <p className="text-center text-xs font-montserrat text-black/70">
          Remember your password? <a href="/login" className="font-semibold hover:underline">Sign in</a>
        </p>
      </div>
    </main>
  );
}
