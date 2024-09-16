"use client"

import CompteForm from "@/components/comptes/CompteForm";

function page() {

    return (
        <div className=" w-screen h-[calc(100vh-65px)] flex justify-center items-center overflow-hidden">
            <CompteForm />
        </div>

    );
}

export default page;