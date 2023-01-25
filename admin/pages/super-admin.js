import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import RegisterAdmin from "../components/Register";
import SuperAdminList from "../components/superadminList";
class SuperAdmin extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SuperAdminList/>
        </Layout>
      </div>
    );
  }
}

export default SuperAdmin;
