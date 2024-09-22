import FormButton from "@/components/FormButton";
import FormTitle from "@/components/FormTitle";
import Input from "@/components/Input";
import InputError from "../InputError";
import Label from "@/components/Label";
import TextArea from "@/components/TextArea";
import { useAuth } from "@/hooks/auth";
import { useEnvies } from "@/hooks/envies";
import { useState, useEffect } from "react";


function EnvieForm(props) {
    const envie = props?.envie;
    const isCreate = !envie;
    const { user } = useAuth();

    const [designation, setDesignation] = useState();
    const [description, setDescription] = useState();
    const [cout, setCout] = useState();
    const [cout_rassemble, setCoutRassemble] = useState();

    const [message, setMessage] = useState("Nan");
    const [errors, setErrors] = useState([]);

    const { ajoutEnvie, modifEnvie } = useEnvies();

    useEffect(() => {
        if (!isCreate) {
            let descriptionInitial = document.querySelector("#descriptionId")?.defaultValue;
            setDescription(descriptionInitial);

            let coutInitial = document.querySelector("#coutId")?.defaultValue;
            setCout(coutInitial);

            let coutRassembleInitial = document.querySelector("#coutRassembleId")?.defaultValue;
            setCoutRassemble(coutRassembleInitial);

            let designationInitial = document.querySelector("#designationId")?.defaultValue;
            setDesignation(designationInitial);
        }
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        let resMessage = "Nan"
        if (isCreate) {
            let user_id = user.id
            resMessage = await ajoutEnvie({
                user_id,
                designation,
                description,
                cout,
                cout_rassemble,
                setErrors
            });
        } else {
            let envie_id = envie.id
            resMessage = await modifEnvie(envie_id, {
                designation,
                description,
                cout,
                cout_rassemble,
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
                                {isCreate ? ("Ajouter une envie") : ("Modifier une envie")}
                            </FormTitle>

                            <form onSubmit={(e) => handleSubmit(e)} method="post">
                                <div >
                                    <Label htmlFor="designationId">Designation</Label>

                                    <Input
                                        type="text"
                                        id="designationId"
                                        name="designation"
                                        defaultValue={envie?.designation}
                                        className="w-full"
                                        onChange={(e) => setDesignation(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.designation}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="coutId">Cout</Label>
                                    <Input
                                        type="number"
                                        id="coutId"
                                        name="cout"
                                        defaultValue={envie?.cout}
                                        className="w-full"
                                        onChange={(e) => setCout(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.cout}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="coutRassembleId">Cout rassemblé</Label>
                                    <Input
                                        type="number"
                                        id="coutRassembleId"
                                        name="cout_rassemble"
                                        defaultValue={envie?.cout_rassemble}
                                        className="w-full"
                                        onChange={(e) => setCoutRassemble(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.cout_rassemble}
                                        className="mt-2"
                                    />
                                </div>



                                <div>
                                    <Label htmlFor="descriptionId">Description</Label>
                                    <TextArea className="w-full"
                                        name="description"
                                        id="descriptionId"
                                        defaultValue={envie?.description}
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

export default EnvieForm;