import useSWR from "swr"
import axios from "@/lib/axios";

export const useEnvies = () => {

    //recuperer les envies
    const { data: envies, isLoading, isValidating, error, mutate } = useSWR('/api/v1/envies', () =>
        axios
            .get('/api/v1/envies')
            .then(response => response.data.data)
            .catch(error => {

                if (error.response.status === 500) throw error
                return error
            }),
    )

    //recuperer une envie
    const getEnvie = async (id) => {
        let envie = await axios
            .get(`/api/v1/envies/${id}`)
            .then(response => {
                return response.data.data
            })
            .catch(error => {
                if (error.response.status === 500) throw error
                return error
            })

        return envie
    }

    //ajout d'un Envie
    const ajoutEnvie = async ({ setErrors, ...props }) => {
        setErrors([])

        const message = axios.post('/api/v1/envies', props)
            .then((response) => {
                mutate();
                return response.data.message
            })
            .catch((error) => {
                setErrors(error.response.data.errors)
                console.log(error)
            })

        return message
    }

    //modification d'un Envie
    const modifEnvie = async (id, { setErrors, ...props }) => {
        setErrors([])

        const message = axios
            .patch(`/api/v1/envies/${id}`, props)
            .then((response) => {
                return response.data.message
            })
            .catch((error) => {
                console.log(error)
                setErrors(error.response.data.errors)
            })

        return message
    }

    //suppression d'un envie
    const supprimerEnvie = async ({ setErrors, id }) => {
        setErrors([])

        axios
            .delete(`/api/v1/envies/${id}`)
            .then((response) => {
                mutate();
            })
            .catch(error => {
                setErrors(error)
            })

    }


    return {
        envies,
        getEnvie,
        error,
        isLoading,
        isValidating,
        ajoutEnvie,
        modifEnvie,
        supprimerEnvie
    }
}



