import useSWR from "swr"
import axios from "@/lib/axios";

export const useAchats = () => {

    //recuperer les achats
    const { data: achats, isLoading, isValidating, error, mutate } = useSWR('/api/v1/achats', () =>
        axios
            .get('/api/v1/achats')
            .then(response => response.data.data)
            .catch(error => {
                if (error.response.status === 500) throw error
                return error
            }),
    )

    //recuperer un achats
    const getAchat = async (id) => {
        let achat = await axios
            .get(`/api/v1/achats/${id}`)
            .then(response => {
                return response.data.data
            })
            .catch(error => {

                if (error.response.status === 500) throw error
                return error
            })

        return achat
    }

    //ajout d'un achat
    const ajoutAchat = async ({ setErrors, ...props }) => {
        setErrors([])


        const message = axios.post('/api/v1/achats', props)
            .then((response) => {
                mutate();
                return response.data.message
            })
            .catch((error) => {

                setErrors(error.response.data.errors)
            })

        return message
    }

    //modification d'un achat
    const modifAchat = async (id, { setErrors, ...props }) => {
        setErrors([])


        const message = axios
            .patch(`/api/v1/achats/${id}`, props)
            .then((response) => {
                return response.data.message
            })
            .catch((error) => {
                setErrors(error.response.data.errors)
                console.log(error)
            })

        return message
    }

    //suppression d'un achat
    const supprimerAchat = async ({ setErrors, id }) => {
        setErrors([])

        axios
            .delete(`/api/v1/achats/${id}`)
            .then((response) => {
                mutate();
            })
            .catch(error => {
                setErrors(error)
            })

    }


    return {
        achats,
        getAchat,
        error,
        isLoading,
        isValidating,
        ajoutAchat,
        modifAchat,
        supprimerAchat
    }
}



