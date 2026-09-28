const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(command) {
  try {
    const response = await fetch(`${BASE_URL}/${command}`);
    if (!response.ok) {
      throw new Error(`Error en la petición`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postProduct(titulo, precio, categoria) {
  try {
    const product = {
      title: titulo,
      price: Number(precio),
      category: categoria,
    };
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(
        `No se ha podido subir el producto (Status: ${response.status})`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(command) {
  try {
    const response = await fetch(`${BASE_URL}/${command}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error en la petición");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
