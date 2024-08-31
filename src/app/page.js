import LoginLinks from '@/app/LoginLinks'
import Head from 'next/head'

export const metadata = {
    title: 'Mes finances',
}

const Home = () => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            </Head>
            <div className="relative  min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks />
                <div className='grid grid-cols-3 w-screen h-[50vh] mt-0 bg-gradient-to-br from-purple-950 to-purple-500'>
                    <div className="col-span-1 p-4">
                        <div className='blob-main'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                            </svg>
                        </div>
                    </div>
                    <div className='col-span-2'>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Home
