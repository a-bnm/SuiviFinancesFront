"use client"

import EnvieForm from "@/components/envies/EnvieForm";

function page() {

    return (
        <div className=" w-screen h-[calc(100vh-65px)] flex justify-center items-center overflow-hidden">
            <EnvieForm />
        </div>

    );
}

export default page;