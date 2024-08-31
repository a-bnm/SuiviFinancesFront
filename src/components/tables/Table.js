const Table = ({ className, title, children }) => {
    return (
        <table className={` w-full ${className}`} >
            <caption className="text-start text-black font-bold text-2xl mb-4">{title} </caption>
            {children}
        </table>
    )
}
export default Table