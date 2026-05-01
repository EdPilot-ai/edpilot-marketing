import next from "eslint-config-next";

export default [
  ...next,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "iron-session", message: "No auth in marketing repo." },
            { name: "jose", message: "No auth in marketing repo." },
            { name: "swr", message: "No client data fetching here." },
            { name: "zustand", message: "No client state stores here." },
          ],
          patterns: [
            { group: ["@aws-sdk/*"], message: "AWS SDK is banned in this repo." },
            { group: ["**/dashboard/**", "**/learn/**", "**/auth/**", "**/api/**"], message: "Product surface — belongs in edpilot-app." },
          ],
        },
      ],
    },
  },
];
