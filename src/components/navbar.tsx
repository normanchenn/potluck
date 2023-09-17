import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <Image
          src="/logo.png"
          width={150}
          height={150}
          alt="Picture of the author"
        />
      </Link>
      <Link href="/account">
        <Image
          src="/logo.png"
          width={150}
          height={150}
          alt="Picture of the author"
        />{" "}
      </Link>
    </nav>
  );
};

export default Navbar;
