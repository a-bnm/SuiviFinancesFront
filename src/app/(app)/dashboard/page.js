"use client";

import { useComptes } from '@/hooks/comptes'
import { useCategories } from '@/hooks/categories'
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
    const { categories, supprimerCategorie } = useCategories();
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
                default:
                    supprimerCategorie({ setErrors, id });
                    break;
            }

        }
    }
    const handleEdit = (e, id) => {
        e.preventDefault();
        router.push(`/admin/comptes/${id}`)

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
                                <div className='col-span-3 p-4 bg-white shadow-md rounded-md'>
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
                                                                    <EditButton handleClick={(e) => handleEdit(e, compte.id)} />
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
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default page
