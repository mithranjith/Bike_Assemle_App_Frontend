const BACKEND_URL = "http://localhost:3001";

// ---------------- User --------------- //

export const CreateUser = async (body: object): Promise<any> => {
  let result: any, errResponse: any;
  try {
    result = await fetch(BACKEND_URL + "/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e: any) {
    throw new Error(e.message);
  }

  if (result.status === 200) {
    return await result.json();
  } else {
    let message = await result.json();
    throw new Error(message.error);
  }
};

export const GetUser = async (token: string): Promise<any> => {
  let result;
  try {
    result = await fetch(BACKEND_URL + "/v1/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }

  if (result.status === 200) {
    return await result.json();
  } else {
    let message = await result.json();
    throw new Error(message.error);
  }
};

export const Signin = async (body: any): Promise<any> => {
  let result: any, errResponse: any;
  try {
    result = await fetch(BACKEND_URL + "/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error: any) {
    console.log("Error on login api...", error);

    throw new Error(error);
  }

  if (result.status === 200) {
    return await result.json();
  } else {
    let message = await result.json();
    console.log("err......", message);
    throw new Error(message.error);
  }
};

export const GetUsers = async (body: object): Promise<any> => {
  let result;
  let token = localStorage.getItem("token") || "";
  try {
    result = await fetch(BACKEND_URL + "/v1/users?page=1&limit=10", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });
  } catch (e: any) {
    throw new Error(e.message);
  }

  if (result.status === 200) {
    return await result.json();
  } else {
    let message = await result.json();
    throw new Error(message.error);
  }
};

// ------------------- Bikes ------------------- //

export const GetBikes = async (): Promise<any> => {
  let result;

  try {
    result = await fetch(BACKEND_URL + "/v1/bikes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }

  if (result.status === 200) {
    return await result.json();
  } else {
    let message = await result.json();
    throw new Error(message.error);
  }
};

// ------------------ Admin ------------------- //

export const AdminSignin = async (body: any): Promise<any> => {
  let result: any, errResponse: any;
  try {
    result = await fetch(BACKEND_URL + "/v1/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error: any) {
    console.log("Error on login api...", error);

    throw new Error(error);
  }

  if (result.status === 200) {
    return await result.json();
  } else {
    let message = await result.json();
    console.log("err......", message);
    throw new Error(message.error);
  }
};

export const GetAssembledDataReports = async (body: any): Promise<any> => {
  let result;
  let token = localStorage.getItem("token") || "";

  try {
    result = await fetch(BACKEND_URL + "/v1/assembledData/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(body),
    });
  } catch (e: any) {
    throw new Error(e.message);
  }

  if (result.status === 200) {
    return await result.json();
  } else {
    let message = await result.json();
    throw new Error(message.error);
  }
};
