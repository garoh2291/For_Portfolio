import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/SignUp";
import { RequaireAuth } from "../hoc";
import { PageNotFound } from "../Pages/404Page";
import { AboutMePage } from "../Pages/AboutMePAge";
import { ContactPage } from "../Pages/ContactPage";
import { HomePage } from "../Pages/HomePage";
import { LoginPage } from "../Pages/LoginPage";
import { ProjectPage } from "../Pages/ProjectPage";
import { SingleTask } from "../Pages/SingleTask";

export const RoutesComponents = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/project"
        element={
          <RequaireAuth>
            <ProjectPage />
          </RequaireAuth>
        }
      />
      <Route path="/project/:taskId" element={<SingleTask />} />

      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about-me" element={<AboutMePage />} />
      <Route path="/auth" element={<LoginPage />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>

      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};
