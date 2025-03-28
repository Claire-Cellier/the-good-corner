import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
	console.error(err.stack);
	res.status(500).send({ error: err.message || "Oops something went wrong!" });
};

export default errorHandler;
