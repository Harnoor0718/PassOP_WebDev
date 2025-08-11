import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      const parsedPasswords = JSON.parse(passwords);
      const passwordsWithIds = parsedPasswords.map((password) =>
        password.id ? password : { ...password, id: uuidv4() }
      );
      setpasswordArray(passwordsWithIds);
      localStorage.setItem("passwords", JSON.stringify(passwordsWithIds));
    }
  }, []);

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const savePassword = () => {
    const newPassword = { ...form, id: uuidv4() };
    const updatedPasswords = [...passwordArray, newPassword];
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    setpasswordArray(updatedPasswords);
    setform({ site: "", username: "", password: "" });
    toast.success("Password saved!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const deletePassword = (id) => {
    console.log("Deleting password with id", id);
    let confirmDelete = confirm("Do you really want to delete this password?");
    if (confirmDelete) {
      const filteredPasswords = passwordArray.filter(
        (item) => item.id !== id
      );
      setpasswordArray(filteredPasswords);
      localStorage.setItem("passwords", JSON.stringify(filteredPasswords));
      toast.success("Password deleted!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <div
        className="absolute inset-0 -z-10 h-full w-full bg-green-50
        bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px), 
        linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]
        bg-[size:14px_24px]"
      >
        <div
          className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full 
          bg-green-400 opacity-20 blur-[100px]"
        ></div>
      </div>

      <div className="mx-auto max-w-6xl container px-40 py-16">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700"> &lt; </span>
          Pass
          <span className="text-green-500">OP/ &gt; </span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-5 items-center ">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 px-4 py-0.5 w-full"
            type="text"
            name="site"
          />
          <div className="flex w-full justify-between gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 px-4 py-0.5 w-2/3"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 px-4 py-0.5 w-full"
                type="password"
                name="password"
              />
              <span
                className="absolute right-[3px] top-0 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-2"
                  width={30}
                  src="/icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex gap-2 justify-center items-center bg-green-400 rounded-full px-4 py-2 w-fit hover:bg-green-300 border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show </div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center w-30 flex items-center justify-center">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.site}
                        </a>
                        <div
                          className="lordiconcopy"
                          onClick={() => copyText(item.site)}
                        >
                          <lord-icon
                            className="cursor-pointer"
                            src="https://cdn.lordicon.com/fjvfsqea.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        {item.username}
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <span>{item.password}</span>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/jzinekkv.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
