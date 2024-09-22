"use client"

import Loading from "@/app/(app)/Loading";
import AchatForm from "@/components/achats/AchatForm";
import { useAchats } from "@/hooks/achats";
import { useState, useEffect } from 'react'

function page({ params }) {
    const id = params.id;
    const { getAchat } = useAchats();

    const [achat, setAchat] = useState();

    useEffect(() => {

        const getData = async (id) => {
            let data = await getAchat(id);
            setAchat(data)
        }

        getData(id);

    }, [achat]);

    return (
        <div className=" w-screen h-[calc(100vh-65px)] flex justify-center items-center overflow-hidden">
            {achat ?
                (
                    <AchatForm achat={achat} />
                ) : (
                    <Loading />
                )
            }
        </div>

    );
}

export default page;