import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const navigate = useNavigate();
  const token = useSelector((state: unknown) => state.session.token);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) {
      return navigate("/sign-in");
    }

    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tokenValidation: token,
      }),
    })
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Invalid token");
      })
      .then((data) => {
        setUser({ ...data.body });
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }, [token, navigate]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const serviceData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
      },
    };

    fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData.body),
    })
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Invalid token");
      })
      .then((data) => {
        setUser({ ...data.body });
        setIsEditing(false);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  return (
    <main className="flex flex-col items-center h-screen main bg-dark">
      <div className="header">
        <h1 className="text-xl">
          Welcome back
          <br />
          {!isEditing ? `${user.firstName} ${user.lastName}` : null}
        </h1>

        {!isEditing ? (
          <>
            <button
              className="mt-4 edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Name
            </button>
          </>
        ) : (
          <div>
            <form
              method="post"
              onSubmit={onSubmit}
              className="flex justify-center gap-8 mt-4"
            >
              <div className="flex flex-col gap-5 w-[250px] relative">
                <input
                  className="p-2 text-black placeholder:text-gray-500"
                  type="text"
                  name="firstName"
                  placeholder={user.firstName}
                />
                <button
                  type="submit"
                  className="px-8 py-1 border-[#FFF] border-2 w-[150px] absolute right-0 bottom-0"
                >
                  Save
                </button>
              </div>

              <div className="flex flex-col gap-5 w-[250px]">
                <input
                  className="p-2 text-black placeholder:text-gray-500"
                  type="text"
                  name="lastName"
                  placeholder={user.lastName}
                />
                <button
                  type="button"
                  className="px-8 py-1 border-[#FFF] border-2 w-[150px]"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};
