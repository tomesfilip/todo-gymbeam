import { login, register } from "@/server/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type Props = {
  setIsDialogOpen: (value: boolean) => void;
};

type AuthFormContentProps = {
  buttonText: string;
};

const AuthFormContent = ({ buttonText }: AuthFormContentProps) => {
  return (
    <>
      <div className="grid gap-1">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          className="px-2 py-1 border border-gray-500 rounded-lg"
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className="px-2 py-1 border border-gray-500 rounded-lg"
        />
      </div>
      <button className="bg-gray-700 rounded-lg text-white px-4 py-2 disabled:bg-opacity-50 disabled:cursor-not-allowed">
        {buttonText}
      </button>
    </>
  );
};

export const AuthForm = ({ setIsDialogOpen }: Props) => {
  return (
    <>
      <Tabs defaultValue="register" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="register" className="text-center">
            Register
          </TabsTrigger>
          <TabsTrigger value="login" className="text-center">
            Log in
          </TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <form action={register} className="grid gap-4">
            <AuthFormContent buttonText="Register" />
          </form>
        </TabsContent>
        <TabsContent value="login">
          <form action={login} className="grid gap-4">
            <AuthFormContent buttonText="Login" />
          </form>
        </TabsContent>
      </Tabs>
    </>
  );
};
