import React, { useEffect, useState } from "react";
import NotificationService from "../../../Services/Notification/NotificationService";
import LocalStore from "../../../Store/LocalStore";
import DateFormatter from "../../../Utils/Constants/DateFormatter";
import Toaster from "../../../Utils/Constants/Toaster";
import ResponseHandler from "../../../Utils/Constants/ResponseHandler";
import { notiHeader } from "../../../Utils/Constants/TableHeaders";
import PdfGenerator from "../../../Utils/Pdfs/PdfGenerator";
import CusSwal from "../../../Utils/CustomSwal/CusSwal";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  // Fetch token data from LocalStore
  const tokenData = LocalStore.getToken();
  const [notis, setNotis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await NotificationService.getAllNotificationOfUser(
        tokenData.email
      );
      if (response.data.code === 200) {
        setNotis(response.data.data.notification);
      }
    } catch (error) {
      if (error.response.data.code === 404) {
        Toaster.justToast("error", error.response.data.data.message, () => {});
      }
      if (error.response.data.code === 500) {
        Toaster.justToast("error", error.response.data.data.message, () => {});
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSeen = async (id) => {
    try {
      setLoading(true);
      Toaster.loadingToast("Updating Status .......");
      const result = await NotificationService.makeNotiDone(id);
      console.log(result);
      if (result.data.code === 200) {
        fetchData();
        Toaster.justToast("success", result.data.data.message, () => {});
      }
    } catch (error) {
      ResponseHandler.handleResponse(error);
    } finally {
      setLoading(false);
      Toaster.dismissLoadingToast();
    }
  };
  const filteredNoti = searchQuery
    ? notis.filter((noti) => {
        return noti.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
    : notis;

  const generatePdf = () => {
    Toaster.loadingToast("Generating Pdf");
    try {
      console.log(notis);
      PdfGenerator.generatePdf(notis, "Notification List", notiHeader);
      Toaster.justToast("success", "Creating The Pdf For You", () => {});
    } catch (error) {
      Toaster.justToast("error", "genration failed", () => {});
    } finally {
      Toaster.dismissLoadingToast();
    }
  };

  const handleNotiDelete = (id) => {
    CusSwal.deleteConfiramation(async () => {
      Toaster.loadingToast("Deleting Notification.....");
      try {
        const result = await NotificationService.deleteNoti(id);
        if (result) {
          Toaster.justToast("success", "Notification Deleted", () => {});
          fetchData();
        }
      } catch (error) {
        ResponseHandler.handleResponse(error);
      } finally {
        Toaster.dismissLoadingToast();
      }
    });
  };

  const handleNotiUpdate = (id) => {
    navigate("update/" + id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="body-wrapper">
        <div className="container-fluid">
          {/*  Row 1 */}
          <div className="row">
            <div className="col-12 d-flex align-items-stretch">
              <div className="card w-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-end align-items-center mb-4">
                    <button
                      onClick={generatePdf}
                      className="btn btn-outline-dark mx-2"
                    >
                      Export PDF
                    </button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title fw-semibold">
                      List Of Notifications
                    </h5>
                    <form className="position-relative">
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        className="form-control search-chat py-2 ps-5"
                        id="text-srh"
                        placeholder="Search Description"
                      />
                      <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
                    </form>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <div className="d-flex justify-content-center align-items-center my-3">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden m-auto"></span>
                        </div>
                      </div>
                    ) : (
                      <table className="table mb-0 align-middle">
                        <thead className="text-dark fs-4">
                          <tr>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Description</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">From</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">To</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Recived</h6>
                            </th>
                            <th className="border-bottom-0">
                              <h6 className="fw-semibold mb-0">Mark Seen</h6>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredNoti.map((noti) => {
                            return (
                              <tr key={noti._id}>
                                <td className="border-bottom-0">
                                  <p className="fw-normal mb-1">
                                    {noti.description}
                                  </p>
                                </td>
                                <td className="border-bottom-0">
                                  <p className="fw-normal mb-1">{noti.from}</p>
                                </td>
                                <td className="border-bottom-0">
                                  <p className="mb-0 fw-normal">
                                    {noti.toEmail}
                                  </p>
                                </td>
                                <td className="border-bottom-0">
                                  <p className="mb-0 fw-normal">
                                    {DateFormatter.formatDate(noti.created_at)}
                                  </p>
                                </td>
                                {noti.seen ? (
                                  <td className="border-bottom-0">
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                    >
                                      SEEN
                                    </button>
                                  </td>
                                ) : (
                                  <td className="border-bottom-0">
                                    <button
                                      onClick={() => {
                                        handleSeen(noti._id);
                                      }}
                                      type="button"
                                      className="btn btn-warning"
                                    >
                                      <i className="ti ti-check text-white" />
                                    </button>
                                  </td>
                                )}
                                <td>
                                  
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleNotiDelete(noti._id);
                                    }}
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
