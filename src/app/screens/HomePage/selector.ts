import { createSelector } from "@reduxjs/toolkit";
import { AppScreenState } from "../../../lib/types/screen.type";

const homePageState = (state:AppScreenState)=>state.homePage;

