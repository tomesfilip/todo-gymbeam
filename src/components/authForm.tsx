import { login, register } from "@/server/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

type Props = {
  setIsDialogOpen: (value: boolean) => void;
};

export const AuthForm = ({ setIsDialogOpen }: Props) => {
  return (
    <>
      <Tabs defaultValue="register" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Log in</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <form action={register}>
            <input id="username" type="text" />
            <input id="password" type="password" />
          </form>
        </TabsContent>
        <TabsContent value="login">
          <form action={login}>
            <input id="username" type="text" />
            <input id="password" type="password" />
          </form>
        </TabsContent>
      </Tabs>
    </>
  );
};
