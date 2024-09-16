import Image from 'next/image';
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import Head from 'next/head';
import image1 from '../../public/image1.svg';
import image2 from '../../public/image2.svg';
import image3 from '../../public/image3.svg';
import image4 from '../../public/image4.svg';
import image5 from '../../public/image5.svg';

export const metadata = {
    title: 'Mes finances',
}

const Home = () => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            </Head>

            <div className="relative  min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0 overflow-x-hidden">
                <Header />
                <div className='w-screen h-[450px] py-8 px-6 grid grid-cols-2'>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-primary-100 text-5xl text-center'>Finances management website</h1>
                    </div>
                    <div>
                        <Image
                            src={image1}
                            alt='Aucune image'
                            height={350}
                        />
                    </div>
                </div>
                <div className='w-screen h-[450px] py-8 px-6 grid grid-cols-2 bg-primary-100'>

                    <div>
                        <Image
                            src={image2}
                            alt='Aucune image'
                            height={350}
                        />
                    </div>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-white text-5xl text-center'>Manage your accounts</h1>
                    </div>
                </div>
                <div className='w-screen h-[450px] py-8 px-6 grid grid-cols-2 '>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-primary-100 text-5xl text-center'>Keep track of your needs</h1>
                    </div>
                    <div>
                        <Image
                            src={image3}
                            alt='Aucune image'
                            height={350}
                        />
                    </div>
                </div>
                <div className='w-screen h-[450px] py-8 px-6 grid grid-cols-2 bg-primary-100'>

                    <div>
                        <Image
                            src={image4}
                            alt='Aucune image'
                            height={350}
                        />
                    </div>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-white text-5xl text-center'>Keep an eye on your goals</h1>
                    </div>
                </div>
                <div className='w-screen h-[450px] py-8 px-6 grid grid-cols-2 '>
                    <div className='flex items-center justify-center'>
                        <h1 className='text-primary-100 text-5xl text-center'>Keep track of your expenses</h1>
                    </div>
                    <div>
                        <Image
                            src={image5}
                            alt='Aucune image'
                            height={350}
                        />
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )
}

export default Home
