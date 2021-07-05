module.exports = {
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/file.mock.ts",
    "\\.(css|less)$": "<rootDir>/src/__mocks__/file.mock.ts",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.vue$": "vue-jest",
  },
};
