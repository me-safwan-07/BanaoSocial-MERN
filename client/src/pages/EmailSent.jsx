import { Button } from '@/components/ui/button'
import { FormWrapper } from '@/components/ui/FormWrapper'
import { useNavigate } from 'react-router-dom'

function EmailSent() {
    const  navigate = useNavigate();
  return (
    <FormWrapper>
      <div>
        <h1 className="leading-2 mb-4 text-center font-bold text-black">Password reset successfully requested</h1>
        <p className="text-center text-black">
        If an account with this email exists, you will receive password reset instructions shortly.
        </p>
        <div className="mt-5 text-center">
        <Button variant="secondary" onClick={() => navigate("/auth/signin")} className="w-full justify-center">
            Login
        </Button>
        </div>
      </div>
    </FormWrapper>
  )
}

export default EmailSent
