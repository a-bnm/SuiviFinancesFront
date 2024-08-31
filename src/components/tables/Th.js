
const Th = ({ className, children, ...props }) => {
    return (
        <th className={`p-2 ${className}`}  {...props}>
            {children}
        </th>
    )
}


export default Th;