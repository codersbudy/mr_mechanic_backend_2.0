import { Mechanic } from "../model/mechanic.model.js";
import { validationResult } from "express-validator";
export const save = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", messages: errors.array() });
        let already = await Mechanic.findOne({ contact: request.body.contact })
        if (already) {
            return response.status(200).json({ err: "account is already register.....", status: true });
        }
        let mechanic = await Mechanic.create(request.body);
        return response.status(200).json({ mechanic: mechanic, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const id = (request, response, next) => {

    Mechanic.findById(request.params.mechanicId
    )
        .then(result => {
            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ err: "internal server error", status: false })
        })

}
export const remove = (request, response, next) => {
    Mechanic.deleteOne({ id: request.params.mechanicId })
        .then(result => {

            return response.status(200).json({ result: result, status: true })
        })
        .catch(err => {
            return response.status(500).json({ err: "internal server error", status: false })
        })
}
export const updateStatus = async (request, response, next) => {
    try {
      const { id, status } = request.body;
  
      const updatedMechanic = await Mechanic.findOneAndUpdate(
        { _id: id },
        { status: status },
        { new: true }
      );
  
      if (updatedMechanic) {
        return response.status(200).json({ update: updatedMechanic, status: true });
      }
  
      return response.status(401).json({ message: "Mechanic not found", status: false });
    } catch (err) {
      return response.status(500).json({ error: "Internal server error", status: false });
    }
  };
export const bulkSave = (request, response) => {
    Mechanic.insertMany(request.body.mechanicdetails)
        .then(result => {
            return response.json({ message: "save", result: result });
        }).catch(err => {
            console.log(err);
            return response.json({ error: "error" });
        })
}
