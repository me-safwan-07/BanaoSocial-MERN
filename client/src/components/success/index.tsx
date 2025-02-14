import { FormWrapper } from "@/components/FormWrapper";
import Button from "@/components/ui/Button";

const Sucess = () => {
  return (
    <FormWrapper>
      <div>
        <h1 className="leading-2 mb-4 text-center font-bold">Password successfully reset.</h1>
        <p className="text-center">You can now log in with your new password</p>
        <div className="mt-3 text-center">
        <Button variant="secondary" href="/auth/login" className="w-full justify-center">
            Login
        </Button>
        </div>
      </div>
    </FormWrapper>
  );
};

export default Sucess;
