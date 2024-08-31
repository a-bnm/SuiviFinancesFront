"use client";

import { useComptes } from '@/hooks/comptes'
import Loading from '../Loading';
import TrHead from "@/components/tables/TrHead";
import TrBody from "@/components/tables/TrBody";
import Th from "@/components/tables/Th";
import Table from '@/components/tables/Table';
import EditButton from '@/components/buttons/EditButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import NoInfo from '@/components/NoInfo';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function page() {
    const router = useRouter();
    const { comptes, isLoading, supprimerCompte } = useComptes();
    const [errors, setErrors] = useState([]);

    const handleDelete = (e, id) => {
        e.preventDefault();
        setErrors([]);
        let response = confirm("Voulez vous vraiment supprimer cet élément?");
        if (response) {
            supprimerCompte({ setErrors, id });
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
            {isLoading && comptes === undefined ?
                (
                    <Loading />
                ) : (
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="grid grid-cols-3 overflow-hidden ">
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
                                                                    <DeleteButton handleClick={(e) => handleDelete(e, compte.id)} />
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
