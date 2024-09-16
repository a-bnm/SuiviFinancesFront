import "@/styles/components/DeleteButton.css";

const DeleteButton = ({ handleClick }) => {
    return (
        <button className="w-28 h-10 p-2 m-2 rounded-xl shadow-sm   text-red  border-2 border-red flex justify-center space-x-1 btnDelete" onClick={handleClick}  >
            <div className="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                </svg>
            </div>
            <p className="font-bold text-sm">Supprimer</p>
        </button>
    )
}


export default DeleteButton;