const Validator = (data, type) => {
  const {
    firstName,
    lastName,
    email,
    password,
    ConfirmPassword,
    fullName,
    roll,
    title,
    Brand,
    alias,
    price,
    countInStock,
  } = data;
  let errors = [];
  if (type === "register") {
    if (!data.FirstName) {
      errors.push({
        key: "FirstName",
        message: "Requries Feild Firstname is empty",
      });
    } else if (
      data.FirstName.length < 3 ||
      !/^[A-Za-z]+$/.test(data.FirstName)
    ) {
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
  } else if (type === "adduser") {
    //For FullName errorsor
    if (!fullName) {
      errors.push({ key: "fullName", message: "Please Enter fullName" });
    } else if (!/^[a-zA-Z '.-]{2,30}$/.test(fullName)) {
      errors.push({ key: "fullName", message: "Invalid fullName" });
    }

    // For Email
    if (!email) {
      errors.push({ key: "email", message: "Please Enter email" });
    } // eslint-disable-next-line
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.push({ key: "email", message: "Inavalid Email" });
    }

    if (roll === "0") {
      errors.push({ key: "roll", message: "Required Your Roll Is Not Select" });
    } // eslint-disable-next-line

    if (!password) {
      errors.push({ key: "password", message: "Please Enter password" });
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      errors.push({
        key: "password",
        message: "Password is To Weak Plaese Enter Strong Password ",
      });
    }
  } else if (type === "login") {
    // For Email
    if (!email) {
      errors.push({ key: "email", message: "Please Enter email" });
    } // eslint-disable-next-line
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.push({ key: "email", message: "Inavalid Email" });
    }

    //For Password
    if (!password) {
      errors.push({ key: "password", message: "Please Enter password" });
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      errors.push({
        key: "password",
        message: "Password is To Weak Plaese Enter Strong Password ",
      });
    }
  }

  return errors;
  // console.log(object);
};

module.exports = Validator