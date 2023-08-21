const Validator = (data, type) => {
  // console.log(data);
  // console.log(type);
  let errors = [];

  if (type === "register") {
    if (!data.FirstName) {
      errors.push({
        key: "FirstName",
        message: "Requries Feild Firstname is empty",
      });
    } else if (data.FirstName.length < 3 || !/^[A-Za-z]+$/.test(data.FirstName)) {
      errors.push({ key: "FirstName", message: "Please check your Firstname" });
    }

    if (!data.LastName) {
      errors.push({
        key: "LastName",
        message: "Requries Feild Lastname is empty",
      });
    } else if (data.LastName.length < 3 || !/^[A-Za-z]+$/.test(data.LastName)) {
      errors.push({ key: "LastName", message: "Please check your Lastname" });
    }

    if (!data.Phone) {
      errors.push({ key: "Phone", message: "Requries Feild phone is empty" });
    } else if (!(data.Phone === 10 || data.Phone === Number)) {
      errors.push({ key: "Phone", message: "Please check your Phone" });
    }

    if (!data.email) {
      errors.push({ key: "email", message: "Requries Feild Email is empty" });
    } else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      errors.push({ key: "email", message: "Please check your Email" });
    }

    if (!data.password) {
      errors.push({
        key: "password",
        message: "Requries Feild Password is empty",
      });
    } else if (
      // !/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/.test(data.password)
      //  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/.test(data.password)
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{5,}$/.test(data.password)
    ) {
      errors.push({ key: "password", message: "Please check your password" });
    }

    if (data.password) {
      if (!data.ConfirmPassword) {
        errors.push({
          key: "ConfirmPassword",
          message: "Required feild ConfirmPassword is empty",
        });
      } else if (data.ConfirmPassword !== data.password) {
        errors.push({
          key: "ConfirmPassword",
          message: "Password and ConfirmPassword are not matched",
        });
      }
    }
  } 
  else if (type === "shipping") {
    if (!data.FullName) {
      errors.push({
        key: "FullName",
        message: "Requries Feild FullName is empty",
      });
    } else if (
      data.FullName.length < 3 ||
      !/^([\w]{3,})+\s+([\w\s]{3,})+$/i.test(data.FullName)
    ) {
      errors.push({ key: "FullName", message: "Please check your FullName" });
    }

    if (!data.address) {
      errors.push({
        key: "address",
        message: "Requries Feild address is empty",
      });
    } else if (
      data.address.length < 3 ||
      !/^[a-zA-Z0-9\s,-]+$/.test(data.address)
    ) {
      errors.push({ key: "address", message: "Please check your address" });
    }

    if (!data.Phone) {
      errors.push({ key: "Phone", message: "Requries Feild phone is empty" });
    } else if (!/^[0-9]{10}$/.test(data.Phone)) {
      errors.push({ key: "Phone", message: "Please check your Phone" });
    }

    if (!data.email) {
      errors.push({ key: "email", message: "Requries Feild Email is empty" });
    } else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      errors.push({ key: "email", message: "Please check your Email" });
    }

    if (!data.City) {
      errors.push({ key: "City", message: "Requries Feild City is empty" });
    } else if (!/^[a-zA-Z\s]+$/.test(data.City)) {
      errors.push({ key: "City", message: "Please check your City" });
    }

    if (!data.Pincode) {
      errors.push({
        key: "Pincode",
        message: "Requries Feild Pincode is empty",
      });
    } else if (!/^[0-9]{6}$/.test(data.Pincode)) {
      errors.push({ key: "Pincode", message: "Please check your Pincode" });
    }
  } else {
    if (!data.email) {
      errors.push({ key: "email", message: "Requries Feild Email is empty" });
    } else if (
      !/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      errors.push({ key: "email", message: "Please check your Email" });
    }

    if (!data.password) {
      errors.push({
        key: "password",
        message: "Requries Feild Password is empty",
      });
    } else if (
      // !/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/.test(data.password)
      //  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{4,20}$/.test(data.password)
      !/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{5,}$/.test(data.password)
    ) {
      errors.push({ key: "password", message: "Please check your password" });
    }
  }

  return errors;
  // console.log(object);
};

export default Validator;
