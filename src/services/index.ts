import axios from "axios";
import settings from "../config/settings";

export const apiClient = axios.create({
  baseURL: settings.baseApiUrl,
});
