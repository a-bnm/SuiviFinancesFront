'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div className="px-6 py-5 hidden justify-end sm:flex ">
            {user ? (
                <Link
                    href="/dashboard"
                    className="ml-4 text-sm text-white "
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-sm text-white "
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="ml-4 text-sm text-white "
                    >
                        Register
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
