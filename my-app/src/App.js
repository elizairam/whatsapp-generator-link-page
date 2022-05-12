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
    console.log(formData);
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
      <div className="App-header">
        <div>
          <img src={!isClick ? happy : party} className="App-logo" alt="logo" />
        </div>
        <div>
          <header>
            <h1>_.gerador de links para whatsapp</h1>
          </header>
          {!isClick ? (
            <>
              <form>
                <label for="numberMobile" class="form-label">
                  número do celular
                </label>
                <div class="input-group has-validation">
                  <span class="input-group-text" id="inputGroupPrepend">
                    +55
                  </span>
                  <input
                    class="form-control form-control-lg"
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
                <label for="message" class="form-label">
                  mensagem
                </label>
                <textarea
                  class="form-control"
                  placeholder="Olá, gostaria de entrar em contato..."
                  name="message"
                  value={formData.message}
                  onChange={changeHandler}
                  rows="3"
                  tabIndex={0}
                ></textarea>
                <br />
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="device"
                    id="web"
                    value="web"
                    onClick={changeHandler}
                  />
                  <label class="form-check-label" for="web">
                    web ou desktop
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="device"
                    id="api"
                    value="api"
                    onClick={changeHandler}
                  />
                  <label class="form-check-label" for="api">
                    mobile ou celular
                  </label>
                </div>
              </form>

              <br />
              <button
                class="btn btn-success"
                onClick={submitHandler}
                style={{ backgroundColor: "#21CC79" }}
                disabled={formData.numberMobile.length < 10 ? true : false}
              >
                {"Gerar whatsapp link"}
              </button>
            </>
          ) : (
            <>
              {"Clique para copiar o link gerado"}
              <label for="copyArea" class="form-label"></label>
              <input
                class="form-control form-control-lg"
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
              <button class="btn btn-info" onClick={resetForm}>
                {"Novo link"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
