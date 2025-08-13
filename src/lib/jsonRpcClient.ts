// common RPC call utility
export async function callRpc<T = any>(
  method: string,
  params?: unknown
): Promise<T> {
  const res = await fetch("/api/rpc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method,
      params,
      id: Date.now(),
    }),
  });

  const json = await res.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  return json.result;
}

// ✅ Signup user
export const signupUser = async (params: {
  email: string;
  password: string;
  fullName: string;
}) => {
  return await callRpc("auth.signupUser", params);
};

// ✅ Signup kitchen admin
export const signupKitchenAdmin = async (params: {
  email: string;
  password: string;
  ownerName: string;
  kitchenName: string;
}) => {
  return await callRpc("auth.signupKitchenAdmin", params);
};

export const loginKitchenAdmin = async (params: {
  email: string;
  password: string;
}) => {
  return await callRpc("auth.loginKitchenAdmin", params);
};

export const loginUser = async (params: {
  email: string;
  password: string;
}) => {
  return await callRpc("auth.loginUser", params);
};

export const logout = async (params: {
  token?: string;
  mode: "user" | "kitchen";
}) => {
  return await callRpc("auth.logout", params);
};

// ✅ Menu: Create dish
export const createMenu = async (params: {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  discount?: number;
  isAvailable?: boolean;
}) => {
  return await callRpc("menu.create", params);
};

// ✅ Menu: Update dish
export const updateMenu = async (params: {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  discount?: number;
  isAvailable?: boolean;
}) => {
  return await callRpc("menu.update", params);
};

// ✅ Menu: Delete dish
export const deleteMenu = async (params: { id: string }) => {
  return await callRpc("menu.delete", params);
};
