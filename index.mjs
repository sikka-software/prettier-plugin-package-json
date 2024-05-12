import prettier from "prettier";

export const languages = [
  {
    name: "JSON",
    parsers: ["package-json-parser"],
    extensions: [".json"],
    filenames: ["package.json"],
    vscodeLanguageIds: ["json"],
  },
];

export const parsers = {
  "package-json-parser": {
    parse: (text, parsers, options) => {
      const lines = text.split("\n");
      const emptyLines = lines
        .map((line, index) => (line.trim() === "" ? index : null))
        .filter((index) => index !== null);
      const data = JSON.parse(text);
      return { type: "root", data, emptyLines };
    },
    astFormat: "package-json-ast",
  },
};

export const printers = {
  "package-json-ast": {
    print: (path, options, print) => {
      const { data, emptyLines } = path.node;
      let formatted = JSON.stringify(data, null, options.tabWidth);
      let formattedLines = formatted.split("\n");

      emptyLines.forEach((index) => {
        if (index < formattedLines.length) {
          formattedLines.splice(index, 0, "");
        }
      });

      return formattedLines.join("\n");
    },
  },
};

export default {
  languages,
  parsers,
  printers,
};
