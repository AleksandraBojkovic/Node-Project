const config = Object.freeze({
  BASE_URL: "http://localhost:9001/issues",
  ISSUE_URL: "/issues",
  ISSUE_ID: "/:issueId",
  ISSUE_STATUS: "/status/:issueId",
  ISSUE_COMMENT: "/:issueId/comment",
  FILE_UPLOAD: "/upload",
  FILE_DOWNLOAD: "/fileDownload",
  DIR: "./routes/uploads"
});

module.exports = config;
