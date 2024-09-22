"use client"

import Loading from "@/app/(app)/Loading";
import RentreForm from "@/components/rentres/RentreForm"
import { useRentres } from "@/hooks/rentres";
import { useState, useEffect } from 'react'

function page({ params }) {
    const id = params.id;
    const { getRentre } = useRentres();

    const [rentre, setRentre] = useState();

    useEffect(() => {

        const getData = async (id) => {
            let data = await getRentre(id);
            setRentre(data)
        }

        getData(id);

    }, [rentre]);

    return (
        <div className=" w-screen h-[calc(100vh-65px)] flex justify-center items-center overflow-hidden">
            {rentre ?
                (
                    <RentreForm rentre={rentre} />
                ) : (
                    <Loading />
                )
            }
        </div>

    );
}

export default page;