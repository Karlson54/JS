import eslist from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslist.configs.recommended,
    ... tseslint.configs.recommended
);