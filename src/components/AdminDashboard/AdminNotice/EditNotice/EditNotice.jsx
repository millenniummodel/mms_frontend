import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/config";
import AlertConfirm from 'react-alert-confirm';
import 'react-alert-confirm/lib/style.css';
import { toast } from 'react-toastify';
import { useAuth } from "../../../../Hooks/auth";

const EditNotice = ({ noticeData }) => {
  const [noticeNew, setnoticeNew] = useState({});
  const { cookies } = useAuth();
  useEffect(() => {
    setnoticeNew(noticeData);
  }, [noticeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [isOk] = await AlertConfirm('Are you sure?');
      if (!isOk) return
      const accessToken = cookies.token;
      await axios.put(`${BASE_URL}/notice/${noticeData._id}`, noticeNew,
        {
          headers: {
            token: `Bearer ${accessToken}`
          }
        });
      toast.success("Notice updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        document.location.reload();
      }, 500);

    } catch (err) {
      return toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChange = (e) => {
    setnoticeNew((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <>
      <div
        className="modal fade"
        id="edit_notice_modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <form className="modal-dialog modal-lg" onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 px-3" id="staticBackdropLabel">
                Edit Notice
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  e.preventDefault();
                  setnoticeNew(noticeData);
                }}
              ></button>
            </div>
            <div className="modal_body">
              <form className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="heading" className="col-form-label">
                    Notice Headline:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="heading"
                    value={noticeNew.heading}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="link" className="col-form-label">
                    Notice Link:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="link"
                    value={noticeNew.link}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal_btn_cont">
              <button
                className="btn cancel_btn"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  setnoticeNew(noticeData);
                }}
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="btn add_btn"
                data-bs-dismiss="modal"
              >
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditNotice;
