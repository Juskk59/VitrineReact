import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Notebook ASUS VivoBook Go 15 ",
    price: "R$ 2.642,00",
    image: "https://m.media-amazon.com/images/I/71TK+vh6JIL._AC_SX679_.jpg",
    manufacturer: "Asus",
    specifications: "8GB RAM, AMD RYZEN 5 7520U, SSD 512 GB",
  },
  {
    id: 2,
    name: "Notebook Acer Nitro V15",
    price: "R$ 4.751,00",
    image: "https://http2.mlstatic.com/D_NQ_NP_841092-MLA79647749293_092024-O.webp",
    manufacturer: "Acer",
    specifications: "8GB RAM, I5-13420h,SSD 512GB",
  },
  {
    id: 3,
    name: "Notebook ASUS TUF Gaming F15",
    price: "R$ 4.674,00",
    image: "https://m.media-amazon.com/images/I/71zxWLbeYYL._AC_SX679_.jpg",
    manufacturer: "Asus",
    specifications: "8Gb RAM, I512500H,HD 512 GB",
  },
  {
    id: 4,
    name: "Apple notebook MacBook Air",
    price: "R$ 6.999,00",
    image: "https://m.media-amazon.com/images/I/41J9j6iVDvS._AC_SX679_.jpg",
    manufacturer: "Apple",
    specifications: "8Gb RAM, Processador M1 da Apple com CPU 8 core, HD 256 GB",
  },
  {
    id: 5,
    name: "Notebook Gamer Dell G15",
    price: "R$ 5.499,00",
    image: "https://m.media-amazon.com/images/I/615RNGUZaJS._AC_SX679_.jpg",
    manufacturer: "Dell",
    specifications: "8Gb RAM, i5-10500H, SSD 512 GB",
  },
  {
    id: 6,
    name: "Notebook Hp 256r G9",
    price: "R$ 2.889,00",
    image: "https://http2.mlstatic.com/D_NQ_NP_952830-MLA81958737235_012025-O.webp",
    manufacturer: "HP",
    specifications: "8Gb RAM, I512500H,HD 512 GB",
  },
];

function Home() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Ofertas</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-primary mt-auto"
                >
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  const fetchAddress = async () => {
    setError(null);
    setAddress(null);

    if (!cep) {
      setError("Por favor, insira um CEP válido.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado.");
      } else {
        setAddress(data);
      }
    } catch (err) {
      setError("Erro ao buscar o endereço. Tente novamente.");
    }
  };

  if (!product) {
    return (
      <div className="container my-5">
        <h1>Produto não encontrado.</h1>
        <Link to="/" className="btn btn-secondary mt-3">
          Voltar à página inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p><strong>Preço:</strong> {product.price}</p>
          <p><strong>Fabricante:</strong> {product.manufacturer}</p>
          <p>{product.specifications}</p>
          <div className="mt-4">
            <h5>Calcular Frete</h5>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Digite o CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <button className="btn btn-primary" onClick={fetchAddress}>
              Buscar
            </button>
            {error && <p className="text-danger mt-2">{error}</p>}
            {address && (
              <div className="mt-3">
                <p><strong>Rua:</strong> {address.logradouro}</p>
                <p><strong>Bairro:</strong> {address.bairro}</p>
                <p><strong>Cidade:</strong> {address.localidade}</p>
                <p><strong>Estado:</strong> {address.uf}</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <button className="btn btn-success btn-lg btn-block">Comprar</button>
          </div>
          <Link to="/" className="btn btn-secondary mt-3">
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
