import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { useSession } from "next-auth/react";
const Navbar: React.FC = () => {
  const session = useSession();
  const image = session.data?.user.image;
  return (
    <nav className=" flex justify-between">
      <Link href="/" className="ml-1">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          alt="Picture of the author"
        />
      </Link>
      <h3 className="text-4xl	 font-extrabold text-[#AA825D]">potluck</h3>
      <Avatar className="mr-5 mt-1">
        <AvatarImage src={image} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
