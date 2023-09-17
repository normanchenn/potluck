import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar flex justify-between">
      <Link href="/" className="ml-1">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          alt="Picture of the author"
        />
      </Link>
      <Avatar className="mr-5 mt-1">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
