import spinnerImg from "../../assets/images/loader.gif";

let Loader = () => {
  return (
    <>
      <div className="d-flex justify-content-center  ">
        <img
          src={spinnerImg}
          alt=""
          style={{ width: "250px", height: "130px", marginTop:"300px" }}
          classNamea="lign-middle"
        />
      </div>
    </>
  );
};

export default Loader;
