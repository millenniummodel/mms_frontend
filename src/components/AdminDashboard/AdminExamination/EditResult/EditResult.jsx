import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../Hooks/auth";
import { BASE_URL } from "../../../../config/config";
import { values } from "../../../../templateObjects/templateObjects";
import { toast } from 'react-toastify';

const EditResult = ({ resultData, acadYear, fetchAgain }) => {
  const [halfYearlyData, setHalfYearlyData] = useState([]);
  const [annualData, setAnnualData] = useState({});
  const [attendence, setAttendence] = useState("-");
  const [valuesData, setValuesData] = useState({});
  const { cookies } = useAuth();

  const initializeData = useCallback(() => {
    setHalfYearlyData(resultData.halfYearlyObt);
    setAnnualData(resultData.annualObt);
    setAttendence(resultData.attendence);
    setValuesData(resultData.values);
  },[resultData]);
  useEffect(() => {
    initializeData();
  }, [resultData,initializeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = cookies.token
      await axios.put(
        `${BASE_URL}/result/updateStudentResult`,
        {
          year: acadYear,
          admNo: resultData.admNo,
          halfYearlyMarks: halfYearlyData,
          annualMarks: annualData,
          values: valuesData,
          attendence: attendence,
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      fetchAgain(e)
      toast.success("Result updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      toast.error("Something went wrong!", {
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

  const handleHalfYearlyChange = (e, ind) => {
    var temp = [...halfYearlyData];
    temp[ind] = e.target.value;
    setHalfYearlyData(temp);
  };

  const handleAnnualChange = (e, ind) => {
    var temp = [...annualData];
    temp[ind] = e.target.value;
    setAnnualData(temp);
  };

  const handleValuesChange = (e, ind) => {
    var temp = [...valuesData];
    temp[ind] = e.target.value;
    setValuesData(temp);
  };
  return (
    <>
      <div
        className="modal fade"
        id="edit_result_modal"
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
                Edit Result
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  e.preventDefault();
                  initializeData();
                }}
              ></button>
            </div>
            <div className="modal_body">
              {!resultData ? (
                <h1 className="loader">No records found</h1>
              ) : (
                <section className="admin_result_main_cont mt-3">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          Half Yearly Examinations
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                      >
                        <div className="accordion-body">
                          <div className="result_list_head">
                            <div className="result_list_item_part">
                              Subjects
                            </div>
                            <div className="result_list_item_part">
                              Maximum Marks
                            </div>
                            <div className="result_list_item_part">
                              Obtained Marks
                            </div>
                          </div>
                          {resultData.subjects.map((val, ind) => {
                            return (
                              <div key={ind} className="result_list_item">
                                <div className="result_list_item_part">
                                  {val}
                                </div>
                                <div className="result_list_item_part">
                                  {resultData.halfYearlyMax}
                                </div>
                                <div className="result_list_item_part">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={halfYearlyData[ind]}
                                    onChange={(e) =>
                                      handleHalfYearlyChange(e, ind)
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Annual Examinations
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                      >
                        <div className="accordion-body">
                          <div className="result_list_head">
                            <div className="result_list_item_part">
                              Subjects
                            </div>
                            <div className="result_list_item_part">
                              Maximum Marks
                            </div>
                            <div className="result_list_item_part">
                              Obtained Marks
                            </div>
                          </div>
                          {resultData.subjects.map((val, ind) => {
                            return (
                              <div key={ind} className="result_list_item">
                                <div className="result_list_item_part">
                                  {val}
                                </div>
                                <div className="result_list_item_part">
                                  {resultData.annualMax}
                                </div>
                                <div className="result_list_item_part">
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={annualData[ind]}
                                    onChange={(e) => handleAnnualChange(e, ind)}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Values
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                      >
                        <div className="accordion-body">
                          <div className="result_list_head">
                            <div className="result_list_item_part">Values</div>
                            <div className="result_list_item_part">Grade</div>
                          </div>
                          {values.map((val, ind) => {
                            return (
                              <div key={ind} className="result_list_item">
                                <div className="result_list_item_part">
                                  {val}
                                </div>
                                <div className="result_list_item_part">
                                  <select
                                    value={valuesData[ind]}
                                    className="form-control form-select"
                                    onChange={(e) => handleValuesChange(e, ind)}
                                  >
                                    <option value={"A"}>A</option>
                                    <option value={"B"}>B</option>
                                    <option value={"C"}>C</option>
                                    <option value={"D"}>D</option>
                                    <option value={"E"}>E</option>
                                  </select>
                                </div>
                              </div>
                            );
                          })}
                          <div className="result_attendence mt-3">
                            <div className="result_attendence_head">
                              Attendence :
                            </div>
                            <div className="result_attendence_count">
                              <input
                                type="text"
                                className="form-control"
                                value={attendence}
                                onChange={(e) => setAttendence(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
            <div className="modal_btn_cont">
              <button
                className="btn cancel_btn"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault();
                  initializeData();
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

export default EditResult;
