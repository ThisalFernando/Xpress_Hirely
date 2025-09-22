import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

import { Link } from "react-router-dom";

import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import "./ChatsForAdmin.css";
import { useNavigate } from "react-router-dom";

const RAW_BASE = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const BASE_URL = (RAW_BASE || "").replace(/\/$/, "");

const ChatsForAdmin = () => {
  const [chats, setS] = useState([]);
  const [loading, setL] = useState(false);
  const [admin, setA] = useState(localStorage.getItem("admin"));
  const navigate = useNavigate();

  useEffect(() => {
    setL(true);
    axios
      .get(`${BASE_URL}/chat/chats`)
      .then((response) => {
        setS(response.data);
        console.log(response);
        setL(false);
      })
      .catch((error) => {
        console.log(error);
        setL(false);
      });
  }, []);

  return (
    <div>
      <div className="Chats_parent">
        <div>Hi {admin}</div>
      </div>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="Chats_parent">
            <div></div>

            {chats.map((s, index) => (
              <div
                className="Chat"
                key={s._id}
                onClick={() => {
                  navigate(`/chat/getchat/${s._id}/admin`);
                }}
              >
                <>
                  <div className="Chats_parent_middlepanel_title text-black">
                    Title: {s.title}
                  </div>
                  <div className="Chats_parent_middlepanel_vehicle text-black">
                    Vehicle type: {s.vehicle}
                  </div>

                  <div className="Chats_parent_middlepanel_Operations text-black"></div>
                </>
              </div>
            ))}
            {/* <div className='rightpanel phonescreen'>Side</div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsForAdmin;
