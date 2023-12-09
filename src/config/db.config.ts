export const config = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "Endorse@2MySQL",
  DB: "endorse",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  OPEN_AI_API_KEY: "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"
};

export const dialect = "mysql";
