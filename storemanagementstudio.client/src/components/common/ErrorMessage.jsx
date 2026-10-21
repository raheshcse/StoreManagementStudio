const ErrorMessage = ({ message }) => {
    return (
        <div style={{ padding: "10px", color: "red" }}>
            <p>{message || "Something went wrong"}</p>
        </div>
    );
};

export default ErrorMessage;
