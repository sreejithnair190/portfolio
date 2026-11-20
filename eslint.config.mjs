import core from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [...core, ...typescript];
export default config;
