"use client"

import FormButton from "@/components/FormButton";
import FormTitle from "@/components/FormTitle";
import Input from "@/components/Input";
import Label from "@/components/Label";
import TextArea from "@/components/TextArea";
import { useAuth } from "@/hooks/auth";
import { useComptes } from "@/hooks/comptes";
import { useState } from "react";

function page() {

    const [designation, setDesignation] = useState();
    const [description, setDescription] = useState();
    const [montant, setMontant] = useState();

    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState([]);
    const { user } = useAuth();

    const { compte, ajoutCompte } = useComptes();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let user_id = user.id
        let message = await ajoutCompte({
            user_id,
            designation,
            description,
            montant,
            setErrors
        });

        setMessage(message);
    }

    return (
        <div className=" w-screen h-[calc(100vh-65px)] flex justify-center items-center overflow-hidden">

            {
                message === "" ?
                    (
                        <div className="h-auto w-[450px] rounded-md shadow-md bg-white p-8">
                            <FormTitle>Modifier un compte</FormTitle>

                            <form onSubmit={(e) => handleSubmit(e)} method="post">
                                <div className="">
                                    <Label htmlFor="designationId">Designation</Label>

                                    <Input
                                        type="text"
                                        id="designationId"
                                        name="designation"
                                        className="w-full"
                                        onChange={(e) => setDesignation(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="montantId">Montant</Label>
                                    <Input
                                        type="number"
                                        id="montantId"
                                        name="montant"
                                        className="w-full"
                                        onChange={(e) => setMontant(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="descriptionId">Description</Label>
                                    <TextArea className="w-full"
                                        name="description"
                                        id="descriptionId"
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="3"></TextArea>
                                </div>

                                <FormButton />
                            </form>
                        </div>
                    ) : (
                        <div className="h-auto w-[450px] rounded-md shadow-md text-green-600 text-center bg-white p-8">

                            {message}
                        </div>
                    )
            }
        </div>

    );
}

export default page;