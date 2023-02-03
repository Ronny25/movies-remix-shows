import {createContext, useContext} from "react";
import type {Genre} from "~/types/movie";

export const GenresContext = createContext<Genre[]>(null!);

export const useGenres = () => useContext(GenresContext);

export const ConfigurationContext = createContext<any>(null!);

export const useConfiguration = () => useContext(ConfigurationContext);
