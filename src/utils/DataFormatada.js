export function dataAtualFormatada() {
  var data = new Date();
  var dia = data.getDate().toString();
  var diaF = dia.length === 1 ? "0" + dia : dia;
  var mes = (data.getMonth() + 1).toString();
  var mesF = mes.length === 1 ? "0" + mes : mes;
  var anoF = data.getFullYear();
  var hora = data.getHours();
  var minuto = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  var segundos =
    data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
  return (
    diaF +
    "/" +
    mesF +
    "/" +
    anoF +
    " às " +
    hora +
    ":" +
    minuto +
    ":" +
    segundos
  );
}
