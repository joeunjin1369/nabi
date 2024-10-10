import Page from "@/components/Page/Page";
import Link from "next/link";

function Header() {
  return (
    <header className="h-16 shadow-lg">
      <Page
        width="lg"
        isMain={false}
        className=" h-full flex items-center justify-between"
      >
        <Link href="/" className="text-2xl font-extrabold">
          나비
        </Link>

        <nav>
          <ul className="flex gap-x-5">
            <li>
              <Link href="/log-in">로그인</Link>
            </li>
            <li>
              <Link href="/sign-up">회원가입</Link>
            </li>
          </ul>
        </nav>
      </Page>
    </header>
  );
}

export default Header;