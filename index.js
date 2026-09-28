import { getProducts, postProduct, deleteProduct } from "./gestion_productos.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(
    "ERROR - Formato incorrecto. Debes ingresar un método (ej. GET products)",
  );
  process.exit(1);
}

const metodo = args[0].toUpperCase();

switch (metodo) {
  case "GET": {
    if (args[1]) {
      try {
        const prod = await getProducts(args[1]);
        console.log(prod);
      } catch (error) {
        console.error("Error al obtener los productos:", error.message);
      }
    } else {
      console.log(
        "ERROR - Formato incorrecto. Falta especificar el recurso (ej. products o products/1)",
      );
    }
    break;
  }
  case "POST": {
    const [, comando, titulo, precio, categoria] = args;
    if (comando && titulo && precio && categoria) {
      if (comando.toLowerCase() !== "products") {
        console.log("ERROR - El recurso debe ser 'products'");
        break;
      }

      if (isNaN(Number(precio)) || Number(precio) < 0) {
        console.log("ERROR - El precio debe ser un número válido mayor o igual a 0");
        break;
      }

      try {
        const data = await postProduct(titulo, precio, categoria);
        console.log(data);
      } catch (error) {
        console.error("Error al subir el producto:", error.message);
      }
    } else {
      console.log(
        "ERROR - Formato incorrecto. Uso: POST products <titulo> <precio> <categoria>",
      );
    }
    break;
  }
  case "DELETE":{
    if (args[1]) {
      try {
        const res = await deleteProduct(args[1]);
        console.log(res);
      } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
      }
    } else {
      console.log(
        "ERROR - Formato incorrecto. Falta especificar el recurso (ej. products o products/1)",
      );
    }
    break;
  }
  default:
    console.log("ERROR - Comando incorrecto");
}
