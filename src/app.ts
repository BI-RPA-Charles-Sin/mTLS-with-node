import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import forge from "node-forge";

const port = 3000;
const host = "127.0.0.1";
const app = express();

app.use(cors());

app.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
  let sslCert = req.headers["x-ssl-cert"];
  let decodeCert = decodeURIComponent(`${sslCert}`);

  const cert = forge.pki.certificateFromPem(`${decodeCert}`);

  const { serialNumber, signature, signatureOid, subject } = cert;
  console.log(serialNumber);
  console.log(signature);
  console.log(signatureOid);
  console.log(subject);

  res.status(200).json({
    message: "certificate verified succesfully",
  });
});

app.listen(port, host, () => {
  console.log("im listening");
});
