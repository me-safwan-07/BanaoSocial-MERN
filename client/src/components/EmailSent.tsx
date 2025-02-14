import { FormWrapper } from './FormWrapper'
import Button from './ui/Button'

function EmailSent() {
  return (
    <FormWrapper>
      <div>
        <h1 className="leading-2 mb-4 text-center font-bold">Password reset successfully requested</h1>
        <p className="text-center">
        If an account with this email exists, you will receive password reset instructions shortly.
        </p>
        <div className="mt-5 text-center">
        <Button variant="secondary" href="/auth/login" className="w-full justify-center">
            Login
        </Button>
        </div>
      </div>
    </FormWrapper>
  )
}

export default EmailSent