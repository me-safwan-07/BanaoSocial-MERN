import { FormWrapper } from '../FormWrapper'
import { SigninForm } from './components/SigninForm'

function Login() {
  return (
    <div>
      <FormWrapper>
        <SigninForm 
            // emailAuthEnabled={true}
            // passwordResetEnabled={false}
            // googleOAuthEnabled={true}
            // publicSignUpEnabled={true}
            // isMultiOrgEnabled={true}
        />
      </FormWrapper>
    </div>
  )
}

export default Login
