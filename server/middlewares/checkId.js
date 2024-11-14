import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error(`Objet: ${req.params.id} invalide`);
  }
  next();
}

export default checkId;
