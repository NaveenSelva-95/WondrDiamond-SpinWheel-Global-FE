const BACKEND_URL = import.meta.env.VITE_API_ENDPOINT;

export const createUser = async (data) => {
  const { Name, Mobile, Email, StoreId, TimeSlot, Dateslot } = data;
  console.log("dataa", data);
  const formdata = new FormData();
  formdata.append("Name", Name);
  formdata.append("Phone", "+" + Mobile);
  formdata.append("Email", Email);
  formdata.append("ProcessId", 8);
  StoreId !== undefined && formdata.append("StoreId", StoreId);
  Dateslot !== undefined && formdata.append("Dateslot", Dateslot);
  TimeSlot !== undefined && formdata.append("TimeSlot", TimeSlot);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/CreateUSCustomer`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("Key", data.CustomerDetailKey);
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    // You can handle errors here, e.g., return an error message or rethrow the error.
    return null;
  }
};

export const getQuestion = async () => {
  // const formdata = new FormData();
  // formdata.append("Name", Name);
  // formdata.append("Phone", "+" + Mobile);
  // formdata.append("Email", Email);
  // // formdata.append("BranchCode", localStorage.getItem("Branch"));
  // formdata.append("StoreId", "aj");

  const requestOptions = {
    method: "POST",
    // body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/GetQA`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      // localStorage.setItem("Key", data.CustomerDetailKey);
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    // You can handle errors here, e.g., return an error message or rethrow the error.
    return null;
  }
};

export const getGlobalList = async () => {
  const formdata = new FormData();
  formdata.append("Status", 1);
  // formdata.append("Phone", "+" + Mobile);
  // formdata.append("Email", Email);
  // // formdata.append("BranchCode", localStorage.getItem("Branch"));
  // formdata.append("StoreId", "aj");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/GlobalList`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      // localStorage.setItem("Key", data.CustomerDetailKey);
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    // You can handle errors here, e.g., return an error message or rethrow the error.
    return null;
  }
};

export const getGlobalTimeSlot = async (storeId, dateSlot) => {
  const formdata = new FormData();
  formdata.append("StoreId", storeId);
  formdata.append("Dateslot", dateSlot);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/GlobalTimeslot`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      // localStorage.setItem("Key", data.CustomerDetailKey);
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    // You can handle errors here, e.g., return an error message or rethrow the error.
    return null;
  }
};
export const checkCustomer = async (data) => {
  const { Mobile, Email } = data;
  const formdata = new FormData();
  formdata.append("Phone", "+" + Mobile);
  formdata.append("Email", Email);
  // formdata.append("StoreDetailKey", "aj");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/IsCustomer`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    // You can handle errors here, e.g., return an error message or rethrow the error.
    return null;
  }
};

export const verifyOTP = async (data) => {
  const { OTP, Key } = data;
  const formdata = new FormData();
  formdata.append("OTP", OTP);
  formdata.append("CustomerDetailKey", Key);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/OTPVerify`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    // You can handle errors here, e.g., return an error message or rethrow the error.
    return null;
  }
};

export const resendOTP = async (data) => {
  const { Key } = data;
  const formdata = new FormData();
  formdata.append("CustomerDetailKey", Key);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/ResendOTP`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    // You can handle errors here, e.g., return an error message or rethrow the error.
    return null;
  }
};

export const getSpinData = async () => {
  const requestOptions = {
    method: "POST",
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/ListVouchers/aj`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    // You can handle errors here, e.g., return an error message or rethrow the error.
    return null;
  }
};

export const getVoucher = async (data) => {
  const formdata = new FormData();
  formdata.append("CustomerDetailKey", data);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/SelectVoucher`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendMessage = async (data) => {
  const { Key } = data;
  const formdata = new FormData();
  formdata.append("CustomerDetailKey", Key);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/SendVoucherDetails`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const checkBranch = async (data) => {
  const { Key } = data;
  const formdata = new FormData();
  formdata.append("BranchCode", Key);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BACKEND_URL}/Voucher/IsBranch`,
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};
