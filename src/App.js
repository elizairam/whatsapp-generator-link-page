import { useState } from "react";
import happy from "./assets/img1.png";
import party from "./assets/img2.png";
import "./App.css";
import { formatMobileNumber, formatMessage } from "./utils/formatFunctions";

function App() {
  const [isClick, setIsClick] = useState(false);
  const [formData, setFormData] = useState({
    numberMobile: "",
    message: "",
    device: "api",
  });
  const [whatsappApi, setWhatsappApi] = useState("");

  const changeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setWhatsappApi(
      `https://${formData.device}.whatsapp.com/send?phone=${formatMobileNumber(
        formData.numberMobile
      )}&text=${formatMessage(formData.message)}`
    );
    setIsClick(!isClick);
  };

  const resetForm = () => {
    setIsClick(!isClick);
    setFormData({
      numberMobile: "",
      message: "",
      device: "api",
    });
  };

  return (
    <div className="App">
      <div className="Content">
        <div>
          <img
            src={!isClick ? happy : party}
            className="App-logo"
            alt="ilustração de caixa de diálogo como emoticon feliz"
          />
        </div>
        <div>
          <header>
            <h1>_.gerador de links para whatsapp</h1>
          </header>
          <main>
            {!isClick ? (
              <>
                <form data-testid="form-data">
                  <label htmlFor="numberMobile" className="form-label">
                    número do celular
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text" id="inputGroupPrepend">
                      +55
                    </span>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="1199999999"
                      aria-label=".form-control-lg example"
                      name="numberMobile"
                      value={formData.numberMobile}
                      onChange={changeHandler}
                      tabIndex={0}
                      maxLength={11}
                      minLength={10}
                      required
                    ></input>
                  </div>
                  <label htmlFor="message" className="form-label">
                    mensagem
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Olá, gostaria de entrar em contato..."
                    name="message"
                    value={formData.message}
                    onChange={changeHandler}
                    rows="3"
                    tabIndex={0}
                  ></textarea>
                  <br />
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="device"
                      id="web"
                      value="web"
                      onClick={changeHandler}
                    />
                    <label className="form-check-label" htmlFor="web">
                      web ou desktop
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="device"
                      id="api"
                      value="api"
                      onClick={changeHandler}
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="api">
                      mobile ou celular
                    </label>
                  </div>
                </form>

                <br />
                <button
                  id="buttonGenerateLink"
                  className="btn btn-success"
                  onClick={submitHandler}
                  style={{ backgroundColor: "#21CC79" }}
                  disabled={formData.numberMobile.length < 10}
                >
                  {"Gerar whatsapp link"}
                </button>
              </>
            ) : (
              <>
                {"Clique para copiar o link gerado"}
                <label htmlFor="copyArea" className="form-label"></label>
                <input
                  className="form-control form-control-lg"
                  type="text"
                  aria-label=".form-control-lg example"
                  name="mobileApi"
                  value={whatsappApi}
                  onClick={() => {
                    navigator.clipboard.writeText(whatsappApi);
                  }}
                  tabIndex={0}
                  readOnly
                ></input>

                <br />
                <button
                  id="buttonNewLink"
                  className="btn btn-info"
                  onClick={resetForm}
                >
                  {"Novo link"}
                </button>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
