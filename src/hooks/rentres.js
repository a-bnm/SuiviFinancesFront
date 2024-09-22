import useSWR from "swr"
import axios from "@/lib/axios";

export const useRentres = () => {

    //recuperer les rentres
    const { data: rentres, isLoading, isValidating, error, mutate } = useSWR('/api/v1/rentres', () =>
        axios
            .get('/api/v1/rentres')
            .then(response => response.data.data)
            .catch(error => {
                if (error.response.status === 500) throw error
                return error
            }),
    )

    //recuperer un rentres
    const getRentre = async (id) => {
        let rentre = await axios
            .get(`/api/v1/rentres/${id}`)
            .then(response => {
                return response.data.data
            })
            .catch(error => {

                if (error.response.status === 500) throw error
                return error
            })

        return rentre
    }

    //ajout d'un rentre
    const ajoutRentre = async ({ setErrors, ...props }) => {
        setErrors([])


        const message = axios.post('/api/v1/rentres', props)
            .then((response) => {
                mutate();
                return response.data.message
            })
            .catch((error) => {

                setErrors(error.response.data.errors)
            })

        return message
    }

    //modification d'un rentre
    const modifRentre = async (id, { setErrors, ...props }) => {
        setErrors([])


        const message = axios
            .patch(`/api/v1/rentres/${id}`, props)
            .then((response) => {
                return response.data.message
            })
            .catch((error) => {
                setErrors(error.response.data.errors)
                console.log(error)
            })

        return message
    }

    //suppression d'un rentre
    const supprimerRentre = async ({ setErrors, id }) => {
        setErrors([])

        axios
            .delete(`/api/v1/rentres/${id}`)
            .then((response) => {
                mutate();
            })
            .catch(error => {
                setErrors(error)
            })

    }


    return {
        rentres,
        getRentre,
        error,
        isLoading,
        isValidating,
        ajoutRentre,
        modifRentre,
        supprimerRentre
    }
}



