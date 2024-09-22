import FormButton from "@/components/FormButton";
import FormTitle from "@/components/FormTitle";
import Input from "@/components/Input";
import InputError from "../InputError";
import Label from "@/components/Label";
import TextArea from "@/components/TextArea";
import { useAuth } from "@/hooks/auth";
import { useAchats } from "@/hooks/achats";
import { useState, useEffect } from "react";
import { useCategories } from "@/hooks/categories";
import { useComptes } from "@/hooks/comptes";


function AchatForm(props) {
    const achat = props?.achat;
    const isCreate = !achat;


    const [categorie_id, setCategorieId] = useState();
    const [compte_id, setCompteId] = useState();
    const [montant, setMontant] = useState();
    const [libelle, setLibelle] = useState();

    const [message, setMessage] = useState("Nan");
    const [errors, setErrors] = useState([]);

    const { ajoutAchat, modifAchat } = useAchats();
    const { categories } = useCategories();
    const { comptes } = useComptes();

    useEffect(() => {
        if (!isCreate) {
            let categorieInitial = document.querySelector("#categorieId")?.value;
            setCategorieId(categorieInitial);

            let compteInitial = document.querySelector("#compteId")?.value;
            setCompteId(compteInitial);

            let montantInitial = document.querySelector("#montantId")?.defaultValue;
            setMontant(montantInitial);

            let libelleInitial = document.querySelector("#libelleId")?.defaultValue;
            setLibelle(libelleInitial);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let resMessage = "Nan"
        if (isCreate) {

            resMessage = await ajoutAchat({
                compte_id,
                categorie_id,
                libelle,
                montant,
                setErrors
            });
        } else {
            let achat_id = achat.id
            resMessage = await modifAchat(achat_id, {
                compte_id,
                categorie_id,
                libelle,
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
                                {isCreate ? ("Ajouter une achat") : ("Modifier une achat")}
                            </FormTitle>

                            <form onSubmit={(e) => handleSubmit(e)} method="post">
                                <div >
                                    <Label htmlFor="libelleId">Libellé</Label>
                                    <Input
                                        type="text"
                                        id="libelleId"
                                        name="libelle"
                                        defaultValue={achat?.libelle}
                                        className="w-full"
                                        onChange={(e) => setLibelle(e.target.value)}
                                    />
                                    <InputError
                                        messages={errors.libelle}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="montantId">Montant</Label>
                                    <Input
                                        type="number"
                                        id="montantId"
                                        name="montant"
                                        defaultValue={achat?.montant}
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
                                        id="compteId" name="compte_id" value={achat?.compte_id} onChange={(e) => setCompteId(e.target.value)}>
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
                                <div>
                                    <Label htmlFor="categorieId">Catégorie</Label>
                                    <select className="rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
                                        id="categorieId" name="categorie_id"
                                        value={achat?.categorie_id}
                                        onChange={(e) => setCategorieId(e.target.value)}>
                                        <option >--Choisir une catégorie--</option>
                                        {
                                            categories?.map((categorie) => {

                                                return (
                                                    <option value={categorie.id} key={categorie.id}>
                                                        {categorie.designation}
                                                    </option>
                                                )


                                            })
                                        }
                                    </select>

                                    <InputError
                                        messages={errors.categorie_id}
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

export default AchatForm;