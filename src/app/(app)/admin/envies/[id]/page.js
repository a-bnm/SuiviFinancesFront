"use client"

import Loading from "@/app/(app)/Loading";
import EnvieForm from "@/components/envies/EnvieForm";
import { useEnvies } from "@/hooks/envies";
import { useState, useEffect } from 'react'

function page({ params }) {
    const id = params.id;
    const { getEnvie } = useEnvies();

    const [envie, setEnvie] = useState();

    useEffect(() => {

        const getData = async (id) => {
            let data = await getEnvie(id);
            setEnvie(data)
        }

        getData(id);

    }, [envie]);

    return (
        <div className=" w-screen h-[calc(100vh-65px)] flex justify-center items-center overflow-hidden">
            {envie ?
                (
                    <EnvieForm envie={envie} />
                ) : (
                    <Loading />
                )
            }
        </div>

    );
}

export default page;