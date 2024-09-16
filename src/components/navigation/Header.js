import LoginLinks from "@/app/LoginLinks";
import Link from "next/link";

export default function Header() {
    return (
        <div className="w-screen h-16 bg-primary-100 grid grid-cols-2">
            <div className="py-4">
                <Link
                    href="/"
                    className="ml-4 text-sm text-white "
                >
                    Acceuil
                </Link>
            </div>
            <LoginLinks />
        </div>
    )
}
