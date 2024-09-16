"use client"

import Loading from "@/app/(app)/Loading";
import CompteForm from "@/components/comptes/CompteForm"
import { useComptes } from "@/hooks/comptes";
import { useState, useEffect } from 'react'

function page({ params }) {
    const id = params.id;
    const { getCompte } = useComptes();

    const [compte, setCompte] = useState();

    useEffect(() => {

        const getData = async (id) => {
            let data = await getCompte(id);
            setCompte(data)
        }

        getData(id);

    }, [compte]);

    return (
        <div className=" w-screen h-[calc(100vh-65px)] flex justify-center items-center overflow-hidden">
            {compte ?
                (
                    <CompteForm compte={compte} />
                ) : (
                    <Loading />
                )
            }
        </div>

    );
}

export default page;