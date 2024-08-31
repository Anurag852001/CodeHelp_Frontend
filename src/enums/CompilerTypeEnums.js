export const CompilerTypeEnums = {
  JAVA: "java",
  CPP: "cpp",
  PYTHON: "python",
};

CompilerTypeEnums.fromValue = function (value) {
  for (const [key, val] of Object.entries(CompilerTypeEnums)) {
    if (val === value) {
      return key;
    }
  }

  return null;
};
