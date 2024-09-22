import FormButton from "@/components/FormButton";
import FormTitle from "@/components/FormTitle";
import Input from "@/components/Input";
import InputError from "../InputError";
import Label from "@/components/Label";
import { useRentres } from "@/hooks/rentres";
import { useState, useEffect } from "react";
import { useComptes } from "@/hooks/comptes";


function RentreForm(props) {
    const rentre = props?.rentre;
    const isCreate = !rentre;


    const [compte_id, setCompteId] = useState();
    const [montant, setMontant] = useState();
    const [source, setSource] = useState();

    const [message, setMessage] = useState("Nan");
    const [errors, setErrors] = useState([]);

    const { ajoutRentre, modifRentre } = useRentres();
    const { comptes } = useComptes();

    useEffect(() => {
        if (!isCreate) {
            let sourceInitial = document.querySelector("#sourceId")?.defaultValue;
            setSource(sourceInitial);

            let compteInitial = document.querySelector("#compteId")?.value;
            setCompteId(compteInitial);

            let montantInitial = document.querySelector("#montantId")?.defaultValue;
            setMontant(montantInitial);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let resMessage = "Nan"
        if (isCreate) {

            resMessage = await ajoutRentre({
                compte_id,
                source,
                montant,
                setErrors
            });
        } else {
            let rentre_id = rentre.id
            resMessage = await modifRentre(rentre_id, {
                compte_id,
                source,
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
    }
    return (
        <div>

            {
                message?.includes("succés") === false ?
                    (
                        <div className="h-auto w-[450px] rounded-md shadow-md bg-white p-8">
                            <FormTitle>
                                {isCreate ? ("Ajouter une rentrée") : ("Modifier une rentrée")}
                            </FormTitle>

                            <form onSubmit={(e) => handleSubmit(e)} method="post">
                                <div >
                                    <Label htmlFor="sourceId">Source</Label>
                                    <Input
                                        type="text"
                                        id="sourceId"
                                        name="source"
                                        defaultValue={rentre?.source}
                                        className="w-full"
                                        onChange={(e) => setSource(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.source}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="montantId">Montant</Label>
                                    <Input
                                        type="number"
                                        id="montantId"
                                        name="montant"
                                        defaultValue={rentre?.montant}
                                        className="w-full"
                                        onChange={(e) => setMontant(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.montant}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="compteId">Compte</Label>
                                    <select className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                                        id="compteId" name="compte_id" value={rentre?.compte_id} onChange={(e) => setCompteId(e.target.value)}>
                                        <option >--Choisir le compte--</option>
                                        {
                                            comptes?.map((compte) => {

                                                return (
                                                    <option value={compte.id} key={compte.id} >
                                                        {compte.designation}
                                                    </option>
                                                )

                                            })
                                        }
                                    </select>

                                    <InputError
                                        messages={errors.compte_id}
                                        className="mt-2"
                                    />
                                </div>

                                <FormButton />
                            </form>
                        </div >
                    ) : (
                        <div className="h-auto w-[450px] rounded-md shadow-md text-green-600 text-center bg-white p-8">
                            {message}
                        </div>
                    )

            }

        </div >

    );
}

export default RentreForm;