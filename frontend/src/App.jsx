import { useState } from "react";
import "./App.css";
import Main from "./Pages/Main";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { Route, Routes } from "react-router-dom";
import UserStack from "./Pages/UserStack/UserStack";
import AdminStac from "./Pages/AdminStack/AdminStac";
import NotFound from "./Pages/NotFound/NotFound";
import NotAuthorized from "./Pages/NotAuthorized/NotAuthorized";
import Products from "./Pages/UserStack/Home/Products";
import Checkout from "./Pages/UserStack/Checkout/Checkout";
import Notification from "./Pages/UserStack/Notification/Notification";
import UpdateNotification from "./Pages/UserStack/Notification/UpdateNotification";
import EmpManage from "./Pages/AdminStack/EmpManage/EmpManage";
import EditEmp from "./Pages/AdminStack/EmpManage/EditEmp";
import AddEmp from "./Pages/AdminStack/EmpManage/AddEmp";
import DeliveryManage from "./Pages/AdminStack/DeliveryManage/DeliveryManage";

import AddOrder from "./Pages/Stocks/placeOrder/AddOrder";
import UpdateOrder from "./Pages/Stocks/updateOrder/EditOrder";
import Order from "./Pages/Stocks/RetrieveOrder/Order";

import AddCoupon from "./Pages/Coupons/placeCoupon/AddCoupon";
import Coupon from "./Pages/Coupons/RetriveCoupon/coupon";
import EditCoupon from "./Pages/Coupons/UpdateCoupon/EditCoupon";
import Cnoti from "./Pages/Coupons/RetriveCoupon/cnoti";

import AddPayment from "./Pages/Payments/AddPayment/AddPayment";
import PaymentList from "./Pages/Payments/RetrivePayment/payment";
import UpdatePayment from "./Pages/Payments/updatePayment/updatePayment";

import AddFeedback from "./Pages/Feedbacks/placeFeedbacks/addfeedback";
import FeedbackList from "./Pages/Feedbacks/RetrieveFeedbacks/feedback";

import EditForm from "./Pages/Repair/Customer/EditRepair";
import CusForm from "./Pages/Repair/Customer/CustomerForm";
import CompleteCusTable from "./Pages/Repair/Customer/Table/Completed_Table";
import OngoingCusTable from "./Pages/Repair/Customer/Table/Ongoing_Table";
import PendingCusTable from "./Pages/Repair/Customer/Table/Pending_Table";
import UnrepairCusTable from "./Pages/Repair/Customer/Table/Unrepairable_Table";
import Progress from "./Pages/Repair/Customer/Progress/Progress";
import MgrForm from "./Pages/Repair/Manager/ManagerForm";
import CompleteMgrTable from "./Pages/Repair/Manager/Table/Completed_Table";
import OngoingMgrTable from "./Pages/Repair/Manager/Table/Ongoing_Table";
import PendingMgrTable from "./Pages/Repair/Manager/Table/Pending_Table";
import UnrepairMgrTable from "./Pages/Repair/Manager/Table/Unrepairable_Table";
import ReportGen from "./Pages/Repair/Manager/GenerateReport";
import CompleteTechTable from "./Pages/Repair/Technician/Completed_Table";
import OngoingTechTable from "./Pages/Repair/Technician/Ongoing_Table";
import PendingTechTable from "./Pages/Repair/Technician/Pending_Table";
import UnrepairTechTable from "./Pages/Repair/Technician/Unrepairable_Table";
import AddCard from "./Pages/Card/AddCard";
import UpdateFeedback from "./Pages/Feedbacks/updateFeedbacks/updatefeedback";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />}>
          <Route index element={<UserStack />} />
          <Route path="user" element={<UserStack />}>
            <Route index element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<Checkout />} />
            <Route path="notification" element={<Notification />} />
            <Route
              path="notification/update/:id"
              element={<UpdateNotification />}
            />
            <Route path="repair/Edit/Form/:id" element={<EditForm />} />
        <Route path="repair/Form" element={<CusForm />} />
        <Route path="repair/Table/Complete" element={<CompleteCusTable />} />
        <Route path="repair/Table/Ongoing" element={<OngoingCusTable />} />
        <Route path="repair/Table/Pending" element={<PendingCusTable />} />
        <Route path="repair/Table/Unrepairable" element={<UnrepairCusTable />} />
        <Route path="repair/Progress" element={<Progress />} />
          </Route>
          <Route path="admin" element={<AdminStac />}>
            <Route index element={<EmpManage />} />
            <Route path="employee" element={<EmpManage />} />
            <Route path="empAdd" element={<AddEmp />} />
            <Route path="empEdit/:id" element={<EditEmp />} />
            <Route path="delivery" element={<DeliveryManage />} />
            <Route path="repair" element={<MgrForm />} />

<Route path="Manager" element={<MgrForm/>} />
<Route path="Manager/Form" element={<MgrForm />} />
<Route path="Manager/Table/Complete" element={<CompleteMgrTable />} />
<Route path="Manager/Table/Ongoing" element={<OngoingMgrTable />} />
<Route path="Manager/Table/Pending" element={<PendingMgrTable />} />
<Route path="Manager/Table/Unrepairable" element={<UnrepairMgrTable />} />
<Route path="Manager/Report" element={<ReportGen />} />

<Route path="Technician" element={<PendingTechTable />} />
<Route path="Technician/Complete" element={<CompleteTechTable />} />
<Route path="Technician/Ongoing" element={<OngoingTechTable />} />
<Route path="Technician/Pending" element={<PendingTechTable />} />
<Route path="Technician/Unrepairable" element={<UnrepairTechTable />} />



          </Route>
        </Route>

        <Route path="ccard" element={<AddCard />} />

        <Route path="stocks" element={<Order />} />

        <Route path="coupons" element={<AddCoupon />} />
        <Route path="list" element={<Coupon />} />
        <Route path="eit" element={<EditCoupon />} />
        <Route path="cnoti" element={<Cnoti />} />

        <Route path="payments" element={<AddPayment />} />
        <Route path="pay" element={<PaymentList />} />
        <Route path="payu/:id" element={<UpdatePayment />} />

        <Route path="fadd" element={<AddFeedback />} />
        <Route path="flist" element={<FeedbackList />} />


        <Route path="add" element={<AddOrder />} />
        <Route path="edit/:id" element={<UpdateOrder />} />
        <Route path="update/:id" element={<UpdateFeedback />} />

        <Route path="/notallowed" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />

       

       
      </Routes>
    </>
  );
}

export default App;
