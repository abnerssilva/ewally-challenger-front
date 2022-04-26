<template>
  <main class="boletos">
    <h4 style="text-align: center">
      Digite ou cole aqui a Linha Digitável do seu boleto:
    </h4>
    <div style="text-align: center">
      <input type="text" class="input is-rounded" v-model="digitableLine"/>
    </div>
    <button class="button is-normal is-link is-responsive" @click="getData()">
      Enviar
    </button>
    <hr style="margin-bottom: 10px;"/>
    <span style="margin-left: 2%;">Dados do Boleto:</span>
    <div class="gray">
      <p>{{ bankSlip.type }}</p>
      <p>{{ bankSlip.amount }}</p>
      <p>{{ bankSlip.expirationDate }}</p>
      <p id="barcode">{{ bankSlip.barcode }}</p>
    </div>

  </main>
</template>


<script>
import * as apiService from "@/api/services/apiService";

export default {
  methods: {
    getData() {
      if (this.digitableLine === "") {
        this.bankSlip.amount = "";
        this.bankSlip.type = "";
        this.bankSlip.expirationDate = "";
        this.bankSlip.barcode = "";
        setTimeout(() => {
          alert(
            "Você deve informar uma linha digitável válida antes de clicar em enviar."
          );
        }, 10);
      } else {
        apiService
          .getBankSlip(this.digitableLine.trim())
          .then((res) => {
            this.bankSlip.amount = `Valor: R$ ${res.data.amount.replace(
              ".",
              ","
            )}`;

            if (res.data.type === "Bank Slip") {
              this.bankSlip.type = "Tipo: Boleto Bancário.";
            } else {
              this.bankSlip.type = "Tipo: Conta de Consumo.";
            }

            if(res.data.expirationDate) {
              const americanDate = res.data.expirationDate;
              const splitedAmericanDate = americanDate.split("-");
              const brazilianDate = splitedAmericanDate
                .reverse()
                .join("-")
                .replace("-", "/")
                .replace("-", "/");

              this.bankSlip.expirationDate = `Vencimento: ${brazilianDate}`;
            } else {
              this.bankSlip.expirationDate = '';
            }
            
            setTimeout(() => {
              this.bankSlip.barcode = res.data.barcode;
            }, 10);
          })
          .catch((e) => {
            this.digitableLine = "";
            this.bankSlip.amount = "";
            this.bankSlip.type = "";
            this.bankSlip.expirationDate = "";
            this.bankSlip.barcode = "";
            setTimeout(() => {
              alert(e.response.data.message);
            }, 20);
          });
      }
    },
  },
  data() {
    return {
      digitableLine: "",
      bankSlip: {
        amount: "",
        type: "",
        expirationDate: "",
        barcode: "",
      },
    };
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Barcode";
  src: url("../assets/fonts/c39hrp48dhtt.ttf") format("truetype");
}
#barcode {
  font-family: "Barcode";
  font-size: 3rem;
}
.input {
  width: 40%;
}
.button {
  display: block;
  width: 30%;
  margin-top: 10px;
  margin-left: 35.5%;
  justify-content: center;
}
.gray {
  background-color: rgb(234, 234, 234);
}
p {
  margin-left: 5%;
}
</style>