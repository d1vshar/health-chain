import { Box, Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import DoctorProfile from "../components/Doctors/DoctorProfile";
import PageContent from "../components/Page/PageContent";
import PageHeader from "../components/Page/PageHeader";
import PageTitle from "../components/Page/PageTitle";
import type { DoctorData } from "../types";

function createData(
  address: string,
  uuid: string,
  name: string,
  speciality: string
): DoctorData {
  const lastActivity = new Date();
  return {
    address,
    uuid,
    name,
    speciality,
    lastActivity,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const profile: DoctorData = createData(
  "23132131321312323123",
  "21323213123123123",
  "Divyanshu Sharma",
  "General Physician"
);

function DoctorProfilePage() {
  const params = useParams();
  return (
    <PageContent>
      <PageHeader>
        <PageTitle>Doctor Profile - {params.id}</PageTitle>
      </PageHeader>
      <Box display="flex" flexDirection="row" width="100%">
        <DoctorProfile />
      </Box>
    </PageContent>
  );
}

export default DoctorProfilePage;
