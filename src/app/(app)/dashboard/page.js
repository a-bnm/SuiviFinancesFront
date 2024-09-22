"use client";

import { useComptes } from '@/hooks/comptes';
import { useCategories } from '@/hooks/categories';
import { useEnvies } from '@/hooks/envies';
import { useAchats } from '@/hooks/achats';
import { useRentres } from "@/hooks/rentres";

import Loading from '../Loading';
import TrHead from "@/components/tables/TrHead";
import TrBody from "@/components/tables/TrBody";
import Th from "@/components/tables/Th";
import Table from '@/components/tables/Table';
import EditButton from '@/components/buttons/EditButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import NoInfo from '@/components/NoInfo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function page() {
    const { comptes, isLoading, isValidating, supprimerCompte } = useComptes();
    const { envies, supprimerEnvie } = useEnvies();
    const { categories, supprimerCategorie } = useCategories();
    const { achats, supprimerAchat } = useAchats();
    const { rentres, supprimerRentre } = useRentres();
    const [errors, setErrors] = useState([]);

    const router = useRouter();
    const handleDelete = (e, table, id) => {
        e.preventDefault();
        setErrors([]);
        let response = confirm("Voulez vous vraiment supprimer cet élément?");
        if (response) {
            switch (table) {
                case "compte":
                    supprimerCompte({ setErrors, id });
                    break;
                case "categorie":
                    supprimerCategorie({ setErrors, id });
                    break;
                case "envie":
                    supprimerEnvie({ setErrors, id });
                    break;
                case "achat":
                    supprimerAchat({ setErrors, id });
                    break;
                case "rentre":
                    supprimerRentre({ setErrors, id });
                    break;
                default:
                    supprimerCategorie({ setErrors, id });
                    break;
            }

        }
    }
    const handleEdit = (e, table, id) => {
        e.preventDefault();
        switch (table) {
            case "compte":
                router.push(`/admin/comptes/${id}`)
                break;

            case "envie":
                router.push(`/admin/envies/${id}`)
                break;
            case "achat":
                router.push(`/admin/achats/${id}`)
                break;
            case "rentre":
                router.push(`/admin/rentres/${id}`)
                break;
            default:
                router.push(`/admin/comptes/${id}`)
                break;
        }


    }

    useEffect(() => {
        if (errors.length > 0) {
            errors.map((error) => {
                alert(error);
            })

        }
    }, [errors]);

    return (
        <>
            {isLoading || isValidating ?
                (
                    <Loading />
                ) :
                (
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="grid grid-cols-3 overflow-hidden ">
                                <div className='col-span-1 my-4'>
                                    <div className=' p-4 bg-white shadow-md rounded-md'>
                                        {categories?.length > 0 ?
                                            (
                                                <Table title="Catégories">
                                                    <thead>
                                                        <TrHead>
                                                            <Th width="45%">Désignation</Th>
                                                            <Th width="45%">Description</Th>
                                                            <Th width="10%">Supprimer</Th>
                                                        </TrHead>
                                                    </thead>
                                                    <tbody>
                                                        {categories?.map((categorie) => {
                                                            return (
                                                                <TrBody key={categorie.id}>
                                                                    <td>{categorie.designation}</td>
                                                                    <td>{categorie.description}</td>
                                                                    <td>
                                                                        <DeleteButton handleClick={(e) => handleDelete(e, "categorie", categorie.id)} />
                                                                    </td>
                                                                </TrBody>
                                                            )
                                                        })
                                                        }
                                                    </tbody>
                                                </Table>

                                            ) : (
                                                <NoInfo />
                                            )

                                        }
                                    </div>
                                </div>
                                <div className='col-span-3 p-4 bg-white shadow-md rounded-md mb-4'>
                                    {comptes?.length > 0 ?
                                        (
                                            <Table title="Mes comptes">
                                                <thead>
                                                    <TrHead>
                                                        <Th width="20%">Compte</Th>
                                                        <Th width="15%">Montant</Th>
                                                        <Th width="55%">Description</Th>
                                                        <Th width="5%">Modifier</Th>
                                                        <Th width="5%">Supprimer</Th>
                                                    </TrHead>
                                                </thead>
                                                <tbody>
                                                    {comptes?.map((compte) => {
                                                        return (
                                                            <TrBody key={compte.id}>
                                                                <td>{compte.designation}</td>
                                                                <td>{compte.montant.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                                <td>{compte.description}</td>
                                                                <td>
                                                                    <EditButton handleClick={(e) => handleEdit(e, "compte", compte.id)} />
                                                                </td>
                                                                <td>
                                                                    <DeleteButton handleClick={(e) => handleDelete(e, "compte", compte.id)} />
                                                                </td>
                                                            </TrBody>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </Table>

                                        ) : (
                                            <NoInfo />
                                        )

                                    }
                                </div>
                                <div className='col-span-3 p-4 bg-white shadow-md rounded-md mb-4'>
                                    {achats?.length > 0 ?
                                        (
                                            <Table title="Mes achats">
                                                <thead>
                                                    <TrHead>
                                                        <Th width="20%">Compte</Th>
                                                        <Th width="15%">Categorie</Th>
                                                        <Th width="55%">Libellé</Th>
                                                        <Th width="55%">Montant</Th>
                                                        <Th width="5%">Modifier</Th>
                                                        <Th width="5%">Supprimer</Th>
                                                    </TrHead>
                                                </thead>
                                                <tbody>
                                                    {achats?.map((achat) => {
                                                        return (
                                                            <TrBody key={achat.id}>
                                                                <td>{achat.compte_id}</td>
                                                                <td>{achat.categorie_id}</td>
                                                                <td>{achat.libelle}</td>
                                                                <td>{achat.montant.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                                <td>
                                                                    <EditButton handleClick={(e) => handleEdit(e, "achat", achat.id)} />
                                                                </td>
                                                                <td>
                                                                    <DeleteButton handleClick={(e) => handleDelete(e, "achat", achat.id)} />
                                                                </td>
                                                            </TrBody>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </Table>

                                        ) : (
                                            <NoInfo />
                                        )

                                    }
                                </div>
                                <div className='col-span-3 p-4 bg-white shadow-md rounded-md mb-4'>
                                    {rentres?.length > 0 ?
                                        (
                                            <Table title="Mes rentrés">
                                                <thead>
                                                    <TrHead>
                                                        <Th width="10%">Compte</Th>
                                                        <Th width="40%">Source</Th>
                                                        <Th width="40%">Montant</Th>
                                                        <Th width="5%">Modifier</Th>
                                                        <Th width="5%">Supprimer</Th>
                                                    </TrHead>
                                                </thead>
                                                <tbody>
                                                    {rentres?.map((rentre) => {
                                                        return (
                                                            <TrBody key={rentre.id}>
                                                                <td>{rentre.compte_id}</td>
                                                                <td>{rentre.source}</td>
                                                                <td>{rentre.montant.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                                <td>
                                                                    <EditButton handleClick={(e) => handleEdit(e, "rentre", rentre.id)} />
                                                                </td>
                                                                <td>
                                                                    <DeleteButton handleClick={(e) => handleDelete(e, "rentre", rentre.id)} />
                                                                </td>
                                                            </TrBody>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </Table>

                                        ) : (
                                            <NoInfo />
                                        )

                                    }
                                </div>

                                <div className='col-span-3 p-4 bg-white shadow-md rounded-md'>
                                    {envies?.length > 0 ?
                                        (
                                            <Table title="Mes envies">
                                                <thead>
                                                    <TrHead>
                                                        <Th width="20%">Envie</Th>
                                                        <Th width="15%">Cout</Th>
                                                        <Th width="15%">Cout rassemblé</Th>
                                                        <Th width="15%">Cout restant</Th>
                                                        <Th width="55%">Description</Th>
                                                        <Th width="5%">Modifier</Th>
                                                        <Th width="5%">Supprimer</Th>
                                                    </TrHead>
                                                </thead>
                                                <tbody>
                                                    {envies?.map((envie) => {
                                                        return (
                                                            <TrBody key={envie.id}>
                                                                <td>{envie.designation}</td>
                                                                <td>{envie.cout.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                                <td>{envie.cout_rassemble.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                                <td>{envie.cout_restant.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                                                <td>{envie.description}</td>
                                                                <td>
                                                                    <EditButton handleClick={(e) => handleEdit(e, "envie", envie.id)} />
                                                                </td>
                                                                <td>
                                                                    <DeleteButton handleClick={(e) => handleDelete(e, "envie", envie.id)} />
                                                                </td>
                                                            </TrBody>
                                                        )
                                                    })
                                                    }
                                                </tbody>
                                            </Table>

                                        ) : (
                                            <NoInfo />
                                        )

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default page
