"use client"

import FormButton from "@/components/FormButton";
import FormTitle from "@/components/FormTitle";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Label from "@/components/Label";
import TextArea from "@/components/TextArea";
import { useAuth } from "@/hooks/auth";
import { useCategories } from "@/hooks/categories";
import { useState } from "react";


function page() {

    const [designation, setDesignation] = useState();
    const [description, setDescription] = useState();
    const [message, setMessage] = useState("Nan");
    const [errors, setErrors] = useState([]);

    const { ajoutCategorie } = useCategories();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let resMessage = await ajoutCategorie({
            designation,
            description,
            setErrors
        });


        if (errors.length === 0) {
            //Si aucune erreur
            setMessage(resMessage);
        }
    }

    return (
        <div className=" w-screen h-[calc(100vh-65px)] flex justify-center items-center overflow-hidden">
            {
                message?.includes("succés") ?
                    (
                        <div className="h-auto w-[450px] rounded-md shadow-md text-primary-75 text-center bg-white p-8">
                            {message}
                        </div>
                    ) : (
                        <div className="h-auto w-[450px] rounded-md shadow-md bg-white p-8">
                            <FormTitle>Ajouter une categorie</FormTitle>

                            <form onSubmit={(e) => handleSubmit(e)} method="post">
                                <div >
                                    <Label htmlFor="designationId">Designation</Label>

                                    <Input
                                        type="text"
                                        id="designationId"
                                        name="designation"
                                        className="w-full"
                                        onChange={(e) => setDesignation(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.designation}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="descriptionId">Description</Label>
                                    <TextArea className="w-full"
                                        name="description"
                                        id="descriptionId"
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="3" />
                                    <InputError
                                        messages={errors.description}
                                        className="mt-2"
                                    />
                                </div>
                                <FormButton />
                            </form>
                        </div>
                    )
            }

        </div>

    );
}

export default page;