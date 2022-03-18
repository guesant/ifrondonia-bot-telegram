import winston from "winston";

export const getDefaultLogger = () => {
  return winston.createLogger({
    transports: [new winston.transports.Console()],
  });
};
