import { LogIn } from "@/actions/actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
  type: "signup" | "login";
};

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={LogIn} className="flex flex-col">
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" />
      </div>

      <div className="space-y-1 mt-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" />
      </div>

      <Button className="mt-4 mx-auto">
        {type === "signup" ? "Sign up" : "Log in"}
      </Button>
    </form>
  );
}
