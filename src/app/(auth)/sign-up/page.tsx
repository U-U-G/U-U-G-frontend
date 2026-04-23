import SignUpForm from '@/components/auth/signup/SignUpForm'

export default function SignUpPage() {
  return (
    <main className="min-w-102.5 mx-auto py-12">
      <div className="pb-3.75 mb-13.5 border-b border-gray5">
        <h1 className="h4">회원가입</h1>
      </div>
      <SignUpForm />
    </main>
  )
}
