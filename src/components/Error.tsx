function Error(error: any) {
  return (
    <div className="error">
      <p>Error occured, please try again later</p>
      <p>{error.message}</p>
    </div>
  );
}

export default Error;
