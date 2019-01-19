// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
 // parser: "babel-eslint", // 开发多页面得时候写在这里，主要是为了支持async/await
  parserOptions: {
    parser: "babel-eslint", // 打包的时候和开发app的时候写在这里
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: false
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: ["plugin:vue/base", "standard"],
  // required to lint *.vue files
  plugins: [
    "import",
    "promise",
    "vue"
  ],
  // add your custom rules here
  "rules": {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    // 强制使用一致的双引号
    "quotes": [2, "double"],
    // 分号;
    "semi": [2, "always"]
  }
}
