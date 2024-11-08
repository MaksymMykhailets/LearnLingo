import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
      }}
    >
      <ClipLoader color="grey" loading={true} size={40} />
    </div>
  );
};

export default Loader;
