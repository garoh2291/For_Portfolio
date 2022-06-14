import "./styles.css";

export const PreLoader = () => {
  return (
    <div className="forload">
      <div className="loader-bg">
        <h3>Loading...</h3>
        <div className="loader">
          <span></span>
        </div>
      </div>
    </div>
  );
};
