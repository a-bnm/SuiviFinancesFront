const TextArea = ({ className, ...props }) => (
    <textarea className={`${className} rounded-md shadow-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}  {...props} />
)

export default TextArea;