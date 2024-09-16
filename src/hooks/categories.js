import useSWR from "swr"
import axios from "@/lib/axios";

export const useCategories = () => {

    //recuperer les comptes
    const { data: categories, isLoading, isValidating, error, mutate } = useSWR('/api/v1/categories', () =>
        axios
            .get('/api/v1/categories')
            .then(response => response.data.data)
            .catch(error => {
                if (error.response.status === 500) throw error
                return error
            }),
    )


    //ajout d'une categorie
    const ajoutCategorie = async ({ setErrors, ...props }) => {
        setErrors([])


        const message = axios.post('/api/v1/categories', props)
            .then((response) => {
                mutate();
                return response.data.message
            })
            .catch((error) => {
                setErrors(error.response.data.errors)
            })

        return message
    }

    //suppression d'une categorie
    const supprimerCategorie = async ({ setErrors, id }) => {
        setErrors([])

        axios
            .delete(`/api/v1/categories/${id}`)
            .then((response) => {
                mutate();
            })
            .catch(error => {
                setErrors(error)
            })

    }


    return {
        categories,
        ajoutCategorie,
        error,
        isLoading,
        isValidating,
        supprimerCategorie
    }
}



