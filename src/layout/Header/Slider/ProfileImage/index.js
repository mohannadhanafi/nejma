import React from "react";
import "./index.scss";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { UserOutlined } from "@ant-design/icons";

export default function ProfileImage(props) {
  const user = useSelector(selectUser);

  // if the user is not signed
  if (!user.id) return null;

  return (
    <div className="profile-image">
      <div className="picture-container">
        {user.pic_url ? (
          <img
            src={user.pic_url}
            alt="close menu"
            width="120px"
            className="customer-pic"
          />
        ) : (
          <UserOutlined
            style={{ fontSize: "75px" }}
            size={"large"}
            className={"customer-pic"}
          />
        )}
      </div>
      <p>{user.name}</p>
      {user.role === "talent" && <p>{user.handler}</p>}
    </div>
  );
}
