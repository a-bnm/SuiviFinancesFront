import "@/styles/components/EditButton.css";

const EditButton = ({ handleClick }) => {
    return (
        <button className="w-28 h-10 p-2 m-2 rounded-xl shadow-sm   text-primary-100 border-2 border-primary-100 flex justify-center space-x-1 btnEdit" onClick={handleClick}  >
            <div className="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                </svg>
            </div>
            <p className="font-bold text-sm">Modifier</p>
        </button>
    )
}


export default EditButton;