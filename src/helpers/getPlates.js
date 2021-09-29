const getPlates = async () => {
  const url = "https://gestionpedidosmicroservice.herokuapp.com/api/plates/";
  const res = await fetch(url);
  const plates = await res.json();
  return plates;
};

export default getPlates;
