import { FormWrapper } from '../FormWrapper'
import { SignupForm } from './components/SignupForm'

function Signup() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <FormWrapper>
            <SignupForm />
        </FormWrapper>
    </div>
  )
}

export default Signup
