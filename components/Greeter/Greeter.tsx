import { FunctionComponent } from "react";

interface GreeterProps {
  username: string;
}

const Greeter: FunctionComponent<GreeterProps> = ({ username }) => {
  return <div>Hello, {username}</div>;
};

export default Greeter;
