export const BackButton = ({ handlerFunction }) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
      }}
    >
      <button
        onClick={handlerFunction}
        style={{
          backgroundColor: "transparent",
          width: "50px",
          height: "50px",
          border: "none",
          fontSize: "40px",
        }}
      >
        <i className="bx bx-arrow-back"></i>
      </button>
    </div>
  );
};
