import useSWR from "swr"
import axios from "@/lib/axios";

export const useComptes = () => {

    //recuperer les comptes
    const { data: comptes, isLoading, error, mutate } = useSWR('/api/v1/comptes', () =>
        axios
            .get('/api/v1/comptes')
            .then(response => response.data.data)
            .catch(error => {
                if (error.response.status === 500) throw error
                return error
            }),
    )


    //ajout d'un compte
    const ajoutCompte = async ({ setErrors, ...props }) => {
        setErrors([])


        const message = axios.post('/api/v1/comptes', props)
            .then((response) => {
                mutate();
                return response.data.message
            })
            .catch((error) => {
                console.log(error.response.data)
            })

        return message
    }

    //modification d'un compte
    const editCompte = async ({ setErrors, ...props }) => {
        setErrors([])


        const message = axios
            .patch('/api/v1/comptes', props)
            .then((response) => {
                mutate();
                return response.data.message
            })
            .catch((error) => {
                console.log(error.response.data)
            })

        return message
    }

    //modification d'un compte
    const modifCompte = async ({ setErrors, ...props }) => {
        setErrors([])


        const message = axios
            .patch('/api/v1/comptes', props)
            .then((response) => {
                mutate();
                return response.data.message
            })
            .catch((error) => {
                console.log(error.response.data)
            })

        return message
    }

    //suppression d'un compte
    const supprimerCompte = async ({ setErrors, id }) => {
        setErrors([])

        axios
            .delete(`/api/v1/comptes/${id}`)
            .then((response) => {
                mutate();
            })
            .catch(error => {
                setErrors(error)
            })

    }


    return {
        comptes,
        error,
        isLoading,
        ajoutCompte,
        modifCompte,
        supprimerCompte
    }
}



