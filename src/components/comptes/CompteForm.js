import FormButton from "@/components/FormButton";
import FormTitle from "@/components/FormTitle";
import Input from "@/components/Input";
import InputError from "../InputError";
import Label from "@/components/Label";
import TextArea from "@/components/TextArea";
import { useAuth } from "@/hooks/auth";
import { useComptes } from "@/hooks/comptes";
import { useState, useEffect } from "react";


function CompteForm(props) {
    const compte = props?.compte;
    const isCreate = !compte;
    const { user } = useAuth();
    const [designation, setDesignation] = useState();
    const [description, setDescription] = useState();
    const [montant, setMontant] = useState();

    const [message, setMessage] = useState("Nan");

    const [errors, setErrors] = useState([]);

    const { ajoutCompte, modifCompte } = useComptes();

    useEffect(() => {
        if (!isCreate) {
            let descriptionInitial = document.querySelector("#descriptionId")?.defaultValue;
            setDescription(descriptionInitial);

            let montantInitial = document.querySelector("#montantId")?.defaultValue;
            setMontant(montantInitial);

            let designationInitial = document.querySelector("#designationId")?.defaultValue;
            setDesignation(designationInitial);
        }
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        let resMessage = "Nan"
        if (isCreate) {
            let user_id = user.id
            resMessage = await ajoutCompte({
                user_id,
                designation,
                description,
                montant,
                setErrors
            });
        } else {
            let compte_id = compte.id
            resMessage = await modifCompte(compte_id, {
                designation,
                description,
                montant,
                setErrors
            });
        }

        if (errors.length === 0) {
            //Si aucune erreur
            setMessage(resMessage);
        } else {
            setMessage("Error");
        }
        console.log(message)

    }
    return (
        <div>

            {
                message?.includes("succés") === false ?
                    (
                        <div className="h-auto w-[450px] rounded-md shadow-md bg-white p-8">
                            <FormTitle>
                                {isCreate ? ("Ajouter un compte") : ("Modifier un compte")}
                            </FormTitle>

                            <form onSubmit={(e) => handleSubmit(e)} method="post">
                                <div >
                                    <Label htmlFor="designationId">Designation</Label>

                                    <Input
                                        type="text"
                                        id="designationId"
                                        name="designation"
                                        defaultValue={compte?.designation}
                                        className="w-full"
                                        onChange={(e) => setDesignation(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.designation}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="montantId">Montant</Label>
                                    <Input
                                        type="number"
                                        id="montantId"
                                        name="montant"
                                        defaultValue={compte?.montant}
                                        className="w-full"
                                        onChange={(e) => setMontant(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.montant}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="descriptionId">Description</Label>
                                    <TextArea className="w-full"
                                        name="description"
                                        id="descriptionId"
                                        defaultValue={compte?.description}
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
                    ) : (
                        <div className="h-auto w-[450px] rounded-md shadow-md text-green-600 text-center bg-white p-8">
                            {message}
                        </div>
                    )

            }

        </div>

    );
}

export default CompteForm;